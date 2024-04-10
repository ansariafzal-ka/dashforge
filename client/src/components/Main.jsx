import SideBar from "./static/SideBar";
import { Outlet } from "react-router-dom";
import NavBar from "./static/NavBar";

const Main = ({ userData }) => {
  return (
    <section className="w-full h-screen">
      <>
        <NavBar userData={userData} />
        <div className="w-full bg-gray-100 h-[90%] flex">
          <SideBar />
          <Outlet />
        </div>
      </>
    </section>
  );
};

export default Main;
