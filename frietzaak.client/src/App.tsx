// @ts-nocheck
import { useEffect, useState, createContext} from 'react';
import './App.css';
import Navbar from './Navbar';
import Index from './Index';
import Menu from './Menu';
import { Outlet } from "react-router-dom";
import Overlays from './Modals/Overlays';

export const cartContext = createContext({ currentCart: {}, setCart: () => { } });

function App() {
    const [currentCart, setCart] = useState({});


    return (
        <>
            <cartContext.Provider value={{currentCart, setCart}}>
                <Navbar />
                <Outlet />
            </cartContext.Provider>
        </>
    );

}

export default App;