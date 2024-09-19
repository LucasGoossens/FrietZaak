import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './Navbar';
import Index from './Index';
import Menu from './Menu';
import { Outlet } from "react-router-dom";
import Overlays from './Modals/Overlays';

function App() {

    return (
        <>        
            <Navbar />            
            <Outlet/>           
        </>
    );

}

export default App;