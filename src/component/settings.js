import React from 'react'
import { ThemeContext } from "../context/themeContext";

function Settings() {
    const { themes, setTheme } = React.useContext(ThemeContext)
    const { themes: theme } = React.useContext(ThemeContext)

    const back = () => {
        console.log("clicked");
        if (theme.theme === "dark") {
            return {
                backgroundColor: "#111111",
                color: "white"

            };
        } else if (theme.theme === "light") {
            return {
                backgroundColor: "#fff",
                color: "black",
                border: ".09rem solid rgba(0, 0, 0, 0.8)",
                borderLeft: "none",
                borderRight: "none"
            };
        } else {
            return
        }
    };


    function handlechg(e) {
        // console.log(e.target);
        const { name, value, checked, type } = e.target;
        setTheme((prevState) => {
            return {
                ...prevState,
                [name]: type === "checkbox" ? checked : value,
            };
        });
    }

    console.log(themes);

    return (
        <div className='settings' style={back()}>

            <div className='settingsField'>
                <h2 className='settingsTitle'>App Theme</h2>

                <fieldset className='field' style={back()}>

                    <div className='fieldInput'>
                        <input
                            className="radioInput"
                            type="radio"
                            id="default"
                            name="theme"
                            onChange={handlechg}
                            checked={themes.theme === "default"}
                            value="default"
                        />
                        <label htmlFor="default">Default</label>
                    </div>
                    <br />

                    <div className='fieldInput'>
                        <input
                            className="radioInput"
                            type="radio"
                            id="light"
                            name="theme"
                            onChange={handlechg}
                            checked={themes.theme === "light"}
                            value="light"
                        />
                        <label htmlFor="light">Light</label>
                    </div>
                    <br />

                    <div className='fieldInput'>
                        <input
                            className="radioInput"
                            type="radio"
                            id="dark"
                            name="theme"
                            onChange={handlechg}
                            checked={themes.theme === "dark"}
                            value="dark"
                        />
                        <label htmlFor="Dark">Dark</label>
                    </div>
                </fieldset>
            </div>

            <div className=' settingsInput'>
                <h2 className='settingsTitle'>Font</h2>

                <div className='fontDiv' style={back()}>
                    <div className='fontInput'>
                        <label for="family">Family</label>
                        <select
                            name="family"
                            id="family"
                            value={themes.size}
                            onChange={handlechg}
                        >
                            <option value="any">Any Category</option>
                            <option value="9">General Knowledge</option>
                            <option value="10">Entertainment: Books</option>
                            <option value="11">Entertainment: Film</option>
                        </select>
                    </div>

                    <div className='fontInput' >
                        <label for="size">Size</label>
                        <select
                            name="size"
                            id="size"
                            value={themes.size}
                            onChange={handlechg}
                        >
                            <option value={themes.size}>{themes.size}</option>
                            <option value="small">Small</option>
                            <option value="normal">normal</option>
                            <option value="large">Large</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings