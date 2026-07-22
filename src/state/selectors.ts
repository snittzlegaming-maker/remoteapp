import { ApplicationRecord } from '../types';

function startOfWeek(now = new Date()): number {
  const day = now.getDay();
  const diffToMonday = (day + 6) % 7;
  const monday = new Date(now);
  monday.setHours(0, 0, 0, 0);
  monday.setDate(now.getDate() - diffToMonday);
  return monday.getTime();
}

export interface WeeklyCounts {
  tailored: number;
  ready: number;
  applied: number;
}

export function getWeeklyCounts(applications: ApplicationRecord[], now = new Date()): WeeklyCounts {
  const weekStart = startOfWeek(now);

  let tailored = 0;
  let ready = 0;
  let applied = 0;

  for (const app of applications) {
    if (app.timestamps.tailoringStartedAt && app.timestamps.tailoringStartedAt >= weekStart) {
      tailored += 1;
    }
    if (app.status === 'ready') ready += 1;
    if (app.status === 'applied' && app.timestamps.appliedAt && app.timestamps.appliedAt >= weekStart) {
      applied += 1;
    }
  }

  return { tailored, ready, applied };
}
