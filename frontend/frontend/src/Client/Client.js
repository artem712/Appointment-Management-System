import React from 'react';
import { useState } from 'react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Datepicker, Page, setOptions } from '@mobiscroll/react';
import '../App.css';
import axios from "axios";
import Add from './Add';
import Edit from './Edit';
import { ToastContainer, toast } from 'react-toastify';
import Map from './Map'

setOptions({
    theme: 'ios',
    themeVariant: 'light'
});

function Client() {
    const [data, setData] = useState([])
    const [mypos, setMyposition] = useState([])
    const [currentState, setCurrentState] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [invalid, setInvalid] = useState([]);
    const [flag, setFlag] = useState(false)
    const getData = (date) => {
      var txt = date.getFullYear() + '-' + String(date.getMonth()+1).padStart(2,'0') + '-' + date.getDate()
      setCurrentState({...currentState, date:txt});
      axios.get('http://127.0.0.1:8000/appointment/business/',{
        params:{username: localStorage.getItem('username')}
      })
        .then(res => setData(res.data))
      axios.get('http://127.0.0.1:8000/appointment/client/',{
        params:{
          date:txt,
          username : localStorage.getItem('username')
        }
      })
        .then(res => 
          setAppointments(res.data)
        )
    }
    
    const deleteApp = (id) => {
        axios.delete(`http://127.0.0.1:8000/appointment/${id}`)
            .then(res => {setAppointments(appointments.filter(item => item.id !== id));toast.warn('Succesfully delete')})
    }

    const createInvalid = (time) => {
      const startTime = time.date + 'T' + time.start_time
      const endTime = time.date + 'T' + time.end_time
      const newTime = {start: startTime, end: endTime};
      return newTime;
    }
    
    const handleChange = (e) => {
      e.preventDefault();
      setInvalid([])
      const selectedIdx = e.target.selectedIndex;
      const optionElement = e.target.childNodes[selectedIdx];
      const optionElementId = optionElement.getAttribute("id");
      setCurrentState({...currentState, business:optionElement.value});
      axios.get('http://127.0.0.1:8000/appointment/businessview/',{
        params: {
          business: optionElementId,
          date : currentState.date,
        }
      })
      .then(res => {
        const nwinvalid = res.data.map(time => createInvalid(time));
        setInvalid(nwinvalid);
      }
      )
    }

    const edit = (id,business) => {
      setCurrentState({...currentState, id:id});
      document.getElementById('id_business').value = business;
      setFlag(true);
    }
    console.log(flag)
    return (
        <div>
          <div className='row'>
          <Page className="md-calendar-booking col-md-8">
            <div className="mbsc-form-group">
              <div className="mbsc-form-group-title">Select date & time</div>
              <Datepicker 
                  display="inline"
                  controls={['calendar', 'timegrid']}
                  minTime="08:00"
                  maxTime="20:00"
                  stepMinute={30}
                  width={null}
                  // labels={datetimeLabels}
                  invalid={invalid}
                  cssClass="booking-datetime"
                  onChange={(date) => getData(date.value)}
              />
            </div>
          </Page>
          <div className='col-md-4'>
            <Map key={currentState.id} mypos={mypos} setMyposition={setMyposition} currentState={currentState} flag={flag} />
          </div>
          </div>
          <div className='row'>
            <div className='col-md-6'>
              <div className="mbsc-form-group">
                  <div className="mbsc-form-group-title">Appointment</div>
              </div>
              <ul>
                  {appointments && appointments.map(appointment => 
                      <li key={appointment.id} style={{display:'flex',justifyContent:'space-between',borderBottom: '1px solid',marginTop:'10px'}}>
                          <span className='text-danger'>{appointment.start_time} - {appointment.end_time}: <strong>{appointment.service}({appointment.business})</strong></span>
                          <span className='text-success'>status: <strong>{appointment.status}</strong></span>
                          <div>
                          {appointment.status==='canceled' ? '' : <input type='button' className='btn btn-warning' value='Edit' onClick={edit.bind(this,appointment.id,appointment.business)} />}
                          <input type='button' onClick={deleteApp.bind(this,appointment.id)} value='Delete' className='btn btn-danger' />
                          </div>
                      </li>
                  )}
              </ul>
              </div>
            <div className="col-md-6">
              <div style={{margin:'50px'}}>
              <label>Business:</label><br />
              <select name="business" required="" onChange={handleChange.bind(this)} id="id_business">
                <option>---------</option>
                {data.map((business) => {
                  return <option key={business.id} id={business.id}>{business.name}</option>
                })}
              </select><br />
              <label className="form-label">Date: {currentState.date}</label>
              {flag ? <Edit currentState={currentState} mypos={mypos} setMyposition={setMyposition} setFlag={setFlag} /> : <Add currentState={currentState} mypos={mypos} />}
              </div>
            </div>
          </div>
        </div>
    );
}

export default Client;