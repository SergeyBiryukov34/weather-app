// Core
import { createBrowserRouter } from "react-router-dom"
import React from 'react'
// Components
import { Root } from "./Root"
// Lazy Components
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