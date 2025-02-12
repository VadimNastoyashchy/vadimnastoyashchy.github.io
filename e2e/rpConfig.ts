import dotenv from 'dotenv';
dotenv.config();

const rpConfig = {
    endpoint: process.env.REPORT_PORTAL_ENDPOINT,
    apiKey: process.env.REPORT_PORTAL_APIKEY,
    project: process.env.REPORT_PORTAL_PROJECT,
    description: process.env.REPORT_PORTAL_DESCRIPTION,
    launch: process.env.REPORT_PORTAL_LAUNCH_NAME || 'Default Launch Name',

    attributes: [
      { key: 'Type', value: 'Smoke' },
      { key: 'Type', value: 'Regression' },
      { key: 'Priority', value: 'High' },
    ],
    mode: 'DEFAULT',
    includeTestSteps: true,
};

export default rpConfig;