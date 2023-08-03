import { Routes, Route } from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import AddProduct from "./pages/MenuPages/ProductTab/AddProduct";
import CustomersTab from "./pages/MenuPages/CustomersTab";
import DashboardTab from "./pages/MenuPages/DashboardTab";
import OrdersTab from "./pages/MenuPages/OrdersTab";
import Index from "./pages/MenuPages/ProductTab";
import ReviewsTab from "./pages/MenuPages/ReviewsTab";
import ResetPassword from "./pages/ResetPassword";
import SignUp from "./pages/Sign-up";
import {Toaster} from "react-hot-toast";
import Product from "./pages/MenuPages/ProductTab/Product";

function App() {
  return (
      <>
          <Routes>
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/forgot_password" element={<ForgotPassword />} />
              <Route path="/reset_password/:token" element={<ResetPassword />} />
              <Route path="/dashboard" element={<DashboardTab />} />
              <Route path="/products/add_product" element={<AddProduct />} />
              <Route path="/products" element={<Index />} />
              <Route path="/products/:id" element={<Product />} />
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
