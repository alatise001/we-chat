import React from "react"


export const ThemeContext = React.createContext()

function ThemeContextProvider({ children }) {

    const localState = JSON.parse(localStorage.getItem("themes"));

    const [themes, setTheme] = React.useState({
        theme: "default"
    })

    React.useEffect(() => {
        localStorage.setItem("themes", JSON.stringify(themes));
    }, [themes]);

    return (

        < ThemeContext.Provider value={{ themes, setTheme }}>
            {children}
        </ThemeContext.Provider >
    )
}

export default ThemeContextProvider