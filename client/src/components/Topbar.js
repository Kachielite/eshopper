import { useState } from "react";
import { Transition } from "@headlessui/react";
import menuIcon from "../assets/icons/Menu.svg";
import searchIcon from "../assets/icons/Search.svg";
import bellNotificationIcon from "../assets/icons/BellNotification.svg";
import messageIcon from "../assets/icons/Message.svg";
import arrowDownIcon from "../assets/icons/ArrowDown.svg";
import userIcon from "../assets/icons/User.svg";
import settingsIcon from "../assets/icons/Settings.svg";
import logOutIcon from "../assets/icons/Log-out.svg";

const TopBar = () => {
  const [showSettings, setShowSettings] = useState(false);

  const showSettingsHandler = () => {
    if (!showSettings) {
      setShowSettings(true);
    } else {
      setShowSettings(false);
    }
  };
  return (
    // Global Container
    <div className="flex flex-row px-6 py-5 items-center justify-between w-full h-16">
      <div className="flex flex-row">
        <img src={menuIcon} alt="menu" className="mr-14" />
        <div className="md:flex md:flex-row md:items-center hidden bg-bg1 w-72 py-2.5 px-3.5">
          <img src={searchIcon} alt="search" className="mr-1.5" />
          <input
            type="text"
            name="search"
            placeholder="Search"
            className="bg-bg1 outline-none text-text1 text-base font-normal"
          />
        </div>
      </div>
      <div className="flex flex-row space-x-6 items-center">
        <div className="flex flex-row space-x-4 items-center h-6 w-28 py-2.5 px-5 border-l-2 border-r-2 border-bg3">
          <img
            src={messageIcon}
            alt="message"
            className="w-6 h-6 cursor-pointer"
          />
          <img
            src={bellNotificationIcon}
            alt="bell and notification"
            className="w-6 h-6 cursor-pointer"
          />
        </div>
        <div className="flex flex-row space-x-4 items-center  py-2.5 px-5">
          <div className="flex justify-center items-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-orange text-white">
            MA
          </div>
          <div className="flex flex-row relative">
            <p className="hidden font-normal text-text1 text-base md:block">
              Mark Anderson
            </p>
            <img
              src={arrowDownIcon}
              alt="arrow down"
              className="cursor-pointer"
              onClick={showSettingsHandler}
            />
            <Transition
              className={`absolute top-11 -right-5 `}
              show={showSettings}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-0"
              enterTo="opacity-100 translate-y-1"
              leave="transition ease-in duration-200"
              leaveFrom="opacity-100 translate-y-1"
              leaveTo="opacity-0 translate-y-0"
              onMouseLeave={() => setShowSettings(false)}>
              <div className=" flex flex-col md:w-48  bg-bg2 space-y-1">
                <div className="flex flex-row py-2 px-5 space-x-2.5 w-full h-11 topbar-activeMenu ">
                  <img src={userIcon} alt="Profile" className="icon" />
                  <p className="text-base text-text1 font-normal">My Profile</p>
                </div>
                <div className="flex flex-row py-2 px-5 space-x-2.5 w-full h-11 topbar-activeMenu">
                  <img src={settingsIcon} alt="settings" className="icon" />
                  <p className="text-base text-text1 font-normal">Settings</p>
                </div>
                <div className="flex flex-row py-2 px-5 space-x-2.5 w-full h-11 border-t-2 border-bgWhite topbar-activeMenu">
                  <img src={logOutIcon} alt="Profile" className="icon" />
                  <p className="text-base text-text1 font-normal">Logout</p>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
