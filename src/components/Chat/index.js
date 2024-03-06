import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { socket } from '@/socket';
import Message from '../Message';


const Chat = ({user}) => {
 const [message,setMessage]=useState('');
 const [allchats, setAllchats] = useState([]);

 const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };
  console.log("checking");
  console.log(user);
  const roomchats=(e)=>{
    const {userName}=user;
    const newMessage = {
        user: user,
        text: message,
        timestamp: new Date(),
        roomId: user.roomId, 
        userName:userName,
      };
    setMessage('');
    console.log(newMessage);
    socket.emit('roomMessage',newMessage);
  }

  useEffect(() => {
    socket.on("chats", (data) => {
        setAllchats(data); // Corrected function name
        console.log("entering room message");
        console.log(data);
    });
  }, []);

  return (
    <div className='absolute left-[70%] w-[300px] top-32 border-2 border-black h-[550px]'>
      <div className='flex flex-col justify-center items-center h-full'>
        <div className='flex flex-col w-full gap-2 bg-black text-black h-[500px]  px-2 py-2'>
        {
            allchats.map((message)=>{
                const {userId}=user;
                console.log("sending data");
                console.log(message);
                console.log(userId);
                return <Message key={message.timestamp} message={message} userid={userId} />
         })
        }
        </div>
        <div className='w-full'>
          <label htmlFor='chatInput' className='sr-only'>
            Type your message:
          </label>
          <div className='flex'>
            <input
              type='text'
              id='chatInput'
              className='m-2 p-2 border-2 border-black rounded-md w-full'
              placeholder='Type your message...'
              onChange={handleMessageChange}
              value={message}
            />
            <div className='flex justify-center items-center my-2 mr-2 cursor-pointer h-[50px]' onClick={roomchats} >
            <FontAwesomeIcon icon={faPaperPlane} className='h-[30px]' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
