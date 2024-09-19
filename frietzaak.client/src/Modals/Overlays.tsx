import { createPortal } from "react-dom";

const mountElement = document.getElementById("overlays");

interface OverLaysProps {
    isOpen: boolean;
    modal: React.ReactNode;
}

function Overlays({ isOpen, modal }: OverLaysProps) {

    if (isOpen) {

        return createPortal(
            modal,
            mountElement
        );

    }
}

export default Overlays;
