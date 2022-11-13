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
import orderIcon from "../assets/icons/order-notification-icon.svg"
import invoiceIcon from "../assets/icons/invoice-notification-icon.svg"
import shippingIcon from "../assets/icons/shipping-notification-icon.svg"
import closeIcon from "../assets/icons/Close.svg"
import arrowIcon from "../assets/icons/Arrow.svg"

const TopBar = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false)

  const showSettingsHandler = () => {
    if (!showSettings) {
      setShowSettings(true);
    } else {
      setShowSettings(false);
    }
  };

  const showNotificationsHandler = () => {
    if (!showNotifications) {
      setShowNotifications(true);
    } else {
      setShowNotifications(false);
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
      <div className="flex flex-row space-x-0 items-center">
        <div className="relative flex flex-row space-x-4 items-center h-6 w-28 py-2.5 px-5 border-l-2 border-r-2 border-bg3">
          <img
            src={messageIcon}
            alt="message"
            className="w-6 h-6 cursor-pointer hidden"
          />
          <img
            src={bellNotificationIcon}
            alt="bell and notification"
            className="w-8 h-8 cursor-pointer"
            onClick={showNotificationsHandler}
          />
          <Transition
            className={`absolute top-10 right-7`}
            show={showNotifications}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-0"
            enterTo="opacity-100 translate-y-1"
            leave="transition ease-in duration-200"
            leaveFrom="opacity-100 translate-y-1"
            leaveTo="opacity-0 translate-y-0"
            >
            <div className="flex flex-col space-y-0 p-0" onMouseLeave={() => showNotificationsHandler(false)}>
              <div class="w-full overflow-hidden flex flex-col items-end pr-7">
                <div class=" h-3 w-3 bg-bg2 rotate-45 transform origin-bottom-left"></div>
              </div>
              <div className=" flex flex-col md:w-80 md:h-72  bg-bg2 space-y-0">
                <div className="flex flex-row justify-between items-center px-4 py-3.5 h-11 w-full">
                    <div className="flex flex-row space-x-2 items-center">
                        <p className="text-text1 font-normal text-base">Notification</p>
                        <div className="flex justify-center items-center w-7 h-5 text-white font-normal text-xs bg-red rounded-xl ">22</div>
                    </div>
                    <p className="text-text1 font-normal text-base cursor-pointer">Clear All</p>
                </div>
                <div className="group flex flex-row items-center w-full h-16 px-6 py-3 justify-between border-t-2 border-bgWhite topbar-activeMenu cursor-pointer">
                    <div className="flex flex-row space-x-5">
                    <img src={orderIcon} alt="invoice notification" className="w-11 h-11"/>
                    <div>
                        <p className="text-text1 font-normal text-base">New Order Received</p>
                        <p className="text-text2 font-normal text-xs ">25 min ago</p>
                    </div>
                    </div>
                    <div>
                    <img src={closeIcon} alt="close notification" className="hidden group-hover:block group-hover:duration-150"/>
                    </div>
                </div>
                <div className="group flex flex-row items-center w-full h-16 px-6 py-3 justify-between border-t-2 border-bgWhite topbar-activeMenu cursor-pointer">
                    <div className="flex flex-row space-x-5">
                    <img src={invoiceIcon} alt="invoice notification" className="w-11 h-11"/>
                    <div>
                        <p className="text-text1 font-normal text-base">New Invoice Received</p>
                        <p className="text-text2 font-normal text-xs ">5 hours ago</p>
                    </div>
                    </div>
                    <div>
                    <img src={closeIcon} alt="close notification" className="hidden group-hover:block group-hover:duration-150"/>
                    </div>
                </div>
                <div className="group flex flex-row items-center w-full h-16 px-6 py-3 justify-between border-t-2 border-bgWhite topbar-activeMenu cursor-pointer">
                    <div className="flex flex-row space-x-4">
                    <img src={shippingIcon} alt="invoice notification" className="w-11 h-11"/>
                    <div>
                        <p className="text-text1 font-normal text-base">New Shipping Is Shipped</p>
                        <p className="text-text2 font-normal text-xs ">10 hours ago</p>
                    </div>
                    </div>
                    <div>
                    <img src={closeIcon} alt="close notification" className="hidden group-hover:block group-hover:duration-150"/>
                    </div>
                </div>
                <div className="flex flex-row justify-center items-center px-4 py-3.5 h-full w-full border-t-2 border-bgWhite topbar-activeMenu">
                    <div className="flex flex-row space-x-2 items-center">
                        <p className="text-text2 font-normal text-base">View All Notifications</p>
                        <img src={arrowIcon} alt="see more notification" />
                    </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
        <div
          className="flex flex-row space-x-4 items-center  py-2.5 px-5 cursor-pointer"
          onClick={showSettingsHandler}>
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
            />
            <Transition
              className={`absolute top-9 -right-5`}
              show={showSettings}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-0"
              enterTo="opacity-100 translate-y-1"
              leave="transition ease-in duration-200"
              leaveFrom="opacity-100 translate-y-1"
              leaveTo="opacity-0 translate-y-0"
              onMouseLeave={() => setShowSettings(false)}>
              <div className="flex flex-col space-y-0 p-0">
                <div class="w-full overflow-hidden flex flex-col items-end pr-7">
                  <div class=" h-3 w-3 bg-bg2 rotate-45 transform origin-bottom-left"></div>
                </div>
                <div className=" flex flex-col md:w-48  bg-bg2 space-y-1">
                  <div className="flex flex-row py-2 px-5 space-x-2.5 w-full h-11 topbar-activeMenu ">
                    <img src={userIcon} alt="Profile" className="icon" />
                    <p className="text-base text-text1 font-normal">
                      My Profile
                    </p>
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
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
