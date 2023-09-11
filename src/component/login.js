import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../utility/firebase";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";


function Login() {
  const STATUS = {
    IDLE: "IDLE",
    SUBMITTED: "SUBMITTED",
    SUBMITTING: "SUBMITTING",
    COMPLETED: "COMPLETED",
  };

  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
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
    const { name, value, checked, type } = e.target;
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
    const password = e.target.password.value
    if (isValid) {
      try {

        await signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in 
            // const user = userCredential.user;
            // ...
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
      navigate("/")
      // console.log(formData);
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

    if (!formData.password) result.password = "Please enter Password";
    return result;
  }

  return (

    <div className="container">
      <div className="form">
        {/* {isStatus === STATUS.SUBMITTED && !isValid && (
        <div role="alert">
          <p>Please fix the following errors</p>
          <ul>
            {Object.keys(errors).map((key) => {
              return <li key={key}>{errors[key]}</li>;
            })}
          </ul>
        </div>
      )} */}
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
          <button
            className="subBtn"
            type="submit"
            disabled={isStatus === STATUS.SUBMITTED}
          >
            Login In
          </button>
        </form>

        <span className="logSpan ">
          <h5>Don't have an account? </h5>
          <Link to="/register">
            <a href="#" target="_blank" rel="noopener noreferrer">
              Sign Up
            </a>
          </Link>
        </span>
        {/* {isStatus === STATUS.COMPLETED && (
        <div>{`${formData.email}, ${formData.password}`}</div>
      )} */}
      </div>
    </div>
  );
}

export default Login;
