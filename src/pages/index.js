import Board from "@/components/board";
import Menu from "@/components/menubar";
import RoomComponent from "@/components/room";
import Toolbox from "@/components/toolbox";
import { useState } from "react";
export default function Home() {
  const [roomJoined, setRoomJoined] = useState(false);
  const [user, setUser] = useState({});
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

  return (
      <>
      {!roomJoined ? (
      <RoomComponent uuid={uuid} setRoomJoined={setRoomJoined} setUser={setUser} />
      )
      :
      (     <>
            <Menu uuid={uuid} />
            <Board user={user}/>
            <Toolbox />
            </>
      )
      }
      </>
  );
}
