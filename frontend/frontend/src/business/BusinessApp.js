import React from 'react'
import { useLocation} from 'react-router'
import { Routes, Route } from 'react-router-dom'
import Login from '../Client/Login'
import Signup from '../Client/Signup'
import Navbar from '../Navbar'
import Business from './Business'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'mapbox-gl/dist/mapbox-gl.css';

function BusinessApp() {
  const location = useLocation();
    return (
      <div>
        <ToastContainer position="bottom-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover/>
        <Navbar key={location.key} />
        <Routes> 
            <Route exact path='/' element={<Business />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
        </Routes>
      </div>
    )
}

export default BusinessApp
