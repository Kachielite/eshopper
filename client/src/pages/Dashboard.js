import { useState} from "react";
// import { useClickAway } from "react-use";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/Topbar";
import Footer from "../components/Footer";

const Dashboard = ({children}) => {
  const [showSideBar, setShowSideBar] = useState(true);
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
    <div className="relative flex flex-row justify-start items-start w-screen h-screen overflow-hidden">
      <Sidebar show={showSideBar} />
      <div className="flex flex-col w-full">
        <TopBar toggleSidebar={sidebarToggler} />
        <div className={` bg-bgWhite h-full max-h-screen overflow-y-auto`}>
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
