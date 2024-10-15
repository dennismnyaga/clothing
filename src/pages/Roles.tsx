import React from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { toggleSidebar } from '../features/sidebar/sidebarSlice';
import LeftNav from '../components/LeftNav';
import TopNavBar from '../components/TopNavBar';
import { CalendarDateRangeIcon, ChevronUpDownIcon, EllipsisVerticalIcon, PlusCircleIcon, PlusIcon, StarIcon } from '@heroicons/react/24/outline';

const Roles = () => {

  const dispatch = useAppDispatch();
  const isCollapsed = useAppSelector((state) => state.sidebar.isCollapsed);

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
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

        <div className="p-6">
          <div className=' bg-white rounded-lg flex justify-between px-3 py-4'>
            <div>
              <h4 className=' text-gray-400 font-medium text-sm mb-2'>Total Projects</h4>
              <p className=' font-semibold'>1</p>
            </div>
            <div className='border-l border-dashed border-gray-300 pl-3'>
              <h4 className=' text-gray-400 font-medium text-sm mb-2'>Total Tasks</h4>
              <p className=' font-semibold'>0</p>
            </div>
            <div className='border-l border-dashed border-gray-300 pl-3'>
              <h4 className=' text-gray-400 font-medium text-sm mb-2'>Assigned Tasks</h4>
              <p className=' font-semibold'>1</p>
            </div>
            <div className='border-l border-dashed border-gray-300 pl-3'>
              <h4 className=' text-gray-400 font-medium text-sm mb-2'>Completed Tasks</h4>
              <p className=' font-semibold'>1</p>
            </div>
          </div>
          {/* <button className=' flex items-center border border-orange-600 px-2 py-0.5 space-x-2 text-orange-700 rounded-lg mt-4'>
            <PlusCircleIcon className=' h-5 w-5' />
            <p>Create task</p>
          </button> */}

          <div className='grid grid-cols-2 gap-4 mt-2'>
            <div className=' bg-gray-200 p-3 rounded-lg px-3'>
              <div className=' flex justify-between items-center '>
                <h5 className=' font-semibold text-sm'>Assigned tasks</h5>
                <div className=' flex space-x-4'>
                  <div className=' flex items-center space-x-2 bg-white rounded-lg px-2 py-0.5 cursor-pointer'>
                    <p className=' text-xs font-semibold lowercase'>Nearest Due date</p>
                    <ChevronUpDownIcon className=' h-4 w-4' />
                  </div>
                  <div className='bg-white rounded-xl p-2 cursor-pointer'>
                    <EllipsisVerticalIcon className='w-4 h-4 ' />
                  </div>

                </div>


              </div>
              <div className=' border border-dashed border-gray-400 my-4'></div>
              <div className=' mt-2 flex justify-between items-center bg-white px-2 py-1 rounded-lg'>
                <div>
                  <h4 className=' font-bold text-base text-gray-700'>Size 32 trouser</h4>
                  <div className=' flex items-center'>
                    <p className=' font-medium text-base text-gray-600'>Cutting the material</p>
                    <StarIcon className=' h-2 w-2 mx-2' />
                    <p className=' flex items-center gap-2 text-gray-500 font-medium'><CalendarDateRangeIcon className='h-3 w-3' /> Due in 10 min</p>
                  </div>

                </div>
                <div className=' border border-gray-400 px-1 rounded-lg cursor-pointer'>
                  <input type='checkbox' className=' cursor-pointer' />
                </div>
              </div>
            </div>

            {/* adding the project */}
            <div className=' bg-gray-200 p-3 rounded-lg px-3'>
              <div className=' flex justify-between items-center '>
                <h5 className=' font-semibold text-sm'>Assigned tasks</h5>
                <div className=' flex space-x-4'>
                  <div className=' flex items-center space-x-2 bg-white rounded-lg px-2 py-0.5 cursor-pointer'>
                    <p className=' text-xs font-semibold lowercase'>Nearest Due date</p>
                    <ChevronUpDownIcon className=' h-4 w-4' />
                  </div>
                  <div className='bg-white rounded-xl p-2 cursor-pointer'>
                    <EllipsisVerticalIcon className='w-4 h-4 ' />
                  </div>

                </div>
              </div>
              <div className=' border border-dashed border-gray-400 my-4'></div>
              <div className='mt-2 grid grid-cols-2 gap-5 items-center bg-gray-300 px-2 py-1 rounded-lg'>
                <div className='flex items-center bg-white px-4 py-1 rounded-lg gap-2 cursor-pointer h-full w-full'>
                  <div className='bg-gray-600 rounded-full p-1'>
                    <PlusIcon className='!text-white h-6 w-6' />
                  </div>
                  <p className='font-semibold'>New Project</p>
                </div>

                <div className='flex items-center bg-white px-4 py-1 rounded-lg gap-2 cursor-pointer h-full w-full'>
                  <div className='bg-gray-600 rounded-full p-1'>
                    <PlusIcon className='!text-white h-6 w-6' />
                  </div>
                  <div>
                    <p className='font-semibold'>New Project</p>
                    <span className='font-medium text-sm'>1 project due soon</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Roles