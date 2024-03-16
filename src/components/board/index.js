import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MENU_ITEMS } from "../constant";
import { actionItemClick } from "@/slice/menuSlice";
import { socket } from "@/socket";
import { menuItemClick } from "@/slice/menuSlice";
import roomSlice from "@/slice/roomSlice";
import { roomClick } from "@/slice/roomSlice";
import toast, { Toaster } from "react-hot-toast";

const Board = ({ user }) => {
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const { activeMenuItem, actionMenuItem } = useSelector((state) => state.menu);
  const { color, size } = useSelector((state) => state.toolbox[activeMenuItem]);
  const pressed = useRef(false);
  const drawHistory = useRef([]);
  const histPoint = useRef(0);
  const startX = useRef(null);
  const startY = useRef(null);
  const currX = useRef(null);
  const currY = useRef(null);
  const MAX_HISTORY_SIZE = 50;

  const { roomId, host } = user;
  const [room, setRoom] = useState(roomId);

  useEffect(() => {
    socket.on("userJoined", ({ userId, userName }) => {
      toast.success(`${userName} joined the Room`, {
        duration: 5000,
        style: {
          border: "1px solid black",
        },
      });
      console.log(`${userId} , ${userName} is joined`);
    });

    return toast.dismiss();
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (actionMenuItem === MENU_ITEMS.DOWNLOAD) {
      const URL = canvas.toDataURL();
      const anchor = document.createElement("a");
      anchor.href = URL;
      anchor.download = "canvas.jpg";
      anchor.click();
    } else if (
      actionMenuItem === MENU_ITEMS.UNDO ||
      actionMenuItem === MENU_ITEMS.REDO
    ) {
      if (histPoint.current > 0 && actionMenuItem === MENU_ITEMS.UNDO) {
        histPoint.current = histPoint.current - 1;
        const imageData = drawHistory.current[histPoint.current];
        context.putImageData(imageData, 0, 0);
      }
      if (
        histPoint.current < drawHistory.current.length - 1 &&
        actionMenuItem === MENU_ITEMS.REDO
      ) {
        histPoint.current = histPoint.current + 1;
        const imageData = drawHistory.current[histPoint.current];
        context.putImageData(imageData, 0, 0);
      }
      if (histPoint.current === 0 && actionMenuItem === MENU_ITEMS.UNDO) {
        context.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    const handleChangeactiveitem = (config) => {
      console.log(config.item);
      dispatch(menuItemClick(config.item));
    };

    const handleChangeactionitem = (config) => {
      console.log(config.item);
      dispatch(actionItemClick(config.item));
    };

    socket.on("changeactiveitem", handleChangeactiveitem);
    socket.on("changeactionitem", handleChangeactionitem);
    dispatch(actionItemClick(null));
    return () => {
      socket.off("changeactiveitem", handleChangeactiveitem);
      socket.off("changeactionitem", handleChangeactionitem);
    };
  }, [actionMenuItem, dispatch]);

  useLayoutEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const imageData = drawHistory.current[histPoint.current];
    if (imageData) context.putImageData(imageData, 0, 0); 

    const beginPath = (x, y) => {
      startX.current = x;
      startY.current = y;
      context.beginPath();
      context.moveTo(x, y);
    };

    const drawPath = (x, y) => {
      context.lineTo(x, y);
      context.stroke();
    };

    const handleMouseDown = (e) => {
      pressed.current = true;
      beginPath(e.clientX, e.clientY);
      socket.emit("beginPath", { x: e.clientX, y: e.clientY, room });
    };

    const handleMouseMove = (e) => {
      if (!pressed.current) return;
      drawPath(e.clientX, e.clientY);
      socket.emit("drawPath", { x: e.clientX, y: e.clientY, room });
    };

    const handleMouseUp = (e) => {
      pressed.current = false;
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      drawHistory.current.push(imageData);
      histPoint.current = drawHistory.current.length - 1;
      console.log("emitting",imageData,room);
      socket.emit("pointer" , {room} );
      console.log(drawHistory);
    };

    const handleBeginPath = ({ x, y }) => {
      beginPath(x, y);
    };

    const handleDrawLine = ({ x, y }) => {
      drawPath(x, y);
    };

    const handlepointer = () => {
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    
      // Downsample image data if needed
      // const downsampledImageData = downsampleImageData(imageData);
    
      // Limit history size
      if (drawHistory.current.length >= MAX_HISTORY_SIZE) {
        drawHistory.current.shift(); // Remove oldest entry
      }
    
      drawHistory.current.push(imageData);
      histPoint.current = drawHistory.current.length - 1;
      console.log("emitting done");
      console.log(drawHistory)
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    socket.on("pointer",handlepointer);
    socket.on("beginPath", handleBeginPath);
    socket.on("drawPath", handleDrawLine);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
      socket.off("pointer",handlepointer);
      socket.off("beginPath", handleBeginPath);
      socket.off("drawPath", handleDrawLine);
    };
  }, [activeMenuItem, dispatch]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const changeConfig = (color, size) => {
      context.strokeStyle = color;
      context.lineWidth = size;
    };

    const handleChangeConfig = (config) => {
      console.log("config", config);
      changeConfig(config.color, config.size);
    };
    changeConfig(color, size);
    socket.on("changeConfig", handleChangeConfig);

    return () => {
      socket.off("changeConfig", handleChangeConfig);
    };
  }, [color, size]);

  return (
    <>
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      <canvas ref={canvasRef}></canvas>
    </>
  );
};

export default Board;
