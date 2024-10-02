type Item = {
    menuItemId: number,
    menuItemName: string,
    menuItemPrice: number,
    quantity: number;
}

function CurrentOrderMenuItem({ item }: { item: Item }) {
  return (
      <>
          <div className="border-b flex flex-row justify-between">
              <div className="font-semibold w-1/3 h-10 px-1">{item.menuItemName}</div>              
              <div className="w-1/3 h-10 px-1">${item.menuItemPrice * item.quantity}</div>              
              <div className="w-1/3 h-10 px-1">{item.quantity} </div>
          </div>
    </>
  );
}

export default CurrentOrderMenuItem;