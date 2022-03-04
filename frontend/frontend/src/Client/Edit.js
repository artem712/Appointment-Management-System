import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router'
import { ToastContainer, toast } from 'react-toastify';

function Edit(props) {
    const navigate = useNavigate();
    const current = props.currentState
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/appointment/${current.id}/`)
        .then(res => {props.setMyposition({latitude:res.data.lat, longitude:res.data.lon}) ;setData(res.data)})
    },[current.id])
   
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://127.0.0.1:8000/appointment/${current.id}/`,{
            business:current.business,
            date: current.date,
            status:'pending',
            start_time: e.target.elements.start_time.value,
            end_time: e.target.elements.end_time.value,
            lat: props.mypos.latitude,
            lon: props.mypos.longitude
        })
            .then(res => {toast.success('Successfully edit');navigate(0)})
        props.setFlag(true)
    }
    return (
        <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="start_time" className="form-label">Start-time:</label>
            <input key={data.start_time} type='time' className="form-control" name='start_time' defaultValue={data.start_time} id='start_time' />
            <label htmlFor="end_time" className="form-label">End-time:</label>
            <input type='time' name='end_time' className="form-control" defaultValue={data.end_time} id="end_time" /><br />
            <input type='submit' value='Edit' className="btn btn-primary" />
        </form>
        </div>
      )
}

export default Edit