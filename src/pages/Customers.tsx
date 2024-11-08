import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { toggleSidebar } from '../features/sidebar/sidebarSlice';
import LeftNav from '../components/LeftNav';
import TopNavBar from '../components/TopNavBar';
import { fetchCustomers, selectAllCustomer } from '../features/customer/customersSlice';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
  price: number,
) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}


const Customers = () => {
  const dispatch = useAppDispatch();
  const all_customers = useAppSelector(selectAllCustomer);
  const isCollapsed = useAppSelector((state) => state.sidebar.isCollapsed);

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };


  useEffect(() => {
    dispatch(fetchCustomers())
  }, [dispatch])


  return (
    <div className='flex h-screen'>
      <LeftNav isCollapsed={isCollapsed} />
      <div className="flex-1 bg-gray-100">
        <TopNavBar isCollapsed={isCollapsed} toggleSidebar={handleToggleSidebar} />
        <div className="p-6 max-h-[550px] overflow-y-auto flex justify-center">
          {/* <img src={constr} alt='coming-soon' loading='lazy'/> */}
          <div className='bg-white mt-6 shadow-lg rounded-lg overflow-x-auto'>
            <table className='max-w-full text-left text-gray-900 border-collapse divide-y divide-gray-200'>
              <thead className="text-sm font-semibold text-gray-600">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4">Action</th>

                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-200">
                {all_customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50 cursor-pointer" >
                    <td className="px-6 py-4">{customer.name}</td>
                    <td className="px-6 py-4">+254 {customer.phone}</td>

                    <td className="px-3 py-4 ">
                      <div className="flex space-x-3 text-blue-600">
                        <button
                          // onClick={() => handleProductClickCart(product, variation)}
                          className="bg-blue-400 px-2 py-0.5 rounded-md text-white font-semibold flex items-center gap-2"
                        >
                          Create order
                        </button>
                        <button
                          // onClick={() => handleClickOpenRecievedProdcut(product, variation)}
                          className="bg-pink-400 px-2 py-0.5 rounded-md text-white font-semibold flex items-center gap-2"
                        >
                          history
                        </button>
                        <button
                          // onClick={() => handleProductClickEdit(product, variation)}
                          className="bg-green-500 px-2 py-0.5 rounded-md text-white font-semibold flex items-center gap-2"
                        >
                          Update
                        </button>
                        <button
                          // onClick={() => handleOpenDeletProductProd(variation)}
                          className="bg-red-400 px-2 py-0.5 rounded-md text-white font-semibold flex items-center gap-2"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Customers