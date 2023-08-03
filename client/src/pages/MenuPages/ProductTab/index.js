import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setPageHandler,
  fetchAllCategories,
  fetchAllProducts,
} from "../../../store/slices/product";
import Dashboard from "../../Dashboard";
import DropDown from "../../../components/DropDown";
import Table from "../../../components/Table";
import importIcon from "../../../assets/icons/Import.svg";
import printIcon from "../../../assets/icons/Print.svg";
import arrowLeft from "../../../assets/icons/ArrowLeft.svg";
import arrowRight from "../../../assets/icons/ArrowRight.svg";
import homeIcon from "../../../assets/icons/Home.svg";
import { TailSpin } from "react-loader-spinner";
import SearchBar from "../../../components/searchBar";

const Index = () => {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product);
  const {
    checkedProduct,
    sortedArray,
    filter,
    categoriesList,
    isLoading,
    page,
    totalItems,
    nextPage,
    previousPage,
    lastPage,
  } = productData;

  useEffect(() => {
    dispatch(fetchAllCategories());
    dispatch(fetchAllProducts({ filters: filter, pageNumber: page }));
  }, [dispatch, page, filter]);

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
                <img
                  src={printIcon}
                  alt="print"
                  className="w-6 h-6"
                  onClick={() => window.print()}
                />
              </div>
              <a
                href={`${process.env.REACT_APP_ENDPOINT}/v1/products/download?category=${filter.category}&status=${filter.status}`}
                target="_blank"
                rel="noopener noreferrer"
                download>
                <div className="w-10 h-10 rounded-full bg-bg2 flex justify-center items-center cursor-pointer">
                  <img src={importIcon} alt="import" className="w-6 h-6" />
                </div>
              </a>
            </div>
          </div>
          {/* Filter/Search Container */}
          <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 items-center justify-between w-full mt-9">
            {/* Filter Container */}
            <div className="flex flex-row space-x-2 items-center">
              <p className="text-text1 text-sm font-normal">Show</p>
              <DropDown
                type="quantity"
                data={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
              />
              <DropDown
                type="category"
                data={["All Categories", ...categoriesList]}
              />
              <DropDown
                type="status"
                data={["All Status", "Available", "Deleted", "Out of Stock"]}
              />
            </div>
            {/* Selected Items Container */}
            {checkedProduct.length > 0 && (
              <div className="bg-bg2 px-4 py-2 rounded flex flex-row items-center space-x-10">
                <p>
                  <span className="text-blue1 font-medium mr-1">
                    {checkedProduct.length}
                  </span>{" "}
                  item(s) selected
                </p>
                <div className="flex flex-row items-center space-x-3">
                  <button className="cursor-pointer hover:scale-125 duration-150 p-1 px-2 rounded text-xs text-white bg-blue1">
                    Export
                  </button>
                  <button className="cursor-pointer hover:scale-125 duration-150 p-1 px-2 rounded text-xs text-white bg-red">
                    Delete
                  </button>
                </div>
              </div>
            )}
            {/* Search Container */}
            <div className="flex flex-row space-x-4 items-center relative">
              <SearchBar />
              <button className="w-10 h-10 bg-blue1 shadow-2xl shadow-cyan-600 rounded-full">
                <Link to="/products/add_product">
                  <p className="text-white font-extrabold text-4xl">+</p>
                </Link>
              </button>
            </div>
          </div>
        </div>
        {/* Table Container */}
        {isLoading ? (
          <TailSpin
            height="100"
            width="100"
            color="#0081FF"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{
              width: "100%",
              height: "55vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            wrapperClass=""
            visible={true}
          />
        ) : (
          <div>
            <div className=" mt-7 min-h-[38rem] w-full">
              <Table data={sortedArray} />
            </div>
            {/* Pagination Container */}
            <div className="mt-7 h-full w-full flex flex-row justify-between items-center">
              <p className="text-xs md:text-sm text-text2 font-normal">
                Showing {page === 1 ? 1 : filter.quantity * (page - 1) + 1} to{" "}
                {page === lastPage
                  ? totalItems
                  : page === 1
                  ? filter.quantity
                  : filter.quantity * page + 1}{" "}
                of {totalItems} items
              </p>
              <div className="h-10 bg-bg2 rounded-md flex flex-row space-x-2 items-center px-3">
                {previousPage && (
                  <button onClick={() => dispatch(setPageHandler(page - 1))}>
                    <img src={arrowLeft} alt="previous" />
                  </button>
                )}
                {page > 2 && (
                  <button
                    className="group py-2 px-3 hover:bg-blue1 hover:rounded-md hover:py-2 hover:px-3 hover:drop-shadow-lg "
                    onClick={() => dispatch(setPageHandler(1))}>
                    <p className="text-text1 text-sm font-medium group-hover:text-white">
                      1
                    </p>
                  </button>
                )}
                {page >= 4 && (
                  <p className="text-text1 text-sm font-medium">...</p>
                )}
                {previousPage && (
                  <button
                    className="group py-2 px-3 hover:bg-blue1 hover:rounded-md hover:py-2 hover:px-3 hover:drop-shadow-lg"
                    onClick={() => dispatch(setPageHandler(previousPage))}>
                    <p className="text-text1 text-sm font-medium group-hover:text-white">
                      {previousPage}
                    </p>
                  </button>
                )}
                <button className="bg-blue1 rounded-md py-2 px-3 drop-shadow-lg ">
                  <p className="text-white text-sm font-medium">
                    {!nextPage ? lastPage : nextPage - 1}
                  </p>
                </button>
                {page < lastPage - 2 && (
                  <button
                    className="group py-2 px-3 hover:bg-blue1 hover:rounded-md hover:py-2 hover:px-3 hover:drop-shadow-lg"
                    onClick={() => dispatch(setPageHandler(nextPage))}>
                    <p className="text-text1 text-sm font-medium group-hover:text-white">
                      {nextPage}
                    </p>
                  </button>
                )}
                {page <= lastPage - 3 && (
                  <p className="text-text1 text-sm font-medium">...</p>
                )}
                {page !== lastPage && (
                  <button
                    className="group py-2 px-3 hover:bg-blue1 hover:rounded-md hover:py-2 hover:px-3 hover:drop-shadow-lg"
                    onClick={() => dispatch(setPageHandler(lastPage))}>
                    <p className="text-text1 text-sm font-medium group-hover:text-white">
                      {lastPage}
                    </p>
                  </button>
                )}
                {nextPage && (
                  <button onClick={() => dispatch(setPageHandler(page + 1))}>
                    <img src={arrowRight} alt="next" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Dashboard>
  );
};

export default Index;
