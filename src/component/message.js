import React from 'react'

function Message({ map, id }) {

    console.log(map);

    return (
        <div style={{ scrollBehavior: "smooth" }} className={`${map.senderId === id ? "message-div" : "message-sent-div"} message`}>

            {map.text ? <p className='msg-phg'>{map.text}</p> : <img className='msg-img' src={map.image} alt="" />}

            {/* <small>{map.date.ti}</small> */}
        </div>
    )
}

export default Message