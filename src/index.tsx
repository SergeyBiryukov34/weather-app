import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import { RouterProvider } from "react-router-dom";

import {store} from './store';
import { routes } from "./routes/routes";
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <Provider store={store}>
        <React.StrictMode>
            <RouterProvider router={routes} />
        </React.StrictMode>
    </Provider>

);
