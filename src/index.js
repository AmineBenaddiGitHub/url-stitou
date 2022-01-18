import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewShortener from './pages/NewShortener';
import AccessShortener from './pages/AccessShortener';
import NotFound from './pages/NotFound'


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<NewShortener />} />
        <Route index element={<NewShortener />} />
        <Route path="shortener/new" element={<NewShortener />} />
        <Route path="/:shortId" element={<AccessShortener />} />
        <Route path="/not-found" element={<NotFound />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
