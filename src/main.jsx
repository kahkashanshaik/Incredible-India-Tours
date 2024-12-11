import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

// Tailwind css
import './styles/index.css';
// Router
import router from './router';

// Redux
import { Provider } from 'react-redux';
import store from './app/store';
import { RouterProvider } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
    <Suspense>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </Suspense>
    // </React.StrictMode>
);
