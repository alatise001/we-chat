import React, { useContext, } from "react";
import { Navigate, Route, Routes, } from "react-router-dom";
import Login from "./component/login";
import ForgotPassword from "./component/forgotPassword";
import Profile from "./component/profile";
import ChatProfile from "./component/chatProfile";
import Settings from "./component/settings";
import Register from "./component/register";
import Chats from "./container/chats";
import NotificationPanel from "./container/notificationPanel";
import { AuthContext } from "./context/authContext";
// import { ThemeContext } from "./context/themeContext";
import PageNotFound from "./PageNotFound";
import CombinedLayout from "./component/combinedLayout";
import { useMediaQuery } from 'react-responsive'


function App() {

  const { isUser } = useContext(AuthContext)
  // const { themes: theme } = useContext(ThemeContext)
  // console.log(theme.theme);

  // const style = {
  //   backgroundColor: "white",
  //   // backgroundColor: `${theme === "default" ? "#040D12" : theme === "light" ? "#fff" : "#111111"}`
  // }

  // const back = () => {
  //   console.log("clicked");
  //   if (theme.theme === "dark") {
  //     return {
  //       backgroundColor: "#111111",
  //       color: "white"


  //     };
  //   } else if (theme.theme === "light") {
  //     return {
  //       backgroundColor: "#fff",
  //       color: "black"

  //     };
  //   } else {
  //     return
  //   }
  // };

  const isTabletOrMobile = useMediaQuery({ query: '(min-width: 768px)' })

  const ReRoute = ({ children }) => {
    if (!isUser) {
      return <Navigate to="/login" />
    }

    return children
  }

  console.log(isUser);
  return (
    <div className="container">
      {/* <Media query={"max-width:599px"}>
        {matches => matches ? (
          <Fragment>
            <Routes>
              <Route path="/" />
              <Route path="/:id" element={<Chats />} />
            </Routes>
          </Fragment>
        ) : (<Fragment>
          <Routes>
            <Route path="/dashboard" element={<CombinedLayout />} />
          </Routes>
        </Fragment>)}
      </Media> */}
      <Routes>
        {/* <Route path="/"> */}

        <Route path="/" />

        <Route path="/login" element={<Login />} />
        <Route path="/reset" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
        <Route index element={<ReRoute>
          {/* <NotificationPanel /> */}
          {isTabletOrMobile ? (<CombinedLayout />) : (<NotificationPanel />)}

          {/* <CombinedLayout /> */}
        </ReRoute>} />
        <Route path="/:id" element={isTabletOrMobile ? (<CombinedLayout />) : (<Chats />)} />
        <Route path="/profile" element={<Profile />} />
        <Route path={"/:id" + " profile"} element={<ChatProfile />} />
        <Route path="/settings" element={<Settings />} />
        <Route element={<PageNotFound />} />
        {/* </Route> */}
      </Routes>
    </div>
  );
}

export default App;
