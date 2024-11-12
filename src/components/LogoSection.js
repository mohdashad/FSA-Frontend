// src/components/Login.js
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/Logo.PNG'; // with import


const LogoSection= ({title}) => {

    return(
        <div>
        <Link to="/">
      <img src={logo} alt='Logo'/>
      </Link>
      <h2>{title}</h2>
      </div>
    )

};



export default LogoSection;