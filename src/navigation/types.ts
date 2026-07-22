import { NavigatorScreenParams } from '@react-navigation/native';

export type MainTabParamList = {
  SwipeFeed: undefined;
  Tracker: undefined;
};

export type RootStackParamList = {
  Onboarding: undefined;
  Main: NavigatorScreenParams<MainTabParamList>;
  ApplicationReview: { applicationId: string };
};
