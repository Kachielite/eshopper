import { useState } from "react";
import RevenueChart from "./RevenueChart";
import tradeUpIcon from "../../assets/icons/Trade-up.svg";
import tradeDownIcon from "../../assets/icons/Trade-down.svg";

const RevenueStats = () => {
  const [type, setType] = useState('text')
  return (
    <div className="w-full h-full md:w-[70%] md:h-[32rem] py-9 px-6 md:px-10  bg-bg2 rounded-xl">
      <div className="flex flex-col justify-center items-center space-y-6 md:space-y-0 md:flex-row  w-full md:justify-between md:items-center">
        <h2 className="font-bold text-text1 text-xl text-center md:text-left ">Revenue</h2>
        <div className="w-full flex flex-row">
          <div date-rangepicker class="flex flex-row justify-center items-center w-full">
            <div class="w-32">
              <input
                name="start"
                type={type}
                onFocus={() => setType("date")}
                class="bg-bgWhite border  placeholder:text-text1  sm:text-sm rounded-lg block w-full px-2 p-2 "
                placeholder="Start Date"
              />
            </div>
            <span class="mx-4 text-gray-500">to</span>
            <div class="w-32">
              <input
                name="end"
                type={type}
                onFocus={() => setType("date")}
                class="bg-bgWhite border placeholder:text-text1 sm:text-sm rounded-lg block w-full px-2 py-2 "
                placeholder="End Date"
              />
            </div>
          </div>
        </div>
        <div className="w-36 bg-bgWhite rounded-lg">
          <select
            name=""
            id=""
            className="w-[90%] bg-bgWhite p-2 rounded-lg outline-none text-text1">
            <option value="">Weekly</option>
          </select>
        </div>
      </div>
      <div className="mt-11 flex flex-row justify-between md:justify-start md:space-x-20 w-full ">
        <div className="w-44 flex flex-col space-y-4 justify-start">
          <p className="font-medium text-sm text-text1">Current Week</p>
          <div className="flex flex-row space-x-1 items-center">
            <p className="text-red text-2xl md:text-4xl font-normal">$180</p>
            <img src={tradeUpIcon} alt="trade down" />
            <div className="flex justify-center items-center w-7 h-5 text-white font-normal text-xs bg-green rounded-xl ">
              5%
            </div>
          </div>
        </div>
        <div className="w-44 flex flex-col space-y-4 justify-start">
          <p className="font-medium text-sm text-text1">Previous Week</p>
          <div className="flex flex-row space-x-1 items-center">
            <p className="text-text2 text-2xl md:text-4xl font-normal">$52.30</p>
            <img src={tradeDownIcon} alt="trade down" />
            <div className="flex justify-center items-center w-7 h-5 text-white font-normal text-xs bg-red rounded-xl ">
              2%
            </div>
          </div>
        </div>
      </div>
      <div className="h-[16rem] w-full object-cover mt-8">
      <RevenueChart/>
      </div>
    </div>
  );
};

export default RevenueStats;
