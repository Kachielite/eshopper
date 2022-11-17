import { Routes, Route } from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import CustomersTab from "./pages/MenuPages/CustomersTab";
import DashboardTab from "./pages/MenuPages/DashboardTab";
import OrdersTab from "./pages/MenuPages/OrdersTab";
import ProductTab from "./pages/MenuPages/ProductTab";
import ReviewsTab from "./pages/MenuPages/ReviewsTab";
import ResetPassword from "./pages/ResetPassword";
import SignUp from "./pages/Sign-up";

function App() {
  return (
      <Routes>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/forgot_password" element={<ForgotPassword/>}/>
        <Route path="/reset_password/:token" element={<ResetPassword/>}/>
        <Route path="/dashboard" element={<DashboardTab/>}/>
        <Route path="/products" element={<ProductTab/>}/>
        <Route path="/orders" element={<OrdersTab/>}/>
        <Route path="/customers" element={<CustomersTab/>}/>
        <Route path="/reviews" element={<ReviewsTab/>}/>
        <Route path="/" element={<Login />} />
      </Routes>
  );
}

export default App;
