import React from "react";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";

import { auth } from "../utility/firebase";

function NotifyHeader() {
  return (
    <header className="noteHeader">
      {/* <img className="headImg" src="./images/1.jpg" alt="" /> */}
      <h2 className="noteHead">Chats</h2>

      <div className="headIcon">
        <Link className="links" to="/profile">
          <FontAwesomeIcon className="icon" icon={faUser} />
        </Link>

        <Link className="links" to="/settings">
          <FontAwesomeIcon className="icon" icon={faGear} />
        </Link>

        <button className="logoutBtn" onClick={() => { signOut(auth) }}>Logout</button>
      </div>

    </header>
  );
}

export default NotifyHeader;
