import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom'
//LOGIN
import Dashboard from './pages/dashboard'
import Home from './pages/home'
import Login from './pages/login'
import Account from './pages/Account'
//INVMS
import GetProduct from './invms/GetProduct'
import SellProduct from './invms/SellProduct'




  

import { useSelector } from 'react-redux'

const PrivateRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth)

  return <>{isAuth ? <Outlet /> : <Navigate to='/login' />}</>
}

const RestrictedRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth)

  return <>{!isAuth ? <Outlet /> : <Navigate to='/dashboard' />}</>
  
}

const BrowserRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />

        <Route element={<PrivateRoutes />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/get-product' element={<GetProduct />} />
          <Route path='/sell-product' element={<SellProduct />} />
          <Route path='/get-cred' element={<Account/>} />
   
       
       

        </Route>

        <Route element={<RestrictedRoutes />}>
          
          <Route path='/login' element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>

  )
}




export default BrowserRoutes