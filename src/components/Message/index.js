import React from "react";

const Message = ({ message, userid }) => {
  const { text } = message;
  const userName = message.user.userName;
console.log("name is", userName);
  const id = message.user.userId;
  console.log("entered in message component", id);
  console.log(userid);
  return (
    <div className=" flex flex-col justify-between rounded-lg w-full " style={{alignItems: `${id === userid ? "end" : "start"}`}}>
      <span className="ml-1 mb-1" style={{fontSize: "14px"}} > {userName} </span>
      <span className="w-fit py-2 px-4 bg-[#bab2ff] rounded-lg " style={{fontSize: "20px"}} >
      {text}
      </span>
    </div>

  );
};

export default Message;
