import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { LineWave } from "react-loader-spinner";
import coverImage from "../assets/images/eshopper.jpeg";
import userIcon from "../assets/icons/User.svg";
import passwordIcon from "../assets/icons/Password.svg";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (values, { setFieldError }) => {
    console.log(values.email)
    setLoading(true);
    axios
      .put("http://172.20.10.4:3001/v1/login", {email: values.email, password: values.password})
      .then((results) => {
        console.log(results);
        setLoading(false);
        navigate("/dashboard");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    // Global Container
    <div className="bg-bg3 min-h-screen  flex flex-col justify-center items-center text-left">
      <div className="flex  max-w-md justify-center items-center bg-red shadow-xl rounded-xl p-3 font-bold transition-all ease-in-out duration-200">
        <p className=' text-white text-md'>Email not found</p>
      </div>
      {/* Login Model Container */}
      <div className="flex flex-row shadow-2xl justify-center mt-4   md:p-0 rounded-xl overflow-hidden mx-6 md:max-w-4xl  md:w-[53rem] md:h-[35rem] md:mx-0">
        {/* Image Container */}
        <div className="hidden md:block md:w-[50%]">
          <img
            src={coverImage}
            alt=""
            className="h-[100%] w-[100%] object-fill"
          />
        </div>
        {/* Input Container */}
        <Formik
          initialValues={{
            email: "",
            password: "",
            rememberMe: false,
          }}
          onSubmit={(values, errors) => {
            handleSubmit(values, errors);
          }}
          validationSchema={validationSchema}>
          {({
            values,
            errors,
            touched,
            handleSubmit,
            handleChange,
            handleBlur,
          }) => {
            return (
              <form
                onSubmit={handleSubmit}
                className=" bg-white px-8 w-screen  py-4 rounded-2xl md:rounded-none md:w-[50%] md:px-10 md:py-2">
                <h1 className="text-text1 py-3 font-bold font-sans text-[1.9rem] text-left">
                  Welcome to <span className="text-blue1">Eshopper</span>
                </h1>
                <p className="w-[60%] text-text2 text-sm font-light font-sans mb-12 text-left md:mt-3 md:text-md md:mb-16 md:w-[50%] ">
                  Welcome Back. Please login to your account
                </p>
                {/* Form Container */}
                <div className="w-full flex flex-col justify-center space-y-4 md:h-[10rem]">
                  <div className="flex flex-col">
                    <div
                      className={`flex flex-row justify-start items-center p-2 bg-bg3 ${
                        touched.email && errors.email ? "border border-red" : ""
                      }`}>
                      <img src={userIcon} alt="user icon" className="mr-3" />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        className="w-full p-1 bg-bg3 font-sans text-text1 outline-none"
                        value={values.email}
                        onChange={handleChange("email")}
                        onBlur={handleBlur("email")}
                      />
                    </div>
                    <p className="text-red text-xs mt-1">
                      {touched.email && errors.email}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <div
                      className={`flex flex-row justify-start items-center p-2 bg-bg3 ${
                        touched.password && errors.password
                          ? "border border-red"
                          : ""
                      }`}>
                      <img
                        src={passwordIcon}
                        alt="lock icon"
                        className="mr-3"
                      />
                      <input
                        type="password"
                        name="Password"
                        placeholder="Password"
                        className="w-full p-1 bg-bg3 font-sans text-text1 outline-none"
                        value={values.password}
                        onChange={handleChange("password")}
                        onBlur={handleBlur("password")}
                      />
                    </div>
                    <p className="text-red text-xs mt-1">
                      {touched.password && errors.password}
                    </p>
                  </div>
                  <div className="flex justify-between items-center font-light">
                    <div className="flex flex-row">
                      <input
                        type="checkbox"
                        name="rememberMe"
                        value={values.rememberMe}
                        onChange={handleChange("rememberMe")}
                        onBlur={handleBlur("rememberMe")}
                        className="mr-1"
                      />
                      <p className="text-text2 font-sans font-light text-xs">
                        Remember me
                      </p>
                    </div>
                    <Link
                      to="/forgot_password"
                      className="text-blue1 font-sans font-light text-xs">
                      Forgot password?
                    </Link>
                  </div>
                </div>
                {loading ? (
                  <div className="flex justify-center items-center">
                    <LineWave
                      height="100"
                      width="100"
                      color="#4fa94d"
                      ariaLabel="line-wave"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                      firstLineColor="#0081FF"
                      middleLineColor="#0081FF"
                      lastLineColor="#0081FF"
                    />
                  </div>
                ) : (
                  <button
                    type="submit"
                    disabled={errors.email || errors.password ? true : false}
                    className={
                      errors.email || errors.password
                        ? `bg-blue-300 rounded-md text-white text-md mt-24 w-full p-3 md:mt-20`
                        : `bg-blue1 text-white text-md mt-24 w-full p-3 rounded-md shadow-lg  shadow-blue-200 hover:shadow-none border-2 border-blue1 hover:bg-white hover:text-blue1 hover:border-2 hover:border-blue1  duration-100 md:mt-20 `
                    }>
                    Login
                  </button>
                )}
                <p className="text-text2 font-sans font-light text-xs text-center mt-12 mb-1">
                  Don't have an account?{" "}
                  <span>
                    {" "}
                    <Link
                      to="/sign-up"
                      className="text-blue1 font-sans font-light text-xs">
                      Sign Up
                    </Link>
                  </span>
                </p>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
