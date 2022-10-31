import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import 'bootstrap';
import "./custom.scss";
import axios from "axios";
 
axios.defaults.withCredentials = true;

const root = document.getElementById('root');
const container = createRoot(root);

container.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);