import dashboardIcon from "../assets/icons/Dashboard.svg";
import reviewIcon from "../assets/icons/Emoji.svg";
import productIcon from "../assets/icons/Cart.svg";
import ordersIcon from "../assets/icons/Clipboard.svg";
import customerIcon from "../assets/icons/Contacts.svg";

const Footer = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 w-full flex flex-row">
      {/* Menu Item Container */}
      <div className="flex flex-row justify-between items-center w-screen bg-bg2 drop-shadow-lg">
        <div
          className={`flex flex-col items-center w-full activeMenu cursor-pointer py-2`}>
          <img
            src={dashboardIcon}
            alt="dashboard"
            className="sidebar-icon w-10 h-10"
          />
          <h3 className={`text-text1 font-medium text-xs`}>Dashboard</h3>
        </div>
        <div
          className={`flex flex-col items-center w-full activeMenu cursor-pointer py-2`}>
          <img
            src={productIcon}
            alt="product"
            className="sidebar-icon w-10 h-10"
          />
          <h3 className={`text-text1 font-medium text-xs`}>Products</h3>
        </div>
        <div
          className={`flex flex-col items-center w-full activeMenu cursor-pointer py-2`}>
          <img
            src={ordersIcon}
            alt="orders"
            className="sidebar-icon w-10 h-10"
          />
          <h3 className={`text-text1 font-medium text-xs`}>Orders</h3>
        </div>
        <div
          className={`flex flex-col items-center w-full activeMenu cursor-pointer py-2`}>
          <img
            src={customerIcon}
            alt="customers"
            className="sidebar-icon w-10 h-10"
          />
          <h3 className={`text-text1 font-medium text-xs`}>Customers</h3>
        </div>
        <div
          className={`flex flex-col items-center w-full activeMenu cursor-pointer py-2`}>
          <img
            src={reviewIcon}
            alt="reviews"
            className="sidebar-icon w-10 h-10"
          />
          <h3 className={`text-text1 font-medium text-xs`}>Reviews</h3>
        </div>
      </div>
    </div>
  );
};

export default Footer;
