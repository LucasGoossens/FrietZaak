import { useState , useEffect} from "react";
import Category from "./Category";

interface Category {
    id: number,
    name: string
}

function Menu() {
    const [categories, setCategories] = useState([]);

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
            <div className="mx-60 h-screen bg-gray-300 overflow-x-hidden">

                {categories.map((category:Category) => {
                    return (
                        <Category key={category.id} id={category.id} name={category.name} />
                    );
                })}



            </div>
        </>
    );
}

export default Menu;