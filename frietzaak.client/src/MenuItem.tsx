import { useState } from "react";
import UpdateMenuItemModal from "./Modals/UpdateMenuItemModal";
import Overlays from "./Modals/Overlays";

interface MenuItemProps {
    id: number;
    name: string;
    description: string;
    price: number;
}
function MenuItem({ id, name, description, price }: MenuItemProps) {
    const [isOpen, setOpen] = useState(false);
    const [currentModal, setModal] = useState(null);
    const [quantity, setQuantity] = useState(1);


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
        setModal(<UpdateMenuItemModal onClose={onClose} id={id} name={name} description={description} price={price} />)
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

    const handleAddToBasket = () => {

    }


    return (
        <>
            <Overlays isOpen={isOpen} modal={currentModal} />
            <div className="w-1/2 h-38 my-2 flex justify-center">
                <div className="flex w-11/12 h-full bg-slate-100 text-black border rounded rounded-xl shadow-md">

                    <div className="m-2 w-2/5 h-11/12 border border-rounded rounded-xl bg-yellow-100 bg-hamburger-one bg-center bg-cover">
                    </div>

                    <div className="mx-2 my-2">
                        <div className="font-bold italic text-2xl">{name}</div>
                        <div className="italic">{description}</div>
                        <div className="my-2 italic font-semibold">${price}</div>
                    </div>

                    <div className="flex flex-col justify-between">
                        { /*hier conditional omheen voor admin */}
                        <div className="self-start flex border rounded border-slate-800 my-3 text-white">
                            <button onClick={handleDelete} className="bg-red-500 px-1 p-0 mr-1 border border-red-800 hover:bg-red-400">Delete</button>
                            <button onClick={handleUpdate} className="bg-red-500 px-1 p-0 mr-1 border border-red-800 hover:bg-red-400">Update</button>
                        </div>
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
                            <button onClick={handleAddToBasket } className="p-1 px-2 bg-black text-white mx-1">
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