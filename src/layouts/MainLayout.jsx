import React from 'react';
import Navbar from '../components/Shared/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Shared/Footer/Footer';

const MainLayout = () => {
    return (
        <div>
          <Navbar></Navbar>  
          <div>
            <Outlet></Outlet>
          </div>
          <Footer></Footer>
        </div>
    );
};

export default MainLayout;