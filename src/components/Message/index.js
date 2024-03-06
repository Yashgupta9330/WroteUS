import React from 'react'

const Message = ({message,userId}) => {
    const {text}=message;
    const id=message.user.userId;
    console.log("entered in message component");
    console.log(id);
  return (
    <div className='w-full'>
      {text}
    </div>
  )
}

export default Message