import { JobListing, UserProfile } from '../types';
import { mockJobFeed } from '../data/mockData';

/**
 * Stubbed network layer. Swap the body of each function for a real fetch
 * against the aggregation backend (LinkedIn/Indeed/Wellfound/Greenhouse) —
 * call sites elsewhere in the app don't need to change.
 */

export async function fetchJobFeed(profile: UserProfile): Promise<JobListing[]> {
  await simulateLatency();

  return mockJobFeed.filter((job) => {
    if (!profile.sources[job.source]) return false;
    if (profile.remoteOnly && !job.remote) return false;
    if (job.salaryMax < profile.salaryFloor) return false;
    return true;
  });
}

function simulateLatency(ms = 400): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
