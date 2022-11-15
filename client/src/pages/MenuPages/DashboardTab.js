import Statistics from "../../components/Statistics/Statistics";
import RevenueStats from "../../components/revenue/RevenueStats";
import ProfitStats from "../../components/profit/ProfitStats";


const DashboardTab = () => {
  return (
    <div className="w-full mb-24">
      <div className="w-full flex flex-col py-12 px-3 md:px-8 space-y-8">
        <Statistics />
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row justify-between h-full bg-bgWhite">
          <RevenueStats />
          <ProfitStats />
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;
