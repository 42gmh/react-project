import React from 'react';

const ProjectDetails = () => {
    return (
        <div className="card px-5 mx-3 mb-3">
            <h3 className="card-title">2021 DigitalCrafts React Project Details</h3>
            <div className="card-text">
                <p>This is a 2021 DigitalCrafts React project. <a target = "_blank" href="https://github.com/careecodes/React-Project-Requirements/blob/main/README.md">Requirements are here.</a></p>
                <p>For my project, I decided to implement a React version of the <a target = "_blank" href="https://en.wikipedia.org/wiki/The_Tao_of_Programming">Tao of Programming as translated by Geoffrey James</a></p>

                <p>Features of this project:</p>
                <ul>
                    <li>Wrote a screen scraper to convert the online <a target = "_blank" href="https://www.mit.edu/~xela/tao.html">Tao of Programming</a> into data served via an express.js app.</li>
                    <li>Using React Context to manage state</li>
                    <li>Specifics may be found in the <a target="_blank" href="https://github.com/42gmh/react-project">project repo on GitHub</a></li>
                </ul>                            
            </div>
        </div>
    );
};

export default ProjectDetails;