import {Link} from 'react-router-dom';
import yinyang from '../yinyang.png'
import { BookContextConsumer } from './BookContext';

const NavBar = () => (

    <BookContextConsumer> 
    {
        ({donated}) => {
            return (
                <nav className="navbar bg-secondary px-sm-0 px-md-3">
                    <Link to="/">
                        <img src={yinyang} alt="Yin Yang" 
                        className="navbar-brand img-fluid"/>
                    </Link>
                    <Link to="/" className="link-dark text-decoration-none">
                        <h4>The Tao of Programming</h4> 
                        <h6>translated by Geoffrey James</h6>
                    </Link>
                    <Link to="/about" className="ms-auto link-dark text-decoration-none">
                        <h4>About</h4>
                        {donated ? <h6 className="ms-auto text-warning bg-secondary text-center">Thanks for donating!</h6> : null}
                    </Link>
                </nav>
        );
        }
    }
    </BookContextConsumer>
)

export default NavBar;