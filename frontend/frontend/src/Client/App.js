import React from 'react'
import { useLocation } from 'react-router'
import { Routes, Route } from 'react-router-dom'
import Login from './Login'
import Client from './Client'
import Signup from './Signup'
import Navbar from '../Navbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'mapbox-gl/dist/mapbox-gl.css';
// import Map from './Map'

function App() {
    const location = useLocation();
    return (
      <div>
        <ToastContainer position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover/>
        <Navbar key={location.key} />
        <Routes>
            <Route exact path='/' element={<Client />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            {/* <Route path='/map' element={<Map />} /> */}
        </Routes>
      </div>
    )
}

export default App
