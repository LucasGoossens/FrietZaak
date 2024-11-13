import { useNavigate } from "react-router-dom";

interface OrderItem {
    menuItemId: number;
    menuItemName: string;
    menuItemPrice: number;
    menuItemDiscount: number;
    quantity: number;
}

interface Order {
    id: number;
    customerId: number;
    customerName: string;
    items: OrderItem[];
    totalPrice: number;
    discount: number | null;
    finished: boolean;
    transactionCompleted: boolean;
}

function PreviousOrder({ order }: { order: Order }) {    

    const replacePreviousOrder = () => {

        let newCart = {};        
        for (let i = 0; i < order.items.length; i++) {
            newCart[order.items[i].menuItemId] = order.items[i].quantity;
        }
        
        

        fetch("https://localhost:7167/order/create", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ShoppingCart: newCart,
                CustomerId: order.customerId
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                window.location.reload()        
            })
            .catch(error => {
                console.log("Error", error);
            });
    }


    return (
        <div className="ml-10 border border-gray-300 bg-gray-100 rounded-lg p-4 shadow-md my-4 w-11/12">
            <h2 className="text-lg font-semibold mb-2">Bestelling</h2>

            {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-2 border-b last:border-none">
                    <div>
                        <span className="font-medium">{item.menuItemName}</span>
                        <span className="text-gray-600"> x {item.quantity}</span>
                    </div>
                    <div className="text-gray-700">
                        &euro;{(item.menuItemPrice * item.quantity).toFixed(2)}
                    </div>
                </div>
            ))}

            <div className="flex justify-between items-center font-semibold text-lg mt-4">
                <span>Totaal:</span>
                <span>&euro;{order.totalPrice.toFixed(2)}</span>                
            </div>
            <button
                className="mt-4 w-11/12 ml-8 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition-colors duration-200"
                onClick={replacePreviousOrder}
            >
                Opnieuw bestellen
            </button>

           
        </div>
    );
}

export default PreviousOrder;
