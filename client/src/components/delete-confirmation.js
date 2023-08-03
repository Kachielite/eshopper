import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export default function DeleteConfirmation({open, setOpen, cancelButtonRef, deleteHandler, productName, loading}) {


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
                            <div className="w-[30.4rem] h-[17.5rem] flex flex-col justify-between items-center pt-[1.81rem] bg-white">
                                <div className="flex flex-col justify-center items-center w-full">
                                    <svg className="h-12 w-12" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="13.5" cy="13.5" r="13.5" fill="#FF3D57"/>
                                        <path d="M10.0664 8.55862C10.4484 8.92634 14.1807 12.7902 14.1807 12.7902C14.3845 12.9876 14.4868 13.2444 14.4868 13.5013C14.4868 13.7582 14.3845 14.015 14.1807 14.2106C14.1807 14.2106 10.4484 18.0762 10.0664 18.4422C9.68441 18.8099 8.99718 18.8351 8.5905 18.4422C8.18292 18.051 8.15093 17.5039 8.5905 17.0235L12.0148 13.5013L8.5905 9.97905C8.15093 9.49866 8.18292 8.95068 8.5905 8.55862C8.99718 8.16566 9.68441 8.18999 10.0664 8.55862Z" fill="#44566C"/>
                                        <path d="M16.9335 8.55862C16.5515 8.92634 12.8193 12.7902 12.8193 12.7902C12.6155 12.9876 12.5131 13.2444 12.5131 13.5013C12.5131 13.7582 12.6155 14.015 12.8193 14.2106C12.8193 14.2106 16.5515 18.0762 16.9335 18.4422C17.3155 18.8099 18.0028 18.8351 18.4095 18.4422C18.817 18.051 18.849 17.5039 18.4095 17.0235L14.9852 13.5013L18.4095 9.97905C18.849 9.49866 18.817 8.95068 18.4095 8.55862C18.0028 8.16566 17.3155 8.18999 16.9335 8.55862Z" fill="#44566C"/>
                                        <mask id="mask0_1161_10"  maskUnits="userSpaceOnUse" x="8" y="8" width="11" height="11">
                                            <path d="M10.0664 8.55862C10.4484 8.92634 14.1807 12.7902 14.1807 12.7902C14.3845 12.9876 14.4868 13.2444 14.4868 13.5013C14.4868 13.7582 14.3845 14.015 14.1807 14.2106C14.1807 14.2106 10.4484 18.0762 10.0664 18.4422C9.68441 18.8099 8.99718 18.8351 8.5905 18.4422C8.18292 18.051 8.15093 17.5039 8.5905 17.0235L12.0148 13.5013L8.5905 9.97905C8.15093 9.49866 8.18292 8.95068 8.5905 8.55862C8.99718 8.16566 9.68441 8.18999 10.0664 8.55862Z" fill="white"/>
                                            <path d="M16.9335 8.55862C16.5515 8.92634 12.8193 12.7902 12.8193 12.7902C12.6155 12.9876 12.5131 13.2444 12.5131 13.5013C12.5131 13.7582 12.6155 14.015 12.8193 14.2106C12.8193 14.2106 16.5515 18.0762 16.9335 18.4422C17.3155 18.8099 18.0028 18.8351 18.4095 18.4422C18.817 18.051 18.849 17.5039 18.4095 17.0235L14.9852 13.5013L18.4095 9.97905C18.849 9.49866 18.817 8.95068 18.4095 8.55862C18.0028 8.16566 17.3155 8.18999 16.9335 8.55862Z" fill="white"/>
                                        </mask>
                                        <g mask="url(#mask0_1161_10)">
                                            <rect x="2" y="2" width="23" height="23" fill="#EFF4F8"/>
                                        </g>
                                    </svg>

                                    <p className="text-[#44566C] text-[0.98rem] mt-[1.62rem] px-3">Are you sure you want to delete <b>{productName}</b>? This action is irreversible and will remove the product from your inventory. Please confirm your decision to proceed.</p>
                                </div>
                                <div className="flex flex-row justify-center items-center w-full bg-bg1 ">
                                    <button className="py-[1.19rem] bg-red  px-4 md:px-[1.98rem] text-[0.9375rem] text-white text-center w-1/2 outline-none" onClick={deleteHandler}>
                                        {loading ? "Deleting..." : "Delete"}
                                    </button>
                                    <button className="py-[1.19rem] px-4 md:px-[1.98rem] text-[0.9375rem] text-[#44566C] text-center w-1/2 outline-none" onClick={() => setOpen(false)}>
                                        Cancel
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
