import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth, storage, db } from "../utility/firebase";
import { ref, uploadBytesResumable, getDownloadURL, } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import loading from "../loading.svg"

// import{FirebaseAuthException}



function Register() {
  const STATUS = {
    IDLE: "IDLE",
    SUBMITTED: "SUBMITTED",
    SUBMITTING: "SUBMITTING",
    COMPLETED: "COMPLETED",
  };

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userPhoto: ""
  });

  const navigate = useNavigate()

  const [isStatus, setStatus] = React.useState(STATUS.IDLE);
  const [touched, setTouched] = React.useState({});

  const [loginError, setLoginError] = React.useState()

  const errors = getErrors();
  const isValid = Object.keys(errors).length === 0;

  function handlechg(e) {
    // console.log(e.target);
    const { name, value, checked, type } = e.target;
    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  function handleBlur(e) {
    console.log(e.target);
    const { name, } = e.target;
    setTouched((prevState) => {
      return {
        ...prevState,
        [name]: true,
      };
    });

    console.log(touched);
  }


  function ValidateEmail(inputText) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (inputText.match(mailformat)) {
      return true;
    }
    else {
      return false;
    }
  }

  function CheckPassword(inputtxt) {
    var decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if (inputtxt.match(decimal)) {
      return true;
    }
    else {
      return false;
    }
    // return true
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(e.target);

    const displayName = e.target.name.value
    const email = e.target.email.value
    const password = e.target.password.value
    const fil = e.target[4].files[0]
    // const fil = e.target.userPhoto.value

    console.log(displayName, email, password, fil)
    setStatus(STATUS.SUBMITTING);
    if (isValid) {
      try {
        // const auth = auth;
        const res = await createUserWithEmailAndPassword(auth, email, password)

        const storageRef = ref(storage, `${displayName}`);

        await uploadBytesResumable(storageRef, fil).then(() => {

          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              await updateProfile(res.user, {
                displayName,
                photoURL: downloadURL
              })

              await setDoc(doc(db, "users", res.user.uid), {
                userid: res.user.uid,
                displayName,
                email,
                photoURL: downloadURL
              });

              await setDoc(doc(db, "userChats", res.user.uid), {});

              navigate("/")

            } catch (error) {
              // setLoginError(prevState => {
              //   return [
              //     ...prevState,
              //     error
              //   ];
              // })
            }
          })
        }
        )
      } catch (e) {
        // setLoginError(prevState => {
        //   return [
        //     ...prevState,
        //     e

        //   ];
        // })
      }
      setStatus(STATUS.COMPLETED);
      console.log(formData);
    } else {
      setStatus(STATUS.SUBMITTED);
    }
  }


  function getErrors(params) {
    const result = {};
    if (!formData.name) result.name = "Username is required";

    if (!formData.email) {
      result.email = "Email is required";
    } else if (!ValidateEmail(formData.email)) {
      result.email = "Email is not correct";
    }

    if (!formData.password) {
      result.password = "Please enter Password";
    } else if (!CheckPassword(formData.password)) {
      result.password = "Password must be between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character";
    }

    if (!formData.confirmPassword) {
      result.confirmPassword = "Please confirm Password";
    } else if (!formData.confirmPassword.match(formData.password)) {
      result.confirmPassword = "Password doesn't match";
    }

    // if (!formData.userPhoto) result.userPhoto = "Select a Picture"
    return result;
  }

  if (loginError) throw loginError

  if (isStatus === "SUBMITTING") return (<div className="container"><img className="loading" src={loading} alt="" /></div>)

  return (
    // <div className="containr">
    <div className="form ">
      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <input
            type="text"
            name="name"
            placeholder="Username"
            onChange={handlechg}
            onBlur={handleBlur}
            value={formData.name}
          />
          <p className="error" role="alert">
            {(touched.name || isStatus === STATUS.SUBMITTED) && errors.name}
          </p>
        </div>
        <br />
        <div>
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={handlechg}
            onBlur={handleBlur}
            value={formData.email}
          />
          <p className="error" role="alert">
            {(touched.email || isStatus === STATUS.SUBMITTED) && errors.email}
          </p>
        </div>
        <br />
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handlechg}
            onBlur={handleBlur}
            value={formData.password}
          />
          <p className="error" role="alert">
            {(touched.password || isStatus === STATUS.SUBMITTED) &&
              errors.password}
          </p>
        </div>
        <br />
        <div>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handlechg}
            onBlur={handleBlur}
            value={formData.confirmPassword}
          />
          <p className="error" role="alert">
            {(touched.confirmPassword || isStatus === STATUS.SUBMITTED) &&
              errors.confirmPassword}
          </p>
        </div>
        <br />

        <div>
          <input
            id="userPhoto"
            style={{ display: "none" }}
            type="file"
            name="userPhoto"
            // placeholder="Confirm Password"
            onChange={handlechg}
            onBlur={handleBlur}
            value={formData.userPhoto}
          />

          <label htmlFor="userPhoto" >
            <span>
              <FontAwesomeIcon className="icon" icon={faImage} />
            </span>
            <span> Add an profile picture</span>
          </label>
          <p className="error" role="alert">
            {(touched.userPhoto || isStatus === STATUS.SUBMITTED) &&
              errors.userPhoto}
          </p>
        </div>

        <br />
        <button
          className="subBtn"
          type="submit"
          disabled={!isValid}
        >
          Sign Up
        </button>
      </form>
      {/* {isStatus === STATUS.COMPLETED && (
        <div>{`${formData.email}, ${formData.password}`}</div>
      )} */}
      <span className="logSpan ">
        <h5>Already have an account? </h5>
        <Link className="links" to="/login">
          <a className="links">
            Login
          </a>
        </Link>
      </span>
    </div>
    // </div >
  );
}

export default Register;
