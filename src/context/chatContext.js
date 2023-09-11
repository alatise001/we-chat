import React, { useReducer } from "react"
import { AuthContext } from "./authContext"

export const ChatContext = React.createContext()


function ChatContextProvider({ children }) {

    const { isUser } = React.useContext(AuthContext)

    function selectChat(state, action) {
        switch (action.type) {
            case "setChat":
                return {
                    userDetails: action.details,
                    chatId: `${action.details.uid + isUser.uid}`
                }

            default:
                return state
        }

    }
    const [chat, dispatch] = useReducer(selectChat, {})

    return (

        < ChatContext.Provider value={{ data: chat, dispatch }
        }>
            {children}
        </ChatContext.Provider >
    )
}

export default ChatContextProvider