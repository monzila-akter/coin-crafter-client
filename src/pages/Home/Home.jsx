import React from 'react';
import Hero from './Hero/Hero';
import Testimonials from './Testimonials/Testimonials';
import HowItWorks from './HowItWorks/HowItWorks';
import AboutUs from './AboutUs/AboutUs';
import Features from './Features/Features';
import BestWorkers from './Bestworkers/BestWorkers';
import { Helmet } from 'react-helmet-async';
import AvailableTask from './AvailableTasks/AvailableTask';
import Newsletter from './Newsletter/Newsletter';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>CoinCrafter | Home</title>
            </Helmet>
           <Hero></Hero>
           <BestWorkers></BestWorkers>
           <Testimonials></Testimonials>
           <AvailableTask></AvailableTask>
           <HowItWorks></HowItWorks>
           <AboutUs></AboutUs>
           <Features></Features>
           <Newsletter></Newsletter>
        </div>
    );
};

export default Home;