import React, { createContext, useContext, useEffect, useMemo, useReducer, useRef } from 'react';
import {
  AppState,
  ApplicationRecord,
  JobListing,
  JobSourceId,
} from '../types';
import { defaultUserProfile } from '../data/mockData';
import { recordReviewActivity } from './streak';
import { requestTailoring } from '../api/tailoringApi';

type Action =
  | { type: 'HYDRATE_FEED'; payload: JobListing[] }
  | { type: 'ADD_ROLE'; payload: string }
  | { type: 'REMOVE_ROLE'; payload: string }
  | { type: 'TOGGLE_SOURCE'; payload: JobSourceId }
  | { type: 'SET_SALARY_FLOOR'; payload: number }
  | { type: 'TOGGLE_REMOTE_ONLY' }
  | { type: 'TOGGLE_NOTIFY_INSTANTLY' }
  | { type: 'COMPLETE_ONBOARDING' }
  | { type: 'SWIPE_PASS'; payload: { jobId: string } }
  | { type: 'SWIPE_LIKE'; payload: { jobId: string } }
  | {
      type: 'TAILORING_COMPLETE';
      payload: { applicationId: string; tailoredResume: string; tailoredCoverLetter: string };
    }
  | { type: 'MARK_APPLIED'; payload: { applicationId: string } };

const initialState: AppState = {
  profile: defaultUserProfile,
  onboardingComplete: false,
  feedQueue: [],
  applications: [],
  streak: { count: 0, lastActiveDateISO: null },
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'HYDRATE_FEED':
      return { ...state, feedQueue: action.payload };

    case 'ADD_ROLE': {
      const role = action.payload.trim();
      if (!role || state.profile.roles.includes(role)) return state;
      return { ...state, profile: { ...state.profile, roles: [...state.profile.roles, role] } };
    }

    case 'REMOVE_ROLE':
      return {
        ...state,
        profile: { ...state.profile, roles: state.profile.roles.filter((r) => r !== action.payload) },
      };

    case 'TOGGLE_SOURCE':
      return {
        ...state,
        profile: {
          ...state.profile,
          sources: { ...state.profile.sources, [action.payload]: !state.profile.sources[action.payload] },
        },
      };

    case 'SET_SALARY_FLOOR':
      return { ...state, profile: { ...state.profile, salaryFloor: action.payload } };

    case 'TOGGLE_REMOTE_ONLY':
      return { ...state, profile: { ...state.profile, remoteOnly: !state.profile.remoteOnly } };

    case 'TOGGLE_NOTIFY_INSTANTLY':
      return { ...state, profile: { ...state.profile, notifyInstantly: !state.profile.notifyInstantly } };

    case 'COMPLETE_ONBOARDING':
      return { ...state, onboardingComplete: true };

    case 'SWIPE_PASS':
      return {
        ...state,
        feedQueue: state.feedQueue.filter((j) => j.id !== action.payload.jobId),
        streak: recordReviewActivity(state.streak),
      };

    case 'SWIPE_LIKE': {
      const job = state.feedQueue.find((j) => j.id === action.payload.jobId);
      if (!job) return state;

      const now = Date.now();
      const newApplication: ApplicationRecord = {
        id: `app-${job.id}-${now}`,
        job,
        status: 'tailoring',
        timestamps: { queuedAt: now, tailoringStartedAt: now },
      };

      return {
        ...state,
        feedQueue: state.feedQueue.filter((j) => j.id !== job.id),
        applications: [newApplication, ...state.applications],
        streak: recordReviewActivity(state.streak),
      };
    }

    case 'TAILORING_COMPLETE':
      return {
        ...state,
        applications: state.applications.map((app) =>
          app.id === action.payload.applicationId
            ? {
                ...app,
                status: 'ready',
                tailoredResume: action.payload.tailoredResume,
                tailoredCoverLetter: action.payload.tailoredCoverLetter,
                timestamps: { ...app.timestamps, readyAt: Date.now() },
              }
            : app
        ),
      };

    case 'MARK_APPLIED':
      return {
        ...state,
        applications: state.applications.map((app) =>
          app.id === action.payload.applicationId
            ? { ...app, status: 'applied', timestamps: { ...app.timestamps, appliedAt: Date.now() } }
            : app
        ),
      };

    default:
      return state;
  }
}

interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Kick off the (stubbed) background tailoring job for any application that
  // just entered "tailoring" and hasn't been started yet.
  const startedTailoringIds = useRef(new Set<string>());
  useEffect(() => {
    state.applications.forEach((app) => {
      if (app.status !== 'tailoring' || startedTailoringIds.current.has(app.id)) return;
      startedTailoringIds.current.add(app.id);

      requestTailoring(app.job, state.profile, (materials) => {
        dispatch({
          type: 'TAILORING_COMPLETE',
          payload: { applicationId: app.id, ...materials },
        });
      });
    });
  }, [state.applications, state.profile]);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppState must be used within an AppProvider');
  return ctx.state;
}

export function useAppDispatch() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppDispatch must be used within an AppProvider');
  return ctx.dispatch;
}
