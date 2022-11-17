import arrowDownIcon from "../assets/icons/ArrowDown.svg";

const Table = () => {
  const data = [
    {
      id: "#790841",
      product_name: "MacBook Pro 15” (Mid 2018)",
      category: "Notebook",
      price: 2500,
      date: "12.07.2018",
      status: "Published",
    },
    {
      id: "#790841",
      product_name: "MacBook Pro 15” (Mid 2018)",
      category: "Notebook",
      price: 2500,
      date: "12.07.2018",
      status: "Published",
    },
    {
      id: "#790841",
      product_name: "MacBook Pro 15” (Mid 2018)",
      category: "Notebook",
      price: 2500,
      date: "12.07.2018",
      status: "Published",
    },
    {
      id: "#790841",
      product_name: "MacBook Pro 15” (Mid 2018)",
      category: "Notebook",
      price: 2500,
      date: "12.07.2018",
      status: "Published",
    },
    {
      id: "#790841",
      product_name: "MacBook Pro 15” (Mid 2018)",
      category: "Notebook",
      price: 2500,
      date: "12.07.2018",
      status: "Published",
    },
    {
      id: "#790841",
      product_name: "MacBook Pro 15” (Mid 2018)",
      category: "Notebook",
      price: 2500,
      date: "12.07.2018",
      status: "Published",
    },
    {
      id: "#790841",
      product_name: "MacBook Pro 15” (Mid 2018)",
      category: "Notebook",
      price: 2500,
      date: "12.07.2018",
      status: "Published",
    },
    {
      id: "#790841",
      product_name: "MacBook Pro 15” (Mid 2018)",
      category: "Notebook",
      price: 2500,
      date: "12.07.2018",
      status: "Published",
    },
    {
      id: "#790841",
      product_name: "MacBook Pro 15” (Mid 2018)",
      category: "Notebook",
      price: 2500,
      date: "12.07.2018",
      status: "Deleted",
    },
    {
      id: "#790841",
      product_name: "MacBook Pro 15” (Mid 2018)",
      category: "Notebook",
      price: 2500,
      date: "12.07.2018",
      status: "Published",
    },
  ];
  return (
    <div class="flex flex-col bg-bg2 rounded-md overflow-x-hidden">
      <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div class="overflow-hidden">
            <table class="min-w-full">
              <thead class="border-b">
                <tr>
                  <th
                    scope="col"
                    class="text-sm font-medium  px-6 pb-3.5 pt-4 text-left">
                    <input type="checkbox" name="" id="" />
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium text-text1 px-6 pb-3.5 pt-4 text-left">
                    <h3>ID</h3>
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium text-text1 px-6 pb-3.5 pt-4 text-left ">
                    <div className="flex flex-row item-center">
                      <h3>PRODUCT NAME</h3>
                      <img src={arrowDownIcon} alt="sort" />
                    </div>
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium text-text1 px-6 pb-3.5 pt-4 text-left">
                    <div className="flex flex-row items-center">
                      <h3>CATEGORY</h3>
                      <img src={arrowDownIcon} alt="sort" />
                    </div>
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium text-text1 px-6 pb-3.5 pt-4 text-left">
                    <div className="flex flex-row items-center">
                      <h3>PRICE</h3>
                      <img src={arrowDownIcon} alt="sort" />
                    </div>
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium text-text1 px-6 pb-3.5 pt-4 text-left">
                    <div className="flex flex-row items-center">
                      <h3>DATE</h3>
                      <img src={arrowDownIcon} alt="sort" />
                    </div>
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium text-text1 px-6 pb-3.5 pt-4 text-left">
                    <div className="flex flex-row items-center">
                      <h3>STATUS</h3>
                      <img src={arrowDownIcon} alt="sort" />
                    </div>
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium text-text1 px-6 pb-3.5 pt-4 text-left"></th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => {
                  return (
                    <tr class="border-b">
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <input
                          type="checkbox"
                          name=""
                          id=""
                          className="outline-none"
                        />
                      </td>
                      <td class="text-sm text-text2 font-normal px-6 py-4 whitespace-nowrap">
                        {item.id}
                      </td>
                      <td class="text-sm text-text1 font-normal px-6 py-4 whitespace-nowrap">
                        {item.product_name}
                      </td>
                      <td class="text-sm text-text2 font-normal px-6 py-4 whitespace-nowrap">
                        {item.category}
                      </td>
                      <td class="text-sm text-text1 font-normal px-6 py-4 whitespace-nowrap">
                        ${item.price}
                      </td>
                      <td class="text-sm text-text2 font-normal px-6 py-4 whitespace-nowrap">
                        {item.date}
                      </td>
                      <td class="text-sm text-text1 font-normal px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-row">
                          <div className={`my-auto w-1.5 h-1.5 rounded-full ${item.status === 'Deleted'? "bg-red":"bg-green"} mr-2`}></div>
                          {item.status}
                        </div>
                      </td>
                      <td class="text-sm text-text2 font-normal px-6 py-4 whitespace-nowrap">
                        ...
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
