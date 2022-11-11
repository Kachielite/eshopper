import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { Transition } from "@headlessui/react";
import { LineWave } from "react-loader-spinner";
import lockIcon from "../assets/icons/Lock.svg";
import emailIcon from "../assets/icons/Email.svg";
import axios from "axios";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSubmit = ({ email }) => {
    setShowSuccess(false)
    setLoading(true)
    axios
      .put("http://192.168.1.153:3001/v1/forget_password", { email: email })
      .then(results =>{
        setLoading(false)
        setShowSuccess(true)
      }).catch(error =>{
        setLoading(false);
        setShowError(true);
        setError(
          error.response.data.message
            ? error.response.data.message
            : error.message
        );
        console.log(error);
      })
  };

  useEffect(() => {
    setTimeout(() => {
      setShowError(false);
    }, [6000]);
  }, [showError]);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),
  });
  return (
    // Global Container
    <div className="bg-bg3 min-h-screen  flex flex-row justify-center items-center text-left relative">
      <Transition
        className={`absolute top-14 md:top-36`}
        show={showError}
        enter="transition ease-out duration-700"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-700"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1">
        <p className=" text-white text-sm  bg-red opacity-90  px-3 py-2 text-center w-[20rem] mb-8 rounded">
          {error}
        </p>
      </Transition>
      <Transition
        className={`absolute top-14 md:top-36`}
        show={showSuccess}
        enter="transition ease-out duration-700"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-700"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1">
        <p className=" text-white text-sm  bg-green opacity-90  px-3 py-2 text-center w-[20rem] mb-8 rounded">
          The reset password link has been sent to your email. Kindly check your
          inbox
        </p>
      </Transition>
      {/* Form Container */}
      <Formik
        initialValues={{
          email: "",
        }}
        onSubmit={(values, errors) => {
          handleSubmit(values, errors);
        }}
        validationSchema={validationSchema}>
        {({
          values,
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          touched,
        }) => {
          return (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col shadow-2xl justify-center rounded-xl w-[27rem] h-[29rem] overflow-hidden mx-8 md:mx-0">
              <div className="flex flex-col justify-center items-center bg-white h-[50%] w-[100%]">
                <img
                  src={lockIcon}
                  alt="lock icon"
                  className="w-24 h-32 object-fill"
                />
                <p className="text-3xl text-text1 mt-4">Forgot Password?</p>
              </div>
              <div className="flex flex-col justify-center space-y-7 px-10 h-[50%] w-[100%]">
                <div>
                  <div
                    className={`flex flex-row justify-start items-center p-2 bg-white w-full ${
                      touched.email && errors.email ? "border border-red" : ""
                    }`}>
                    <img src={emailIcon} alt="email icon" className="mr-3" />
                    <input
                      type="text"
                      name="email"
                      placeholder="Email Address"
                      className="w-full p-1 bg-white font-sans text-text1 outline-none "
                      value={values.email}
                      onChange={handleChange("email")}
                      onBlur={handleBlur("email")}
                    />
                  </div>
                  <p className="error">{touched.email && errors.email}</p>
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
                    disabled={errors.email ? true : false}
                    className={
                      errors.email
                        ? `bg-blue-300 rounded-md text-white text-md mt-24 w-full p-3 md:mt-20`
                        : `bg-blue1 text-white text-md mt-24 w-full p-3 rounded-md shadow-lg  shadow-blue-200 hover:shadow-none border-2 border-blue1 hover:bg-white hover:text-blue1 hover:border-2 hover:border-blue1  duration-100 md:mt-20 `
                    }>
                    Reset Password
                  </button>
                )}
                <Link
                  to="/"
                  className="text-blue1 font-sans font-light text-xs text-center">
                  Go back to Login
                </Link>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ForgotPassword;
