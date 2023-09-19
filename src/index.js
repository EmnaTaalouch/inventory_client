import { Provider } from 'react-redux';
import { store } from './redux/store';
import React, { Suspense } from 'react';
import { createRoot } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/JWTContext';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';

// Import your Redux store
const client = new QueryClient();

const root = createRoot(document.getElementById('root'));

root.render(
    <Suspense fallback={<div>Loading...</div>}>
        <QueryClientProvider client={client}>
            <AuthProvider>
                <BrowserRouter>
                    <Provider store={store}>
                        <App />
                    </Provider>
                </BrowserRouter>
            </AuthProvider>
        </QueryClientProvider>
    </Suspense>,
);
