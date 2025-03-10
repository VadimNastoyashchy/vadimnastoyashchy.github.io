import { defineConfig, devices } from '@playwright/test';
import rpConfig from './rpConfig';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    captureGitInfo: { commit: true, diff: true },
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 2 : undefined,
    reporter: [['html'], ['@reportportal/agent-js-playwright', rpConfig]],
    use: {
        baseURL: 'https://vadimnastoyashchy.github.io/',
        trace: 'on-first-retry',
    },

    projects: [
        {
            name: 'desktop',
            use: {
                ...devices['Desktop Chrome'],
            },
        },
        {
            name: 'mobile',
            use: { ...devices['iPhone 13'] },
        },
    ],
});
