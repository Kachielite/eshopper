import coverImage from "../assets/images/reset.jpeg";
import userIcon from "../assets/icons/User.svg";
import emailIcon from "../assets/icons/Email.svg";
import passwordIcon from "../assets/icons/Password.svg";

const ResetPassword = () => {
  return (
    // Global Container
    <div className="bg-bg3 min-h-screen  flex flex-row justify-center items-center text-left">
      {/* Sign up Model Container */}
      <div className="flex flex-row shadow-2xl justify-center  md:p-0 rounded-xl overflow-hidden mx-6 md:max-w-4xl  md:w-[53rem] md:h-[35rem] md:mx-0">
        {/* Image Container */}
        <div className="hidden md:block md:w-[50%]">
          <img src={coverImage} alt="" className="h-[100%] w-[100%] object-cover" />
        </div>
        {/* Input Container */}
        <div className=" bg-white px-8 w-screen  py-8 rounded-2xl md:rounded-none md:w-[50%] md:px-10 md:py-2">
          <h1 className="text-text1 py-3 font-bold font-sans text-[1.9rem] text-left mb-[1.5rem] md:mb-20">
            Reset Password
          </h1>
          {/* Form Container */}
          <div className="w-full flex flex-col justify-center space-y-4">
            <div className="flex flex-row justify-start items-center p-2 bg-bg3">
              <img src={userIcon} alt="" srcset="" className="mr-3" />
              <input
                type="text"
                name="name"
                placeholder="Name"
                readOnly
                className="w-full p-1 bg-bg3 font-sans text-text1 outline-none "
              />
            </div>
            <div className="flex flex-row justify-start items-center p-2 bg-bg3">
              <img src={emailIcon} alt="" srcset="" className="mr-3" />
              <input
                type="text"
                name="email"
                readOnly
                placeholder="Email Address"
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
            <div className="flex flex-row justify-start items-center p-2 bg-bg3 ">
              <img src={passwordIcon} alt="" srcset="" className="mr-3" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="w-full p-1 bg-bg3 font-sans text-text1 outline-none"
              />
            </div>
          </div>
          <button className="bg-blue1 text-white text-md mt-10 w-full p-3 rounded-md shadow-lg border-2 border-blue1 md:mt-20 shadow-blue-300  hover:bg-white hover:text-blue1 hover:border-2 hover:border-blue1 hover:shadow-none duration-100 ">
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
