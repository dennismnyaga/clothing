import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Stock from "./pages/Stock";
import Orders from "./pages/Orders";
import Analytics from "./pages/Analytics";
import Roles from "./pages/Roles";
import Expenses from "./pages/Expenses";
import Employees from "./pages/Employees";
import { useEffect } from "react";
import { useAppDispatch } from "./app/hooks";
import { fetchCart } from "./features/orders/cartSlice";



const App = () => {

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCart())
  }, [dispatch])


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="stock/*" element={<Stock />} />
        <Route path="orders/*" element={<Orders />} />
        <Route path="analytics/*" element={<Analytics />} />
        <Route path="roles/*" element={<Roles />} />
        <Route path="expenses/*" element={<Expenses />} />
        <Route path="employees/*" element={<Employees />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
