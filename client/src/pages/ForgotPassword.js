import {Link} from "react-router-dom";
import {Formik} from "formik";
import * as Yup from "yup";
import {LineWave} from "react-loader-spinner";
import lockIcon from "../assets/icons/Lock.svg";
import emailIcon from "../assets/icons/Email.svg";
import {useDispatch, useSelector} from "react-redux";
import {forgotPassword} from "../store/slices/auth";
import toast from "react-hot-toast";

const ForgotPassword = () => {
    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.auth.isLoading)

    const handleSubmit = (values) => {
        dispatch(forgotPassword({email: values.email}))
            .unwrap()
            .then(() => {
                toast.success("The reset password link has been sent to your email. Kindly check your inbox")
            }).catch(error => Promise.reject((error)))
    };


    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Please enter a valid email")
            .required("Email is required"),
    });
    return (
        // Global Container
        <div className="bg-bg3 min-h-screen  flex flex-row justify-center items-center text-left relative">
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
                                        <img src={emailIcon} alt="email icon" className="mr-3"/>
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
                                        disabled={!!errors.email}
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
