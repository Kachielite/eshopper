import { useState, useEffect } from "react";
import axios from "axios";
import searchIcon from "../assets/icons/Search.svg";
import { Transition } from "@headlessui/react";

const SearchBar = () => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const onChangeHandler = (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    if (query.length < 3) {
      setShowSuggestions(false);
      return;
    } else {
      axios
        .post(`${process.env.REACT_APP_ENDPOINT}/v1/products/search`, {
          query: query,
        })
        .then((res) => {
          if (res.data.searchResults.length === 0) {
            setShowSuggestions(false);
          } else {
            setSuggestions(res.data.searchResults);
            setShowSuggestions(true);
          }
        })
        .catch((error) => {
          setShowSuggestions(false);
          console.log(error);
        });
    }
  }, [query]);

  return (
    <div className="flex flex-col justify-start bg-bg2 w-72 h-10 py-2.5 px-3.5 rounded-lg shadow-sm">
      <div className="flex flex-row justify-start w-full">
        <img src={searchIcon} alt="search" className="mr-1.5" />
        <input
          type="text"
          name="search"
          placeholder="Search product"
          className="bg-bg2 outline-none text-text1 text-base font-normal placeholder:text-sm w-full"
          onChange={onChangeHandler}
          value={query}
        />
      </div>
      <Transition
        className={`bg-bg2 w-full ml-3 mt-2 py-1 px-3.5 shadow-xl rounded`}
        show={showSuggestions}
        enter="transition ease-out duration-700"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-700"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
        onMouseLeave={() => setShowSuggestions(false)}>
        <ol className="max-h-48 overflow-hidden overflow-y-auto">
          {suggestions.map((item, index) => {
            return (
              <li
                className="text-text1 font-medium text-sm px-1 py-2 border-text1 border-b-[0.05rem] cursor-pointer hover:bg-bg3 flex flex-row space-x-2 items-center"
                key={index}>
                {item.product_name} -{" "}
                <span className="text-text1 text-xs font-normal ml-1">
                  {item.category}
                </span>{" "}
                <span className="flex flex-row">
                  <div
                    className={`my-auto w-1.5 h-1.5 rounded-full ${
                      item.status === "Deleted"
                        ? "bg-red"
                        : item.status === "Available"
                        ? "bg-green"
                        : "bg-bg4"
                    } mr-2`}></div>
                  <p className="text-text2 text-xs">{item.status}</p>
                </span>
              </li>
            );
          })}
        </ol>
      </Transition>
    </div>
  );
};

export default SearchBar;
