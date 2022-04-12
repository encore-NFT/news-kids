import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/shared/Layout";
import Home from "./screens/Home";
import Quiz from "./screens/Quiz";
import { GlobalStyles } from "./styles";

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path={`/`} element={<Layout><Home /></Layout>} />
          <Route path={`/quiz`} element={<Layout><Quiz /></Layout>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
