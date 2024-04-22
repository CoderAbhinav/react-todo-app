/**
 * Entry point for rendering the application.
 * Renders the App component within a React root.
 * @file index.js
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Creating a root for rendering React components.
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering the App component within a React root.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
