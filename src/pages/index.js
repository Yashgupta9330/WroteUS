import Chat from "@/components/Chat";
import User from "@/components/User/User";
import Board from "@/components/board";
import Menu from "@/components/menubar";
import RoomComponent from "@/components/room";
import Toolbox from "@/components/toolbox";
import { socket } from "@/socket";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { IoChatboxEllipses } from "react-icons/io5";


export default function Home() {
  const [roomJoined, setRoomJoined] = useState(false);
  const [user, setUser] = useState({});
  const [roomuser, setRoomuser] = useState([]);

  const [isChat, setIsChat] = useState(false);
  const chatBtnRef = useRef(null);

  const uuid = () => {
    var S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      S4() +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      S4() +
      S4()
    );
  };

  useEffect(() => {
    socket.on("users", (data) => {
      setRoomuser(data);
      console.log(data);
    });
  }, []);

  const handleToggleChat = () => {
    setIsChat((prev) => !prev);
  };

  return (
    <div>
      {!roomJoined ? (
        <RoomComponent
          uuid={uuid}
          setRoomJoined={setRoomJoined}
          setUser={setUser}
        />
      ) : (
        <div>
          <Menu user={user} />
          <Board user={user} />
          <Toolbox />
          <User roomuser={roomuser} />

          <div hidden={isChat} className="transition-all ease-in-out">
            <div
              className=" h-[50px] w-[190px] text-[#fff] font-semibold gap-2 rounded-lg flex justify-center items-center fixed top-[85%] left-[85%] cursor-pointer bg-[#0f0f0f] shadow-xl hover:bg-[#242424] "
              onClick={handleToggleChat}
              ref={chatBtnRef}
            >
              <IoChatboxEllipses  color="white"
                size={25} />
              <span>Chat Room</span>
              <IoIosArrowUp
                color="white"
                size={30}
              />
            </div>
          </div>

          <div hidden={!isChat} className="transition-all ease-in-out">
            <Chat user={user} setIsChat={setIsChat} />
          </div>
        </div>
      )}
    </div>
  );
}
