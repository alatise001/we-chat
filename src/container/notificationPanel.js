import React from 'react'
import { Link } from "react-router-dom";
import NotifyHeader from "../component/notifyHeader";
import SearchBar from '../component/searchBar';
import NotifyTab from "../component/notifyTab";
import { AuthContext } from "../context/authContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../utility/firebase";
import { ChatContext } from '../context/chatContext';
import loading from "../loading.svg"
import { formatDistance, subDays, format, formatDistanceToNow, getMinutes, getHours } from "date-fns";


function NotificationPanel() {

    const { dispatch } = React.useContext(ChatContext)
    const { isUser } = React.useContext(AuthContext)
    const [userChats, setUserChats] = React.useState([])

    React.useEffect(() => {
        const getUser = (params) => {
            const unsub = onSnapshot(doc(db, "userChats", isUser.uid), (doc) => {
                setUserChats(doc.data())
            })

            return () => {
                unsub()
            }
        }


        isUser.uid && getUser()
    }, [isUser.uid])

    function handleClick(params) {
        dispatch({ type: "setChat", details: params })
    }


    if (!isUser) return <img src={loading} alt="" />

    return (
        <div className="notePanel">
            <NotifyHeader />
            <SearchBar />
            {
                Object.entries(userChats)?.sort((a, b) => a[1].userDetails.date.toDate() - b[1].userDetails.date.toDate()).map(map => (
                    <div className="chatlist" onClick={() => handleClick(map[1].userDetails)}>

                        <Link className='links' to={`/${map[1].userDetails.displayName}`}>
                            <NotifyTab details={map[1]} />
                        </Link>

                        <small className={`time`}>{formatDistanceToNow
                            (map[1].userDetails.date.toDate(), {
                                includeSeconds: true,
                                addSuffix: true,
                                addPrefix: true
                            })}</small>

                    </div>
                ))
            }
            {/* <NotifyTab /> */}
        </div>
    )
}

export default NotificationPanel
