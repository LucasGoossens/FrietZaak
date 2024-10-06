import { useState, useEffect, useContext } from "react";
import ShoppingCartMenuItem from "./ShoppingCartMenuItem";
import { cartContext, userContext } from "./App"
import { useNavigate } from "react-router-dom";

function ShoppingCart({ onClose }) {
    const { currentCart, setCart } = useContext(cartContext);
    const { loggedInUser, setLogin } = useContext(userContext);

    const navigate = useNavigate();

    const [isDisabled, setDisabled] = useState(true);

    const [totalPrice, setTotal] = useState(0);
    // kart is een Obj met key Ids van MenuItem en value quantity
    // dan hier kijken of iemand ingelogd is etc
    // gewoon bij opstarten lege kart aanhouden
    // bij order aanmaken pas orderId aanmaken

    useEffect(() => {
        calculateTotalPrice();
    }, [currentCart])

    useEffect(() => {
        Object.keys(currentCart).length > 0 ? setDisabled(false) : setDisabled(true);
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

        if (loggedInUser == null) {
            navigate("/login")
            return;
        }

        fetch("https://localhost:7167/order/create", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ShoppingCart: currentCart,
                CustomerId: loggedInUser.id
            })
        })
            .then(response => response.json())
            .then(data => {
                navigate("/order");
                setCart({});
            })
            .catch(error => {
                console.log("Error", error);
            });
    }


    return (
        <>
            <div onClick={onClose} className="fixed inset-0 flex justify-center items-center w-screen h-screen">
                <div onClick={(e) => e.stopPropagation()} className="overflow-y-scroll fixed top-6 right-10 w-1/3 h-2/3 bg-slate-100 shadow-lg border-slate-800 border-2 rounded text-black z-50">

                    {
                        Object.keys(currentCart).map(key => (
                            <ShoppingCartMenuItem key={key} id={key} quantity={currentCart[key]} />
                        ))
                    }
                    <div className="flex flex-row justify-evenly">
                        {!isDisabled ?
                            <>
                                <div>Total Price: <b>${totalPrice.toFixed(2)}</b></div>
                                <button onClick={confirmOrder} className="p-1 bg-slate-200">Order Now</button>
                            </> :
                            <div className="font-bold">No items added</div>
                        }
                    </div>
                </div>
            </div>
        </>
    );

}

export default ShoppingCart;