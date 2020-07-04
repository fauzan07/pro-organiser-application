import React from 'react';
import './Loader.css'
import Spinner from './assets/loading1.gif';


function Loader() {
    return (
       
       
        <div className="spinner">
        <img src={Spinner} alt="loading"/>
        </div>
        
    )
}

export default Loader;
