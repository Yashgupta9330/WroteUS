import React, { useState, useEffect } from 'react';
import { socket } from '@/socket';
import { useDispatch, useSelector } from 'react-redux';
import { roomClick } from '@/slice/roomSlice';

const RoomComponent = () => {
  const dispatch = useDispatch();

  const roomno = useSelector((state) => state.room.roomno) || '';

  console.log("Room component",roomno);

  // Use a more meaningful variable name like room instead of rooms
  const [room, setRoom] = useState(roomno);

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
    socket.emit("joinroom", { room: room });  // Use the consistent variable name
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

