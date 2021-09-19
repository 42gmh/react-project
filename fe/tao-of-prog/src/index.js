import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import BookContextProvider from './components/BookContext';

ReactDOM.render(
  <BookContextProvider>
    <Router>
      <App />
    </Router>
  </BookContextProvider>,
  document.getElementById('root')
);