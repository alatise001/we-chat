function NotifyTab({ details }) {

  return (
    <div className="msgTab" >
      <img className="tabImg" src={details.userDetails.photoURL} alt="" />
      <div className="infoTab">
        <h2 className="userName" >{details.userDetails.displayName}</h2>
        <p className="recentmsg">{details.userDetails.lastMessage ? details.userDetails.lastMessage : ""}</p>
      </div>
    </div>
  );
}

export default NotifyTab;