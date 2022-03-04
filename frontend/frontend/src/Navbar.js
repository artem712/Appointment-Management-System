import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const token = localStorage.getItem("token");
    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        localStorage.removeItem('priority')
    }
    return (
        <nav className="navbar navbar-dark bg-dark justify-content-between">
            <a className="navbar-brand">Appointment</a>
            <form className="form-inline row">
                <a className='nav-link text-white'>Welcome {localStorage.getItem('username')}!   </a>
                <a className="nav-link text-white" href="/">Home</a>
                {token?(<a className="nav-link text-white" href="/login" onClick={logout}>Logout</a>)
                :( <React.Fragment>
                    <a className="nav-link text-white" href='/login'>Login</a>
                    <a className="nav-link text-white" href="/signup">Signup</a>
                </React.Fragment>)}
            </form>
        </nav>
    )
}

export default Navbar;