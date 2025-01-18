import React from 'react';
import Navbar from '../components/Shared/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Shared/Footer/Footer';
import Home from '../pages/Home/Home';
import { Toaster } from 'react-hot-toast';

const MainLayout = () => {
    return (
        <div>
          <Toaster></Toaster>
          <Navbar></Navbar>  
          <div className='min-h-screen'>
            <Outlet>
            </Outlet>
          </div>
          <Footer></Footer>
        </div>
    );
};

export default MainLayout;