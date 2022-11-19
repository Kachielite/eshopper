import { Link } from "react-router-dom";
import Dashboard from "../Dashboard";
import DropDown from "../../components/DropDown";
import Table from "../../components/Table";
import searchIcon from "../../assets/icons/Search.svg";
import importIcon from "../../assets/icons/Import.svg";
import printIcon from "../../assets/icons/Print.svg";
import arrowLeft from "../../assets/icons/ArrowLeft.svg";
import arrowRight from "../../assets/icons/ArrowRight.svg";
import homeIcon from "../../assets/icons/Home.svg";

const ProductTab = () => {
  return (
    <Dashboard>
      <div className="flex flex-col px-4 md:px-7 py-6 mb-32 md:mb-24 h-full w-full">
        <div>
          <h1 className="text-text1 text-2xl md:text-3xl font-bold">
            Products
          </h1>
          {/* Print/Export Action Container */}
          <div className="flex flex-row space-x-6 justify-between items-center">
            <div className="flex flex-row space-x-2 justify-start items-center w-32">
              <img src={homeIcon} alt="home" />
              <p className="text-text2 text-sm">Products</p>
            </div>
            <div className="flex flex-row space-x-6 items-center">
              <div className="w-10 h-10 rounded-full bg-bg2 flex justify-center items-center cursor-pointer">
                <img src={printIcon} alt="print" className="w-6 h-6" />
              </div>
              <div className="w-10 h-10 rounded-full bg-bg2 flex justify-center items-center cursor-pointer">
                <img src={importIcon} alt="import" className="w-6 h-6" />
              </div>
            </div>
          </div>
          {/* Filter/Search Container */}
          <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 items-center justify-between w-full mt-9">
            {/* Filter Container */}
            <div className="flex flex-row space-x-2 items-center">
              <p className="text-text1 text-sm font-normal">Show</p>
              <DropDown name={"10"} />
              <DropDown name={"All categories"} />
              <DropDown name={"All status"} />
            </div>
            {/* Search Container */}
            <div className="flex flex-row space-x-4 items-center">
              <div className="flex flex-row items-center bg-bg2 w-72 h-10 py-2.5 px-3.5 rounded-lg shadow-sm">
                <img src={searchIcon} alt="search" className="mr-1.5" />
                <input
                  type="text"
                  name="search"
                  placeholder="Search product"
                  className="bg-bg2 outline-none text-text1 text-base font-normal placeholder:text-sm"
                />
              </div>
              <button className="w-10 h-10 bg-blue1 shadow-2xl shadow-cyan-600 rounded-full">
                <Link to="/products/add_product">
                  <p className="text-white font-extrabold text-4xl">+</p>
                </Link>
              </button>
            </div>
          </div>
        </div>
        {/* Table Container */}
        <div className="mt-7 h-full w-full">
          <Table />
        </div>
        {/* Pagination Container */}
        <div className="mt-7 h-full w-full flex flex-row justify-between items-center">
          <p className="text-xs md:text-sm text-text2 font-normal">
            Showing 1 to 10 of 50 items
          </p>
          <div className="w-60 h-10 bg-bg2 rounded-md flex flex-row justify-between items-center">
            <button>
              <img src={arrowLeft} alt="previous" />
            </button>
            <button className="bg-blue1 rounded-md py-2 px-3 drop-shadow-lg ">
              <p className="text-white text-sm font-medium">1</p>
            </button>
            <button>
              <p className="text-text1 text-sm font-medium">2</p>
            </button>
            <p className="text-text1 text-sm font-medium">...</p>
            <button>
              <p className="text-text1 text-sm font-medium">3</p>
            </button>
            <button>
              <img src={arrowRight} alt="next" />
            </button>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default ProductTab;
