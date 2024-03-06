import React from 'react'

const Message = ({message,userId}) => {
    const {text}=message;
    console.log("entered in message component");
  return (
    <div className='w-full'>
      {text}
    </div>
  )
}

export default Message