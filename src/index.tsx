// Core
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import { RouterProvider } from "react-router-dom";
// Store
import { store } from './store';
// Routes
import { routes } from "./routes/routes";
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <Provider store={store}>
        <RouterProvider router={routes} />
    </Provider>

);
