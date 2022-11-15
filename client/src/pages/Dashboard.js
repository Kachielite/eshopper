import { useState, useRef } from "react";
// import { useClickAway } from "react-use";
import DashboardTab from "./MenuPages/DashboardTab";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/Topbar";

const Dashboard = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  // const ref = useRef(null);

  // useClickAway(ref, () => {
  //   console.log("I got clicked");
  //   setShowSideBar(false);
  // });

  const sidebarToggler = () => {
    if (!showSideBar) {
      setShowSideBar(true);
    } else {
      setShowSideBar(false);
    }
  };

  return (
    <div className="flex flex-row justify-start items-start w-screen min-h-screen">
      <Sidebar show={showSideBar} />
      <div
        className={`flex flex-col justify-start items-center w-full min-h-full bg-bgWhite`}>
        <TopBar toggleSidebar={sidebarToggler} />
        <DashboardTab />
      </div>
    </div>
  );
};

export default Dashboard;
