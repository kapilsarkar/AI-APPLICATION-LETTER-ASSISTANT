import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
