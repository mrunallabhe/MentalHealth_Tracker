import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App';  // Main App component
import Home from './components/Home';  // Home component
import Quiz from './components/Quiz';  // Quiz component
import Result from './components/Result';  // Result component

// Create the router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,  // Main App component
    children: [
      {
        path: '/',  // Home page route
        element: <Home />
      },
      {
        path: 'quiz',  // Quiz page route
        element: <Quiz />
      },
      {
        path: 'result',  // Result page route
        element: <Result />  // Ensure you add this Result route
      }
    ]
  },
]);

// Render the application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
