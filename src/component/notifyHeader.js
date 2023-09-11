import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utility/firebase";

function NotifyHeader() {
  return (
    <header className="noteHeader">
      {/* <img className="headImg" src="./images/1.jpg" alt="" /> */}
      <h2 className="noteHead">Chats</h2>
      <button className="logoutBtn" onClick={() => { signOut(auth) }}>Logout</button>
    </header>
  );
}

export default NotifyHeader;
