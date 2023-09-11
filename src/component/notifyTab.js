import React from "react";



function NotifyTab({ details }) {

  // const { dispatch } = React.useContext(ChatContext)
  // console.log(details);
  // function handleClick(params) {
  //   dispatch({ type: "setChat", details: params.userDetails })
  // }

  return (
    <div className="msgTab" >
      <img className="tabImg" src={details.userDetails.photoURL} alt="" />
      <div className="infoTab">
        <h2 className="userName">{details.userDetails.displayName}</h2>
        {/* <p className="recentmsg">{details.recentmeassgae ? details.recentmeassgae : ""}</p> */}
      </div>
    </div>
  );
}

export default NotifyTab;