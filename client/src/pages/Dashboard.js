import {useState} from "react";
// import { useClickAway } from "react-use";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/Topbar";
import Footer from "../components/Footer";
import {useSelector} from "react-redux";
import {Navigate} from 'react-router-dom';
import toast from "react-hot-toast";

const Dashboard = ({children}) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const [showSideBar, setShowSideBar] = useState(true);


    const sidebarToggler = () => {
        if (!showSideBar) {
            setShowSideBar(true);
        } else {
            setShowSideBar(false);
        }
    };

    if (!isAuthenticated) {
        return <Navigate to="/"/>;
    }


    return (
        <div className="relative flex flex-row justify-start items-start w-screen h-screen overflow-hidden">
            <Sidebar show={showSideBar}/>
            <div className="flex flex-col w-full">
                <TopBar toggleSidebar={sidebarToggler}/>
                <div className={` bg-bgWhite h-full max-h-screen overflow-y-auto`}>
                    {children}
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Dashboard;
