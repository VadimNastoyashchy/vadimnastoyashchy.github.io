import { Page } from '@playwright/test';
import { PerfMetrics } from '../interfaces/performanceTypes';

const perfMetrics: Record<number, PerfMetrics> = {};
let step = 0;

async function measurePerformance(
    executeSteps: () => Promise<void>,
    stepName: string,
    page: Page,
): Promise<void> {
    const start = performance.now();
    await executeSteps();
    const end = performance.now();

    const visualCompleteTime = await getVisualCompleteTime(page);
    const navigationTime = await getNavigationTime(page);

    perfMetrics[step++] = {
        stepName,
        timeElapsed: parseFloat((end - start).toFixed(2)),
        visualComplete: visualCompleteTime.visualComplete,
        navigationTime: navigationTime.navigationTime,
    };
}

function getLastPerformanceMetric(): PerfMetrics {
    return perfMetrics[Object.keys(perfMetrics).length - 1];
}

async function getVisualCompleteTime(
    page: Page,
): Promise<{ visualComplete: number | 'NA' }> {
    const paintMetrics = await page.evaluate(() =>
        performance.getEntriesByType('paint'),
    );
    const firstPaint = paintMetrics.find(
        (metric) => metric.name === 'first-paint',
    );
    return {
        visualComplete: firstPaint
            ? parseFloat(firstPaint.startTime.toFixed(2))
            : 'NA',
    };
}

async function getNavigationTime(
    page: Page,
): Promise<{ navigationTime: number | 'NA' }> {
    const navEntry = await page.evaluate(() => {
        const navRecords = performance.getEntriesByType('navigation');
        return navRecords.length ? navRecords[0].toJSON() : null;
    });
    return {
        navigationTime: navEntry
            ? parseFloat(navEntry.duration.toFixed(2))
            : 'NA',
    };
}

export { measurePerformance, getLastPerformanceMetric };
