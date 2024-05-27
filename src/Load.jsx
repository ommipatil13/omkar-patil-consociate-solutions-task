import React from 'react';
import load from './assets/loading.gif';

const Load = () => {
    return (
        <div><img src={load} alt="loading" className='w-24 mx-auto mt-10' /></div>
    )
}

export default Load