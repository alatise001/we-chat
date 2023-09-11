import React from 'react'
import { collection, query, where, getDocs, setDoc, getDoc, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from '../utility/firebase';

import { AuthContext } from '../context/authContext';


function SearchBar() {
    const { isUser } = React.useContext(AuthContext)
    const [isUsername, setIsUsername] = React.useState("")
    const [isChatUser, setIsUser] = React.useState(null)
    const [isErr, setIsErr] = React.useState("")

    const search = async () => {
        const q = query(collection(db, "users"),
            where("displayName", "==", isUsername));

        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
                console.log(doc.data());
                setIsUser(doc.data())
            });
        } catch (error) {
            setIsErr(error)
        }
    }

    function handleChg(e) {
        setIsUsername(e.target.value)
        // const { name, value, checked, type } = e.target;
        // setIsUsername((prevState) => {
        //     prevState == value
        // });
    }

    const handleKey = (e) => {
        e.code === "Enter" && search()
    }

    const handleClick = async () => {
        const chatId = `${isChatUser.userid + isUser.uid}`
        console.log(isChatUser.userid);
        console.log(chatId);

        try {
            const res = await getDoc(doc(db, "chats", chatId))

            if (!res.exists()) {
                await setDoc(doc(db, "chats", chatId), { messages: [] })

                await updateDoc(doc(db, "userChats", isChatUser.userid), {
                    [chatId + ".userDetails"]: {
                        uid: isUser.uid,
                        displayName: isUser.displayName,
                        photoURL: isUser.photoURL,
                        date: serverTimestamp()
                    },
                    // [chatId + ".date"]: serverTimestamp()
                })


                await updateDoc(doc(db, "userChats", isUser.uid), {
                    [chatId + ".userDetails"]: {
                        uid: isChatUser.userid,
                        displayName: isChatUser.displayName,
                        photoURL: isChatUser.photoURL,
                        date: serverTimestamp()
                    },
                    // [chatId + ".date"]: serverTimestamp()
                })
            }
        } catch (e) {
            setIsErr(e)
        }

        setIsUser(null)
        setIsUsername("")
        console.log(isErr);
    }

    return (
        <div>
            <div className='scrBar'>
                <input className='scrInput' type="search" name="search" onKeyDown={handleKey} onChange={handleChg} placeholder='Find a friend' />
            </div>

            {isErr && <p>User not found</p>}

            {
                isChatUser &&
                <div className="msgTab" onClick={() => handleClick}>
                    <img className="tabImg" src={isChatUser.photoURL} alt="" />
                    <div className="infoTab">
                        <h2 className="userName">{isChatUser.displayName}</h2>
                    </div>
                </div>
            }
        </div>
    )
}

export default SearchBar