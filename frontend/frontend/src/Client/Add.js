import React from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router'
import { ToastContainer, toast } from 'react-toastify';

function Add(props) {
  const navigate = useNavigate();
  const current = props.currentState
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/appointment/add/',{
      username : localStorage.getItem('username'),
      business:current.business,
      date: current.date,
      start_time: e.target.elements.start_time.value,
      end_time: e.target.elements.end_time.value,
      lat: props.mypos.latitude,
      lon : props.mypos.longitude,
    })
        .then(res => {toast.success(res.data.message);navigate(0)})
        .catch(err => {toast.error('That timeslot is already used')})
  }
  return (
    <form onSubmit={handleSubmit}>
        <label htmlFor="start_time" className="form-label">Start-time:</label>
        <input type='time' className="form-control" name='start_time' id='start_time' />
        <label htmlFor="end_time" className="form-label">End-time:</label>
        <input type='time' name='end_time' className="form-control" id="end_time" /><br />
        <input type='submit' value='Send Appointment' className="btn btn-primary" />
    </form>
  )
}

export default Add