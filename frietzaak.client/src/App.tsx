// @ts-nocheck
import {useEffect, useState, createContext} from 'react';
import './App.css';
import Navbar from './Navbar';
import { Outlet } from "react-router-dom";
export const cartContext = createContext({ currentCart: {}, setCart: () => { } });
export const userContext = createContext({ loggedInUser: {}, setLogin: () => { } })
function App() {
    const [currentCart, setCart] = useState({});
    const [loggedInUser, setLogin] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
     
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(loggedInUser));        
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