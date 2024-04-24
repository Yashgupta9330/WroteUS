import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faXmark } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useRef, useState } from "react";
import { socket } from "@/socket";
import Message from "../Message";
import { RiSendPlane2Fill } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";

const Chat = ({ user, setIsChat }) => {
  const [message, setMessage] = useState("");
  const [allchats, setAllchats] = useState([]);
  const { userId } = user;
  const ref = useRef(null);
  // console.log("user", user);
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleCloseChat = () => {
    setIsChat((prev) => !prev);
  };

  const roomchats = (e) => {
    const { userName } = user;
    const newMessage = {
      user: user,
      text: message,
      timestamp: new Date(),
      roomId: user.roomId,
      userName: userName,
    };
    setMessage("");
    console.log(newMessage);
    socket.emit("roomMessage", newMessage);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      roomchats();
    }
  };

  useEffect(() => {
    socket.on("chats", (data) => {
      setAllchats(data); // Corrected function name
      console.log("entering room message");
      console.log(data);
    });
  }, []);


  useEffect(() => {
    if(ref.current){
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [allchats]);




  return (
    <div className="absolute left-[75%] w-[350px] top-[18%] border-2 border-black h-[550px] rounded-md z-2">
      <div className="flex flex-col justify-center items-center h-full ">
        <div className="flex items-center justify-between bg-[#0f0f0f] hover:bg-[#242424] w-full h-[40px] text-[#fff] font-semibold p-2   ">
          <h2>Chat Room</h2>
          <IoIosArrowDown
          size={30}
          style={{ color: "#ffffff", cursor: "pointer" }}
          onClick={handleCloseChat} />
        </div>
        <div className="flex bg-[#fff] flex-col w-full gap-1 text-black h-[500px] px-2 py-2 overflow-auto">
          {allchats.map((message) => {
            console.log("sending data");
            console.log(message);
            console.log(userId);
            return (
              <>
                <Message
                  key={message.timestamp}
                  message={message}
                  userid={userId}
                />
                <div ref={ref}></div>
              </>
            );
          })}
        </div>
        <div className="w-full bg-[rgb(234,233,239)] ">
          <hr />
          <div className="flex items-center">
            <input
              type="text"
              id="chatInput"
              className="m-2 h-[40px] p-2 border-2 border-black rounded-md w-full"
              placeholder="Type your message..."
              onChange={handleMessageChange}
              value={message}
              onKeyDown={handleKeyDown}
            />
            <div
              className="flex justify-center items-center my-2 mr-2 cursor-pointer h-[50px]"
              onClick={roomchats}
            >
              <RiSendPlane2Fill className="w-[30px] text-lg" size={40} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
