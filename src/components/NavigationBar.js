import React from 'react';
import { Link } from 'react-router-dom';

import './NavigationBar.scss'; 

const NavigationBar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/chat">Designer</Link></li>
        <li><Link to="/ideas">Ideas</Link></li>
        <li><Link to="/resources">Directory</Link></li>
      </ul>
    </nav>
  );
}

export default NavigationBar;