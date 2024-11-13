import { useState, useEffect, useContext } from "react";
import ShoppingCartMenuItem from "./ShoppingCartMenuItem";
import { cartContext, userContext } from "./App"
import { useNavigate } from "react-router-dom";

function ShoppingCart({ onClose }) {
    const { currentCart, setCart }: any = useContext(cartContext);
    const { loggedInUser} = useContext(userContext);

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
                console.log(data);
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
                <div onClick={(e) => e.stopPropagation()} className="overflow-y-scroll fixed top-14 right-10 w-1/3 h-2/3 bg-slate-100 shadow-lg border-slate-300 border-2 rounded text-black z-50">

                    {
                        Object.keys(currentCart).map(key => (
                            <ShoppingCartMenuItem key={key} id={key} quantity={currentCart[key]} />
                        ))
                    }
                    <div className="flex flex-col justify-evenly">
                        {!isDisabled ?
                            <>
                                <div className="flex text-lg flex-row justify-evenly py-3">
                                    <div className="">Totaal: </div><b>&euro;{totalPrice.toFixed(2)}</b>
                                </div>
                                <button onClick={confirmOrder} className="p-1 bg-black-400 text-white w-11/12 self-center">Bestel Nu</button>
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