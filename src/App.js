/*

App - Stylematch
Ver - 0.21
by - Subu Sangameswar
Last Updated - Apr 2024

This program is property of StyleMatch Inc.
This is the main program
*/



import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss'; // Assuming you have Pico CSS imported in this file.
import Header from './components/Header';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';

import Directory from './components/Directory';
import About from './components/About';

//import NewChat from './components/NewChat';
import Chat2 from './components/Chat2';

const App = () => {
  return (
    <Router>
      <div className="container">
        <Header />
        <NavigationBar />
        <div className="content">
        <Routes>
            <Route exact path="/" element = {<About />} />
            <Route path="/chat" element={<Chat2 isRecommend={true} />} />
            <Route path="/ideas" element={<Chat2 isRecommend={false} />} />
            <Route path="/resources" element = {<Directory/>} />
            
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;


