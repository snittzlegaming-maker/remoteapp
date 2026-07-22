import { StreakState } from '../types';

function toDateISO(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function isYesterday(lastISO: string, todayISO: string): boolean {
  const last = new Date(lastISO + 'T00:00:00Z');
  const today = new Date(todayISO + 'T00:00:00Z');
  const diffDays = Math.round((today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
  return diffDays === 1;
}

/** Increments once per calendar day the user reviews a match; resets on a missed day. */
export function recordReviewActivity(streak: StreakState, now = new Date()): StreakState {
  const todayISO = toDateISO(now);

  if (streak.lastActiveDateISO === todayISO) {
    return streak;
  }
  if (streak.lastActiveDateISO && isYesterday(streak.lastActiveDateISO, todayISO)) {
    return { count: streak.count + 1, lastActiveDateISO: todayISO };
  }
  return { count: 1, lastActiveDateISO: todayISO };
}
