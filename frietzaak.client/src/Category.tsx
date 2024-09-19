import { useState } from "react";
import FoodItem from "./MenuItem";
import CreateMenuItemModal from "./Modals/CreateMenuItemModal";
import Overlays from "./Modals/Overlays";

interface CategoryProps {
    id: number,
    name: string
}
function Category({ id, name }: CategoryProps) {
    const [isOpen, setOpen] = useState(false);
    const [currentModal, setModal] = useState(null);

    // hier alle MenuItems fetchen


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
            <div className="font-bold text-lg mx-5 mt-20 text-black text-xl">{id} {name}:</div>
            <button onClick={handleCreateMenuItem} className="p-1 px-2">Create MenuItem</button>
            <div className="flex flex-row flex-wrap justify-between">
                container for MenuItem components
            </div>
        </>
    );
}

export default Category;