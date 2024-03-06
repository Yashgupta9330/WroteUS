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
  faShapes,
  faPenNib,
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

const Menu = ({ user }) => {
  const dispatch = useDispatch();
  const { roomId } = user;
  const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
  /* const roomno = useSelector((state) => state.room.roomno) || '';
    console.log(roomno,"at menubar") */
  const [shapeToggle, setShapeToggle] = useState(false);
  const menuRef = useRef(null);
  const shapeRef = useRef(null);
  const [lastMenuItem, setLastMenuItem] = useState('PENCIL');

  const [isShare, setIsShare] = useState(false);
  const handleShare = () => {
    setIsShare((prev) => !prev);
  };

  const handleOutsideClick = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setIsShare((prev) => !prev);
    }
    if (shapeRef.current && !shapeRef.current.contains(e.target)) {
      setShapeToggle((prev) => !prev);
      dispatch(menuItemClick(lastMenuItem));
      console.log(lastMenuItem);
      socket.emit("changeactiveitem", { item: lastMenuItem });
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleMenuClick = (itemName) => {
    dispatch(menuItemClick(itemName));
    setLastMenuItem(itemName);
    console.log(lastMenuItem);
    socket.emit("changeactiveitem", { item: itemName });
    console.log(itemName);
  };

  const handleActioItemClick = (itemName) => {
    dispatch(actionItemClick(itemName));
    socket.emit("changeactionitem", { item: itemName });
    console.log(itemName);
  };

  const handleShapeToggle = () => {
    setShapeToggle((prev) => !prev);
  };

  return (
    <div className="">
      <div className={styles.menuContainer}>
        <div
          className={cx(styles.iconWrapper, {
            [styles.active]: activeMenuItem === MENU_ITEMS.PENCIL,
          })}
          onClick={() => handleMenuClick(MENU_ITEMS.PENCIL)}
          title="Pencil"
        >
          <FontAwesomeIcon icon={faPencil} className={styles.icon} />
        </div>
        {/* <div
          className={`${styles.iconWrapper} flex-col gap-4 `}
          onClick={handleShapeToggle}
          title="Shapes"
        >

          <FontAwesomeIcon icon={faShapes} className={styles.icon} />
        </div> */}
        <div
            className={cx(styles.iconWrapper, {
              [styles.active]: activeMenuItem === MENU_ITEMS.RECT,
            })}
            onClick={() => handleMenuClick(MENU_ITEMS.RECT)}
            title="Square"
          >
            <FontAwesomeIcon icon={faSquare} className={styles.icon} />
          </div>
        <div
          className={cx(styles.iconWrapper, {
            [styles.active]: activeMenuItem === MENU_ITEMS.ERASER,
          })}
          onClick={() => handleMenuClick(MENU_ITEMS.ERASER)}

          title="Erase"
        >
          <FontAwesomeIcon icon={faEraser} className={styles.icon} />
        </div>
        <div
          className={cx(styles.iconWrapper, {
            [styles.active]: activeMenuItem === MENU_ITEMS.UNDO,
          })}
          onClick={() => handleActioItemClick(MENU_ITEMS.UNDO)}
          title="Undo"
        >
          <FontAwesomeIcon icon={faRotateLeft} className={styles.icon} />
        </div>
        <div
          className={cx(styles.iconWrapper, {
            [styles.active]: activeMenuItem === MENU_ITEMS.REDO,
          })}
          onClick={() => handleActioItemClick(MENU_ITEMS.REDO)}
          title="Redo"
        >
          <FontAwesomeIcon icon={faRotateRight} className={styles.icon} />
        </div>
        <div
          className={cx(styles.iconWrapper, {
            [styles.active]: activeMenuItem === MENU_ITEMS.DOWNLOAD,
          })}
          onClick={() => handleActioItemClick(MENU_ITEMS.DOWNLOAD)}
          title="Download Canvas"
        >
          <FontAwesomeIcon icon={faFileArrowDown} className={styles.icon} />
        </div>
        <div
          className={`${styles.iconWrapper} flex-col gap-4 `}
          onClick={handleShare}
          title="Share Room"
        >
          <FontAwesomeIcon icon={faShareNodes} className={styles.icon} />
        </div>
      </div>

      {/* {shapeToggle && (
        <div className={styles.shapeContainer} ref={shapeRef}>
          <div
            className={cx(styles.iconWrapper, {
              [styles.active]: activeMenuItem === MENU_ITEMS.LINE,
            })}
            onClick={() => handleMenuClick(MENU_ITEMS.LINE)}
            title="Line"
          >
            <FontAwesomeIcon icon={faPenNib} className={styles.icon} />
          </div>
          <div
            className={cx(styles.iconWrapper, {
              [styles.active]: activeMenuItem === MENU_ITEMS.RECT,
            })}
            onClick={() => handleMenuClick(MENU_ITEMS.RECT)}
            title="Square"
          >
            <FontAwesomeIcon icon={faSquare} className={styles.icon} />
          </div>
        </div>
      )} */}

      {isShare && (
        <div className={styles.main} ref={menuRef}>
          <Sharebtn roomid={roomId} />
        </div>
      )}
    </div>
  );
};

export default Menu;
