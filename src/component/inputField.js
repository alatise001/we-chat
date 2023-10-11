import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { Timestamp, doc, updateDoc, arrayUnion, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../utility/firebase";
import { ChatContext } from '../context/chatContext';
import { AuthContext } from "../context/authContext";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";


function InputField() {

  const { data } = React.useContext(ChatContext)
  console.log(data);
  const { isUser } = React.useContext(AuthContext)

  const [formData, setFormData] = React.useState({
    message: "",
    image: null,
    document: null
  });


  function handlechg(e) {
    console.log(e.target);
    // console.log(e.target);
    const { name, value, type } = e.target;
    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: type === "file" ? e.target.files[0] : value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(e.target);
    console.log(formData.image);

    if (formData.image) {
      try {
        const storageRef = ref(storage, `img ${Date.now()}`);

        await uploadBytesResumable(storageRef, formData.image).then(() => {

          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                  // text: formData.message,
                  senderId: isUser.uid,
                  date: Timestamp.now(),
                  image: downloadURL
                })
              });

            } catch (error) {
              // setLoginError(error)
            }
          })
        }
        )
      } catch (e) {
      }

    } else if (formData.message) {
      try {
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            text: formData.message,
            senderId: isUser.uid,
            date: Timestamp.now()
          })
        });
      } catch (error) {

      }
    } else {
      try {
        const storageRef = ref(storage, `doc ${Date.now()}`);

        await uploadBytesResumable(storageRef, formData.document).then(() => {

          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                  // text: formData.message,
                  senderId: isUser.uid,
                  date: Timestamp.now(),
                  document: downloadURL
                })
              });

            } catch (error) {
              // setLoginError(error)
            }
          })
        }
        )
      } catch (error) {

      }

    }

    // await updateDoc(doc(db, "userChats", data.userDetails.uid), {
    //   [data.chatId + ".userDetails"]: {
    //     lastMessage: formData.message,
    //     date: serverTimestamp()
    //   },
    // })


    // await updateDoc(doc(db, "userChats", isUser.uid), {
    //   [data.chatId + ".userDetails"]: {
    //     lastMessage: formData.message,
    //     date: serverTimestamp()
    //   },
    // })

    setFormData(prev => {
      return {
        ...prev,
        message: "",
        image: null,
        document: null
      }
    })

    // image = null
    // document = null
  }

  console.log(formData);

  return (

    <form className="form-div" onSubmit={handleSubmit}>
      <div className="textarea-div">
        <textarea name="message" className="textarea" placeholder="Type a message" onChange={handlechg} value={formData.message} />

        {/* <input
          className="input"
          type="text"
          name="message"
          placeholder="Type a message"
          onChange={handlechg}
          // onBlur={handleBlur}
          value={formData.message}
        /> */}
      </div>


      <div className="textarea-btn">

        <input type="file" name="image" id="image" accept="image/*" onChange={handlechg} disabled={formData.document ? true : false} style={{ display: "none" }} />
        <label htmlFor="image">
          <FontAwesomeIcon className="icon" icon={faImage} flip="horizontal" />
        </label>

        <input type="file" name="document" id="document" onChange={handlechg} disabled={formData.image ? true : false} style={{ display: "none" }} />
        <label htmlFor="document">
          <FontAwesomeIcon className="icon" icon={faPaperclip} rotation={180} />
        </label>

        <button
          className="sendBtn"
          type="submit"
          disabled={!(formData.message || formData.document || formData.image)}
        >
          Send
        </button>
      </div>
    </form>
  );
}

export default InputField;
