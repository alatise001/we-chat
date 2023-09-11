import React from 'react'
import { Link } from "react-router-dom";
import NotifyHeader from "../component/notifyHeader";
import SearchBar from '../component/searchBar';
import NotifyTab from "../component/notifyTab";
import { AuthContext } from "../context/authContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../utility/firebase";
import { ChatContext } from '../context/chatContext';

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

    console.log(Object.entries(userChats));

    function handleClick(params) {
        dispatch({ type: "setChat", details: params })
    }


    return (
        <div className="notePanel">
            <NotifyHeader />
            <SearchBar />
            {
                Object.entries(userChats)?.map(map => (
                    <div className="chatlist" onClick={() => handleClick(map[1].userDetails)}>

                        <Link to="/:id">
                            <NotifyTab details={map[1]} />
                        </Link>

                    </div>
                ))
            }
            {/* <NotifyTab /> */}
        </div>
    )
}

export default NotificationPanel
