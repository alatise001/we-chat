import React, { useContext, } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Login from "./component/login";
import ForgotPassword from "./component/forgotPassword";
import Profile from "./component/profile";
import ChatProfile from "./component/chatProfile";
import Settings from "./component/settings";
import Register from "./component/register";
import Chats from "./container/chats";
import NotificationPanel from "./container/notificationPanel";
import { AuthContext } from "./context/authContext";
import PageNotFound from "./PageNotFound";
import CombinedLayout from "./component/combinedLayout";
import { useMediaQuery } from 'react-responsive'
import { ThemeContext } from "./context/themeContext";
import { ChatContext } from "./context/chatContext";



function App() {

  const { isUser } = useContext(AuthContext)
  const { themes } = useContext(ThemeContext)
  const { data, dispatch } = React.useContext(ChatContext)


  const location = useLocation().pathname
  console.log(location);



  React.useEffect(() => {
    if (location === "/") {
      dispatch({ type: "clearChart" })
    }
  }, [data])

  const isTabletOrMobile = useMediaQuery({ query: '(min-width: 768px)' })

  const ReRoute = ({ children }) => {
    if (!isUser) {
      return <Navigate to="/login" />
    }

    return children
  }

  return (
    <div className={`container ${(themes === "light") ? "light" : "dark"}`}>
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
