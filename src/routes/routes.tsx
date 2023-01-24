import { createBrowserRouter } from "react-router-dom";

import { Root } from "./Root";
import { Error } from "./Error";
import { Home } from "./Home";
import { About } from "./About";
import { Detail } from './Detail';

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
                path: 'detail/:name',
                element: <Detail/>
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
    }
]