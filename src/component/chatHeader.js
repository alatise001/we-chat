import React from "react";
import { ChatContext } from "../context/chatContext";


function ChatHeader() {
  const { data } = React.useContext(ChatContext)

  console.log(data);


  return (
    <header className="chatHeader">
      <div className="chatUserInfo">
        <img className="headImgchat" src={data.userDetails.photoURL} alt="" />
        <h1 className="chatUserName">{data.userDetails.displayName}</h1>
      </div>

      <div className="chatHeaderIcons">
        <h1>📽️</h1>
        <h1>🪪</h1>
        <h1>🟰</h1>
      </div>
    </header>
  );
}

export default ChatHeader;
