/**
 * ==============================================================================
 * MYLAW.COM - FRONTEND ENTRY POINT
 * ==============================================================================
 * CORE RESPONSIBILITIES:
 * 1. Validate the DOM environment (Make sure index.html is loaded).
 * 2. Initialize the React 18 Concurrent Root.
 * 3. Inject Global Providers (Routing, Theme, Redux/Context).
 * 4. Mount the Main <App /> Component.
 */

// 1. CORE LIBRARIES
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// 2. MAIN APPLICATION COMPONENT
// (We will create this file in Step 5)
import App from './App';

// 3. GLOBAL STYLES & PERFORMANCE
// (We will create these files in Step 4)
import './index.css'; 
import reportWebVitals from './reportWebVitals';

/**
 * ==============================================================================
 * DOM TARGETING & VALIDATION
 * ==============================================================================
 * We target the 'root' div defined in public/index.html.
 * We add a safety check to ensure the environment is valid.
 */
const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("FATAL ERROR: Could not find the root element. Please check public/index.html");
  throw new Error("Application failed to mount: Root element missing.");
}

/**
 * ==============================================================================
 * APPLICATION MOUNTING
 * ==============================================================================
 * createRoot() enables React 18's Concurrent Features.
 */
const root = ReactDOM.createRoot(rootElement);

root.render(
  // React.StrictMode: 
  // Intentionally double-invokes components in dev to detect side-effects.
  <React.StrictMode>
    
    {/* BrowserRouter: 
        enables the HTML5 History API for clean URLs (no hashbangs #) 
    */}
    <BrowserRouter>
      <App />
    </BrowserRouter>

  </React.StrictMode>
);

/**
 * ==============================================================================
 * PERFORMANCE MONITORING
 * ==============================================================================
 * Logs 'Core Web Vitals' to the console.
 * Essential for monitoring Real User Metrics (RUM).
 */
// You can pass a function to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint.
reportWebVitals();