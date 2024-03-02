
import React, { useState, useEffect} from "react";
import {socket} from "@/socket";

const RoomComponent = ({uuid,setRoomJoined,setUser}) => {

  const [createRoom, setCreateRoom] = useState('');
  const [joinRoom, setJoinRoom] = useState('');
  const [name,setName]=useState('');

  const handleGenerate = () => {
    setCreateRoom(uuid());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(joinRoom){
      const roomdata={
        roomId:joinRoom,
        userId: uuid(),
        userName: name,
        host: false
      }
      setUser(roomdata);
      console.log(roomdata);
      socket.emit("joinroom",roomdata);
    }
    else{
      const roomjoindata={
        roomId:createRoom,
        userId: uuid(),
        Name: name,
        host: true
      }
      setUser(roomjoindata);
      console.log(roomjoindata);
      socket.emit("joinroom",roomjoindata);
    }
    setRoomJoined(true);
  };


  return (
    <div className="flex items-center justify-center h-screen">
    <form
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Your Name:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="createRoom">
          Create Room:
        </label>
        <div className="flex items-center"> 
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="createRoom"
            type="text"
            value={createRoom}
            disabled
          />
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 ml-2 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleGenerate}
          >
            Generate
          </button>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="joinRoom">
          Join Room:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="joinRoom"
          type="text"
          value={joinRoom}
          onChange={(e) => setJoinRoom(e.target.value)}
          placeholder="Enter room code"
        />
      </div>
      <div className="flex items-center justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Enter Room
        </button>
      </div>
    </form>
  </div>
  
  );
};


export default RoomComponent;

