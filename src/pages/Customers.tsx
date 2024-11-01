import React from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { toggleSidebar } from '../features/sidebar/sidebarSlice';
import LeftNav from '../components/LeftNav';
import TopNavBar from '../components/TopNavBar';
import constr from '../assets/images/under-construction.png'

const Customers = () => {
    const dispatch = useAppDispatch();
    const isCollapsed = useAppSelector((state) => state.sidebar.isCollapsed);

    const handleToggleSidebar = () => {
        dispatch(toggleSidebar());
    };
  return (
    <div className='flex h-screen'>
            <LeftNav isCollapsed={isCollapsed} />
            <div className="flex-1 bg-gray-100">
                <TopNavBar isCollapsed={isCollapsed} toggleSidebar={handleToggleSidebar} />
                <div className="p-6 max-h-[550px] overflow-y-auto flex justify-center">
                <img src={constr} alt='coming-soon' loading='lazy'/>
                </div>
            </div>
        </div>
  )
}

export default Customers