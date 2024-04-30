import React from 'react'
// import { ThemeContext } from "../context/themeContext";
import { AuthContext } from "../context/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
// import { EditText } from 'react-edit-text';
// import 'react-edit-text/dist/index.css';




function Profile() {

    const { isUser } = React.useContext(AuthContext)

    // const { themes: theme } = useContext(ThemeContext)

    // const back = () => {
    //     console.log("clicked");
    //     if (theme.theme === "dark") {
    //         return {
    //             backgroundColor: "#111111",
    //             color: "white",
    //             border: ".09rem solid rgba(255, 255, 255, 0.8)",
    //             borderLeft: "none",
    //             borderRight: "none"

    //         };
    //     } else if (theme.theme === "light") {
    //         return {
    //             backgroundColor: "#fff",
    //             color: "black",
    //             border: ".09rem solid rgba(0, 0, 0, 0.8)",
    //             borderLeft: "none",
    //             borderRight: "none"
    //         };
    //     } else {
    //         return
    //     }
    // };


    return (
        <div className='profile' >

            <div className='profileImgDiv'>
                <img className='profileImg' src={isUser.photoURL} alt="" />
            </div>

            <div className='profileInfo'>
                <div className='profileSection'>
                    <h2 className='title' >UserId</h2>
                    <div className='text-copy'>
                        <p>{isUser.uid}</p>
                        <FontAwesomeIcon onClick={() => { navigator.clipboard.writeText(isUser.uid) }} className="icon" icon={faCopy} />
                    </div>
                </div>

                <div className='profileSection'>
                    <h2 className='title'>Display Name</h2>
                    {/* <EditText
                        name='displayName'
                        className='text'
                        placeholder={userInfo.displayName}
                        // style={{ fontSize: '16px', border: '1px solid #ccc' }}
                        value={userInfo.displayName}
                        onChange={(e) => handleChange(e, setUserInfo)}
                        onSave={handleSave}
                        // editButtonProps={{ style: { marginLeft: '5px', width: 16 } }}
                        showEditButton
                    /> */}
                    <p className='text'>{isUser.displayName}</p>
                </div>

                <div className='profileSection'>
                    <h2 className='title'>Email</h2>
                    <p className='text'>{isUser.email}</p>
                </div>
            </div>
        </div>
    )
}

export default Profile