import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export default function SuccessModal({open, setOpen, cancelButtonRef, navigate, addNewProductHandler}) {

    const closeHandler = () => {
        setOpen(false)
        navigate('/products')
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="w-[25.4rem] h-[17.5rem] flex flex-col justify-between items-center pt-[3.81rem] bg-white">
                                <div className="flex flex-col justify-center items-center w-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 55 55" fill="none">
                                        <circle cx="27.5" cy="27.5" r="27.5" fill="#09B66D"/>
                                        <g filter="url(#filter0_d_1181_14)">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M44.1357 17.0229C45.075 17.9575 45.0349 19.4349 44.0462 20.3227L24.2931 38.0619C23.3224 38.9337 21.7934 38.9152 20.8466 38.0201L12.9454 30.551C11.9811 29.6395 11.9811 28.1616 12.9454 27.2501C13.9096 26.3386 15.473 26.3386 16.4372 27.2501L22.6367 33.1105L40.645 16.9383C41.6337 16.0504 43.1965 16.0883 44.1357 17.0229Z" fill="white"/>
                                        </g>
                                        <defs>
                                            <filter id="filter0_d_1181_14" x="10.2222" y="15.2964" width="36.5925" height="26.4075" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                                <feOffset dy="1"/>
                                                <feGaussianBlur stdDeviation="1"/>
                                                <feColorMatrix type="matrix" values="0 0 0 0 0.266667 0 0 0 0 0.337255 0 0 0 0 0.423529 0 0 0 0.5 0"/>
                                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1181_14"/>
                                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1181_14" result="shape"/>
                                            </filter>
                                        </defs>
                                    </svg>
                                    <p className="text-[#44566C] text-[1.25rem] mt-[1.62rem]">Product was added</p>
                                </div>
                                <div className="flex flex-row justify-center items-center w-full bg-bg1 ">
                                    <button className="py-[1.19rem]  px-4 md:px-[1.98rem] text-[0.9375rem] text-[#44566C] text-center w-1/2 outline-none" onClick={addNewProductHandler}>
                                        Add New Product
                                    </button>
                                    <button className="py-[1.19rem] px-4 md:px-[1.98rem] text-[0.9375rem] text-[#44566C] text-center w-1/2 outline-none" onClick={closeHandler}>
                                        Close
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
