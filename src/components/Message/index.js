import React, { useRef, useState } from "react";

const Message = ({ message, userid }) => {
  const { text } = message;
  const id = message.user.userId;
  console.log("entered in message component", id);
  console.log(userid);
  return (
    <div className="w-full m-2 " style={{textAlign: `${id === userid ? "right" : "left"}`}}>
      <span className="w-fit p-[10px] bg-[#bab2ff] rounded-lg ">
      {text}
      </span>
    </div>

  );
};

export default Message;
