interface MenuItemProps{
    name: string;
    description: string;
    price: number;
}
function MenuItem({ name, description, price }: MenuItemProps) {
    return (
        <>

            <div className="w-1/2 h-32 my-2 flex justify-center">

                <div className="flex w-11/12 h-full bg-slate-100 text-black border rounded rounded-xl shadow-md">

                    <div className="m-2 w-2/5 h-11/12 border border-rounded rounded-xl bg-yellow-100 bg-hamburger-one bg-center bg-cover">

                    </div>

                    <div className="mx-2 my-2">
                        <div className="font-bold italic text-2xl">{name}</div>
                        <div className="italic">{description}</div>
                        <div className="my-2 italic font-semibold">${price}</div>
                    </div>

                    <div className="flex flex-row self-end justify-evenly ">
                        <button className="p-1 font-bold bg-gray-200 mx-2">
                            -
                        </button>
                        <div className="p-1">
                            99
                        </div>
                        <button className="p-1 font-bold bg-gray-200 mx-2">
                            +
                        </button>
                        <button className="p-1 px-2 bg-black text-white mx-1" >
                            Add
                        </button>
                    </div>
                </div >
            </div>
        </>
    );
}

export default MenuItem;