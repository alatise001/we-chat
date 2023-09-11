import React, { useContext } from "react";
import { Navigate, Route, Routes, } from "react-router-dom";
import Login from "./component/login";
import Register from "./component/register";
import Chats from "./container/chats";
import NotificationPanel from "./container/notificationPanel";
import { AuthContext } from "./context/authContext";
import PageNotFound from "./PageNotFound";


function App() {

  const { isUser } = useContext(AuthContext)

  const ReRoute = ({ children }) => {
    if (!isUser) {
      return <Navigate to="/login" />
    }

    return children
  }

  console.log(isUser);
  return (
    <div className="containe">
      <Routes>
        <Route path="/">
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route index element={<ReRoute>
            <NotificationPanel />
          </ReRoute>} />
          <Route path="/:id" element={<Chats />} />
          <Route element={<PageNotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
