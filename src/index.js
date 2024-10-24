// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './index.css';

// First import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Then import your custom CSS to override Bootstrap
// import './index.module.scss';  // or custom.scss if using Sass

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Navbar bg="primary" className="navbar-back">
    </Navbar>
    <App />
  </React.StrictMode>
);