import { Routes, Route } from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import SignUp from "./pages/Sign-up";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/forgot_password" element={<ForgotPassword/>}/>
        <Route path="/reset_password" element={<ResetPassword/>}/>
      </Routes>
  );
}

export default App;
