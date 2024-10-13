// @ts-nocheck
import { useState, useContext } from "react";
import { userContext } from "./App"
import MenuItem from "./MenuItem";
import CreateMenuItemModal from "./Modals/CreateMenuItemModal";
import Overlays from "./Modals/Overlays";

interface CategoryProps {
    id: number,
    name: string,
    menuItems: [];
}

function Category({ id, name, menuItems }: CategoryProps) {
    const { loggedInUser } = useContext(userContext);
    const [isOpen, setOpen] = useState(false);
    const [currentModal, setModal] = useState(null);

    //// hier alle MenuItems fetchen
    //fetch('https://placeholder.com/get')
    //    .then(response => response.json())
    //    .then(data => console.log(data))
    //    .catch(error => console.error('Error:', error));



    const onClose = () => {
        setOpen(false);
        setModal(null);
    }

    const handleCreateMenuItem = () => {
        setOpen(true);
        setModal(<CreateMenuItemModal onClose={onClose} categoryId={id} />)
    }

    return (
        <>
            <Overlays isOpen={isOpen} modal={currentModal} />
            <div className="font-bold text-lg mx-5 mt-20 px-2 pb-3 text-black text-5xl">{name}:</div>
            {loggedInUser.id == 1 &&
                <button onClick={handleCreateMenuItem} className="p-1 px-2">Create MenuItem</button>
            }
            <div className="flex flex-row flex-wrap justify-between bg-slate-200 border rounded rounded-xl">
                {
                    menuItems.map((menuItem) =>
                        <MenuItem id={menuItem.id} name={menuItem.name} description={menuItem.description} price={menuItem.price} discount={menuItem.discount} />
                    )
                }

            </div>
        </>
    );
}

export default Category;