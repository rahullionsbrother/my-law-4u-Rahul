/**
 * ==============================================================================
 * PERFORMANCE MONITORING (WEB VITALS)
 * ==============================================================================
 * This module reports the "Core Web Vitals" of the application.
 * Google uses these metrics for SEO ranking and User Experience scoring.
 * * @param {Function} onPerfEntry - A callback function to handle the metric.
 * Example usage: reportWebVitals(console.log) or reportWebVitals(sendToAnalytics)
 */
const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Dynamic Import:
    // We only load the 'web-vitals' library if a callback is provided.
    // This reduces the initial bundle size for users who don't need monitoring.
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      
      /**
       * 1. CLS (Cumulative Layout Shift)
       * MEASURES: Visual Stability.
       * GOAL: Less than 0.1.
       * RELEVANCE: Prevents buttons from jumping under the user's thumb.
       */
      getCLS(onPerfEntry);

      /**
       * 2. FID (First Input Delay)
       * MEASURES: Interactivity.
       * GOAL: Less than 100ms.
       * RELEVANCE: Ensures the app feels responsive to clicks/taps.
       */
      getFID(onPerfEntry);

      /**
       * 3. FCP (First Contentful Paint)
       * MEASURES: Load Speed (Perceived).
       * GOAL: Less than 1.8s.
       * RELEVANCE: The moment the user sees the first bit of text or image.
       */
      getFCP(onPerfEntry);

      /**
       * 4. LCP (Largest Contentful Paint)
       * MEASURES: Load Speed (Main Content).
       * GOAL: Less than 2.5s.
       * RELEVANCE: The moment the main hero image or article text is visible.
       */
      getLCP(onPerfEntry);

      /**
       * 5. TTFB (Time to First Byte)
       * MEASURES: Server Responsiveness.
       * GOAL: Less than 0.8s (usually lower for SPAs).
       * RELEVANCE: Critical for identifying backend database/API slowness.
       */
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;