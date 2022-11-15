const ProfitStats = () => {
  return (
    <div className="bg-bg2 h-[32rem] w-[28%] rounded-xl flex flex-col space-y-2 justify-between items-center">
      <div className="relative mt-8 flex flex-col justify-center item-center space-y-2 w-64 h-64 rounded-full border-[1.3rem] border-blue1 text-center">
        <div className="absolute w-full h-full  border-8 border-green rounded-full"></div>
        <h2 className="font-bold text-text1 text-3xl ">$500</h2>
        <p className="font-normal text-text1 text-xs ">Total</p>
      </div>
      <div className="h-[35%] w-full bg-bg3 p-6">
            new
      </div>
    </div>
  );
};

export default ProfitStats;
