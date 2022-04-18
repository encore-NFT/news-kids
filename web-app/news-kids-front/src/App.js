import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/shared/Layout";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import Quiz from "./screens/Quiz";
import SignUp from "./screens/SignUp";
import { GlobalStyles } from "./styles";

function App() {
  const TOKEN = "token";
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem(TOKEN)));

  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path={`/`} element={isLoggedIn ? <Layout setIsLoggedIn={setIsLoggedIn}><Home /></Layout> : <Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path={`/quiz`} element={<Layout><Quiz /></Layout>} />
          <Route path={`/profile`} element={<Layout><Profile /></Layout>} />
          <Route path={`/sign-up`} element={<SignUp />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
