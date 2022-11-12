import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import SignUp from "./pages/Sign-up";

function App() {
  return (
      <Routes>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/forgot_password" element={<ForgotPassword/>}/>
        <Route path="/reset_password/:token" element={<ResetPassword/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/" element={<Login />} />
      </Routes>
  );
}

export default App;
