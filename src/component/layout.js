import React from 'react'


export const ThemeContext = React.createContext()

function Layout() {

    const [theme, setTheme] = React.useState("light")
    return (
        <ThemeContext value={{ setTheme, theme }}>

            <div>Layout</div>
        </ThemeContext>
    )
}

export default Layout