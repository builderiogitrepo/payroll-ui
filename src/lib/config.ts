// =============================================================================
// CONFIGURATION MANAGEMENT SYSTEM
// =============================================================================

export interface AppConfig {
  // Environment
  env: string;
  isDevelopment: boolean;
  isStaging: boolean;
  isProduction: boolean;

  // Application
  appName: string;
  appVersion: string;
  appEnv: string;

  // API Configuration
  apiBaseUrl: string;
  apiTimeout: number;
  apiRetryAttempts: number;

  // Tenant Configuration
  tenantId: string;
  tenantName: string;
  tenantDomain: string;
  tenantApiUrl: string;

  // Authentication
  authType: string;
  jwtSecret: string;
  sessionTimeout: number;
  rememberMeDuration: number;

  // Feature Flags
  features: {
    threeDScene: boolean;
    animations: boolean;
    analytics: boolean;
    debugMode: boolean;
  };

  // Redux DevTools
  reduxDevTools: {
    enabled: boolean;
    name: string;
  };

  // Logging
  logging: {
    level: string;
    consoleLogging: boolean;
    remoteLogging: boolean;
  };

  // Analytics
  analytics: {
    gaId: string;
    mixpanelToken: string;
  };

  // Performance
  performance: {
    enableServiceWorker: boolean;
    enablePWA: boolean;
  };

  // Security
  security: {
    cspEnabled: boolean;
    httpsOnly: boolean;
  };

  // Deployment
  deployment: {
    buildOutputDir: string;
    sourceMaps: boolean;
    enableCompression: boolean;
  };
}

// =============================================================================
// CONFIGURATION LOADER
// =============================================================================

const loadConfig = (): AppConfig => {
  const env = import.meta.env;

  return {
    // Environment
    env: env.NODE_ENV || "development",
    isDevelopment: env.VITE_APP_ENV === "development",
    isStaging: env.VITE_APP_ENV === "staging",
    isProduction: env.VITE_APP_ENV === "production",

    // Application
    appName: env.VITE_APP_NAME || "Payroll UI",
    appVersion: env.VITE_APP_VERSION || "1.0.0",
    appEnv: env.VITE_APP_ENV || "development",

    // API Configuration
    apiBaseUrl: env.VITE_API_BASE_URL || "http://localhost:3000/api",
    apiTimeout: parseInt(env.VITE_API_TIMEOUT || "30000"),
    apiRetryAttempts: parseInt(env.VITE_API_RETRY_ATTEMPTS || "3"),

    // Tenant Configuration
    tenantId: env.VITE_TENANT_ID || "default",
    tenantName: env.VITE_TENANT_NAME || "Default Company",
    tenantDomain: env.VITE_TENANT_DOMAIN || "default",
    tenantApiUrl:
      env.VITE_TENANT_API_URL || "http://localhost:3000/api/tenant/default",

    // Authentication
    authType: env.VITE_AUTH_TYPE || "jwt",
    jwtSecret: env.VITE_JWT_SECRET || "default-jwt-secret",
    sessionTimeout: parseInt(env.VITE_SESSION_TIMEOUT || "480"),
    rememberMeDuration: parseInt(env.VITE_REMEMBER_ME_DURATION || "30"),

    // Feature Flags
    features: {
      threeDScene: env.VITE_FEATURE_3D_SCENE === "true",
      animations: env.VITE_FEATURE_ANIMATIONS === "true",
      analytics: env.VITE_FEATURE_ANALYTICS === "true",
      debugMode: env.VITE_FEATURE_DEBUG_MODE === "true",
    },

    // Redux DevTools
    reduxDevTools: {
      enabled: env.VITE_REDUX_DEVTOOLS_ENABLED === "true",
      name: env.VITE_REDUX_DEVTOOLS_NAME || "Payroll UI",
    },

    // Logging
    logging: {
      level: env.VITE_LOG_LEVEL || "info",
      consoleLogging: env.VITE_CONSOLE_LOGGING === "true",
      remoteLogging: env.VITE_REMOTE_LOGGING === "true",
    },

    // Analytics
    analytics: {
      gaId: env.VITE_GA_ID || "",
      mixpanelToken: env.VITE_MIXPANEL_TOKEN || "",
    },

    // Performance
    performance: {
      enableServiceWorker: env.VITE_ENABLE_SW === "true",
      enablePWA: env.VITE_ENABLE_PWA === "true",
    },

    // Security
    security: {
      cspEnabled: env.VITE_CSP_ENABLED === "true",
      httpsOnly: env.VITE_HTTPS_ONLY === "true",
    },

    // Deployment
    deployment: {
      buildOutputDir: env.VITE_BUILD_OUTPUT_DIR || "dist",
      sourceMaps: env.VITE_SOURCE_MAPS === "true",
      enableCompression: env.VITE_ENABLE_COMPRESSION === "true",
    },
  };
};

// =============================================================================
// CONFIGURATION INSTANCE
// =============================================================================

export const config: AppConfig = loadConfig();

// =============================================================================
// CONFIGURATION VALIDATION
// =============================================================================

export const validateConfig = (): void => {
  const requiredFields = ["apiBaseUrl", "tenantId", "tenantName", "jwtSecret"];

  const missingFields = requiredFields.filter(
    (field) => !config[field as keyof AppConfig],
  );

  if (missingFields.length > 0) {
    console.error("Missing required configuration fields:", missingFields);
    throw new Error(
      `Configuration validation failed. Missing fields: ${missingFields.join(", ")}`,
    );
  }
};

// =============================================================================
// CONFIGURATION UTILITIES
// =============================================================================

export const getApiUrl = (endpoint: string): string => {
  return `${config.apiBaseUrl}${endpoint}`;
};

export const getTenantApiUrl = (endpoint: string): string => {
  return `${config.tenantApiUrl}${endpoint}`;
};

export const isFeatureEnabled = (
  feature: keyof AppConfig["features"],
): boolean => {
  return config.features[feature];
};

export const getLogLevel = (): string => {
  return config.logging.level;
};

export const shouldLogToConsole = (): boolean => {
  return config.logging.consoleLogging;
};

export const shouldLogRemotely = (): boolean => {
  return config.logging.remoteLogging;
};

// =============================================================================
// CONFIGURATION DEBUG
// =============================================================================

if (config.isDevelopment && config.features.debugMode) {
  console.log("🔧 Application Configuration:", config);
}
