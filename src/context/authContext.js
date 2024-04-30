import React from "react"
import { auth } from "../utility/firebase"
import { onAuthStateChanged } from "firebase/auth"

export const AuthContext = React.createContext()


function AuthContextProvider({ children }) {

    const [isUser, setUser] = React.useState({})


    React.useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => {
            setUser(user)
        })

        return () => {
            unsub()
        }
    }, [])

    return (
        <AuthContext.Provider value={{ isUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider