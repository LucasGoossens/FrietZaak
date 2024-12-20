// @ts-nocheck
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "./App"
import Overlays from "./Modals/Overlays";
import ShoppingCart from "./ShoppingCart";

function Navbar() {
    const [isOpen, setOpen] = useState(false);
    const [currentModal, setModal] = useState(null);    
    const [IsFlashing, setIsFlashing] = useState(false);
    const { currentCart}: any = useContext(cartContext);
    const [shoppinCartItemCount, setShoppingCartCount] = useState(0);
    localStorage.setItem("cart", JSON.stringify({}));

    useEffect(() => {
        const sum = Object.values(currentCart).reduce((accumulator: number, currentValue: number): number => accumulator + currentValue, 0)
        setShoppingCartCount(sum);               
        setIsFlashing(true);
        const timer = setTimeout(() => {
            setIsFlashing(false);
        }, 500);

        return () => clearTimeout(timer);
        
    }, [currentCart]);

    const handleShoppingCart = () => {
        setOpen(true);
        setModal(<ShoppingCart onClose={onClose} />)
    }

    const onClose = () => {
        setOpen(false);
        setModal(null);
    }

    return (
        // bij fixed dan iets dat wanneer je window.scroll.y < weet ik veel dan padding minder
        <>
            <Overlays isOpen={isOpen} modal={currentModal} />
            <div className="fixed bg-opacity-90 bg-black p-5 px-10 pr-80 flex w-full justify-between">
                <div className="bg-[#D9D9D9] text-black w-24 italic font-bold pl-1">FRIETZAAK</div>
                <div>
                    <Link to="/" className="text-xl text-[#D9D9D9] m-2 opacity-100">Home</Link >
                    <Link to="menu" className="text-xl text-[#D9D9D9] m-2 opacity-100">Menu</Link >
                    <Link to="order" className="text-xl text-[#D9D9D9] m-2 opacity-100">Orders</Link>                    
                    <Link to="login" className="text-xl text-[#D9D9D9] m-2 opacity-100">Login</Link>
                    <button onClick={handleShoppingCart} className="flex bg-[#D9D9D9] px-2 text-black absolute right-10 top-3">
                        <svg fill="#000000" className="" height="30px" width="30px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-48 -48 576.00 576.00" xml:space="preserve" stroke="#000000" stroke-width="0.0048000000000000004"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="8.639999999999999"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path d="M472,232h-84.472l9.84-24H416c13.232,0,24-10.768,24-24c0-6.496-2.528-12.528-6.984-16.856 C428.528,162.528,422.496,160,416,160h-0.2c-2.024-52.808-43.52-95.584-95.8-99.592V48h32c8.824,0,16-7.176,16-16V8 c0-4.424-3.576-8-8-8h-40c-8.824,0-16,7.176-16,16v16v8v20.504c-29.248,2.232-55.896,16.536-73.904,39.656 C213.36,82.832,189.936,72,164,72c-49.376,0-89.68,39.136-91.8,88H64c-13.232,0-24,10.768-24,24s10.768,24,24,24h19.528 l14.784,24H8c-4.424,0-8,3.576-8,8v16c0,13.232,10.888,24,24.28,24H80v4.08c0,10.632,6.872,19.88,17.144,23.024l66.04,19.808 L184,354.664V384h-8c-4.424,0-8,3.576-8,8v80c0,4.424,3.576,8,8,8h144c4.424,0,8-3.576,8-8v-80c0-4.424-3.576-8-8-8h-8v-29.576 L340.28,312H344c13.232,0,24-10.768,24-24v-8h87.72c13.392,0,24.28-10.768,24.28-24v-16C480,235.576,476.424,232,472,232z M320,16h31.992l-0.016,16H320V16z M312,78c45.832,0,83.584,34,87.64,82H255.592c-1.376-16-6.72-31.512-15.104-44.04 C257.024,92.808,283.376,78,312,78z M164,92c39.2,0,71.568,28,75.576,68H216h-0.68c-3.872-32-25.376-44-51.32-44 c-25.944,0-47.448,12-51.32,44H88.424C92.432,120,124.8,92,164,92z M199.104,160h-70.2c3.648-24,18-28,35.104-28 S195.456,136,199.104,160z M88,192H64c-4.416,0-8-3.584-8-8s3.584-8,8-8h352c2.136,0,4.112,0.824,5.704,2.456 c1.472,1.432,2.296,3.408,2.296,5.544c0,4.416-3.584,8-8,8h-24c-3.248,0-6.168,1.96-7.4,4.968L370.232,232h-253.12l-14.784-24 H136c4.424,0,8-3.576,8-8s-3.576-8-8-8H88z M312,464H184v-64h8h24v24c0,4.424,3.576,8,8,8s8-3.576,8-8v-24h32v24 c0,4.424,3.576,8,8,8s8-3.576,8-8v-24h24h8V464z M352,288c0,4.416-3.584,8-8,8h-8c-2.672,0-5.168,1.336-6.656,3.56l-32,48 c-0.872,1.312-1.344,2.864-1.344,4.44v32h-96v-32c0-1.736-0.56-3.416-1.6-4.8l-24-32c-1.024-1.376-2.464-2.376-4.104-2.864 l-68.52-20.544C98.32,290.736,96,287.632,96,284.08v-3.992l81.064,0.84l41.232,34.384c4.536,3.712,10.24,5.544,15.888,5.568 l31.568-0.728c6.176-0.12,12.024-2.624,16.464-7.064L315.312,280H352V288z M200.928,280h91.76l-21.784,21.784 c-1.496,1.496-3.432,2.336-5.496,2.376l-31.576,0.728c-1.96-0.056-3.832-0.656-5.352-1.904L200.928,280z M464,256 c0,4.416-3.72,8-8.28,8H24.28c-4.56,0-8.28-3.584-8.28-8v-8h448V256z"></path> <circle cx="296" cy="128" r="8"></circle> <circle cx="328" cy="104" r="8"></circle> <path d="M168,208h16c4.424,0,8-3.576,8-8s-3.576-8-8-8h-16c-4.424,0-8,3.576-8,8S163.576,208,168,208z"></path> </g> </g> </g> </g></svg>
                        <div className={`text-sm pr-1 bg-black rounded rounded-full px-1 right-1 relative bottom-2 w-6 h-6 ${IsFlashing ? 'bg-yellow-200 text-black' : 'bg-black text-white'}`}>{shoppinCartItemCount}</div>
                        Bestelling</button>                    
                </div>
            </div>

        </>

    );
}

export default Navbar;