import { BookContextConsumer } from './BookContext';
import Donate from './Donate';
import ProjectDetails from './ProjectDetails';

const About = () => (

    <BookContextConsumer> 
    {
        (value) => {

            return ( 
                <div className = "bg-dark py-3">
                    <ProjectDetails/>
                    <Donate/>
                </div>
            )
        }
    }
    </BookContextConsumer>
);

export default About;