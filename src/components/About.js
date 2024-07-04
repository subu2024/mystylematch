import React from 'react';
import {  Link } from 'react-router-dom';

import './About.scss'; 

const About = () => {
  return (

    <article>
       <header>Home</header>
       Welcome to StyleMatch! <br/>StyleMatch is an innovative online retail brand that specializes in providing a unique blouse making experience to our customers. With our state-of-the-art algorithm, we can recommend the best fabric material and color options for your saree or lehenga, as well as suggest the most suitable design and style for your blouse.
        Our network of skilled tailors and designers can custom stitch your blouse to perfection and ensure a perfect fit. With our convenient delivery service, you can receive your custom fitted blouse right at your doorstep without any hassle.
        At StyleMatch, we are committed to providing our customers with the highest level of quality and convenience, making us the go-to destination for all your blouse making needs. Trust us to help you create the perfect look for any occasion.

        <br/> <br/><h3>Go to</h3>
        <Link to="/chat?isRecommend=true">Designer</Link> | &nbsp;
        <Link to="/ideas?isRecommend=false">Ideas</Link>
    </article>

    
  );
}

export default About;