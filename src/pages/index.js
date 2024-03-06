import Chat from "@/components/Chat";
import User from "@/components/User/User";
import Board from "@/components/board";
import Menu from "@/components/menubar";
import RoomComponent from "@/components/room";
import Toolbox from "@/components/toolbox";
import { socket } from "@/socket";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
export default function Home() {
  const [roomJoined, setRoomJoined] = useState(false);
  const [user, setUser] = useState({});
  const [roomuser, setRoomuser] = useState([]);
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

  return (
    <>
      {!roomJoined ? (
        <RoomComponent
          uuid={uuid}
          setRoomJoined={setRoomJoined}
          setUser={setUser}
        />
      ) : (
        <>
          <Menu user={user} />
          <Board user={user} />
          <Toolbox />
          <User roomuser={roomuser} />
          <Chat user={user}/>
        </>
      )}
    </>
  );
}
