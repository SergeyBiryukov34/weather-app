import { createBrowserRouter } from "react-router-dom";

import Root from "./Root";
import Error from "./Error";
import Home from "./Home";
import About from "./About";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Root/>,
        children: [
            {
                path: '/',
                element: <Home/>,
            },
            {
                path: 'about',
                element: <About/>
            },
            {
                path: '*',
                element: <Error/>
            }
        ]
    }
])

export const links = [
    {
        "link": "/",
        "label": "Home"
    },
    {
        "link": "/about",
        "label": "About"
    },
]