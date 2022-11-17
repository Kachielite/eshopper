import { Link, useLocation } from "react-router-dom";
import dashboardIcon from "../assets/icons/Dashboard.svg";
import reviewIcon from "../assets/icons/Emoji.svg";
import productIcon from "../assets/icons/Cart.svg";
import ordersIcon from "../assets/icons/Clipboard.svg";
import customerIcon from "../assets/icons/Contacts.svg";

const Footer = () => {
  const location = useLocation();

  const pathName = location.pathname.substring(1);
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 w-full flex flex-row">
      {/* Menu Item Container */}
      <div className="flex flex-row justify-between items-center w-screen bg-bg2 drop-shadow-lg">
        <Link to="/dashboard" className="w-full">
          <div
            className={`flex flex-col items-center w-full ${pathName === "dashboard" ? "activeMenu": ""} cursor-pointer py-2`}>
            <img
              src={dashboardIcon}
              alt="dashboard"
              className="sidebar-icon w-10 h-10"
            />
            <h3 className={`text-text1 font-medium text-xs`}>Dashboard</h3>
          </div>
        </Link>
        <Link to="/products" className="w-full">
          <div
            className={`flex flex-col items-center w-full ${pathName === "products" ? "activeMenu": ""} cursor-pointer py-2`}>
            <img
              src={productIcon}
              alt="products"
              className="sidebar-icon w-10 h-10"
            />
            <h3 className={`text-text1 font-medium text-xs`}>Products</h3>
          </div>
        </Link>
        <Link to="/orders" className="w-full">
          <div
            className={`flex flex-col items-center w-full ${pathName === "orders" ? "activeMenu": ""} cursor-pointer py-2`}>
            <img
              src={ordersIcon}
              alt="orders"
              className="sidebar-icon w-10 h-10"
            />
            <h3 className={`text-text1 font-medium text-xs`}>Orders</h3>
          </div>
        </Link>
        <Link to="/customers" className="w-full">
          <div
            className={`flex flex-col items-center w-full ${pathName === "customers" ? "activeMenu": ""} cursor-pointer py-2`}>
            <img
              src={customerIcon}
              alt="customers"
              className="sidebar-icon w-10 h-10"
            />
            <h3 className={`text-text1 font-medium text-xs`}>Customers</h3>
          </div>
        </Link>
        <Link to="/reviews" className="w-full">
          <div
            className={`flex flex-col items-center w-full ${pathName === "reviews" ? "activeMenu": ""} cursor-pointer py-2`}>
            <img
              src={reviewIcon}
              alt="reviews"
              className="sidebar-icon w-10 h-10"
            />
            <h3 className={`text-text1 font-medium text-xs`}>reviews</h3>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
