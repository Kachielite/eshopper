import Sidebar from "../components/Sidebar";
import TopBar from "../components/Topbar";

const Dashboard = () => {
    return (
        <div className="flex flex-row justify-start items-center w-screen h-screen">
            <Sidebar/>
            <div className='flex flex-col justify-start items-start w-11/12 h-screen'>
                <TopBar/>
                <div className="bg-bg3 w-full h-full p-12">
                    <h1 className="text-4xl">Widgets coming up soon</h1>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;