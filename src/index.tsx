import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import {store} from "./store/store";
import {CustomSelect} from "./Components/CustomSelect";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}><App/></Provider>
        <CustomSelect/>
        <select style={{marginLeft: '30px', marginTop:'100px'}}>
            <option>4</option>
            <option>1</option>
            <option>3</option>
            <option>2dsdsdds</option>
            <option>1</option>
        </select>

    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

