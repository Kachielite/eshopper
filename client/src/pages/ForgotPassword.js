import { Link } from "react-router-dom";
import lockIcon from "../assets/icons/Lock.svg";
import emailIcon from "../assets/icons/Email.svg";

const ForgotPassword = () => {
  return (
    // Global Container
    <div className="bg-bg3 min-h-screen  flex flex-row justify-center items-center text-left">
      {/* Login Model Container */}
      <div className="flex flex-col shadow-2xl justify-center rounded-xl w-[27rem] h-[29rem] overflow-hidden mx-8 md:mx-0">
        <div className="flex flex-col justify-center items-center bg-white h-[50%] w-[100%]">
          <img src={lockIcon} alt="" className="w-24 h-32 object-fill" />
          <p className="text-3xl text-text1 mt-4">Forgot Password?</p>
        </div>
        <div className="flex flex-col justify-center space-y-7 px-10 h-[50%] w-[100%]">
          <div className="flex flex-row justify-start items-center p-2 bg-white w-full">
            <img src={emailIcon} alt="" srcset="" className="mr-3" />
            <input
              type="text"
              name="email"
              placeholder="Email Address"
              className="w-full p-1 bg-white font-sans text-text1 outline-none "
            />
          </div>
          <button className="bg-blue1 text-white text-md mt-24 w-full p-3 rounded-md shadow-xl hover:shadow-none shadow-blue-200 border-2 border-blue1 hover:bg-white hover:text-blue1 hover:border-2 hover:border-blue1  duration-100 ">
            Reset Password
          </button>
          <Link to="/" className="text-blue1 font-sans font-light text-xs text-center">
            Go back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
