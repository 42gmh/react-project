import React from 'react';
import StanzaList from './StanzaList';

const Section = ({section}) => {

    return (
        <div className="card px-5 mx-3 mb-3 bg-light">
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