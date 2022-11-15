import profitUp from "../../assets/icons/ProfitArrowUp.svg";
import profitDown from "../../assets/icons/ProfitArrowDown.svg";
import ProfitCharts from "./ProfitCharts";

const ProfitStats = () => {
  return (
    <div className="bg-bg2 h-[32rem] w-full md:w-[28%] rounded-xl flex flex-col space-y-2 justify-between items-center overflow-hidden">
      <div className=" py-9 px-6 w-full">
        <h2 className="font-bold text-text1 text-xl text-center md:text-left ">
          Profit
        </h2>
        <div className="relative flex justify-center items-center w-full">
          {/* <div className="relative mt-8 flex flex-col justify-center item-center space-y-2 w-64 h-64 rounded-full border-[1.3rem] border-blue1 text-center">
            <div className="absolute w-full h-full  border-8 border-green rounded-full"></div>
          </div> */}
          <div className="absolute text-center">
          <h2 className="font-bold text-text1 text-3xl ">$500</h2>
            <p className="font-normal text-text2 text-sm ">Total</p>
          </div>
          <div className="h-64 w-64">
            <ProfitCharts />
          </div>
        </div>
      </div>
      <div className="h-[35%] w-full bg-bg1 px-6 py-4 flex flex-col space-y-2">
        <div className="w-full flex flex-row justify-between items-center">
          <div className="flex flex-row space-x-2 item-center mr-12">
            <div className="my-auto w-2 h-2 rounded-full bg-red "></div>
            <p className="font-normal text-text1 text-base w-14">Current</p>
          </div>
          <div className="flex flex-row space-x-2 item-center">
            <p className="font-normal text-text1 text-base">$500</p>
            <img src={profitUp} alt="profit up" />
          </div>
          <p className="font-normal text-text1 text-base">37%</p>
        </div>
        <div className="w-full flex flex-row justify-between items-center">
          <div className="flex flex-row space-x-2 item-center mr-12">
            <div className="my-auto w-2 h-2 rounded-full bg-blue2 "></div>
            <p className="font-normal text-text1 text-base w-14">Target</p>
          </div>
          <div className="flex flex-row space-x-2 item-center">
            <p className="font-normal text-text1 text-base">$450</p>
            <img src={profitDown} alt="profit up" />
          </div>
          <p className="font-normal text-text1 text-base">35%</p>
        </div>
        <div className="w-full flex flex-row justify-between items-center">
          <div className="flex flex-row space-x-2 item-center mr-12">
            <div className="my-auto w-2 h-2 rounded-full bg-yellow "></div>
            <p className="font-normal text-text1 text-base w-14">Loss</p>
          </div>
          <div className="flex flex-row space-x-2 item-center">
            <p className="font-normal text-text1 text-base">$300</p>
            <img src={profitDown} alt="profit up" />
          </div>
          <p className="font-normal text-text1 text-base">28%</p>
        </div>
      </div>
    </div>
  );
};

export default ProfitStats;
