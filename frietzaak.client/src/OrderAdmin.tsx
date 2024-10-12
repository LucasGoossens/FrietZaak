import { useState, useEffect, useContext } from "react";
import { userContext } from "./App"
import { Link, useNavigate } from "react-router-dom";
import OrderAdminPendingOrder from "./OrderAdminPendingOrder";

type NewOrder = {
    id: number,
    customerId: number;
    customerName: string;
    items: Array<Items>;
    totalPrice: number;
    finished: boolean;
}

type Items = {
    menuItemId: number,
    menuItemName: string,
    menuItemPrice: number,
    quantity: number;
}

function OrderAdmin() {
    const { loggedInUser} = useContext(userContext);
    const navigate = useNavigate();
    const [allOrders, setOrders] = useState<Array<NewOrder>>([]);

    const getPendingOrder = () => {

        if (loggedInUser.id !== 1) {
            return;
        }
        fetch(`https://localhost:7167/order/get/notfinished`)
            .then(response => {
                if (!response.ok) {
                    return Promise.reject();
                }
                return response.json();
            })
            .then(data => {
                setOrders(data);
                console.log("fetch")
                console.log(data);
            })
            .catch(error => console.error('Error:', error));
    }

    useEffect(() => {
        if (loggedInUser.id !== 1) {
            navigate("/order")
        }
    }, []);

    useEffect(() => {
        getPendingOrder();
        console.log(allOrders)
    }, []);




    return (
        <>
            <div className="h-screen text-black w-3/5 mx-60 bg-gray-200 flex flex-col">
                <div className="flex flex-col mt-20 m-2 font-bold bg-slate-100 p-4 rounded rounded-xl"> Dashboard:
                    <div className="flex flex-row my-1">
                        <Link to="/order/admin/statistics" className="mr-1 p-2 bg-red-100 border border-black">Statistics</Link>
                        <Link to="" className="mr-1 p-2 bg-red-100 border border-black">Customers</Link>                        
                    </div>
                </div>
                <div className="px-10 bg-slate-300 h-20 text-xl font-bold border-gray-400 border-b-2"> <div className="my-10">Pending Orders </div>

                </div>
                <div className="flex flex-col items-center overflow-x-hidden overflow-scroll">
                    {allOrders?.length > 0 ? (
                        allOrders?.map((order: NewOrder) => (
                            <OrderAdminPendingOrder order={order} />
                        ))
                    ) : (
                        <div>No pending orders.</div>
                    )}
                </div>

            </div>
        </>
    );
}

export default OrderAdmin;