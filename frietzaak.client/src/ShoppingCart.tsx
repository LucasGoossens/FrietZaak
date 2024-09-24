import { useState } from "react";
import ShoppingCartMenuItem from "./ShoppingCartMenuItem";

function ShoppingCart({onClose }) {  
    const [currentCart, setCart] = useState({});
    // kart is een Obj met key Ids van MenuItem en value quantity
    // dan hier kijken of iemand ingelogd is etc
    // gewoon bij opstarten lege kart aanhouden
    // bij order aanmaken pas orderId aanmaken 

    return (
        <>        
            <div onClick={onClose} className="fixed inset-0 flex justify-center items-center w-screen h-screen ">
                <div onClick={(e) => e.stopPropagation()} className="overflow-y-scroll fixed top-6 right-10 w-1/3 h-2/3 bg-slate-100 shadow-lg rounded text-black z-50">
            
                    <ShoppingCartMenuItem />
                    <ShoppingCartMenuItem />
                    <ShoppingCartMenuItem />
                </div>
            </div>
        </>
    );
}

export default ShoppingCart;