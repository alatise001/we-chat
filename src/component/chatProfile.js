import React, { useContext } from 'react'
// import { ThemeContext } from "../context/themeContext";
import { ChatContext } from '../context/chatContext';

// import { ChatContext } from '../context/chatContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
// import { EditText } from 'react-edit-text';
// import 'react-edit-text/dist/index.css';




function ChatProfile() {

    const { data } = React.useContext(ChatContext)
    console.log(data);


    // const { data } = useContext(ChatContext)
    // console.log(data);

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
                <img className='profileImg' src={data.userDetails.photoURL} alt="" />
            </div>

            <div className='profileInfo'>
                <div className='profileSection'>
                    <h2 className='title' >UserId</h2>
                    <div className='text-copy'>
                        <p>{data.userDetails.uid}</p>
                        <FontAwesomeIcon onClick={() => { navigator.clipboard.writeText(data.userDetails.uid) }} className="icon" icon={faCopy} />
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
                    <p className='text'>{data.userDetails.displayName}</p>
                </div>

                {/* <div className='profileSection' style={back()}>
                    <h2 className='title'>Email</h2>
                    <p className='text'>{data.userDetails.email}</p>
                </div> */}
            </div>
        </div>
    )
}

export default ChatProfile
