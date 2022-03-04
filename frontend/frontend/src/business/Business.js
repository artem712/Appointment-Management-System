import React, { useState,useCallback,useEffect,useMemo } from 'react'
import { Eventcalendar, Select, momentTimezone } from '@mobiscroll/react';
import axios from 'axios';
import moment from 'moment-timezone';
import { ToastContainer, toast } from 'react-toastify';
import Map from './Map'

momentTimezone.moment = moment;
function Business() {
    const [myEvents, setEvents] = useState([]);
    const [data, setData] = useState([])
    const [timezone, setTimezone] = useState('Asia/Pyongyang');
    const [appointment, setAppointment] = useState([])
    const [mypos, setMyposition] = useState([])
    const [flag, setFlag] = useState(false)

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/appointment/business`, {
            params:{username: localStorage.getItem('username')}
        })
            .then(res => {setData(res.data)})
    }, []);
    
    const onEventClick = useCallback((event) => {
        setFlag(true)
        toast(event.event.title,{position:toast.POSITION.BOTTOM_CENTER});
        axios.get(`http://127.0.0.1:8000/appointment/${event.event.id}`)
            .then(res => {
                setAppointment(res.data);
                setMyposition({latitude:res.data.lat, longitude:res.data.lon})
            })
    }, []);
    
    const view = useMemo(() => {
        return {
            schedule: { 
                type: 'week',
                allDay: false,
                // startTime: '07:00',
                // endTime: '20:00',
                timeCellStep: 30,
                timeLabelStep: 30
            }
        };
    }, []);

    const timezones = useMemo(() => {
        return [{
            text: 'America/Los Angeles',
            value: 'America/Los_Angeles'
        }, {
            text: 'America/Chicago',
            value: 'America/Chicago'
        }, {
            text: 'America/New York',
            value: 'America/New_York'
        }, {
            text: 'UTC',
            value: 'utc'
        }, {
            text: 'Europe/London',
            value: 'Europe/London'
        }, {
            text: 'Europe/Berlin',
            value: 'Europe/Berlin'
        }, {
            text: 'Europe/Bucharest',
            value: 'Europe/Bucharest'
        }, {
            text: 'Asia/Shanghai',
            value: 'Asia/Shanghai'
        }, {
            text: 'Asia/Pyongyang',
            value: 'Asia/Tokyo'
        }]
    }, []);

    const createEvent = (time) => {
        const id = time.id
        const startTime = time.date + 'T' + time.start_time
        const endTime = time.date + 'T' + time.end_time
        const title = time.customer+'('+time.service+')'
        var color = ''
        if (time.status === 'confirmed'){color = 'red'}
        else if(time.status === 'pending'){color = 'green'}
        else {color = 'blue'}
        const newTime = {id:id, start: startTime, end: endTime, title: title, color: color};
        return newTime;
    }

    const handleChange = (e) => {
        e.preventDefault();
        setEvents([])
        const selectedIdx = e.target.selectedIndex;
        const optionElement = e.target.childNodes[selectedIdx];
        const optionElementId = optionElement.getAttribute("id");
        axios.get('http://127.0.0.1:8000/appointment/businessAll/',{
          params: {
            business: optionElementId,
          }
        })
        .then(res => {
          const newEvent = res.data.map(time => createEvent(time));
          setEvents(newEvent);
        }
        )
    }

    const onChange = useCallback((ev) => {
        setTimezone(ev.value);
    }, []);

    const confirm = (id) => {
        axios.put(`http://127.0.0.1:8000/appointment/${id}/`,{
            status: 'confirmed',
        })
            .then(res => {
                setEvents(
                    myEvents.map(event => {
                        if(event.id === id){
                            event.start = res.data.date + 'T' + res.data.start_time;
                            event.end = res.data.date + 'T' + res.data.end_time;
                            event.status = res.data.status;
                            event.color = 'red';
                        }
                        return event
                    }))
                toast.success('OK!!');
            })
    }
   
    const cancel = (id) => {
        axios.patch(`http://127.0.0.1:8000/appointment/${id}/`,{
            status: 'canceled',
        })
            .then(res => {
                setEvents(
                    myEvents.map(event => {
                        if(event.id === id){
                            event.start = res.data.date + 'T' + res.data.start_time;
                            event.end = res.data.date + 'T' + res.data.end_time;
                            event.status = res.data.status;
                            event.color = 'blue';
                        }
                        return event
                    }))
                toast.success('You canceled this appointment.');
        })
    }
    return (
        <div className='row'>
            <div className='col-md-7'>
                <div style={{display:'flex', justifyContent:'flex-end'}}>
                    <strong style={{padding:'10px'}}>Businesss:</strong> <select className="form-select form-select-sm" name="business" required="" onChange={handleChange.bind(this)} id="business">
                        <option>---------</option>
                        {data.map((business) => {
                        return <option key={business.id} id={business.id}>{business.name}</option>
                        })}
                    </select>
                    <Select data={timezones} display="anchored" value={timezone} onChange={onChange} />
                </div>
                <Eventcalendar
                    theme="ios" 
                    themeVariant="light"
                    dataTimezone='Asia/Pyongyang'
                    displayTimezone={timezone}
                    timezonePlugin={momentTimezone}
                    data={myEvents}
                    height='600px'
                    view={view}
                    onEventClick={onEventClick}
                />
            </div>
            <div className="border border-info col-md-5" style={{padding:'30px'}}>
                <div>
                    <p><strong>Client: {appointment.customer}</strong></p>
                    <p><strong>Service: {appointment.service}</strong></p>
                    <p><strong>Start-Time: {appointment.start_time}</strong></p>
                    <p><strong>End-Time: {appointment.end_time}</strong></p>
                    <p><strong>Status: {appointment.status}</strong></p>
                    {appointment.status==='pending' && <input type='button' className='btn btn-success' value='Confirm' onClick={confirm.bind(this, appointment.id)} />}
                    <input type='button' className='btn btn-danger' value='Cancel' onClick={cancel.bind(this, appointment.id)} />
                </div>
                <div style={{height: '400px'}}>
                    <Map key={mypos.latitude} setMyposition={setMyposition} mypos={mypos} flag={flag} />
                </div>
            </div>
        </div>
    ); 
}

export default Business