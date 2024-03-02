import React, { useState, useRef, useEffect, useCallback } from "react";
import styles from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faCheck} from "@fortawesome/free-solid-svg-icons";

const Sharebtn = ({uuid}) => {
  const idRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [isShare, setIsShare] = useState(false);
  const [createRoom, setCreateRoom] = useState('');
  // const createRoom = uuid();

  useEffect(()=>{
    setCreateRoom(uuid);
  },[])
  
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

  const handleShare = () => {
    setIsShare((prev) => !prev);
  };
  return (
      <div className={`${styles.main} `}>
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="createRoom"
        >
          Share Room ID:
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
          <button
            type="button"
            className={` ${styles.copy}  hover:bg-slate300 py-2 px-3 ml-2 rounded`}
            onClick={handleCopy}
          >
            {!copied && <FontAwesomeIcon icon={faCopy} />}

            {copied && (
              <FontAwesomeIcon
                icon={faCheck}
                style={{
                  "--fa-primary-color": "#69db61",
                  "--fa-secondary-color": "#0dbd00",
                }}
              />
            )}
          </button>
        </div>
      </div>
  );
};

export default Sharebtn;
