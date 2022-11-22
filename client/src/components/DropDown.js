import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function DropDown({ name, data, type, filter, filterHandler }) {

  
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md border  bg-white px-4 py-2 text-sm font-medium text-text1 shadow-sm hover:bg-gray-50 focus:outline-none ">
          {filter.category || filter.quantity || filter.status ? (type === "category" ? filter.category : type === "quantity" ? filter.quantity : type === "status" ? filter.status:""): data[0] }
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        <Menu.Items className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1 max-h-48 overflow-y-auto">
            {data.map((item, index) => {
              return (
                <Menu.Item key={index}>
                  <p onClick={() => filterHandler(type, item)} className="text-center text-text1 text-md py-1 font-medium hover:bg-bg4 cursor-pointer">
                    {item}
                  </p>
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
