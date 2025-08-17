export const config = {
  // Base URLs for different environments
  urls: {
    production: {
      auth: "https://auth.aahrbitx.in",
      app: "https://app.aahrbitx.in",
      main: "https://aahrbitx.in",
    },
    development: {
      auth: "http://localhost:3000",
      app: "http://localhost:3000",
      main: "http://localhost:3000",
    },
  },
  
  // Get current environment
  get isProduction() {
    return process.env.NODE_ENV === "production";
  },
  
  // Get current URLs based on environment
  get currentUrls() {
    return this.isProduction ? this.urls.production : this.urls.development;
  },
  
  // Get auth base URL
  get authBaseUrl() {
    return this.currentUrls.auth;
  },
  
  // Get app base URL
  get appBaseUrl() {
    return this.currentUrls.app;
  },
  
  // Get main site URL
  get mainBaseUrl() {
    return this.currentUrls.main;
  },
  
  // Get verification URL
  get verificationUrl() {
    return `${this.authBaseUrl}/api/verify`;
  },
  
  // Get dashboard redirect URL
  get dashboardUrl() {
    return `${this.appBaseUrl}/dashboard`;
  },
  
  // Get error page URL
  get verificationErrorUrl() {
    return `${this.appBaseUrl}/auth/verification-error`;
  },
} as const;
