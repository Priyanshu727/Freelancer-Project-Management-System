import React from 'react'; // Import React
import ReactDOM from 'react-dom/client'; // Import ReactDOM
import App from './App'; // Adjust the path to your App component
import './index.css'; // Import any global CSS if needed

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
