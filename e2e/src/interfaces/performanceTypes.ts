export interface PerfMetrics {
  stepName: string;
  timeElapsed: number;
  visualComplete: number | 'NA';
  navigationTime: number | 'NA';
}
