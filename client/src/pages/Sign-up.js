import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import axiosInstance from "../services";
import { Transition } from "@headlessui/react";
import { LineWave } from "react-loader-spinner";
import coverImage from "../assets/images/shopping.jpeg";
import userIcon from "../assets/icons/User.svg";
import emailIcon from "../assets/icons/Email.svg";
import passwordIcon from "../assets/icons/Password.svg";
import {useDispatch, useSelector} from "react-redux";
import {signup} from "../store/slices/auth";
import toast from "react-hot-toast";

const SignUp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const isLoading = useSelector(state => state.auth.isLoading)
  const handleSubmit = ({ name, email, password }) => {
      dispatch(signup({name: name, email: email, password: password}))
          .unwrap()
          .then(() => {
            navigate('/')
            toast.success('Registration successful. Please login with your newly created credentials')
          }).catch(error => {
            Promise.reject(error)
          })
  };


  const validationSchema = Yup.object({
    name: Yup.string()
      .min(4, "Name too short! Must be at least 4 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Password must contain 8 Characters containing at least 1 uppercase, 1 Lowercase, 1 Number and 1 special case character"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Password is required"),
    acceptTOS: Yup.bool().oneOf(
      [true],
      "You must accept our Terms and Conditions!"
    ),
  });

  return (
    // Global Container
    <div className="bg-bg3 min-h-screen  flex flex-row justify-center items-center text-left relative">
      <div className="flex flex-row shadow-2xl justify-center  md:p-0 rounded-xl overflow-hidden mx-6 md:max-w-4xl  md:w-[53rem] md:h-[35rem] md:mx-0">
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
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            acceptTOS: false,
          }}
          onSubmit={(values, errors) => {
            handleSubmit(values, errors);
          }}
          validationSchema={validationSchema}>
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => {
            return (
              <form
                onSubmit={handleSubmit}
                className=" bg-white px-8 w-screen  py-4 rounded-2xl md:rounded-none md:w-[50%] md:px-10 md:py-2">
                <h1 className="text-text1 py-3 font-bold font-sans text-[1.9rem] text-left mb-[1.5rem] md:mb-1">
                  Create Account
                </h1>
                {/* Form Container */}
                <div className="w-full flex flex-col justify-between space-y-6 md:space-y-0 md:h-[22rem]">
                  <div>
                    <div
                      className={`flex flex-row justify-start items-center p-2 bg-bg3 ${
                        touched.name && errors.name ? "border border-red" : ""
                      }`}>
                      <img src={userIcon} alt="" srcset="" className="mr-3" />
                      <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        className="w-full p-1 bg-bg3 font-sans text-text1 outline-none "
                        value={values.name}
                        onChange={handleChange("name")}
                        onBlur={handleBlur("name")}
                      />
                    </div>
                    <p className="error">{touched.name && errors.name}</p>
                  </div>
                  <div>
                    <div
                      className={`flex flex-row justify-start items-center p-2 bg-bg3 ${
                        touched.email && errors.email ? "border border-red" : ""
                      }`}>
                      <img src={emailIcon} alt="email Icon"  className="mr-3" />
                      <input
                        type="text"
                        name="email"
                        placeholder="Email Address"
                        className="w-full p-1 bg-bg3 font-sans text-text1 outline-none "
                        value={values.email}
                        onChange={handleChange("email")}
                        onBlur={handleBlur("email")}
                      />
                    </div>
                    <p className="error">{touched.email && errors.email}</p>
                  </div>
                  <div>
                    <div
                      className={`flex flex-row justify-start items-center p-2 bg-bg3 ${
                        touched.password && errors.password
                          ? "border border-red"
                          : ""
                      }`}>
                      <img
                        src={passwordIcon}
                        alt=""
                        srcset=""
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
                    <p className="error">
                      {touched.password && errors.password}
                    </p>
                  </div>
                  <div>
                    <div
                      className={`flex flex-row justify-start items-center p-2 bg-bg3 ${
                        touched.confirmPassword && errors.confirmPassword
                          ? "border border-red"
                          : ""
                      }`}>
                      <img
                        src={passwordIcon}
                        alt=""
                        srcset=""
                        className="mr-3"
                      />
                      <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        className="w-full p-1 bg-bg3 font-sans text-text1 outline-none"
                        value={values.confirmPassword}
                        onChange={handleChange("confirmPassword")}
                        onBlur={handleBlur("confirmPassword")}
                      />
                    </div>
                    <p className="error">
                      {touched.confirmPassword && errors.confirmPassword}
                    </p>
                  </div>
                  <div className="flex justify-between items-center font-light">
                    <div className="flex flex-row mt-8 md:mt-2">
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        className="mr-1"
                        value={values.acceptTOS}
                        onChange={handleChange("acceptTOS")}
                        onBlur={handleBlur("acceptTOS")}
                      />
                      <p className="text-text2 font-sans font-light text-xs">
                        I accept the{" "}
                        <span>
                          {" "}
                          <a
                            href="/#"
                            className="text-blue1 font-sans font-light text-xs">
                            Terms & Conditions
                          </a>
                        </span>
                      </p>
                    </div>
                  </div>
                  <p className="error">
                    {touched.acceptTOS && errors.acceptTOS}
                  </p>
                </div>
                {isLoading ? (
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
                    disabled={
                      !!(errors.name ||
                          errors.email ||
                          errors.password ||
                          errors.confirmPassword ||
                          errors.acceptTOS)
                    }
                    className={
                      errors.name ||
                      errors.email ||
                      errors.password ||
                      errors.confirmPassword ||
                      errors.acceptTOS
                        ? `bg-blue-300 rounded-md text-white text-md mt-8 w-full p-3 md:mt-4`
                        : `bg-blue1 text-white text-md mt-8 w-full p-3 rounded-md shadow-lg  shadow-blue-200 hover:shadow-none border-2 border-blue1 hover:bg-white hover:text-blue1 hover:border-2 hover:border-blue1  duration-100 md:mt-4 `
                    }>
                    Create Account
                  </button>
                )}
                <p className="text-text2 font-sans font-light text-xs text-center mt-8 mb-1 md:mt-6">
                  Already have an account?{" "}
                  <span>
                    {" "}
                    <Link
                      to="/"
                      className="text-blue1 font-sans font-light text-xs">
                      Login
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

export default SignUp;
