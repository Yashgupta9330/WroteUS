
import React, { useState, useEffect, useRef, useCallback } from "react";
import {socket} from "@/socket";
import { useDispatch, useSelector } from "react-redux";
import { roomClick } from "@/slice/roomSlice";
//import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
//import styles from "./index.module.css";

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

  return (
    <div>
      <label htmlFor="roomInput">Enter Room No:</label>
      <input
        type="text"
        id="roomInput"
        value={room}
        onChange={handleRoomChange}
      />
      <button onClick={handleSubmit}>Submit</button>
      <p>Current Room: {room}</p>
    </div>
  );
};


export default RoomComponent;

