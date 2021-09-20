import React from 'react';

const StanzaList = ({stanzas}) => {
    let prevStanzaType = null;

    return (
        stanzas.map((aStanza, stanzaIndex) => {
            prevStanzaType = aStanza.type;

            if("block" === aStanza.type) {
                const blockKey = "b-" + stanzaIndex;
                return (

                        <div key={blockKey} className="card m-0 p-0 bg-light border-0">
                            <div className="card-body">
                                { aStanza.lines.map((aLine, index) => <p key={blockKey+"-"+index} className="my-0 card-text">{aLine}</p>)}
                            </div>
                        </div>
                );
            }
            else {
                const classToApply =  ("block" === prevStanzaType) ? "py-0 mb-0" : "";
                const lineKeyPrefix = "l-" + stanzaIndex + "-";

                return aStanza.lines.map((aLine, index) => <p key={lineKeyPrefix + index} className={classToApply}>{aLine}</p>) 
            }
        })
    );
};

export default StanzaList;