import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Client/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import BusinessApp from './business/BusinessApp'
// import 'bootstrap/dist/css/bootstrap.min.css';
const priority = localStorage.getItem('priority')
if(priority==='business'){
  ReactDOM.render(
    <React.StrictMode>
      <Router>
        <BusinessApp />
      </Router>
    </React.StrictMode>,
    document.getElementById('root')
  );}
else {
  ReactDOM.render(
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
