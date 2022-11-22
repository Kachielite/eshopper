import { useState, useEffect } from "react";
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
import axios from "axios";
import { TailSpin } from "react-loader-spinner";

const ProductTab = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [totalItems, setTotalItems] = useState();
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState();
  const [nextPage, setNextPage] = useState();
  const [previousPage, setPreviousPage] = useState();
  const [filter, setFilter] = useState({
    category: "All Categories",
    quantity: 10,
    status: "All Status",
  });

  const filterHandler = (type, item) => {
    if (type === "category") {
      setFilter({ ...filter, category: item });
    } else if (type === "quantity") {
      setFilter({ ...filter, quantity: item });
    } else {
      setFilter({ ...filter, status: item });
    }
    setPage(1);
  };

  const setPageHandler = (pageNumber) => {
    setPage(pageNumber);
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://192.168.1.153:3001/v1/categories")
      .then((res) => {
        setCategoriesList(res.data.category);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });

    axios
      .get(
        `http://192.168.1.153:3001/v1/products?quantity=${filter.quantity}&page=${page}&category=${filter.category}&status=${filter.status}`,
        { headers: { "content-type": "application/x-www-form-urlencoded" } }
      )
      .then((res) => {
        setProducts(res.data.products);
        setTotalItems(res.data.totalNumberOfProducts);
        setLastPage(res.data.lastPage);
        setNextPage(res.data.nextPage);
        setPreviousPage(res.data.previousPage);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  }, [filter.quantity, filter.category, filter.status, nextPage, page]);

  console.log(filter);
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
              <DropDown
                name={"Number"}
                type="quantity"
                data={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
                filterHandler={filterHandler}
                filter={filter}
              />
              <DropDown
                name={"Categories"}
                type="category"
                data={["All Categories", ...categoriesList]}
                filterHandler={filterHandler}
                filter={filter}
              />
              <DropDown
                name={"Status"}
                type="status"
                data={["All Status", "Available", "Deleted", "Out of Stock"]}
                filterHandler={filterHandler}
                filter={filter}
              />
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
            <div className="mt-7 min-h-[38rem] w-full">
              <Table data={products} />
            </div>
            {/* Pagination Container */}
            <div className="mt-7 h-full w-full flex flex-row justify-between items-center">
              <p className="text-xs md:text-sm text-text2 font-normal">
                Showing {page === 1 ? 1 : filter.quantity * (page - 1) + 1} to{" "}
                {page === 1 ? filter.quantity : filter.quantity * page + 1} of{" "}
                {totalItems} items
              </p>
              <div className="h-10 bg-bg2 rounded-md flex flex-row space-x-2 items-center px-3">
                {previousPage && (
                  <button onClick={() => setPageHandler(page - 1)}>
                    <img src={arrowLeft} alt="previous" />
                  </button>
                )}
                {page > 2 && (
                  <button
                    className="group py-2 px-3 hover:bg-blue1 hover:rounded-md hover:py-2 hover:px-3 hover:drop-shadow-lg "
                    onClick={() => setPageHandler(1)}>
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
                    onClick={() => setPageHandler(previousPage)}>
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
                    onClick={() => setPageHandler(nextPage)}>
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
                    onClick={() => setPageHandler(lastPage)}>
                    <p className="text-text1 text-sm font-medium group-hover:text-white">
                      {lastPage}
                    </p>
                  </button>
                )}
                {nextPage && (
                  <button onClick={() => setPageHandler(page + 1)}>
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

export default ProductTab;
