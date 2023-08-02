import { Routes, Route } from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import AddProduct from "./pages/MenuPages/AddProduct";
import CustomersTab from "./pages/MenuPages/CustomersTab";
import DashboardTab from "./pages/MenuPages/DashboardTab";
import OrdersTab from "./pages/MenuPages/OrdersTab";
import ProductTab from "./pages/MenuPages/ProductTab";
import ReviewsTab from "./pages/MenuPages/ReviewsTab";
import ResetPassword from "./pages/ResetPassword";
import SignUp from "./pages/Sign-up";
import {Toaster} from "react-hot-toast";

function App() {
  return (
      <>
          <Routes>
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/forgot_password" element={<ForgotPassword />} />
              <Route path="/reset_password/:token" element={<ResetPassword />} />
              <Route path="/dashboard" element={<DashboardTab />} />
              <Route path="/products/add_product" element={<AddProduct />} />
              <Route path="/products" element={<ProductTab />} />
              <Route path="/orders" element={<OrdersTab />} />
              <Route path="/customers" element={<CustomersTab />} />
              <Route path="/reviews" element={<ReviewsTab />} />
              <Route path="/" element={<Login />} />
          </Routes>
          <Toaster
              position="top-center"
              reverseOrder={false}
              gutter={8}
          />
      </>

  );
}

export default App;
