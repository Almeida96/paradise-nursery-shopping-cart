import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import store from './store/store';
import App from './App';
createRoot(document.getElementById('root')).render(<React.StrictMode><Provider store={store}><App/></Provider></React.StrictMode>);
