// Core
import { createBrowserRouter } from "react-router-dom"
// Components
import { Root } from "./Root"
// import { Error } from "./Error"
// import { Home } from "./Home"
// import { About } from "./About"
// import { Detail } from './Detail'

import React from 'react'

const Error = React.lazy(() => import("./Error"))
const Home = React.lazy(() => import("./Home"))
const About = React.lazy(() => import("./About"))
const Detail = React.lazy(() => import("./Detail"))

export const routes = createBrowserRouter([
    {
        path: '/',
        element:<Root/>,
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