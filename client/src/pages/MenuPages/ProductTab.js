import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setPageHandler, fetchAllProductsHandler, fetchAllCategoriesHandler } from "../../store/slices/product";
import Dashboard from "../Dashboard";
import DropDown from "../../components/DropDown";
import Table from "../../components/Table";
import importIcon from "../../assets/icons/Import.svg";
import printIcon from "../../assets/icons/Print.svg";
import arrowLeft from "../../assets/icons/ArrowLeft.svg";
import arrowRight from "../../assets/icons/ArrowRight.svg";
import homeIcon from "../../assets/icons/Home.svg";
import deleteIcon from "../../assets/icons/Delete.svg";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import SearchBar from "../../components/searchBar";

const ProductTab = () => {
  // const [isLoading, setIsLoading] = useState(false);
  // const [categoriesList, setCategoriesList] = useState([]);
  // const [totalItems, setTotalItems] = useState();
  // const [page, setPage] = useState(1);
  // const [lastPage, setLastPage] = useState();
  // const [nextPage, setNextPage] = useState();
  // const [previousPage, setPreviousPage] = useState();
  // const [filter, setFilter] = useState({
  //   category: "All Categories",
  //   quantity: 10,
  //   status: "All Status",
  // });
  // const [sortedArray, setSortedArray] = useState([]);
  // const [sortOrder, setSortOrder] = useState("desc");
  // const [column, setColumn] = useState("");

  // const filterHandler = (type, item) => {
  //   if (type === "category") {
  //     setFilter((prevState) => {
  //       return { ...prevState, category: item };
  //     });
  //   } else if (type === "quantity") {
  //     setFilter((prevState) => {
  //       return { ...prevState, quantity: item };
  //     });
  //   } else {
  //     setFilter((prevState) => {
  //       return { ...prevState, status: item };
  //     });
  //   }
  //   setPage(1);
  // };

  // const setPageHandler = (pageNumber) => {
  //   setPage(pageNumber);
  // };

  // const sortArrayHandler = (property) => {
  //   setSortOrder("asc");
  //   setColumn(property);

  //   if (property === "date" || property === "price") {
  //     if (sortOrder === "desc") {
  //       let array = [...sortedArray].sort((a, b) => {
  //         if (property === "date") {
  //           a = new Date(a.createdAt);
  //           b = new Date(b.createdAt);
  //         } else {
  //           a = a.price.slice(1);
  //           b = b.price.slice(1);
  //         }
  //         return a - b;
  //       });
  //       setSortedArray(array);
  //     } else {
  //       setSortOrder("desc");
  //       let array = [...sortedArray].sort((a, b) => {
  //         if (property === "date") {
  //           a = new Date(a.createdAt);
  //           b = new Date(b.createdAt);
  //         } else {
  //           a = a.price.slice(1);
  //           b = b.price.slice(1);
  //         }
  //         return b - a;
  //       });
  //       setSortedArray(array);
  //     }
  //   } else {
  //     if (sortOrder === "desc") {
  //       let array = [...sortedArray].sort((a, b) =>
  //         a[property] > b[property] ? 1 : b[property] > a[property] ? -1 : 0
  //       );
  //       setSortedArray(array);
  //     } else {
  //       setSortOrder("desc");
  //       let array = [...sortedArray]
  //         .sort((a, b) =>
  //           a[property] > b[property] ? 1 : b[property] > a[property] ? -1 : 0
  //         )
  //         .reverse();
  //       setSortedArray(array);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   setIsLoading(true);
  //   axios
  //     .get(`${process.env.REACT_APP_ENDPOINT}/v1/products/categories`)
  //     .then((res) => {
  //       setCategoriesList(res.data.category);
  //     })
  //     .catch((error) => {
  //       setIsLoading(false);
  //       console.log(error);
  //     });

  //   axios
  //     .get(
  //       `${process.env.REACT_APP_ENDPOINT}/v1/products?quantity=${filter.quantity}&page=${page}&category=${filter.category}&status=${filter.status}`,
  //       { headers: { "content-type": "application/x-www-form-urlencoded" } }
  //     )
  //     .then((res) => {
  //       setSortedArray(res.data.products);
  //       setTotalItems(res.data.totalNumberOfProducts);
  //       setLastPage(res.data.lastPage);
  //       setNextPage(res.data.nextPage);
  //       setPreviousPage(res.data.previousPage);
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       setIsLoading(false);
  //       console.log(error);
  //     });
  // }, [filter.quantity, filter.category, filter.status, nextPage, page]);
  const dispatch = useDispatch()
  const productData = useSelector(state => state.product)
  const {checkedProduct, filter, categoriesList, isLoading, page, totalItems, nextPage, previousPage, lastPage} = productData; 

  useEffect(() =>{
    dispatch(fetchAllCategoriesHandler())
    dispatch(fetchAllProductsHandler())
  }, [dispatch])



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
            <div className="mt-7 min-h-[38rem] w-full">
              <Table
              />
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
