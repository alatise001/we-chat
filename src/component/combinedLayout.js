import React from 'react'
import { Navigate, Route, Routes, } from "react-router-dom";
import Chats from '../container/chats';
import NotificationPanel from '../container/notificationPanel';


export default function CombinedLayout() {
    return (
        <div className='combined'>
            <div>
                <NotificationPanel />

            </div>
            <div>
                <Chats />

            </div>
        </div>
    )
}
