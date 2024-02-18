import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';

const Board = () => {
  const canvasRef=useRef(null);
  const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);

    useEffect(()=>{
        if(!canvasRef.current) return;
        const canvas=canvasRef.current;
        const context=canvas.getContext('2d');
        canvas.width=Window.innerWidth;
        canvas.height=window.innerHeight;
         
    },[]);
  return (
    <canvas ref={canvasRef}></canvas>
  )
}

export default Board