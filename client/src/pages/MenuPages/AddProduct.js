import { Link } from "react-router-dom";
import Dashboard from "../Dashboard";
import homeIcon from "../../assets/icons/Home.svg";
import Tags from "../../components/tags/Tags";
import chevronLeftIcon from "../../assets/icons/chevronLeft.svg";
import imageSM from "../../assets/icons/ImageSM.svg";
import imageXL from "../../assets/icons/ImageXL.svg";

const AddProduct = () => {
  return (
    <Dashboard>
      <div className="flex flex-col px-4 md:px-7 py-8 mb-32 md:mb-24 h-full w-full">
        <h1 className="text-text1 text-2xl md:text-3xl font-bold">
          Add Product
        </h1>
        {/* Print/Export Action Container */}
        <div className="flex flex-row space-x-6 justify-between items-center mt-2">
          <div className="flex flex-row space-x-2 justify-start items-center w-full">
            <Link
              to="/products"
              className="group flex flex-row space-x-2 justify-start items-center">
              <img src={homeIcon} alt="home" />
              <p className="text-text2 text-sm group-hover:text-text1">
                Products
              </p>
            </Link>
            <img src={chevronLeftIcon} alt="chevron left" />
            <p className="text-text1 text-sm">Add Product</p>
          </div>
        </div>
        {/* Form Container */}
        <div className="w-full h-full rounded-md bg-bg2 md:space-x-28 flex flex-col md:flex-row md:justify-center items-center px-8 md:px-20 py-14 mt-8">
          <div className="flex flex-col-reverse md:flex-row justify-between items-center w-full md:w-[30rem] md:h-[36rem]">
            <div className="flex flex-row md:flex-col mb-8 md:mb-0 justify-between md:justify-evenly items-center h-full w-full mt-4">
              <img src={imageSM} alt="" />
              <img src={imageSM} alt="" />
              <img src={imageSM} alt="" />
            </div>
            <img src={imageXL} alt="" className="w-[34rem] h-[34rem]" />
          </div>
          <div className="flex flex-col justify-start space-y-3 items-start h-[36rem] w-[26rem]">
            <div className="w-full flex flex-col space-y-1">
              <h3 className="text-text2 font-normal text-sm">Product Name</h3>
              <input
                type="text"
                className="w-full outline-none bg-bg3 h-10 text-text1 font-medium text-sm rounded-lg p-2.5"
              />
            </div>
            <div className="w-full flex flex-col space-y-1">
              <h3 className="text-text2 font-normal text-sm">Description</h3>
              <div class="h-53 w-full">
                <div class="mb-3">
                  <textarea
                    class="form-control block w-full h-full px-3 py-1.5 text-base font-normal text-text1 bg-bg3 rounded outline-none resize-none"
                    id="exampleFormControlTextarea1"
                    rows="7"></textarea>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col space-y-1">
              <h3 className="text-text2 font-normal text-sm">Category</h3>
              <input
                type="text"
                className="w-full outline-none bg-bg3 h-10 text-text1 font-medium text-sm rounded-lg p-2.5"
              />
            </div>
            <div className="w-full flex flex-row justify-between items-center">
              <div className=" flex flex-col space-y-1">
                <h3 className="text-text2 font-normal text-sm">Price</h3>
                <div className="flex flex-row items-center bg-bg3 rounded px-2 w-40">
                  <p className="text-text1 text-lg">$</p>
                  <input
                    type="number"
                    className=" w-full outline-none bg-bg3 h-10 text-text1 font-medium text-sm rounded-lg p-2.5"
                  />
                </div>
              </div>
              <div className=" flex flex-col space-y-1">
                <h3 className="text-text2 font-normal text-sm">Discount</h3>
                <div className="flex flex-row items-center bg-bg3 rounded px-2 w-40">
                  <p className="text-text1 text-lg">%</p>
                  <input
                    type="number"
                    className="w-full outline-none bg-bg3 h-10 text-text1 font-medium text-sm rounded-lg p-2.5"
                  />
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col space-y-1">
              <h3 className="text-text2 font-normal text-sm">Tags</h3>
              <Tags />
            </div>
            <div className="flex flex-row justify-end items-center w-full h-full bg-bg2 space-x-6 mb-10">
              <button
                type="submit"
                className="bg-blue1 py-2.5 px-10 rounded text-white text-base font-medium hover:bg-blue-200 hover:border-blue-200 hover:text-blue1 duration-200">
                Create
              </button>
              <button
                type="submit"
                className="bg-blue-200 py-2.5 px-10 rounded text-blue1 text-base font-medium hover:bg-bg4 hover:text-text1 duration-200">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default AddProduct;
