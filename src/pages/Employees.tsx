// @ts-nocheck

import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { toggleSidebar } from '../features/sidebar/sidebarSlice';
import LeftNav from '../components/LeftNav';
import TopNavBar from '../components/TopNavBar';
import { ArchiveBoxXMarkIcon, CheckIcon, ClipboardDocumentCheckIcon, ClockIcon, FunnelIcon, MagnifyingGlassIcon, MapPinIcon, PencilIcon, PlusCircleIcon, SquaresPlusIcon, XMarkIcon } from '@heroicons/react/24/outline';



const ordersData = [
  { id: 1, product: 'Khaki', quantity: 35, status: 'Delivered', size: 'Large', deliveryDate: '2024-09-30', deliveryPhone: '+254 799740253' },
  { id: 2, product: 'Denim', quantity: 50, status: 'Pending', size: 'Medium', deliveryDate: '2024-10-02', deliveryPhone: '+254 700200566' }
];


const Employees = () => {

  const [isFilters, setIsFilters] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const dispatch = useAppDispatch();
  const isCollapsed = useAppSelector((state) => state.sidebar.isCollapsed);

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };


  const handleOpenFilters = () => {
    setIsFilters(!isFilters);
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order); // Set the clicked order as selected
    setIsPanelOpen(true); // Open the right-side panel
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false); // Close the right-side panel
    setTimeout(() => setSelectedOrder(null), 300); // Delay resetting the order data to match the closing animation
  };




  return (
    <div className="flex h-screen">
            {/* Left Sidebar */}
            <LeftNav isCollapsed={isCollapsed} />

            {/* Main Content Area */}
            <div className="flex-1 bg-gray-100">
                {/* Top Navbar */}
                <TopNavBar isCollapsed={isCollapsed} toggleSidebar={handleToggleSidebar} />

                {/* Main Content */}
                <div className='mx-8'>
                    {/* Cards Section */}
                    <div className=" flex items-center w-1/2 relative mx-4 mt-4">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />

                        <input
                            type="text"
                            placeholder="Search employee..."
                            className="border bg-white rounded-xl pl-10 pr-4 py-2 w-full focus:outline-none focus:border-purple-800"
                        />
                        <div className=' relative'>
                            <div onClick={handleOpenFilters} className=' border rounded-lg px-2 bg-white cursor-pointer py-2 ms-5 flex items-center gap-2 text-orange-600'>
                                <FunnelIcon className='h-5 w-5' />
                                <p className=' font-semibold'>filters</p>
                            </div>

                            {isFilters && (
                                <div
                                    className="bg-gray-100 p-2 ms-5 mt-24 rounded-md absolute z-50"
                                    style={{ transform: "translateY(-100%)" }}
                                >
                                    <p className="border-b text-sm flex mb-2 justify-between px-2 items-center text-orange-500 cursor-pointer hover:bg-orange-100 hover:text-orange-700 transition-colors duration-300">
                                        All
                                        <SquaresPlusIcon className="h-4 w-4" />
                                    </p>
                                    <p className="border-b text-sm flex mb-2 justify-between px-2 items-center text-orange-500 cursor-pointer hover:bg-orange-100 hover:text-orange-700 transition-colors duration-300">
                                        Pending
                                        <ClockIcon className="h-4 w-4" />
                                    </p>
                                    <p className="text-sm flex mb-2 justify-between px-2 items-center text-orange-500 cursor-pointer hover:bg-orange-100 hover:text-orange-700 transition-colors duration-300">
                                        Complete
                                        <ClipboardDocumentCheckIcon className="h-4 w-4 ms-4" />
                                    </p>
                                </div>
                            )}

                        </div>
                        <div  className=' border rounded-lg px-2 bg-white cursor-pointer py-2 ms-5 flex items-center gap-2 text-orange-600'>
                                <PlusCircleIcon className='h-5 w-5' />
                                <p className=' whitespace-nowrap font-semibold'>add order</p>
                            </div>

                    </div>

                    {/* Table Section */}
                    <div className='bg-white mt-6 shadow-lg rounded-lg overflow-x-auto'>
                        <table className='min-w-full text-left text-gray-900 border-collapse divide-y divide-gray-200'>
                            <thead className="text-sm font-semibold text-gray-600">
                                <tr>
                                    <th className="px-6 py-4">Name</th>
                                    <th className="px-6 py-4">Phone</th>
                                    <th className="px-6 py-4">Task Status</th>
                                    <th className="px-6 py-4">August Advances</th>
                                    <th className="px-6 py-4">Delivery Date</th>
                                    <th className="px-6 py-4">Delivery Phone</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-gray-200">
                                {ordersData.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleOrderClick(order)}>
                                        <td className="px-6 py-4">{order.product}</td>
                                        <td className="px-6 py-4">{order.quantity}</td>
                                        <td className="px-6 py-4">{order.status}</td>
                                        <td className="px-6 py-4">{order.size}</td>
                                        <td className="px-6 py-4">{order.deliveryDate}</td>
                                        <td className="px-6 py-4">{order.deliveryPhone}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Right-Side Panel (Sliding) */}
            <div
                className={`fixed right-0 top-0 bottom-0 w-80 bg-white shadow-lg z-50 overflow-auto transition-transform duration-300 ease-in-out ${isPanelOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="p-6">
                    <div className=''>
                        <button onClick={handleClosePanel} className="absolute border rounded-lg right-10 text-gray-500 hover:text-gray-900 focus:outline-none">
                            <XMarkIcon className=' h-5 w-5 text-orange-600' />
                        </button>
                    </div>

                    {selectedOrder && (
                        <>
                            <div>
                                {/* <h2 className="text-xl font-bold my-4">{selectedOrder.product} Details</h2> */}
                                <h2 className="text-xl font-bold my-4">Order Details</h2>
                                <hr />
                                <p className=' flex justify-between mt-2 mb-1'><span className='font-semibold text-xs'>Quantity:</span> <span className=' text-xs text-gray-800 font-normal'>{selectedOrder.quantity}</span></p>
                                <p className=' flex justify-between mt-2 mb-1'><span className='font-semibold text-xs'>Status:</span> <span className=' text-xs text-white rounded-lg font-bold bg-purple-800 px-2 py-1 flex items-center gap-1 cursor-pointer'><CheckIcon className='h-4 w-4' /> {selectedOrder.status}</span></p>
                                <p className=' flex justify-between mt-2 mb-1'><span className='font-semibold text-xs'>Size:</span> <span className=' text-xs text-gray-800 font-normal'>{selectedOrder.size}</span></p>
                                <p className=' flex justify-between mt-2 mb-1'><span className='font-semibold text-xs'>Delivery Date:</span> <span className=' text-xs text-gray-800 font-normal'>{selectedOrder.deliveryDate}</span></p>
                                <p className=' flex justify-between mt-2 mb-1'><span className='font-semibold text-xs'>Delivery Phone:</span> <span className=' text-xs text-gray-800 font-normal'>{selectedOrder.deliveryPhone}</span></p>
                            </div>
                            <div>
                                {/* <h2 className="text-xl font-bold my-4">{selectedOrder.product} Details</h2> */}
                                <h2 className="text-xl font-bold my-4">Product Details</h2>
                                <hr />
                                <p className=' flex justify-between mt-2 mb-1'><span className='font-semibold text-xs'>Quantity:</span> <span className=' text-xs text-gray-800 font-normal'>{selectedOrder.quantity}</span></p>
                                <p className=' flex justify-between mt-2 mb-1'><span className='font-semibold text-xs'>Status:</span> <span className=' text-xs text-white rounded-lg font-bold bg-purple-800 px-2 py-1 flex items-center gap-1 cursor-pointer'><CheckIcon className='h-4 w-4' /> {selectedOrder.status}</span></p>
                                <p className=' flex justify-between mt-2 mb-1'><span className='font-semibold text-xs'>Size:</span> <span className=' text-xs text-gray-800 font-normal'>{selectedOrder.size}</span></p>
                                <p className=' flex justify-between mt-2 mb-1'><span className='font-semibold text-xs'>Delivery Date:</span> <span className=' text-xs text-gray-800 font-normal'>{selectedOrder.deliveryDate}</span></p>
                                <p className=' flex justify-between mt-2 mb-1'><span className='font-semibold text-xs'>Delivery Phone:</span> <span className=' text-xs text-gray-800 font-normal'>{selectedOrder.deliveryPhone}</span></p>
                            </div>


                        </>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-wrap justify-around gap-2">
                        <button className="border  flex items-center justify-center w-[48%] px-4 py-2 space-x-2 text-orange-600 rounded-lg">
                            <p className="text-sm lowercase">Unaprove</p>
                            <XMarkIcon className="h-4 w-4" />
                        </button>
                        <button className="border flex-grow flex items-center justify-center w-[48%] px-4 py-2 space-x-2 text-orange-600 rounded-lg">
                            <p className="text-sm lowercase whitespace-nowrap">Edit order</p>
                            <PencilIcon className="h-4 w-4" />
                        </button>
                        <button className="border flex-grow flex items-center justify-center w-[48%] px-4 py-2 space-x-2 text-orange-600 rounded-lg">
                            <p className="text-sm lowercase">Track order</p>
                            <MapPinIcon className="h-4 w-4" />
                        </button>
                        <button className="border flex-grow flex items-center justify-center w-[48%] px-4 py-2 space-x-2 text-orange-600 rounded-lg">
                            <p className="text-sm lowercase">Cancel Order</p>
                            <ArchiveBoxXMarkIcon className="h-4 w-4" />
                        </button>
                    </div>



                </div>
            </div>
        </div>
  )
}

export default Employees