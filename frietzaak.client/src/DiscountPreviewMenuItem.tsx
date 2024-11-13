// @ts-nocheck
import { useNavigate } from "react-router-dom";

type Item = {
    id: number,
    name: string,
    description: number,
    price: number;
    discount: number;
}


function DiscountPreviewMenuItem({ item }: Item) {
    const navigate = useNavigate();

    return (
        <div onClick={() => { navigate("/menu") } } className="flex flex-row p-3 h-4/5 w-1/4 bg-slate-100 border-rounded rounded-xl shadow-xl text-black hover:bg-blue-100">
            <div className="w-1/2 h-full self-center bg-slate-200 bg-hamburger-one bg-center bg-cover"></div>

            <div className="flex flex-col justify-evenly">
                <div className="w-1/2 px-3 font-bold text-3xl">{item.name}</div>
                <div className="flex">
                    <div className="w-1/2 px-3 pt-1 font-semibold line-through italic text-red-500 text-2xl">&euro;{item.price.toFixed(2)}</div>
                    <div className="w-1/2 px-3 font-bold italic text-3xl">&euro;{(item.price - item.discount).toFixed(2)}</div>
                </div>
            </div>
        </div>
    );
}

export default DiscountPreviewMenuItem;