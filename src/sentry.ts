import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: import.meta.env.VITE_CENTRY_DCN,
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});
