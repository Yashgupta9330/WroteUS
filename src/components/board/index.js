import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { MENU_ITEMS } from '../constant';
import { actionItemClick } from '@/slice/menuSlice';

const Board = () => {
  const dispatch = useDispatch();
  const canvasRef=useRef(null);
  const {activeMenuItem, actionMenuItem} = useSelector((state) => state.menu);
  const {color, size} = useSelector((state)=> state.toolbox[activeMenuItem] )
  const pressed = useRef(false);

  useEffect(()=>{
    if(!canvasRef.current) return;
    const canvas=canvasRef.current;
    const context=canvas.getContext('2d');
    if(actionMenuItem===MENU_ITEMS.DOWNLOAD){
      const URL = canvas.toDataURL();
      const anchor = document.createElement('a');
      anchor.href = URL;
      anchor.download = 'image.jpg';
      anchor.click();
      // console.log(URL);
    }
    
    dispatch(actionItemClick(null))

  },[actionMenuItem, dispatch])

    useLayoutEffect(()=>{
      if(!canvasRef.current) return;
      const canvas=canvasRef.current;
      const context=canvas.getContext('2d');
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width=width;
      canvas.height=height;

      const beginPath = (x, y) => {
        context.beginPath();
        context.moveTo(x, y);
      }
      const drawPath = (x, y) => {
        context.lineTo(x, y);
        context.stroke();
      }

      const handleMouseDown = (e) => {
        pressed.current = true;
        // console.log(e.clientX, e.clientY);
        beginPath(e.clientX, e.clientY)
      }
      const handleMouseMove = (e) => {
        if(!pressed.current) return;

        drawPath(e.clientX, e.clientY)
      }
      
      const handleMouseUp = (e) => {
        pressed.current = false;
        
      }

      canvas.addEventListener('mousedown', handleMouseDown)
      canvas.addEventListener('mousemove', handleMouseMove)
      canvas.addEventListener('mouseup', handleMouseUp)
      
        return () => {
          canvas.removeEventListener('mousedown', handleMouseDown)
          canvas.removeEventListener('mousemove', handleMouseMove)
          canvas.removeEventListener('mouseup', handleMouseUp)

        }
      },[]);

      useEffect(()=>{
        if(!canvasRef.current) return;
        const canvas=canvasRef.current;
        const context=canvas.getContext('2d');
  
        const changeConfig = () => {
          context.strokeStyle = color;
          context.lineWidth = size;
        }
        changeConfig();
  
        // context.moveTo(0, 0);
        // // context.lineTo(e.clientX, e.clientY);
        // context.lineTo(100, 100);
        // context.stroke();
        // console.log("useeffect1");
      },[color, size]);


      return (
     <canvas ref={canvasRef} ></canvas>
  )
}

export default Board