// @ts-nocheck
import { useState, useEffect, useContext } from "react";
import { userContext } from "./App"
import Category from "./Category";
import CreateCategoryModal from "./Modals/CreateCategoryModal";
import Overlays from "./Modals/Overlays";

interface Category {
    id: number,
    name: string;
    menuItems: [];
}

function Menu() {
    const { loggedInUser } = useContext(userContext);
    const [categories, setCategories] = useState([]);
    const [isOpen, setOpen] = useState(false);
    const [currentModal, setModal] = useState(null);

    const onClose = () => {
        setOpen(false);
        setModal(null);
        getCategories();
    }

    const handleCreateCategory= () => {
        setOpen(true);
        setModal(<CreateCategoryModal onClose={onClose}  />)
    }

    const getCategories = () => {
        fetch("https://localhost:7167/menu/category/get")
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error:', error));
    }

    useEffect(() => {
        getCategories();
    }, [])

    return (
        <>
            <Overlays isOpen={isOpen} modal={currentModal} />
            <div className="mx-60 h-screen bg-gray-300 overflow-x-hidden">
                {loggedInUser.id == 1 &&
                    <div className="mt-16 text-black bg-gray-500 p-1 border-rounded rounded-lg">
                        <button onClick={handleCreateCategory} className="p-2 bg-white">New Category</button>
                    </div>}
                {categories.map((category: Category) => {
                    return (
                        <Category key={category.id} id={category.id} name={category.name} menuItems={category.menuItems} />
                    );
                })}



            </div>
        </>
    );
}

export default Menu;