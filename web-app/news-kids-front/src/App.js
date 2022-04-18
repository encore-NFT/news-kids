import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/shared/Layout";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import Quiz from "./screens/Quiz";
import SignUp from "./screens/SignUp";
import { GlobalStyles } from "./styles";

const TOKEN = "token";
export const isLoggedIn = Boolean(localStorage.getItem(TOKEN));
console.log(isLoggedIn)

function App() {

  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path={`/`} element={isLoggedIn ? <Layout><Home /></Layout> : <Login />} />
          <Route path={`/quiz`} element={<Layout><Quiz /></Layout>} />
          <Route path={`/profile`} element={<Layout><Profile /></Layout>} />
          <Route path={`/sign-up`} element={<SignUp />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
