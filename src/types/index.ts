export type JobSourceId = 'linkedin' | 'indeed' | 'wellfound' | 'greenhouse';

export interface JobSource {
  id: JobSourceId;
  name: string;
  enabled: boolean;
}

export interface UserProfile {
  roles: string[];
  sources: Record<JobSourceId, boolean>;
  salaryFloor: number;
  remoteOnly: boolean;
  notifyInstantly: boolean;
  // Base materials used by the AI tailoring step; stubbed for now.
  baseResume: string;
  baseCoverLetter: string;
  skills: string[];
}

export interface JobListing {
  id: string;
  companyName: string;
  companyInitials: string;
  title: string;
  location: string;
  salaryMin: number;
  salaryMax: number;
  matchPercent: number;
  employmentType: string;
  remote: boolean;
  companyStage: string;
  description: string;
  postedAtLabel: string;
  source: JobSourceId;
  sourceUrl: string;
}

export type ApplicationStatus = 'queued' | 'tailoring' | 'ready' | 'applied';

export interface ApplicationTimestamps {
  queuedAt: number;
  tailoringStartedAt?: number;
  readyAt?: number;
  appliedAt?: number;
}

export interface ApplicationRecord {
  id: string;
  job: JobListing;
  status: ApplicationStatus;
  tailoredResume?: string;
  tailoredCoverLetter?: string;
  timestamps: ApplicationTimestamps;
}

export interface StreakState {
  count: number;
  lastActiveDateISO: string | null;
}

export interface AppState {
  profile: UserProfile;
  onboardingComplete: boolean;
  feedQueue: JobListing[];
  applications: ApplicationRecord[];
  streak: StreakState;
}
