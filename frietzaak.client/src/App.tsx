// @ts-nocheck
import {useEffect, useState, createContext} from 'react';
import './App.css';
import Navbar from './Navbar';
import Index from './Index';
import Menu from './Menu';
import { Outlet } from "react-router-dom";
import Overlays from './Modals/Overlays';

export const cartContext = createContext({ currentCart: {}, setCart: () => { } });
export const userContext = createContext({ loggedInUser: {}, setLogin: () => { } })
function App() {
    const [currentCart, setCart] = useState({});
    const [loggedInUser, setLogin] = useState({});

    useEffect(() => {

        console.log(loggedInUser)
    },[loggedInUser])

    return (
        <>
            <cartContext.Provider value={{ currentCart, setCart }}>
                <userContext.Provider value={{ loggedInUser, setLogin }}>
                    <Navbar />
                    <Outlet />
                </userContext.Provider>
            </cartContext.Provider>
        </>
    );
}

export default App;