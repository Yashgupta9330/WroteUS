import Board from "@/components/board";
import Menu from "@/components/menubar";
import RoomComponent from "@/components/room";
import Toolbox from "@/components/toolbox";
export default function Home() {


  return (
      <>
      <RoomComponent />
      <Menu />
      <Toolbox/>
      <Board />
      </>
  );
}
