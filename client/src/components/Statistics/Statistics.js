import tradeUpIcon from "../../assets/icons/Trade-up.svg";
import tradeDownIcon from "../../assets/icons/Trade-down.svg";
import StatsChart from "./StatsChart";

const Statistics = () => {
  return (
    <div className="w-full h-full flex flex-col md:flex-row space-y-4 md:space-y-0 items-center  md:justify-between">
      {/* Visit Stats */}
      <div className="flex flex-row justify-center items-center space-x-1 h-full w-full md:w-[32%]  bg-bg2 px-8 py-6 rounded-xl">
        {/* Number Stats */}
        <div className="w-1/2 h-full flex flex-col  items-start">
          <h2 className="font-bold text-text1 text-xl ">Visit</h2>
          <p className="font-normal text-text2 text-base mt-4">
            Total visits today
          </p>
          <div className="flex flex-row items-center mt-3 space-x-3">
            <h3 className="font-bold text-text1 text-xl">4000</h3>
            <img src={tradeUpIcon} alt="trade up" />
            <div className="flex justify-center items-center w-7 h-5 text-white font-normal text-xs bg-green rounded-xl ">
              7%
            </div>
          </div>
          <p className="font-medium text-text1 text-base underline mt-3">
            Details
          </p>
        </div>
        {/* Graph Stats */}
        <div className="relative flex flex-col justify-center item-center">
          <div className="absolute w-40 h-40 flex justify-center items-center flex-col">
            <h2 className="font-bold text-text1 text-3xl ">65%</h2>
            <p className="font-normal text-text1 text-xs ">New Visits</p>
          </div>
          <div className=" w-40 h-40">
            <StatsChart color={"#22CCE2"} percentage={65}/>
          </div>
        </div>
      </div>
      {/* Orders Stats */}
      <div className="flex flex-row justify-center items-center space-x-1 h-full w-full md:w-[32%]  bg-bg2 px-8 py-6 rounded-xl">
        {/* Number Stats */}
        <div className="w-1/2 h-full flex flex-col  items-start">
          <h2 className="font-bold text-text1 text-xl ">Orders</h2>
          <p className="font-normal text-text2 text-base mt-4">
            Total visits today
          </p>
          <div className="flex flex-row items-center mt-3 space-x-3">
            <h3 className="font-bold text-text1 text-xl">1000</h3>
            <img src={tradeDownIcon} alt="trade down" />
            <div className="flex justify-center items-center w-7 h-5 text-white font-normal text-xs bg-red rounded-xl ">
              3%
            </div>
          </div>
          <p className="font-medium text-text1 text-base underline mt-3">
            Details
          </p>
        </div>
        {/* Graph Stats */}
        <div className="relative flex flex-col justify-center item-center">
          <div className="absolute w-40 h-40 flex justify-center items-center flex-col">
            <h2 className="font-bold text-text1 text-3xl ">75%</h2>
            <p className="font-normal text-text1 text-xs ">New Orders</p>
          </div>
          <div className=" w-40 h-40">
            <StatsChart color={"#FDBF5E"} percentage={75}/>
          </div>
        </div>
      </div>
      {/* Visit Stats */}
      <div className="flex flex-row justify-center items-center space-x-1 h-full w-full md:w-[32%]  bg-bg2 px-8 py-6 rounded-xl">
        {/* Number Stats */}
        <div className="w-1/2 h-full flex flex-col  items-start">
          <h2 className="font-bold text-text1 text-xl ">Sales</h2>
          <p className="font-normal text-text2 text-base mt-4">
            Total visits today
          </p>
          <div className="flex flex-row items-center mt-3 space-x-3">
            <h3 className="font-bold text-text1 text-xl">$500</h3>
            <img src={tradeUpIcon} alt="trade up" />
            <div className="flex justify-center items-center w-7 h-5 text-white font-normal text-xs bg-green rounded-xl ">
              9%
            </div>
          </div>
          <p className="font-medium text-text1 text-base underline mt-3">
            Details
          </p>
        </div>
        {/* Graph Stats */}
        <div className="relative flex flex-col justify-center item-center">
          <div className="absolute w-40 h-40 flex justify-center items-center flex-col">
            <h2 className="font-bold text-text1 text-3xl ">80%</h2>
            <p className="font-normal text-text1 text-xs ">New Sales</p>
          </div>
          <div className=" w-40 h-40">
            <StatsChart color={"#FF3D57"} percentage={80}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
