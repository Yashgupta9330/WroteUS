import React, { useRef, useState } from "react";

const Message = ({ message, userid }) => {
  const { text } = message;
  const userName = message.user.userName;
console.log("name is", userName);
  const id = message.user.userId;
  console.log("entered in message component", id);
  console.log(userid);
  return (
    <div className="w-full flex flex-col justify-between " style={{alignItems: `${id === userid ? "end" : "start"}`}}>
      <span style={{fontSize: "15px"}} > {userName} </span>
      <span className="w-fit py-2 px-4 bg-[#bab2ff] rounded-lg " style={{fontSize: "18px"}} >
      {text}
      </span>
    </div>

  );
};

export default Message;
