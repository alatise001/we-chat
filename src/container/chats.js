import React from 'react'
import Messages from './messages'
import InputContain from './inputContain'
import ChatHeader from '../component/chatHeader'
import loading from "../loading.svg"
import { ChatContext } from "../context/chatContext";



function Chats() {

    const { data } = React.useContext(ChatContext)
    console.log(data.length);
    if (data.length === 0) return (<div className="container">
        <h2>
            Select a Chat
        </h2>
    </div>)

    return (
        <div className='chats'>
            <ChatHeader />
            <Messages />
            <InputContain />
        </div>
    )
}

export default Chats