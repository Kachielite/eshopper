import {useEffect, useRef, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import Dashboard from "../../Dashboard";
import homeIcon from "../../../assets/icons/Home.svg";
import Tags from "../../../components/tags/Tags";
import chevronLeftIcon from "../../../assets/icons/chevronLeft.svg";
import imageSM from "../../../assets/icons/ImageSM.svg";
import {useDispatch, useSelector} from "react-redux";
import {deleteProduct, fetchProduct} from "../../../store/slices/product";
import {TailSpin} from "react-loader-spinner";
import DeleteConfirmation from "../../../components/delete-confirmation";
import toast from "react-hot-toast";


const Product = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isLoading, product} = useSelector(state => state.product)
    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)

    useEffect(() => {
        dispatch(fetchProduct({id:id }))
            .unwrap()
            .then((res) => Promise.resolve(res) )
            .catch(e => {
                if(e.status === 401){
                    localStorage.clear()
                    navigate('/')
                    toast.error('Login session expired, kindly login again')
                } else{
                    toast.error('Something went wrong. Please contact the administrator for assistance')
                    return Promise.reject(e)
                }

            })
    }, [id]);

    const imageHandler = (index) => {
        if(product?.product_images && typeof product?.product_images[index] === "object"){
            return product?.product_images[index]?.url
        } else if (product?.product_images && typeof product?.product_images[index] === "string"){
            return product?.product_images[index]
        } else {
            return imageSM
        }
    }

    const deleteHandler = () => {
        dispatch(deleteProduct({id: id}))
            .unwrap()
            .then(() => {
            navigate('/products')
        }).then(() => {
            setOpen(false)
        }).catch(error => Promise.reject(error))
    }

    return (
        <Dashboard>
            <div className="flex flex-col px-4 md:px-7 py-8 mb-32 md:mb-24 h-full w-full">
                <DeleteConfirmation open={open} loading={isLoading} productName={product?.product_name} setOpen={setOpen} cancelButtonRef={cancelButtonRef}  deleteHandler={deleteHandler}/>
                <h1 className="text-text1 text-2xl md:text-3xl font-bold">
                    Product Details
                </h1>
                {/* Print/Export Action Container */}
                <div className="flex flex-row space-x-6 justify-between items-center mt-2">
                    <div className="flex flex-row space-x-2 justify-start items-center w-full">
                        <Link
                            to="/products"
                            className="group flex flex-row space-x-2 justify-start items-center">
                            <img src={homeIcon} alt="home"/>
                            <p className="text-text2 text-sm group-hover:text-text1">
                                Products
                            </p>
                        </Link>
                        <img src={chevronLeftIcon} alt="chevron left"/>
                        <p className="text-text1 text-sm">Product Details</p>
                    </div>
                </div>
                {/* Form Container */}
                {
                    isLoading ?
                        <TailSpin
                            height="100"
                            width="100"
                            color="#0081FF"
                            ariaLabel="tail-spin-loading"
                            radius="1"
                            wrapperStyle={{
                                width: "100%",
                                height: "55vh",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            wrapperClass=""
                            visible={true}
                        />
                        :
                        <div
                            className="w-full h-full rounded-md bg-bg2 md:space-x-28 flex flex-col md:flex-row md:justify-center items-center px-8 md:px-20 py-14 mt-8">
                            <div
                                className="flex flex-col-reverse md:flex-row justify-start items-center w-full md:w-[40rem] md:h-[36rem]">
                                <div
                                    className="flex flex-row md:flex-col mb-8 md:mb-0 justify-between space-x-2  items-center h-full w-full mt-4">
                                    <div className=" md:h-64 md:w-64 h-32 w-32">
                                        <img src={imageHandler(0)} alt=""
                                             className="md:h-64 md:w-64 h-32 w-32 object-contain"/>
                                    </div>
                                    <div className=" md:h-64 md:w-64 h-32 w-32">
                                        <img src={imageHandler(1)} alt=""
                                             className="md:h-64 md:w-64 h-32 w-32 object-contain"/>
                                    </div>
                                </div>
                                <div
                                    className="flex flex-row md:flex-col mb-8 md:mb-0 justify-between space-x-2  items-center h-full w-full mt-4">
                                    <div className=" md:h-64 md:w-64 h-32 w-32">
                                        <img src={imageHandler(2)} alt=""
                                             className="md:h-64 md:w-64 h-32 w-32 object-contain"/>
                                    </div>
                                    <div className=" md:h-64 md:w-64 h-32 w-32">
                                        <img src={imageHandler(3)} alt=""
                                             className="md:h-64 md:w-64 h-32 w-32 object-contain"/>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="flex flex-col justify-start space-y-3 items-start md:h-[36rem] md:w-[26rem]">
                                <div className="w-full flex flex-col space-y-1">
                                    <h3 className="text-text2 font-normal text-sm">Product Name</h3>
                                    <input
                                        id="product_name"
                                        type="text"
                                        className="w-full outline-none bg-bg3 h-10 text-text1 font-medium text-sm rounded-lg p-2.5"
                                        readOnly
                                        value={product?.product_name}
                                    />
                                </div>
                                <div className="w-full flex flex-col space-y-1">
                                    <h3 className="text-text2 font-normal text-sm">Description</h3>
                                    <div className="h-53 w-full">
                                        <div className="mb-3">
                  <textarea
                      className="form-control block w-full h-full px-3 py-1.5 text-base font-normal text-text1 bg-bg3 rounded outline-none resize-none"
                      id="product_description" readOnly rows="7" value={product?.product_description}></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full flex flex-row justify-between items-center">
                                    <div className="flex flex-col space-y-1 md:w-40 w-32">
                                        <h3 className="text-text2 font-normal text-sm">Category</h3>
                                        <input
                                            id="category"
                                            type="text"
                                            className="md:w-40 w-32 outline-none bg-bg3 h-10 text-text1 font-medium text-sm rounded-lg p-2.5"
                                            readOnly
                                            value={product?.category}
                                        />
                                    </div>
                                    <div className="lex flex-col space-y-1 md:w-40 w-32">
                                        <h3 className="text-text2 font-normal text-sm">Status</h3>
                                        <select
                                            className=" w-full outline-none bg-bg3 h-10 text-text1 font-medium text-sm rounded-lg p-2.5"
                                            value={product?.status}
                                            disabled
                                        >
                                            <option value="Available">Available</option>
                                            <option value="Deleted">Deleted</option>
                                            <option value="Out of Stock">Out of stock</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="w-full flex flex-row justify-between items-center">
                                    <div className=" flex flex-col space-y-1">
                                        <h3 className="text-text2 font-normal text-sm">Price</h3>
                                        <div className="flex flex-row items-center bg-bg3 rounded px-2 md:w-40 w-32">
                                            <p className="text-text1 text-lg">$</p>
                                            <input
                                                id="price"
                                                type="number"
                                                className=" w-full outline-none bg-bg3 h-10 text-text1 font-medium text-sm rounded-lg p-2.5"
                                                readOnly
                                                value={product?.price}
                                            />
                                        </div>
                                    </div>
                                    <div className=" flex flex-col space-y-1">
                                        <h3 className="text-text2 font-normal text-sm">Discount</h3>
                                        <div className="flex flex-row items-center bg-bg3 rounded px-2 md:w-40 w-32">
                                            <p className="text-text1 text-lg">%</p>
                                            <input
                                                id="discount"
                                                type="number"
                                                className="w-full outline-none bg-bg3 h-10 text-text1 font-medium text-sm rounded-lg p-2.5"
                                                readOnly
                                                value={product?.discount}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full flex flex-col space-y-1">
                                    <h3 className="text-text2 font-normal text-sm">Tags</h3>
                                    <div className="bg-bg3 w-full pointer-events-none" >
                                        <Tags tags={product?.tags}/>
                                    </div>
                                </div>
                                <div
                                    className="flex flex-row justify-end items-center w-full h-full bg-bg2 space-x-6 my-10">
                                    <Link to={`/products/edit-product/${product?._id}`}
                                          className={`py-2.5 px-10 rounded text-white text-base font-medium bg-blue1 hover:bg-blue-200 hover:border-blue-200 hover:text-blue1 duration-200`}>
                                        Edit Product
                                    </Link>
                                    <button
                                        className="bg-red py-2.5 px-10 rounded text-white text-base font-medium hover:bg-opacity-60 hover:text-red  duration-200" onClick={() => setOpen(true)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>

                }
            </div>
        </Dashboard>
    );
};

export default Product;
