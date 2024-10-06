import { useState, useEffect, useContext } from "react";
import { userContext } from "./App"
import { useNavigate } from "react-router-dom";
import CurrentOrderMenuItem from "./CurrentOrderMenuItem";

type CurrentOrder = {
    id: number,
    customerId: number;
    items: Array<Items>;
    totalPrice: number;
    finished: boolean;
}

type Items = {
    menuItemId: number,
    menuItemName: string,
    menuItemPrice: number,
    quantity: number;
    menuItemDiscount: number;
}

function Order() {
    const { loggedInUser, setLogin } = useContext(userContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (loggedInUser.id == null) {
            navigate("/login")
        } else if (loggedInUser.id == 1) {
            navigate("/order/admin")
        }
    }, []);

    const [currentOrder, setCurrentOrder] = useState<CurrentOrder | null>(null);

    const getCurrentOrder = () => {
        if (loggedInUser.id == null) {
            setCurrentOrder(null)
            return;
        }
        fetch(`https://localhost:7167/order/get/${loggedInUser.id}`)
            .then(response => {
                if (!response.ok) {
                    return Promise.reject();
                }
                return response.json();
            })
            .then(data => {
                setCurrentOrder(data);
                console.log(data);
                setRefresh(false);
            })
            .catch(error => console.error('Error:', error));
    }
    useEffect(() => {
        getCurrentOrder();
        console.log(currentOrder)
    }, [loggedInUser]);


    const [refresh, setRefresh] = useState(false);
    const preparingDiv = <div className="px-3 mx-1 font-bold border-rounded rounded-xl bg-red-400" > Preparing...</div>
    const loadingDiv = <div role="status">
        <svg aria-hidden="true" className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
        <span className="sr-only">Loading...</span>
    </div>


    const refreshOrderStatus = () => {
        setRefresh(true);
        setTimeout(() => {
            getCurrentOrder();
        }, 500);
    }

    return (
        <>
            <div className="h-max text-black pt-20 w-3/5 mx-60 bg-gray-300 flex flex-col justify-center">
                <div className="h-fit flex flex-col justify-evenly">
                    <div className="text-black text-lg font-semibold border-b-4 px-2">
                        Current Order
                    </div>
                    <div className="bg-slate-100 h-1/2 p-2">
                        {!currentOrder &&
                            <div>No current order.</div>
                        }

                        {currentOrder &&
                            <>
                                <div className="border rounded border-slate-500 border-2 rounded-xl p-2 mx-2 bg-gray-100">
                                    <div className="bg-slate-300 p-4 font-semibold text-lg border rounded rounded-lg">
                                        Order ID: #<b className="text-xl">{currentOrder.id}</b>
                                    </div>

                                    <div className="border-b-2 pt-2 border-slate-400 flex flex-row justify-between">
                                        <div className="w-1/3 h-8 font-bold px-1">Product</div>
                                        <div className="w-1/3 h-8 font-bold px-1">Price</div>
                                        <div className="w-1/3 h-8 font-bold px-1">Quantity</div>
                                    </div>

                                    {currentOrder.items && currentOrder.items.length > 0 && (
                                        currentOrder.items.map((item) => (
                                            <CurrentOrderMenuItem key={item.menuItemId} item={item} />
                                        ))
                                    )}

                                    <div className="flex flex-row justify-between bg-slate-300 my-2 px-2 py-4 border-2">

                                        <div className="w-1/3"></div>
                                        <div className="w-1/3 font-bold">
                                            Total: ${currentOrder.totalPrice}
                                        </div>

                                        <div className="w-1/3 flex flex-row justify-between font-semibold">
                                            Order status:
                                            {!currentOrder.finished ? (
                                                <>
                                                    {refresh === false ? preparingDiv : loadingDiv}
                                                </>
                                            ) : (
                                                <div className="px-3 mx-1 font-bold border-rounded rounded-xl bg-green-400">
                                                    Finished!
                                                </div>
                                            )}

                                            <button
                                                onClick={refreshOrderStatus}
                                                className="p-0 px-1 font-bold bg-slate-400"
                                            >
                                                Refresh
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </>
                        }




                    </div>

                    <div className="text-black text-lg font-semibold border-b-4">
                        Order History
                    </div>
                    <div className="bg-slate-100 h-full">No order history</div>
                </div>
            </div>
        </>
    );
}

export default Order;