import React from 'react';
import Hero from './Hero/Hero';
import Testimonials from './Testimonials/Testimonials';
import HowItWorks from './HowItWorks/HowItWorks';
import AboutUs from './AboutUs/AboutUs';
import Features from './Features/Features';

const Home = () => {
    return (
        <div>
           <Hero></Hero>
           <Testimonials></Testimonials>
           <HowItWorks></HowItWorks>
           <AboutUs></AboutUs>
           <Features></Features>
        </div>
    );
};

export default Home;