import React, { Suspense } from 'react';
import { createRoot } from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store'; // Import your Redux store

const root = createRoot(document.getElementById('root'));

root.render(
  <Suspense fallback={<div>Loading...</div>}>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </Suspense>
);

