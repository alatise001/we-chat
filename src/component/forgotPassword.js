import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../utility/firebase";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import loading from "../loading.svg"

function ForgotPassword() {
  const STATUS = {
    IDLE: "IDLE",
    SUBMITTED: "SUBMITTED",
    SUBMITTING: "SUBMITTING",
    COMPLETED: "COMPLETED",
  };

  const [formData, setFormData] = React.useState({
    email: "",
  });

  const [isStatus, setStatus] = React.useState(STATUS.IDLE);
  const [touched, setTouched] = React.useState({});
  const [loginError, setLoginError] = React.useState(null)

  const navigate = useNavigate()
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
    const { name } = e.target;
    setTouched((prevState) => {
      return {
        ...prevState,
        [name]: true,
      };
    });

    console.log(touched);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus(STATUS.SUBMITTING);

    const email = e.target.email.value
    if (isValid) {
      try {

        await sendPasswordResetEmail(auth, email)
          .then((userCredential) => {
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setLoginError(errorCode, errorMessage)
          });
      } catch (error) {
        setLoginError(error)
      }
      setStatus(STATUS.COMPLETED);
      navigate("login")
    } else {
      setStatus(STATUS.SUBMITTED);
    }
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


  function getErrors(params) {
    const result = {};
    if (!formData.email) {
      result.email = "Email is required";
    } else if (!ValidateEmail(formData.email)) {
      // console.log("note corrre");
      result.email = "Email is not correct";
    }
    return result;
  }

  if (loginError) throw loginError

  if (isStatus === "SUBMITTING") return (<div className="container"><img className="loading" src={loading} alt="" /></div>)

  return (

    // <div className="container">
    <div className="form">
      <form onSubmit={handleSubmit}>
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
        <button
          className="subBtn"
          type="submit"
          disabled={!(formData.email)}

        >
          Reset
        </button>
      </form>

      <span className="logSpan ">
        <h5>Don't have an account? </h5>
        <Link className="links" to="/register">
          <a className="links">
            Sign Up
          </a>
        </Link>
      </span>
    </div>
    // </div>
  );
}

export default ForgotPassword;
