function ShoppingCartMenuItem() {

    const handleMinus = () => {
        return;
    }

    const handlePlus = () => {
        return;
    }

    const handleRemoveFromBasket = () => {
        return;
    }
  return (

      <>
          <div className="border-b-2 my-1 flex flex-row h-1/5">
              <div className="border-r-2 w-1/5">
              Image
              </div>

              <div className="border-r-2 w-2/5 flex flex-col justify-between">
                  <div className="font-bold">Title</div>
                  <div className="">Description (misschien weg)</div>
                  <div className="italic">$99</div>
              </div>

              <div className="border-r-2 w-2/5">
                  <div className="self-end flex flex-row justify-evenly">
                      <button onClick={handleMinus} className="p-1 font-bold bg-gray-200 mx-2">
                          -
                      </button>
                      <div className="p-1">
                          99
                      </div>
                      <button onClick={handlePlus} className="p-1 font-bold bg-gray-200 mx-2">
                          +
                      </button>
                      <button onClick={handleRemoveFromBasket} className="p-1 px-2 bg-black text-white mx-1">
                          Remove all
                      </button>

                  </div>
              </div>
          </div>
      </>
  );
}

export default ShoppingCartMenuItem;