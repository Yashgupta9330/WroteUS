import React, { useState, useRef, useEffect, useCallback, use } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faEraser,
  faFileArrowDown,
  faRotateLeft,
  faRotateRight,
  faShareNodes,
  faSquare,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import { menuItemClick, actionItemClick } from "@/slice/menuSlice";
import { MENU_ITEMS } from "../constant";
import cx from "classnames";
import { socket } from "@/socket";
import roomSlice from "@/slice/roomSlice";
import RoomComponent from "../room";
import Sharebtn from "../sharebtn";

const Menu = ({user}) => {
  const dispatch = useDispatch();
  const {roomId}=user;
  const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
  /* const roomno = useSelector((state) => state.room.roomno) || '';
    console.log(roomno,"at menubar") */

  const menuRef = useRef(null);


    const [isShare, setIsShare] = useState(false);
    const handleShare = () => {
      setIsShare((prev) => !prev);
    };

    const handleOutsideClick = (e) =>{
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsShare((prev) => !prev);
      }
    }

    useEffect(()=>{
      document.addEventListener("mousedown", handleOutsideClick);
      return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      }

    },[]);

  const handleMenuClick = (itemName) => {
    dispatch(menuItemClick(itemName));
    socket.emit("changeactiveitem", { item: itemName });
    console.log(itemName);
  };

  const handleActioItemClick = (itemName) => {
    dispatch(actionItemClick(itemName));
    socket.emit("changeactionitem", { item: itemName });
    console.log(itemName);
  };
  

  return (
    <div className="">
    <div className={styles.menuContainer}>
      <div
        className={cx(styles.iconWrapper, {
          [styles.active]: activeMenuItem === MENU_ITEMS.PENCIL,
        })}
        onClick={() => handleMenuClick(MENU_ITEMS.PENCIL)}
        >
        <FontAwesomeIcon icon={faPencil} className={styles.icon} />
      </div>
      <div
        className={cx(styles.iconWrapper, {
          [styles.active]: activeMenuItem === MENU_ITEMS.RECT,
        })}
        onClick={() => handleMenuClick(MENU_ITEMS.RECT)}
        >
        <FontAwesomeIcon icon={faSquare} className={styles.icon} />
      </div>
      <div
        className={cx(styles.iconWrapper, {
          [styles.active]: activeMenuItem === MENU_ITEMS.ERASER,
        })}
        onClick={() => handleMenuClick(MENU_ITEMS.ERASER)}
      >
        <FontAwesomeIcon icon={faEraser} className={styles.icon} />
      </div>
      <div
        className={cx(styles.iconWrapper, {
          [styles.active]: activeMenuItem === MENU_ITEMS.UNDO,
        })}
        onClick={() => handleActioItemClick(MENU_ITEMS.UNDO)}
        >
        <FontAwesomeIcon icon={faRotateLeft} className={styles.icon} />
      </div>
      <div
        className={cx(styles.iconWrapper, {
          [styles.active]: activeMenuItem === MENU_ITEMS.REDO,
        })}
        onClick={() => handleActioItemClick(MENU_ITEMS.REDO)}
        >
        <FontAwesomeIcon icon={faRotateRight} className={styles.icon} />
      </div>
      <div
        className={cx(styles.iconWrapper, {
          [styles.active]: activeMenuItem === MENU_ITEMS.DOWNLOAD,
        })}
        onClick={() => handleActioItemClick(MENU_ITEMS.DOWNLOAD)}
        >
        <FontAwesomeIcon icon={faFileArrowDown} className={styles.icon} />
      </div>
      <div className={`${styles.iconWrapper} flex-col gap-4 `} onClick={handleShare} >
        <FontAwesomeIcon icon={faShareNodes} className={styles.icon} />
      </div>
    </div>

    {isShare && (
          <div className={styles.main} ref={menuRef} >
            <Sharebtn roomid={roomId} />
          </div>
        )}
    </div>
  );
};

export default Menu;
