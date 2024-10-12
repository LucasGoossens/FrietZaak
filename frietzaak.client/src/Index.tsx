// @ts-nocheck
import { useEffect, useState } from "react";
import DiscountPreviewMenuItem from "./DiscountPreviewMenuItem";

type Item = {
    id: number,
    name: string,
    description: number,
    price: number;
    discount: number;
}
function Index() {
    const [previewItems, setPreview] = useState([]);

    const getDiscountPreviewMenuItem = () => {
        fetch(`https://localhost:7167/menu/item/get/discount`)
            .then(response => response.json())
            .then(data => {
                setPreview(data);
            })
            .catch(error => console.error('Error:', error));
    }
    useEffect(() => {
        getDiscountPreviewMenuItem();
    }, []);


    return (
        <>
            <div className="flex flex-col w-full h-screen bg-cover bg-center bg-frontpage">
                <div className="h-3/4 mx-96 flex items-center text-white font-bold text-8xl">
                    F R I E T Z  A A K
                </div>

                <div className="flex flex-row h-1/3 bg-gray-200 justify-evenly items-center border-t-2 border-gray-500">

                    {previewItems.length && previewItems.map((item:Item) => {
                        return (<DiscountPreviewMenuItem key={item.id} item={item} />)
                    }
                    )}

                </div>
            </div>
        </>
    );
}

export default Index;