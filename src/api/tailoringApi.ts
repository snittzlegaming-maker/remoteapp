import { JobListing, UserProfile } from '../types';

export interface TailoredMaterials {
  tailoredResume: string;
  tailoredCoverLetter: string;
}

/**
 * Stubbed AI tailoring job. In production this kicks off a backend task that
 * rewrites the user's base resume/cover letter against the specific posting
 * and resolves (or pushes a notification) when done. Here we just resolve
 * after a delay with mock content so the UI can model the async flow.
 */
export function requestTailoring(
  job: JobListing,
  profile: UserProfile,
  onComplete: (materials: TailoredMaterials) => void
): () => void {
  const delayMs = 5000 + Math.random() * 4000;

  const timeout = setTimeout(() => {
    onComplete({
      tailoredResume: `${profile.baseResume} — tailored for ${job.title} @ ${job.companyName}, emphasizing: ${profile.skills.join(', ')}.`,
      tailoredCoverLetter: `${profile.baseCoverLetter} — rewritten to speak directly to ${job.companyName}'s ${job.title} posting.`,
    });
  }, delayMs);

  return () => clearTimeout(timeout);
}
