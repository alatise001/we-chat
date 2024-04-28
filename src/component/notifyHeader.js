import React from "react";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { faMoon } from "@fortawesome/free-solid-svg-icons";

import { auth } from "../utility/firebase";
import { ThemeContext } from "../context/themeContext";


function NotifyHeader() {

  const { themes, setTheme } = React.useContext(ThemeContext)
  console.log(themes);


  function handlechg(e) {
    setTheme((prevState) => prevState === "light" ? "dark" : "light");
    console.log(themes);
  }




  return (
    <header className="noteHeader">
      {/* <img className="headImg" src="./images/1.jpg" alt="" /> */}
      <h2 className="noteHead">Chats</h2>

      <div className="headIcon">
        <Link className="links" to="/profile">
          <FontAwesomeIcon className="icon" icon={faUser} />
        </Link>

        <FontAwesomeIcon className="icon" icon={themes === "light" ? faMoon : faSun} onClick={() => handlechg()} />
        {/* <FontAwesomeIcon className="icon" icon="fa-duotone fa-sun" /> */}


        {/* <Link className="links" to="/settings">
          <FontAwesomeIcon className="icon" icon={faGear} />
        </Link> */}

        <Link className="links" to="/login">
          <button className="logoutBtn" onClick={() => { signOut(auth) }}>Logout</button>
        </Link>
      </div>

    </header>
  );
}

export default NotifyHeader;
