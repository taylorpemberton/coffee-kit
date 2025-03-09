import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container!); // Use non-null assertion (!) to ensure container is not null
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);