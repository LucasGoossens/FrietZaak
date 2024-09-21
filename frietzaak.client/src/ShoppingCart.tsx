function ShoppingCart({onClose }) {  

    return (
        <>
            <div onClick={onClose} className="fixed inset-0 flex justify-center items-center w-screen h-screen">
                <div onClick={(e) => e.stopPropagation()} className="fixed w-1/3 h-1/2 bg-slate-100 shadow-lg rounded text-black z-50">
                fadasdfsfasfsd
                </div>
            </div>
        </>
    );
}

export default ShoppingCart;