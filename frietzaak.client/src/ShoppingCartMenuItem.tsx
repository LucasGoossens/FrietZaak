/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useContext } from 'react';
import { cartContext } from "./App"

function ShoppingCartMenuItem({ id, quantity }:any ) {
    const [menuItem, setItem]:any = useState({});
    const { currentCart, setCart }: any = useContext(cartContext);

    const getShoppingCartMenuItem = () => {
        fetch(`https://localhost:7167/menu/item/get/${id}`)
            .then(response => response.json())
            .then(data => {
                setItem(data);
            })
            .catch(error => console.error('Error:', error));
    }
    useEffect(() => {
        getShoppingCartMenuItem();
    }, [id]);


    const handleMinus = () => {

        const newCart = { ...currentCart };
        newCart[id] -= 1;

        if (newCart[id] == 0) {
            handleRemoveFromBasket();
            return;
        }
        setCart(newCart);
    }


    const handlePlus = () => {
        const newCart = { ...currentCart };
        newCart[id] += 1;
        setCart(newCart);
    }

    const handleRemoveFromBasket = () => {
        const newCart = { ...currentCart };
        delete newCart[id];
        setCart(newCart);
        return;
    }

    return (

        <>
            {!menuItem ? <div>Loading...</div> :

                <div className="border-b-2 my-1 flex flex-row h-1/5">
                    <div className="border-r-2 w-1/5 bg-hamburger-one bg-center bg-cover">                        
                    </div>

                    <div className="border-r-2 w-2/5 flex flex-col justify-between">
                        <div className="font-bold">{menuItem.name}</div>
                        <div className="">{menuItem.description}</div>
                        <div className="italic">&euro;{menuItem.price - menuItem.discount}</div>
                    </div>

                    <div className="border-r-2 w-2/5 self-end pb-8">
                        <div className="self-end flex flex-row justify-evenly">
                            <button onClick={handleMinus} className="p-1 font-bold bg-gray-200 mx-1">
                                -
                            </button>
                            <div className="p-1">
                                {quantity}
                            </div>
                            <button onClick={handlePlus} className="p-1 font-bold bg-gray-200 mx-1">
                                +
                            </button>
                            <button onClick={handleRemoveFromBasket} className="p-1 px-2 bg-black text-white mx-1">
                                Remove all
                            </button>

                        </div>
                    </div>
                </div>
        }
        </>
    );
}

export default ShoppingCartMenuItem;