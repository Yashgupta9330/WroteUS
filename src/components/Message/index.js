import React from 'react'

const Message = ({message,userid}) => {
    const {text}=message;
    const id=message.user.userId;
    console.log("entered in message component");
    console.log(id);
    console.log(userid);
  return (
    <div className='w-full'>
      {text}
    </div>
  )
}

export default Message