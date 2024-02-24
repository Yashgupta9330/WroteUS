import React, { useState, useEffect, useRef, useCallback } from "react";
import {socket} from "@/socket";
import { useDispatch, useSelector } from "react-redux";
import { roomClick } from "@/slice/roomSlice";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import styles from "./index.module.css";

const RoomComponent = () => {
  const dispatch = useDispatch();
  const roomno = useSelector((state) => state.room.roomno) || "";
  console.log("Room component", roomno);
  const [room, setRoom] = useState(''); 

  const [newRoom, setNewRoom] = useState(" ");
  const roomRef = useRef(null);
  useEffect(() => {
    setRoom(socket.id);
    dispatch(roomClick(socket.id));
  }, [dispatch]); 
 
  

  const handleRoomChange = (e) => {
    setRoom(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(roomClick(room));
    socket.emit("joinroom", { room: room }); 
  };

  const handleCopy = useCallback(()=>{
    roomRef.current?.select();
    window.navigator.clipboard.writeText(room);
  },[room])

  return (
    <div className="m-2 py-2 px-0 border-2 rounded-xl w-fit">
      <div className="flex-col justify-start items-stretch gap-5 mx-4 mb-2 font-medium ">
        <p className="mb-1">Share Room ID</p>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            className=" w-fit py-2 px-2 border-2 rounded-lg text-sm border-[#474747] ring-[#474747]"
            readonly
            contentEditable="false"
            value={room}
            ref={roomRef}
          />
          <button
          onClick={handleCopy}
           className="w-[38px] h-[38px] border-2 border-[#474747] bg-[#f7f7f7] hover:bg-[#D9D9D9] rounded-lg flex items-center justify-center">
            <ContentCopyOutlinedIcon className="opacity-[80%]" />
          </button>
        </div>
      </div>

      <div className="flex-col justify-start items-stretch gap-5 mx-4 font-medium ">
        <label htmlFor="roomInput" className="mb-1">
          Join Room
        </label>

        <div className="flex gap-2 items-center ">
          <input
            type="text"
            id="roomInput"
            placeholder="Enter Room ID"
      
            onChange={handleRoomChange}
            className="py-2 px-2 w-[180px] border-2 rounded-lg text-sm border-[#474747] ring-[#474747]"
          />
          <button onClick={handleSubmit} className=" py-1 px-3 border-2 border-[#474747] hover:bg-[#D9D9D9] bg-[#f7f7f7] rounded-lg flex items-center justify-center" >SUBMIT</button>
        </div>
      </div>
    </div>
  );
};

export default RoomComponent;