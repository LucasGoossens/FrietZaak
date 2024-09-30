import { useState } from "react";
import { Link } from "react-router-dom";
import Overlays from "./Modals/Overlays";
import ShoppingCart from "./ShoppingCart";

function Navbar() {
    const [isOpen, setOpen] = useState(false);
    const [currentModal, setModal] = useState(null);    
    localStorage.setItem("cart", JSON.stringify({}));


    const handleShoppingCart = () => {
        setOpen(true);
        setModal(<ShoppingCart onClose={onClose} />)
    }

    const onClose = () => {
        setOpen(false);
        setModal(null);
    }

    return (
        // bij fixed dan iets dat wanneer je window.scroll.y < weet ik veel dan padding minder
        <>
            <Overlays isOpen={isOpen} modal={currentModal} />
            <div className="fixed bg-opacity-90 bg-black p-5 px-10 pr-80 flex w-full justify-between">
                <div className="bg-[#D9D9D9] text-black w-16 font-bold">Logo</div>
                <div>
                    <Link to="/" className="text-xl text-[#D9D9D9] m-2 opacity-100">Home</Link >
                    <Link to="menu" className="text-xl text-[#D9D9D9] m-2 opacity-100">Menu</Link >
                    <Link to="order" className="text-xl text-[#D9D9D9] m-2 opacity-100">Orders</Link>
                    <Link to="" className="text-xl text-[#D9D9D9] m-2 opacity-100">Contact</Link >
                    <Link to="login" className="text-xl text-[#D9D9D9] m-2 opacity-100">Login</Link>
                    <button onClick={handleShoppingCart} className="bg-[#D9D9D9] text-black absolute right-10">Winkelmandje</button>
                </div>
            </div>

        </>

    );
}

export default Navbar;