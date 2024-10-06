type Item = {
    menuItemId: number,
    menuItemName: string,
    menuItemPrice: number,
    quantity: number;
    menuItemDiscount: number;
}

function CurrentOrderMenuItem({ item }: { item: Item }) {
  return (
      <>
          <div className="border-b flex flex-row justify-between border-slate-300 ">
              <div className="font-semibold w-1/3 h-10 px-1">{item.menuItemName}</div>              
              <div className="w-1/3 h-10 px-1">${(item.menuItemPrice - item.menuItemDiscount) * item.quantity}</div>                                  
              <div className="w-1/3 h-10 px-1">{item.quantity} </div>
          </div>
    </>
  );
}

export default CurrentOrderMenuItem;