import { useState } from "react";

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


function OrderAdminPendingOrder({ order}: { order: NewOrder}) {
    const [orderFinished, setFinished] = useState(order.finished == false ? false : true);

    const handleFinished = (id) => {
        fetch(`https://localhost:7167/order/setfinished/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Request failed with status ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                setFinished(true)                
            })
            .catch(error => {
                console.error('Error:', error);
                setFinished(false);
            });
    };


    const handleTransaction = (id) => {
        fetch(`https://localhost:7167/order/transactioncompleted/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Request failed with status ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                setFinished(true)
                window.location.reload();
            })
            .catch(error => {
                console.error('Error:', error);
                setFinished(false);
            });
    }


  return (
      <>
          <div className="w-11/12 border-gray-300 py-5 border-b-2">
              <div className="border border-slate-400 mt-2 rounded rounded-xl bg-slate-100 p-4 flex flex-row justify-between font-semibold text-md">
                  <div className="flex flex-col border-b-2 w-full">
                      <div className="font-semibold text-md border-b-2"><b>ID: </b>{order.id}</div>
                      <div className="font-semibold text-md border-b-2"><b>Customer: </b>{order.customerName}</div>
                      <div className="font-semibold text-md border-b-2"><b>Items: </b></div>
                      {order.items?.map((item: Items) => (
                          <>
                              <div className="border-b-2 mt-2 px-2 py-1 pb-4 flex ">
                                  <div className="border w-28 h-28 bg-slate-300">img</div>
                                  <div className="flex flex-col px-6">
                                      <div className="text-lg py-2 font-semibold flex flex-row">{item.menuItemName} </div>
                                      <div className="text-gray-500">Quantity : <b className="text-black">{item.quantity}</b></div>
                                  </div>
                              </div>
                          </>
                      ))}

                      <div className="px-8 py-2 flex flex-row bg-blue-100 border border-gray-300 justify-between py-1">
                          <div className="font-bold pt-2"><b>Total Price: </b>${order.totalPrice}</div>
                          {orderFinished == false ?
                              <div className="" onClick={() => handleFinished(order.id)} >Order Finished: <button className="bg-blue-600 text-white px-2 hover:bg-blue-400">Confirm</button></div>
                              :
                              <div className="" onClick={() => handleTransaction(order.id)}>Transaction Completed: <button className="bg-red-600 text-white px-2 hover:bg-red-400">Confirm</button></div>
                          }

                      </div>
                  </div>
              </div>
          </div>
      </>
  );
}

export default OrderAdminPendingOrder;