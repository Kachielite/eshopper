import {useEffect, useRef, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import Dashboard from "../../Dashboard";
import homeIcon from "../../../assets/icons/Home.svg";
import Tags from "../../../components/tags/Tags";
import chevronLeftIcon from "../../../assets/icons/chevronLeft.svg";
import imageSM from "../../../assets/icons/ImageSM.svg";
import {useDispatch, useSelector} from "react-redux";
import {editProduct, fetchProduct} from "../../../store/slices/product";
import toast from "react-hot-toast";
import SuccessModal from "../../../components/success-modal";


const EditProduct = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {id} = useParams()
    const {isLoading, product} = useSelector(state => state.product)
    const [photos, setPhotos] = useState({})
    const [tags, setTags] = useState([]);
    const [productDetails, setProductDetails] = useState({
        status: product?.status,
        discount: product?.discount,
        price: product?.price,
        product_description: product?.product_description,
        product_name: product?.product_name,
        tags: product?.tags,
        category: product?.category
    })
    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)

    const addNewProductHandler = () => {
        setOpen(false)
        window.location.reload();
    }

    const updateProductHandler = (event) => {
        event.preventDefault()
        let Files =  Object.entries(photos).map(photo => photo[1])
        let tagsList = tags
        dispatch(editProduct({id: id , productDetails: {...productDetails, Files: Files, tags: tagsList}, setOpen }))
    }


    const imageHandler = (index) => {
        if(product?.product_images && typeof product?.product_images[index] === "object"){
            return product?.product_images[index]?.url
        } else if (product?.product_images && typeof product?.product_images[index] === "string"){
            return product?.product_images[index]
        } else {
            return imageSM
        }
    }

    useEffect(() => {
        dispatch(fetchProduct({id:id }))
            .unwrap()
            .then((res) => {
                setProductDetails({
                    status: product?.status,
                    discount: product?.discount,
                    price: product?.price,
                    product_description: product?.product_description,
                    product_name: product?.product_name,
                    tags: product?.tags,
                    category: product?.category
                })
                return Promise.resolve(res)})
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


    return (
        <Dashboard>
            <div className="flex flex-col px-4 md:px-7 py-8 mb-32 md:mb-24 h-full w-full">
                <SuccessModal open={open} setOpen={setOpen} cancelButtonRef={cancelButtonRef} navigate={navigate} addNewProductHandler={addNewProductHandler}/>
                <h1 className="text-text1 text-2xl md:text-3xl font-bold">
                    Edit Product
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
                        <p className="text-text1 text-sm">Edit Product</p>
                    </div>
                </div>
                {/* Form Container */}
                <form onSubmit={updateProductHandler} encType="multipart/form-data"
                    className="w-full h-full rounded-md bg-bg2 md:space-x-28 flex flex-col md:flex-row md:justify-center items-center px-8 md:px-20 py-14 mt-8">
                    <div
                        className="flex flex-col-reverse md:flex-row justify-start items-center w-full md:w-[40rem] md:h-[36rem]">
                        <div
                            className="flex flex-row md:flex-col mb-8 md:mb-0 justify-between space-x-2  items-center h-full w-full mt-4">
                            <div className="relative md:h-64 md:w-64 h-32 w-32">
                                <input type="file" className="md:h-64 md:w-64 h-32 w-32 absolute z-20 cursor-pointer"
                                       accept="image/*" name="product1"
                                       onChange={(event) => setPhotos({...photos, first: event.target.files[0]})}/>
                                <img src={photos.first ? URL.createObjectURL(photos.first) : imageHandler(0)} alt=""
                                     className="md:h-64 md:w-64 h-32 w-32 absolute z-10 object-contain"/>
                            </div>
                            <div className="relative md:h-64 md:w-64 h-32 w-32">
                                <input type="file" className="md:h-64 md:w-64 h-32 w-32 absolute z-20 cursor-pointer"
                                       accept="image/*" name="product2"
                                       onChange={(event) => setPhotos({...photos, second: event.target.files[0]})}/>
                                <img src={photos.second ? URL.createObjectURL(photos.second) : imageHandler(1)} alt=""
                                     className="md:h-64 md:w-64 h-32 w-32 absolute z-10 object-contain"/>
                            </div>
                        </div>
                        <div
                            className="flex flex-row md:flex-col mb-8 md:mb-0 justify-between space-x-2  items-center h-full w-full mt-4">
                            <div className="relative md:h-64 md:w-64 h-32 w-32">
                                <input type="file" className="md:h-64 md:w-64 h-32 w-32 absolute z-20 cursor-pointer"
                                       accept="image/*" name="product3"
                                       onChange={(event) => setPhotos({...photos, third: event.target.files[0]})}/>
                                <img src={photos.third ? URL.createObjectURL(photos.third) : imageHandler(2)} alt=""
                                     className="md:h-64 md:w-64 h-32 w-32 absolute z-10 object-contain"/>
                            </div>
                            <div className="relative md:h-64 md:w-64 h-32 w-32">
                                <input type="file" className="md:h-64 md:w-64 h-32 w-32 absolute z-20 cursor-pointer"
                                       accept="image/*" name="product4"
                                       onChange={(event) => setPhotos({...photos, forth: event.target.files[0]})}/>
                                <img src={photos.forth ? URL.createObjectURL(photos.forth) : imageHandler(3)} alt=""
                                     className="md:h-64 md:w-64 h-32 w-32 absolute z-10 object-contain"/>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-start space-y-3 items-start md:h-[36rem] md:w-[26rem]">
                        <div className="w-full flex flex-col space-y-1">
                            <h3 className="text-text2 font-normal text-sm">Product Name</h3>
                            <input
                                id="product_name"
                                type="text"
                                className="w-full outline-none bg-bg3 h-10 text-text1 font-medium text-sm rounded-lg p-2.5"
                                onChange={event => setProductDetails({
                                    ...productDetails,
                                    product_name: event.target.value
                                })}
                                required
                                defaultValue={product?.product_name}
                            />
                        </div>
                        <div className="w-full flex flex-col space-y-1">
                            <h3 className="text-text2 font-normal text-sm">Description</h3>
                            <div className="h-53 w-full">
                                <div className="mb-3">
                  <textarea
                      className="form-control block w-full h-full px-3 py-1.5 text-base font-normal text-text1 bg-bg3 rounded outline-none resize-none"
                      id="product_description" required onChange={event => setProductDetails({
                      ...productDetails,
                      product_description: event.target.value
                  })}
                      value={product?.product_description}
                      rows="7"></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex flex-row justify-between items-center">
                            <div className="flex flex-col space-y-1 md:w-40 w-32">
                                <h3 className="text-text2 font-normal text-sm">Category</h3>
                                <input
                                    id="category"
                                    type="text"
                                    className="md:w-40 w-32outline-none bg-bg3 h-10 text-text1 font-medium text-sm rounded-lg p-2.5"
                                    onChange={event => setProductDetails({
                                        ...productDetails,
                                        category: event.target.value
                                    })}
                                    defaultValue={product?.category}
                                    required
                                />
                            </div>
                            <div className="lex flex-col space-y-1 md:w-40 w-32">
                                <h3 className="text-text2 font-normal text-sm">Status</h3>
                                <select
                                    className=" w-full outline-none bg-bg3 h-10 text-text1 font-medium text-sm rounded-lg p-2.5"
                                    onChange={event => setProductDetails({
                                        ...productDetails,
                                        status: event.target.value
                                    })}
                                    defaultValue={product?.status}
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
                                        onChange={event => setProductDetails({
                                            ...productDetails,
                                            price: parseInt(event.target.value)
                                        })}
                                        defaultValue={product?.price}
                                        required
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
                                        onChange={event => setProductDetails({
                                            ...productDetails,
                                            discount: parseInt(event.target.value)
                                        })}
                                        defaultValue={product?.discount}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex flex-col space-y-1">
                            <h3 className="text-text2 font-normal text-sm">Tags</h3>
                            <div className="bg-bg3 w-full ">
                                <Tags setTags={setTags} tags={product?.tags}/>
                            </div>
                        </div>
                        <div className="flex flex-row justify-end items-center w-full h-full bg-bg2 space-x-6 my-10">
                            <button
                                type="submit"
                                className={`py-2.5 px-10 rounded text-white text-base font-medium ${isLoading ? "bg-blue-200": "bg-blue1 "} hover:bg-blue-200 hover:border-blue-200 hover:text-blue1 duration-200`}>
                                {isLoading ? "Saving..." : "Save"}
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-200 py-2.5 px-10 rounded text-blue1 text-base font-medium hover:bg-bg4 hover:text-text1 duration-200">
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </Dashboard>
    );
};

export default EditProduct;
