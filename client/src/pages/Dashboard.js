import { useState, useRef } from "react";
import {useClickAway} from 'react-use';
import Sidebar from "../components/Sidebar";
import TopBar from "../components/Topbar";

const Dashboard = () => {
    const [showSideBar, setShowSideBar] = useState(false)
    const ref = useRef(null);


    useClickAway(ref, () => {
        console.log('I got clicked')
        setShowSideBar(false)
    });

    const sidebarToggler = () =>{
        if(!showSideBar){
            setShowSideBar(true)
        } else {
            setShowSideBar(false)
        }
    }

    return (
        <div className="relative flex flex-row justify-start items-center w-screen h-screen">
            <Sidebar show={showSideBar} refTarget={ref}/>
            <div className={`flex flex-col justify-start items-start w-full h-screen`}>
                <TopBar toggleSidebar={sidebarToggler}/>
                <div className="bg-bg3 w-full h-full p-12">
                    <h1 className="text-4xl">Widgets coming up soon</h1>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;