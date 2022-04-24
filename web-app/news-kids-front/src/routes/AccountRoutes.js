import { Routes, Route } from "react-router-dom";
import Layout from "../components/shared/Layout";
import DeleteProfile from "../screens/DeleteProfile";
import EditProfile from "../screens/EditProfile";
import PwdChange from "../screens/PwdChange";

function AccountRoutes({ setIsLoggedIn, isLoggedIn }) {

  return (
    <>
      <Routes>
        <Route path={'/edit'} element={<Layout setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}><EditProfile /></Layout>} />
        <Route path={'/password/change'} element={<Layout setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}><PwdChange /></Layout>} />
        <Route path={'/delete'} element={<Layout setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}><DeleteProfile setIsLoggedIn={setIsLoggedIn} /></Layout>} />
      </Routes>
    </>
  );
}

export default AccountRoutes;