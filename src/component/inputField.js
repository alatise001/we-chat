import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { Timestamp, doc, updateDoc, arrayUnion, } from "firebase/firestore";
import { db, storage } from "../utility/firebase";
import { ChatContext } from '../context/chatContext';
import { AuthContext } from "../context/authContext";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";


function InputField() {

  const STATUS = {
    IDLE: "IDLE",
    SUBMITTED: "SUBMITTED",
    SUBMITTING: "SUBMITTING",
    COMPLETED: "COMPLETED",
  };

  const { data } = React.useContext(ChatContext)
  const { isUser } = React.useContext(AuthContext)

  const [formData, setFormData] = React.useState({
    message: "",
    image: null,
    document: null
  });


  function handlechg(e) {
    // console.log(e.target);
    const { name, value, checked, type } = e.target;
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
        const storageRef = ref(storage, `${formData.image.name}`);

        await uploadBytesResumable(storageRef, formData.image).then(() => {

          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                  text: formData.message,
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

    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          text: formData.message,
          senderId: isUser.uid,
          date: Timestamp.now()
        })
      });
    }

    setFormData(prev => {
      return {
        ...prev,
        message: "",
        image: null,
        document: null
      }
    })
  }

  console.log(formData);
  // function getErrors(params) {
  //   const result = {};
  //   if (!formData.name) result.name = "Username is required";
  //   if (!formData.email) result.email = "Email is required";
  //   if (!formData.password) result.password = "Please enter Password";
  //   return result;
  // }

  return (

    <form className="form-div" onSubmit={handleSubmit}>
      <div>
        <input
          className="input"
          type="text"
          name="message"
          placeholder="Type a message"
          onChange={handlechg}
          // onBlur={handleBlur}
          value={formData.message}
        />
      </div>

      <div>

        <input type="file" name="image" id="image" onChange={handlechg} value={formData.file} style={{ display: "none" }} />
        <label htmlFor="image">
          <FontAwesomeIcon icon={faImage} flip="horizontal" />
        </label>

        <input type="file" name="document" id="document" onChange={handlechg} value={formData.file} style={{ display: "none" }} />
        <label htmlFor="document">
          <FontAwesomeIcon icon={faPaperclip} rotation={180} />
        </label>

        <button
          className="sendBtn"
          type="submit"
        // disabled={isStatus === STATUS.SUBMITTED}
        >
          Send
        </button>
      </div>
    </form>

  );

}

export default InputField;
