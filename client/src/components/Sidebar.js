import logoCover from "../assets/images/cover.png";
import logo from "../assets/images/logo.png";
import dashboardIcon from "../assets/icons/Dashboard.svg";
import reviewIcon from "../assets/icons/Emoji.svg";
import productIcon from "../assets/icons/Cart.svg";
import ordersIcon from "../assets/icons/Clipboard.svg";
import customerIcon from "../assets/icons/Contacts.svg";

const Sidebar = ({ show, refTarget }) => {
  return (
    // Global Container
    <div
      className={`hidden md:flex flex-col items-start justify-start h-screen ${show ? "w-[13%]": "w-[5%]"} duration-150`} >
      {/* Logo Container */}
      <div className="bg-white w-full md:w-full">
        <div className="flex justify-center items-center w-full h-16 bg-blue1">
          {show ? (
            <img
              src={logoCover}
              alt="logo_cover"
              className=" md:block h-full w-full object-scale-down object-center "
            />
          ) : (
            <img
              src={logo}
              alt="logo"
              className=" object-scale-down object-center h-12 w-12"
            />
          )}
        </div>
        {/* Menu Item Container */}
        <div className="flex flex-col justify-center items-center w-full ">
          <div className={`flex flex-row ${show?'justify-start':'justify-center'} py-6 px-5 space-x-2.5 items-center w-full h-16 activeMenu cursor-pointer`}>
            <img src={dashboardIcon} alt="dashboard" className="sidebar-icon w-10 h-10" />
            <h3
              className={`text-text1 font-medium text-base ${
                show ? "block" : "hidden"
              } ` }>
              Dashboard
            </h3>
          </div>
          <div className={`flex flex-row ${show?'justify-start':'justify-center'} py-6 px-5 space-x-2.5 items-center w-full h-16 activeMenu cursor-pointer`}>
            <img src={productIcon} alt="product" className="sidebar-icon w-10 h-10" />
            <h3
              className={`text-text1 font-medium text-base  ${
                show ? "block" : "hidden"
              }`}>
              Products
            </h3>
          </div>
          <div className={`flex flex-row ${show?'justify-start':'justify-center'} py-6 px-5 space-x-2.5 items-center w-full h-16 activeMenu cursor-pointer`}>
            <img src={ordersIcon} alt="orders" className="sidebar-icon w-10 h-10" />
            <h3
              className={`text-text1 font-medium text-base  ${
                show ? "block" : "hidden"
              }`}>
              Orders
            </h3>
          </div>
          <div className={`flex flex-row ${show?'justify-start':'justify-center'} py-6 px-5 space-x-2.5 items-center w-full h-16 activeMenu cursor-pointer`}>
            <img src={customerIcon} alt="customers" className="sidebar-icon w-10 h-10" />
            <h3
              className={`text-text1 font-medium text-base  ${
                show ? "block" : "hidden"
              }`}>
              Customers
            </h3>
          </div>
          <div className={`flex flex-row ${show?'justify-start':'justify-center'} py-6 px-5 space-x-2.5 items-center w-full h-16 activeMenu cursor-pointer`}>
            <img src={reviewIcon} alt="reviews" className="sidebar-icon w-10 h-10" />
            <h3
              className={`text-text1 font-medium text-base  ${
                show ? "block" : "hidden"
              }` }>
              Reviews
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
