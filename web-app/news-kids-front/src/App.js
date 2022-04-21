import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/shared/Layout";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import Quiz from "./screens/Quiz";
import SignUp from "./screens/SignUp";
import Trend from "./screens/Trend";
import AccountRoutes from "./routes/AccountRoutes"
import { GlobalStyles } from "./styles";

function App() {

  const TOKEN = "Authorization";
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem(TOKEN)));
  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path={`/`} element={<Layout setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} ><Home /></Layout>} />
          <Route path={`/news/:newId`} element={<Layout setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} ><Trend /></Layout>} />
          <Route path={`/trend`} element={<Layout setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} ><Trend /></Layout>} />
          <Route path={`/quiz`} element={<Layout setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} ><Quiz /></Layout>} />
          <Route path={`/profile`} element={<Layout setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}><Profile /></Layout>} />
          <Route path={`/accounts/*`} element={<AccountRoutes setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />} />
          <Route path={`/login`} element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path={`/sign-up`} element={<SignUp />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
