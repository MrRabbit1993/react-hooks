import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from './../serviceWorker';
import 'normalize.css';
import store from './redux/store';
import './index.css';
import App from './App.jsx';
ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
if (process.env.NODE_ENV === 'production') {
    serviceWorker.register();
} else {
    serviceWorker.unregister();
}
