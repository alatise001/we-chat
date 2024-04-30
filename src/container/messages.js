import React from 'react'
import Message from '../component/message'
import { ChatContext } from '../context/chatContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../utility/firebase'

function Messages() {

    const { data } = React.useContext(ChatContext)
    const [messages, setMessage] = React.useState([])

    React.useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", data.chatId), doc => {
            doc.exists() && setMessage(doc.data().messages)
        })

        return () => {
            unSub()
        }
    }, [data.chatId])
    return (
        <div className='messages'>
            {
                messages?.map((map, index) => (
                    <Message key={index} map={map} id={data.userDetails.uid} />
                ))
            }
        </div>
    )
}

export default Messages