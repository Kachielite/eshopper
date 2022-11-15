import Statistics from "../../components/Statistics";
import RevenueStats from "../../components/revenue/RevenueStats";
import ProfitStats from "../../components/profit/ProfitStats";

const DashboardTab = () => {
  return (
    <div className="w-full flex flex-col py-12 px-8 space-y-8">
      <Statistics />
      <div className="flex flex-row justify-between">
        <RevenueStats/>
        <ProfitStats/>
      </div>
    </div>
  );
};

export default DashboardTab;
