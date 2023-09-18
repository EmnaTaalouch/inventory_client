import { Provider } from 'react-redux';
import { store } from './redux/store';
import React, { Suspense } from 'react';
import { createRoot } from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/JWTContext';

// Import your Redux store

const root = createRoot(document.getElementById('root'));

root.render(
    <Suspense fallback={<div>Loading...</div>}>
        <AuthProvider>
            <BrowserRouter>
                <Provider store={store}>
                    <App />
                </Provider>
            </BrowserRouter>
        </AuthProvider>
    </Suspense>,
);
