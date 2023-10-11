import React, { useContext } from 'react'
import InputField from '../component/inputField'
// import { ThemeContext } from "../context/themeContext";


function InputContain() {
    // const { themes: theme } = useContext(ThemeContext)

    // const back = () => {
    //     console.log("clicked");
    //     if (theme.theme === "dark") {
    //         return {
    //             backgroundColor: "#111111",
    //             color: "white"

    //         };
    //     } else if (theme.theme === "light") {
    //         return {
    //             backgroundColor: "#fff",
    //             color: "black"

    //         };
    //     } else {
    //         return
    //     }
    // };

    return (
        <div className='input-div'>
            <InputField />
        </div>
    )
}

export default InputContain