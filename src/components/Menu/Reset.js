import React from 'react';


function Reset(props) {
    return <div className='reset'>
        <button onClick={props.reset}>
            Run Game
        </button>
    </div>
}


export default Reset;