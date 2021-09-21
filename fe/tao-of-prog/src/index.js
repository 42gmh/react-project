import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import BookContextProvider from './components/BookContext';

require('dotenv').config();

console.log('ENV ENV ENV:', process.env);

ReactDOM.render(
  <BookContextProvider>
    <Router>
      <App />
    </Router>
  </BookContextProvider>,
  document.getElementById('root')
);