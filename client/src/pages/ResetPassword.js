import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Transition } from "@headlessui/react";
import { TailSpin, LineWave } from "react-loader-spinner";
import coverImage from "../assets/images/reset.jpeg";
import userIcon from "../assets/icons/User.svg";
import emailIcon from "../assets/icons/Email.svg";
import passwordIcon from "../assets/icons/Password.svg";

const ResetPassword = () => {
  let { token } = useParams();
  let navigate = useNavigate();

  const [user, setUser] = useState({ email: "", name: "" });
  const [loadingUserData, setLoadingUserData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSubmit = ({ password }) => {
    setLoading(true);
    axios
      .post(`http://192.168.1.153:3001/v1/reset_password`, {
        email: user.email,
        password: password,
      })
      .then((results) => {
        setLoading(false);
        setShowSuccess(true);
        navigate("/");
      })
      .then((error) => {
        setLoading(false);
        setShowError(true);
        setError(
          error.response.data.message
            ? error.response.data.message
            : error.message
        );
        console.log(error);
      });
  };

  useEffect(() => {
    setLoadingUserData(true)
    console.log(token)
    axios
      .get(`http://192.168.1.153:3001/v1/get_user/${token}`)
      .then((results) => {
        console.log(results)
        setUser(results.data);
        setLoadingUserData(false)
      })
      .catch((error) => {
        setLoading(false);
        setShowError(true);
        setError(
          error.response.data.message
            ? error.response.data.message
            : error.message
        );
        setLoadingUserData(false)
        console.log(error);
      });
  },[token]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Password must contain 8 Characters containing at least 1 uppercase, 1 Lowercase, 1 Number and 1 special case character"
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("Password is required"),
  });

  return (
    // Global Container
    <div className="relative bg-bg3 min-h-screen  flex flex-row justify-center items-center text-left z-0">
      {loadingUserData ? (
        <div className="">
          <TailSpin
            height="80"
            width="80"
            color="#0081FF"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <>
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
              Password reset completed successfully. Redirect to login page....
            </p>
          </Transition>

          {/* Reset Container */}
          <div className="flex flex-row shadow-2xl justify-center  md:p-0 rounded-xl overflow-hidden mx-6 md:max-w-4xl  md:w-[53rem] md:h-[35rem] md:mx-0">
            {/* Image Container */}
            <div className="hidden md:block md:w-[50%]">
              <img
                src={coverImage}
                alt=""
                className="h-[100%] w-[100%] object-cover"
              />
            </div>
            {/* Input Container */}
            <Formik
              initialValues={{
                name: "Kachi",
                email: "derrick.onyekachi@gmail.com",
                password: "",
                confirmPassword: "",
              }}
              onSubmit={(values, errors) => {
                handleSubmit(values, errors);
              }}
              validationSchema={validationSchema}>
              {({
                values,
                errors,
                handleChange,
                handleBlur,
                handleSubmit,
                touched,
              }) => {
                return (
                  <form
                    onSubmit={handleSubmit}
                    className=" bg-white px-8 w-screen  py-8 rounded-2xl md:rounded-none md:w-[50%] md:px-10 md:py-2">
                    <h1 className="text-text1 py-3 font-bold font-sans text-[1.9rem] text-left mb-[1.5rem] md:mb-20">
                      Reset Password
                    </h1>
                    {/* Form Container */}
                    <div className="w-full flex flex-col justify-center space-y-4">
                      <div>
                        <div className="flex flex-row justify-start items-center p-2 bg-bg4">
                          <img
                            src={userIcon}
                            alt=""
                            srcset=""
                            className="mr-3"
                          />
                          <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            readOnly
                            className="w-full p-1 bg-bg4 font-sans text-text1 outline-none"
                            value={user.name}
                            onChange={handleChange("name")}
                            onBlur={handleBlur("name")}
                          />
                        </div>
                        <p className="error">{touched.name && errors.name}</p>
                      </div>
                      <div>
                        <div className="flex flex-row justify-start items-center p-2 bg-bg4">
                          <img
                            src={emailIcon}
                            alt=""
                            srcset=""
                            className="mr-3"
                          />
                          <input
                            type="text"
                            name="email"
                            readOnly
                            placeholder="Email Address"
                            className="w-full p-1 bg-bg4 font-sans text-text1 outline-none "
                            value={user.email}
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
                        disabled={
                          errors.password || errors.confirmPassword
                            ? true
                            : false
                        }
                        className={
                          errors.password || errors.confirmPassword
                            ? `bg-blue-300 rounded-md text-white text-md mt-24 w-full p-3 md:mt-8`
                            : `bg-blue1 text-white text-md mt-24 w-full p-3 rounded-md shadow-lg  shadow-blue-200 hover:shadow-none border-2 border-blue1 hover:bg-white hover:text-blue1 hover:border-2 hover:border-blue1  duration-100 md:mt-8 `
                        }>
                        Reset Password
                      </button>
                    )}
                  </form>
                );
              }}
            </Formik>
          </div>
        </>
      )}
    </div>
  );
};

export default ResetPassword;
