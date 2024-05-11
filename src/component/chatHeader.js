import React, { useContext } from "react";
// import { ThemeContext } from "../context/themeContext";
import { ChatContext } from "../context/chatContext";
import { Link } from "react-router-dom";


function ChatHeader() {
  const { data } = React.useContext(ChatContext)
  // const { themes: theme } = useContext(ThemeContext)


  // console.log(data);

  // const back = () => {
  //   console.log("clicked");
  //   if (theme.theme === "dark") {
  //     return {
  //       backgroundColor: "#111111",
  //       color: "white"

  //     };
  //   } else if (theme.theme === "light") {
  //     return {
  //       backgroundColor: "#fff",
  //       color: "black"

  //     };
  //   } else {
  //     return
  //   }
  // };
  // console.log(data.userDetails.photoURL);


  return (
    <header className="chatHeader">
      <Link className="links" to={`/${data.userDetails.displayName}` + " profile"}>
        <div className="chatUserInfo">
          <img className="headImgchat" defaultValue="/images/user.png" src={data.userDetails.photoURL ? data.userDetails.photoURL : "/images/user.png"} alt="" />
          <h1 className="chatUserName">{data.userDetails.displayName}</h1>
        </div>
      </Link>

      <div className="chatHeaderIcons">
        {/* fix */}
        {/* <FontAwesomeIcon className="icon" icon={faUser} /> */}
        {/* <FontAwesomeIcon className="icon" icon={faEllipsis} /> */}
      </div>
    </header>
  );
}

export default ChatHeader;
