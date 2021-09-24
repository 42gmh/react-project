import React from 'react';

const ProjectDetails = () => {
    return (
        <div className="card px-5 mx-3 mb-3">
            <h3 className="card-title">2021 DigitalCrafts React Project Details</h3>
            <div className="card-text">
                <p>This is a 2021 DigitalCrafts React project. <a href="https://github.com/careecodes/React-Project-Requirements/blob/main/README.md">Requirements are here.</a></p>
                <p>Features of this project:</p>
                <ul>
                    <li>Wrote a screen scraper to convert the online <a href="https://www.mit.edu/~xela/tao.html">Tao of Programming</a> text into a <a href="/tao.json">json file</a>.</li>
                    <li>Serving the contents of the Tao json file via an express.js app. Exposing to endpoints /booksummary and /book/:id</li>
                    <li>Using React Context to manage state</li>
                    <li>Specifics may be found in the <a href="https://github.com/42gmh/react-project">project repo on GitHub</a></li>
                </ul>                            
            </div>
        </div>
    );
};

export default ProjectDetails;