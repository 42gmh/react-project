import React from 'react';
import StanzaList from './StanzaList';

const Section = ({section}) => {

    return (
        <div className="card px-sm-1 px-md-5 mx-sm-1 mx-md-3 mb-3 bg-light">
            <div className="card-body">
                <h5 className="card-title text-right">{section.id}</h5>
                {
                    <StanzaList key={section.id} stanzas={section.stanzas}/>
                }
            </div>
        </div>
    );
};

export default Section;