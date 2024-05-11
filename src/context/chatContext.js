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
                    // chatId: isUser.uid > action.details.uid ? isUser.uid + action.details.uid : action.details.uid + isUser.uid,
                    // chatId: `${action.details.uid + isUser.uid}`
                    chatId: isUser.uid > action.details.uid
                        ? isUser.uid + action.details.uid
                        : action.details.uid + isUser.uid
                }

            case "clearChart":
                return clearChart()

            default:
                return state
        }

    }

    function clearChart(action, state) {
        return []
    }

    const localState = JSON.parse(localStorage.getItem("chat"));

    const [chat, dispatch] = useReducer(selectChat, localState || [])

    React.useEffect(() => {
        localStorage.setItem("chat", JSON.stringify(chat));
    }, [chat]);

    return (

        < ChatContext.Provider value={{ data: chat, dispatch }
        }>
            {children}
        </ChatContext.Provider >
    )
}

export default ChatContextProvider