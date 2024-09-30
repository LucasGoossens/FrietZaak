import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Menu from './Menu.tsx';
import Index from './Index.tsx';

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Order from './Order.tsx';
import Authentication from './Authentication.tsx';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element:<Index/>
            },
            {
                path: "menu",
                element: <Menu />
            },
            {
                path: "login",
                element:<Authentication/>
            },
            {
                path: "order",
                element:<Order/>
            }
        ]
    },
]);


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)
