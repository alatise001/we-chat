import React from 'react'
import { formatDistance, subDays, format, formatDistanceToNow, getMinutes, getHours } from "date-fns";

function Message({ map, id }) {
    const ref = React.useRef()

    React.useEffect(() => {
        ref.current.scrollIntoView({ behavior: "smooth" })
    }, { map })

    // const { formatRelative } = require("date-fns");

    // console.log(formatDistance(map.date.toDate(), new Date.now().));
    // console.log(
    //     formatDistanceToNow
    //         (map.date.toDate(), {
    //             includeSeconds: true,
    //             addSuffix: true,
    //             addPrefix: true
    //         })
    // );

    // console.log(
    //     formatRelative(subDays(map.date.toDate(), 6), new Date())
    // );

    // console.log(
    //     `${getHours(map.date.toDate())}:${getMinutes(map.date.toDate())}`
    // );

    return (
        <div ref={ref} style={{ scrollBehavior: "smooth" }} className={`${map.senderId === id ? "message-div" : "message-sent-div"} message`}>

            {/* {map.text ? <p className={`msg-phg ${map.senderId === id ? "" : "msg-phg-sent-div"}`}>{` ${map.senderId === id ? ">" : ""} ${map.text} ${map.senderId !== id ? "<" : ""}`}</p> : <img className='msg-img' src={map.image} alt="" />} */}
            {map.text ? <p className={`msg-phg ${map.senderId === id ? "" : "msg-phg-sent-div"}`}>{`${map.text}`}</p> : <img className='msg-img' src={map.image} alt="" />}

            {/* <small className={`time ${map.senderId === id ? "" : "time-sent-div"}`}>{formatDistanceToNow
                (map.date.toDate(), {
                    includeSeconds: true,
                    addSuffix: true,
                    addPrefix: true
                })}</small> */}
        </div>
    )
}

export default Message