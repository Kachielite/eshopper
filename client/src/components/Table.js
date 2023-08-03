import { useState } from "react";
import { Transition } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import {
  checkAllProductsHandler,
  checkProductHandler,
  sortProductsHandler,
} from "../store/slices/product";
import arrowDownIcon from "../assets/icons/ArrowDown.svg";
import deleteIcon from "../assets/icons/Delete.svg";
import editIcon from "../assets/icons/Task.svg";
import viewIcon from "../assets/icons/Pages.svg";
import {Link} from "react-router-dom";

const Table = ({ data }) => {
  const [showOption, setShowOption] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();

  const showOptionHandler = (index) => {
    setSelectedProduct(index);
    if (showOption) {
      setShowOption(false);
    } else {
      setShowOption(true);
    }
  };

  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product);
  const { checked, checkedProduct, column, sortOrder } = productData;

  return (
    <div className="flex flex-col bg-bg2 rounded-md overflow-x-hidden ">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium  px-6 pb-3.5 pt-4 text-left">
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      onChange={() => dispatch(checkAllProductsHandler(data))}
                      checked={checked}
                    />
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-text1 px-6 pb-3.5 pt-4 text-left">
                    <h3>ID</h3>
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-text1 px-6 pb-3.5 pt-4 text-left ">
                    <div className="flex flex-row item-center">
                      <h3>PRODUCT NAME</h3>
                      <img
                        src={arrowDownIcon}
                        alt="sort"
                        onClick={() =>
                          dispatch(
                            sortProductsHandler({ property: "product_name" })
                          )
                        }
                        className={
                          column === "product_name" && sortOrder === "asc"
                            ? "rotate-180 duration-100 "
                            : " duration"
                        }
                      />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-text1 px-6 pb-3.5 pt-4 text-left">
                    <div className="flex flex-row items-center">
                      <h3>CATEGORY</h3>
                      <img
                        src={arrowDownIcon}
                        alt="sort"
                        onClick={() =>
                          dispatch(
                            sortProductsHandler({ property: "category" })
                          )
                        }
                        className={
                          column === "category" && sortOrder === "asc"
                            ? "rotate-180 duration-100 "
                            : " duration"
                        }
                      />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-text1 px-6 pb-3.5 pt-4 text-left">
                    <div className="flex flex-row items-center">
                      <h3>PRICE</h3>
                      <img
                        src={arrowDownIcon}
                        alt="sort"
                        onClick={() =>
                          dispatch(sortProductsHandler({ property: "price" }))
                        }
                        className={
                          column === "price" && sortOrder === "asc"
                            ? "rotate-180 duration-100 "
                            : " duration"
                        }
                      />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-text1 px-6 pb-3.5 pt-4 text-left">
                    <div className="flex flex-row items-center">
                      <h3>DATE</h3>
                      <img
                        src={arrowDownIcon}
                        alt="sort"
                        onClick={() =>
                          dispatch(sortProductsHandler({ property: "date" }))
                        }
                        className={
                          column === "date" && sortOrder === "asc"
                            ? "rotate-180 duration-100 "
                            : " duration"
                        }
                      />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-text1 px-6 pb-3.5 pt-4 text-left">
                    <div className="flex flex-row items-center">
                      <h3>STATUS</h3>
                      <img
                        src={arrowDownIcon}
                        alt="sort"
                        onClick={() =>
                          dispatch(sortProductsHandler({ property: "status" }))
                        }
                        className={
                          column === "status" && sortOrder === "asc"
                            ? "rotate-180 duration-100 "
                            : " duration"
                        }
                      />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-text1 px-6 pb-3.5 pt-4 text-left"></th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => {
                  let id = item._id;
                  return (
                    <tr className="border-b" key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <input
                          type="checkbox"
                          name=""
                          id={id}
                          className="outline-none border-none"
                          onChange={(e) =>
                            dispatch(
                              checkProductHandler({
                                id: e.target.id,
                                checked: e.target.checked,
                              })
                            )
                          }
                          checked={
                            !!(checked || checkedProduct.find((e) => e.id === id))
                          }
                        />
                      </td>
                      <td className="text-sm text-text2 font-normal px-6 py-4 whitespace-nowrap">
                        #{item._id.slice(20)}
                      </td>
                      <td className="text-sm text-text1 font-normal px-6 py-4 whitespace-nowrap">
                        {item.product_name}
                      </td>
                      <td className="text-sm text-text2 font-normal px-6 py-4 whitespace-nowrap">
                        {item.category}
                      </td>
                      <td className="text-sm text-text1 font-normal px-6 py-4 whitespace-nowrap">
                        ${Math.ceil(item.price.slice(1))}
                      </td>
                      <td className="text-sm text-text2 font-normal px-6 py-4 whitespace-nowrap">
                        {new Date(
                          item.createdAt.replace(/^"(.*)"$/, "$1")
                        ).toLocaleDateString("en-GB")}
                      </td>
                      <td className="text-sm text-text1 font-normal px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-row">
                          <div
                            className={`my-auto w-1.5 h-1.5 rounded-full ${
                              item.status === "Deleted"
                                ? "bg-red"
                                : item.status === "Available"
                                ? "bg-green"
                                : "bg-bg4"
                            } mr-2`}></div>
                          {item.status}
                        </div>
                      </td>
                      <td
                        className="relative text-sm text-text2 font-normal px-6 py-4 whitespace-nowrap cursor-pointer"
                        onClick={() => showOptionHandler(index)}>
                        ...
                        <Transition
                          className={`absolute right-1 top-7 drop-shadow-2xl z-10 w-28 `}
                          show={selectedProduct === index && showOption? true : false}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0 translate-y-0"
                          enterTo="opacity-100 translate-y-1"
                          leave="transition ease-in duration-200"
                          leaveFrom="opacity-100 translate-y-1"
                          leaveTo="opacity-0 translate-y-0"
                          onMouseLeave={() => setShowOption(false)}>
                          <div className="w-full overflow-hidden flex flex-col items-end pr-12">
                            <div className=" h-3 w-3 bg-bg2 rotate-45 transform origin-bottom-left border"></div>
                          </div>
                          <div className="flex flex-col bg-bg2 text-text1 rounded-md">
                            <div className="flex flex-row items-center justify-start px-5 py-2 space-x-2.5 cursor-pointer space-y-1 hover:bg-bg3 ">
                              <img src={viewIcon} alt="view" />
                              <Link to={`/products/${item._id}`}>View</Link>
                            </div>
                            <div className="flex flex-row items-center justify-start px-5 py-2 space-x-2.5 cursor-pointer space-y-1 hover:bg-bg3">
                              <img src={editIcon} alt="edit" />
                              <p>Edit</p>
                            </div>
                            <div className="flex flex-row items-center justify-start px-5 py-2 space-x-2.5 cursor-pointer space-y-1 hover:bg-bg3">
                              <img src={deleteIcon} alt="delete" />
                              <p>Delete</p>
                            </div>
                          </div>
                        </Transition>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
