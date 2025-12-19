import { Outlet } from "react-router-dom";
import Navbar from "./Navbars";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />   
    </>
  );
};

export default Layout