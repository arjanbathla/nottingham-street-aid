import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { Provider } from "react-redux";
import store from "./contextStore/contextStore.jsx";
import { BrowserRouter } from 'react-router-dom';

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
);

console.log('VITE', import.meta.env.VITE_API_HOST)
console.log('REACT', process.env.REACT_APP_BACKEND_URL)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(app);
