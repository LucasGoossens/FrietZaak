import { useState, useEffect, useContext } from "react";
import ShoppingCartMenuItem from "./ShoppingCartMenuItem";
import { cartContext } from "./App"

function ShoppingCart({ onClose }) {
    const { currentCart, setCart } = useContext(cartContext);
    const [totalPrice, setTotal] = useState(0);
    // kart is een Obj met key Ids van MenuItem en value quantity
    // dan hier kijken of iemand ingelogd is etc
    // gewoon bij opstarten lege kart aanhouden
    // bij order aanmaken pas orderId aanmaken

    useEffect(() => {
        calculateTotalPrice();
    }, [currentCart])


    const calculateTotalPrice = () => {

        fetch("https://localhost:7167/menu/item/totalPrice", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(currentCart)
        })
            .then(response => response.json())
            .then(data => {
                setTotal(data)
            })
            .catch(error => {
                console.log("Error", error);
            });
    }

    const confirmOrder = () => {


    }


    return (
        <>
            <div onClick={onClose} className="fixed inset-0 flex justify-center items-center w-screen h-screen">
                <div onClick={(e) => e.stopPropagation()} className="overflow-y-scroll fixed top-6 right-10 w-1/3 h-2/3 bg-slate-100 shadow-lg rounded text-black z-50">

                    {
                        Object.keys(currentCart).map(key => (
                            <ShoppingCartMenuItem key={key} id={key} quantity={currentCart[key]} />
                        ))
                    }
                    <div className="flex flex-row justify-evenly">
                        <div>Total Price: <b>${totalPrice.toFixed(2)}</b></div>
                        <button onClick={confirmOrder} className="p-1 bg-slate-200">Order Now</button>
                    </div>
                </div>
            </div>
        </>
    );

}

export default ShoppingCart;