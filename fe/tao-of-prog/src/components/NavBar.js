import {Link} from 'react-router-dom';
import yinyang from '../yinyang.png'

const NavBar = () => (
    <nav className="navbar navbar-expand-sm bg-secondary px-sm-2 px-lg-3">
        <Link to="/">
            <img src={yinyang} alt="Yin Yang" 
            className="navbar-brand img-fluid"/>
        </Link>
        <Link to="/" className="link-dark text-decoration-none">
            <h4>The Tao of Programming</h4>
        </Link>
        <Link to="/about" className="ms-auto link-dark text-decoration-none">
            <h4>About</h4>
        </Link>
    </nav>
)

export default NavBar;