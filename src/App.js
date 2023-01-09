import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import Offers from "./Pages/Offers";
import Explore from "./Pages/Explore";
import Profile from "./Pages/Profile";
import ForgotPassword from "./Pages/ForgotPassword";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
        </Routes>
      </Router>

      {/* navbar */}
    </>
  );
}

export default App;
