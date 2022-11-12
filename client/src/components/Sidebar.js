import logoCover from "../assets/images/cover.png";
import logo from "../assets/images/logo.png"
import dashboardIcon from "../assets/icons/Dashboard.svg";
import reviewIcon from "../assets/icons/Emoji.svg"
import productIcon from "../assets/icons/Cart.svg"
import ordersIcon from "../assets/icons/Clipboard.svg"
import customerIcon from "../assets/icons/Contacts.svg"

const Sidebar = () => {
  return (
    // Global Container
    <div className="w-16 md:w-60 min-h-screen flex flex-col">
      {/* Logo Container */}
      <div className="flex justify-center items-center w-full">
        <img src={logoCover} alt="logo_cover" className="hidden md:block"/>
        <img src={logo} alt="logo" className=" md:hidden" />
      </div>
      {/* Menu Item Container */}
      <div className="flex flex-col justify-center items-center w-full ">
        <div className="flex flex-row justify-start py-6 px-5 space-x-2.5 items-center w-full h-16 activeMenu cursor-pointer">
          <img src={dashboardIcon} alt="dashboard" />
          <h3 className="text-text1 font-medium text-base md:block hidden">Dashboard</h3>
        </div>
        <div className="flex flex-row justify-start py-6 px-5 space-x-2.5 items-center w-full h-16 activeMenu cursor-pointer">
          <img src={productIcon} alt="product" />
          <h3 className="text-text1 font-medium text-base md:block hidden">Products</h3>
        </div>
        <div className="flex flex-row justify-start py-6 px-5 space-x-2.5 items-center w-full h-16 activeMenu cursor-pointer">
          <img src={ordersIcon} alt="orders" />
          <h3 className="text-text1 font-medium text-base md:block hidden">Orders</h3>
        </div>
        <div className="flex flex-row justify-start py-6 px-5 space-x-2.5 items-center w-full h-16 activeMenu cursor-pointer">
          <img src={customerIcon} alt="customers" />
          <h3 className="text-text1 font-medium text-base md:block hidden">Customers</h3>
        </div>
        <div className="flex flex-row justify-start py-6 px-5 space-x-2.5 items-center w-full h-16 activeMenu cursor-pointer">
          <img src={reviewIcon} alt="reviews" />
          <h3 className="text-text1 font-medium text-base md:block hidden">Reviews</h3>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
