import Chat from "@/components/Chat";
import User from "@/components/User/User";
import Board from "@/components/board";
import Menu from "@/components/menubar";
import RoomComponent from "@/components/room";
import Toolbox from "@/components/toolbox";
import { socket } from "@/socket";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faL, faMessage } from "@fortawesome/free-solid-svg-icons";

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

          {!isChat && (
            <div
              className="w-[50px] h-[50px] rounded-full flex justify-center items-center fixed top-[90%] left-[90%] "
              style={{ backgroundColor: "rgb(158, 158, 158)", cursor: "pointer" }}
              onClick={handleToggleChat}
              ref={chatBtnRef}
            >
              <FontAwesomeIcon icon={faMessage} />
            </div>
          )}

          {isChat && <Chat user={user} setIsChat={setIsChat} />}
        </div>
      )}
    </div>
  );
}
