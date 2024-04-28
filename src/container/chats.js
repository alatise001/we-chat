import React from 'react'
import Messages from './messages'
import InputContain from './inputContain'
import ChatHeader from '../component/chatHeader'
import { ChatContext } from "../context/chatContext";


function Chats() {

    const { data } = React.useContext(ChatContext)

    return (
        <div className='chats'>
            <ChatHeader />
            <Messages />
            <InputContain />
        </div>
    )
}

export default Chats