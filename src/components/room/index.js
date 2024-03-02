import React, { useState, useEffect, useRef, useCallback } from "react";
import { socket } from "@/socket";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faCheck} from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.css";

const RoomComponent = ({ uuid, setRoomJoined, setUser }) => {
  const [createRoom, setCreateRoom] = useState("");
  const [joinRoom, setJoinRoom] = useState("");
  const [name, setName] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);
  const idRef = useRef(null);
  const [copied, setCopied] = useState(false);


  const handleGenerate = () => {
    setCreateRoom(uuid());
    setIsGenerated(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (joinRoom) {
      const roomdata = {
        roomId: joinRoom,
        userId: uuid(),
        userName: name,
        host: false,
      };
      setUser(roomdata);
      console.log(roomdata);
      socket.emit("joinroom", roomdata);
    } else {
      const roomjoindata = {
        roomId: createRoom,
        userId: uuid(),
        Name: name,
        host: true,
      };
      setUser(roomjoindata);
      console.log(roomjoindata);
      socket.emit("joinroom", roomjoindata);
    }
    setRoomJoined(true);
  };


  useEffect(() => {
    const timeout = setTimeout(() => {
      if (copied) setCopied(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [copied]);


  const handleCopy = useCallback(() => {
    idRef.current?.select();
    window.navigator.clipboard.writeText(createRoom);
    setCopied(true);
  }, [createRoom]);

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Your Name:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="createRoom"
          >
            Create Room:
          </label>
          <div className="flex items-center">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="createRoom"
              ref={idRef}
              type="text"
              value={createRoom}
              contentEditable="false"
              readOnly
            />
            {isGenerated && (
              <button
                type="button"
                className={` ${styles.copy}  hover:bg-slate300 py-2 px-3 ml-2 rounded`}
                onClick={handleCopy}
              >
                {!copied && <FontAwesomeIcon icon={faCopy} />}

              {copied && <FontAwesomeIcon icon={faCheck} style={{"--fa-primary-color": "#69db61", "--fa-secondary-color": "#0dbd00",}} />}
                
              </button>
            )}

            <button
              className={` ${styles.btn} font-bold px-4 rounded`}
              type="button"
              onClick={handleGenerate}
            >
              Generate
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="joinRoom"
          >
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
        <div className={` ${styles.btn2} flex items-center justify-center`}>
          <button
            className={`  font-bold px-4 rounded`}
            type="submit"
          >
            Enter Room
          </button>
        </div>
      </form>

      <div className="w-screen flex items-center justify-center  " >
              <div>
                <h3>Developed by <span className="hover:bg-slate300"> <a href="https://www.linkedin.com/in/yash-gupta-64956b246/">Yash Gupta</a></span> <span> {" "} & {" "} </span> 
                <span className="hover:bg-slate300">
                <a href="https://www.linkedin.com/in/harshpandey73/">Harsh Pandey</a>
                </span>
                </h3>
              </div>
      </div>
    </div>
  );
};

export default RoomComponent;
