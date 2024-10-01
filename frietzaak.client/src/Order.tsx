import { useState, useEffect, useContext } from "react";
import { userContext } from "./App"
import { useNavigate } from "react-router-dom";

type CurrentOrder = {
    id: number,
    customerId: number;
    items: Array<Items>;
}

type Items = {
    menuItemId: number,
    menuItemName: string,
    menuItemPrice: number,
    quantity: number;
}

function Order() {
    const { loggedInUser, setLogin } = useContext(userContext);
    const navigate = useNavigate();

    const [currentOrder, setCurrentOrder] = useState<CurrentOrder | null>({});

    useEffect(() => {
        if (loggedInUser.id == null) {
            navigate("/login")
        }
    }, []);

    const getCurrentOrder = () => {
        fetch(`https://localhost:7167/order/get/${loggedInUser.id}`)
            .then(response => response.json())
            .then(data => {
                setCurrentOrder(data);
            })
            .catch(error => console.error('Error:', error));
    }
    useEffect(() => {
        getCurrentOrder();
    }, [loggedInUser]);

    return (
        <>
            <div className="h-screen text-black w-3/5 mx-60 bg-gray-300 flex flex-col justify-center">
                <div className="h-4/5 flex flex-col justify-evenly">
                    <div className="text-black text-lg font-semibold border-b-4 ">
                        Current Order
                    </div>
                    <div className="bg-slate-100 h-1/2">
                        
                        <ul>
                            {currentOrder.items.map((item) => (
                                <li key={item.menuItemId}>
                                    {item.menuItemName} - {item.quantity} @ ${item.menuItemPrice}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="text-black text-lg font-semibold border-b-4 ">
                        Order History
                    </div>
                    <div className="bg-slate-100 h-full">No order history</div>
                </div>
            </div>
        </>
    );
}

export default Order;