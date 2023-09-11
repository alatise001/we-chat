import React from 'react'
import Messages from './messages'
import InputContain from './inputContain'
import ChatHeader from '../component/chatHeader'

function Chats() {
    return (
        <div className='chats'>
            <ChatHeader />
            <Messages />
            <InputContain />
        </div>
    )
}

export default Chats