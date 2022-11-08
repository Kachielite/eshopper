import {Link} from 'react-router-dom'
import coverImage from "../assets/images/eshopper.jpeg";
import userIcon from "../assets/icons/User.svg";
import passwordIcon from "../assets/icons/Password.svg";

const Login = () => {
  return (
    // Global Container
    <div className="bg-bg3 min-h-screen  flex flex-row justify-center items-center text-left">
      {/* Login Model Container */}
      <div className="flex flex-row shadow-2xl justify-center  md:p-0 rounded-xl overflow-hidden md:max-w-4xl md:mx-2">
        {/* Image Container */}
        <div className="hidden md:block md:w-[50%]">
          <img src={coverImage} alt="" className="h-100 w-100 " />
        </div>
        {/* Input Container */}
        <div className=" bg-white px-12 py-4 w-[90vw] rounded-2xl md:rounded-none md:w-[50%] md:px-10 md:py-2">
          <h1 className="text-text1 py-3 font-bold font-sans text-[1.9rem] text-left">
            Welcome to <span className="text-blue1">Eshopper</span>
          </h1>
          <p className="w-[60%] text-text2 text-sm font-light font-sans mb-12 text-left md:mt-3 md:text-md md:mb-16 md:w-[50%] ">
            Welcome Back. Please login to your account
          </p>
          {/* Form Container */}
          <div className="w-full flex flex-col justify-center space-y-4">
          <div className="flex flex-row justify-start items-center p-2 bg-bg3">
              <img src={userIcon} alt="" srcset="" className="mr-3" />
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="w-full p-1 bg-bg3 font-sans text-text1 outline-none "
              />
            </div>
            <div className="flex flex-row justify-start items-center p-2 bg-bg3 ">
              <img src={passwordIcon} alt="" srcset="" className="mr-3" />
              <input
                type="password"
                name="Password"
                placeholder="Password"
                className="w-full p-1 bg-bg3 font-sans text-text1 outline-none"
              />
            </div>
            <div className="flex justify-between items-center font-light">
              <div className="flex flex-row">
                <input type="checkbox" name="" id="" className="mr-1" />
                <p className="text-text2 font-sans font-light text-xs">
                  Remember me
                </p>
              </div>
              <a href="/" className="text-blue1 font-sans font-light text-xs">
                Forgot password?
              </a>
            </div>
          </div>
          <button className="bg-blue1 text-white text-md mt-24 w-full p-3 rounded-md shadow-lg border-2 border-blue1 hover:bg-white hover:text-blue1 hover:border-2 hover:border-blue1  duration-100 ">
            Login
          </button>
          <p className="text-text2 font-sans font-light text-xs text-center mt-12 mb-1">
            Don't have an account?{" "}
            <span>
              {" "}
              <Link to="/sign-up" className="text-blue1 font-sans font-light text-xs">
                Sign Up
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
