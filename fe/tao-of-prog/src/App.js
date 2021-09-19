import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  Switch,
  Route,
  // Link
} from "react-router-dom";

import NavBar from './components/NavBar';
import About from './components/About';
import BooksList from './components/BooksList';
import Book from './components/Book';

function App() {
  return (
    <>
      <NavBar/>
      <Switch>
        <Route exact path="/" component={BooksList} />
        <Route exact path="/book" component={Book} />
        <Route path="/about" component={About} />
        <Route component={BooksList} />
      </Switch>
    </>
  );
}

export default App;
