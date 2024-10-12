import { useState, useContext } from "react";
import { userContext } from "./App"
import UpdateMenuItemModal from "./Modals/UpdateMenuItemModal";
import Overlays from "./Modals/Overlays";
import { cartContext } from "./App"

interface MenuItemProps {
    id: number;
    name: string;
    description: string;
    price: number;
    discount: number;
}
function MenuItem({ id, name, description, price, discount }: MenuItemProps) {
    const { loggedInUser } = useContext(userContext);
    const [isOpen, setOpen] = useState(false);
    const [currentModal, setModal] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { currentCart, setCart } = useContext(cartContext);


    const onClose = () => {
        setOpen(false);
        setModal(null);
    }

    const handleDelete = () => {
        fetch(`https://localhost:7167/menu/item/delete/${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    console.log('MenuItem deleted successfully');
                } else {
                    console.error('Error:', response.statusText);
                }
            })
            .catch(error => console.error('Error:', error));
    }

    const handleUpdate = () => {
        setOpen(true)
        setModal(<UpdateMenuItemModal onClose={onClose} id={id} name={name} description={description} price={price} discount={discount} />)
        // component als state zetten no bueno maar t werkt wel 
    }

    const handleMinus = () => {

        if (quantity == 0) {
            return
        }
        setQuantity(quantity - 1);
    }


    const handlePlus = () => {
        setQuantity(quantity + 1);
    }

    const addToCart = () => {
        const newCart:any = { ...currentCart };
        if (newCart[id]) {
            newCart[id] += quantity;
        } else {
            newCart[id] = quantity;
        }
        setCart(newCart);
    };


    return (
        <>
            <Overlays isOpen={isOpen} modal={currentModal} />
            <div className="w-1/2 h-48 my-2 flex justify-center ">
                <div className="flex justify-between w-11/12 h-full bg-slate-100 text-black  border rounded rounded-xl shadow-md">

                    <div className="m-2 w-2/5 h-11/12 border border-rounded rounded-xl bg-yellow-100 bg-hamburger-one bg-center bg-cover">
                    </div>

                    <div className="mx-2 my-2">
                        <div className="font-bold italic text-2xl">{name}</div>
                        <div className="italic">{description}</div>
                        {discount > 0 ?
                            (<><div className="flex flex-row font-bold text-red-600"><div className="pr-2 italic font-bold line-through text-black">${price.toFixed(2)}</div>${(price - discount).toFixed(2)}</div></>)
                            :
                            (<div className="my-2 italic font-semibold ">${price.toFixed(2)}</div>)
                        }
                    </div>

                    <div className="flex flex-col self-end mb-6">
                        {loggedInUser.id == 1 &&
                            <div className="self-start flex border rounded border-slate-800 my-20 text-white">
                                <button onClick={handleDelete} className="bg-red-500 px-1 p-0 mr-1 border border-red-800 hover:bg-red-400">Delete</button>
                                <button onClick={handleUpdate} className="bg-red-500 px-1 p-0 mr-1 border border-red-800 hover:bg-red-400">Update</button>
                            </div>
                        }
                        <div className="self-end flex flex-row justify-evenly">
                            <button onClick={handleMinus} className="p-1 font-bold bg-gray-200 mx-2">
                                -
                            </button>
                            <div className="p-1">
                                {quantity}
                            </div>
                            <button onClick={handlePlus} className="p-1 font-bold bg-gray-200 mx-2">
                                +
                            </button>
                            <button onClick={addToCart} className="p-1 px-2 bg-black text-white mx-1">
                                Add
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}

export default MenuItem;