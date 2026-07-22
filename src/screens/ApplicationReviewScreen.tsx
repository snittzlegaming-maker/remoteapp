import React from 'react';
import { Alert, Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useAppDispatch, useAppState } from '../state/store';
import { sourceLabels } from '../data/mockData';
import { PrimaryButton } from '../components/PrimaryButton';
import { colors, fontFamily, fontSize, radius, spacing } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'ApplicationReview'>;

export function ApplicationReviewScreen({ route, navigation }: Props) {
  const state = useAppState();
  const dispatch = useAppDispatch();

  const application = state.applications.find((a) => a.id === route.params.applicationId);

  if (!application) {
    return (
      <View style={styles.screen}>
        <Text style={styles.notFound}>This application is no longer available.</Text>
      </View>
    );
  }

  const { job } = application;
  const sourceLabel = sourceLabels[job.source];

  const handleApply = async () => {
    const canOpen = await Linking.canOpenURL(job.sourceUrl);
    if (canOpen) {
      await Linking.openURL(job.sourceUrl);
    } else {
      Alert.alert('Unable to open link', job.sourceUrl);
    }
    dispatch({ type: 'MARK_APPLIED', payload: { applicationId: application.id } });
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{job.title}</Text>
      <Text style={styles.subtitle}>
        {job.companyName} · {job.location}
      </Text>

      <Text style={styles.sectionLabel}>Tailored resume</Text>
      <View style={styles.docBox}>
        <Text style={styles.docText}>{application.tailoredResume}</Text>
      </View>

      <Text style={styles.sectionLabel}>Tailored cover letter</Text>
      <View style={styles.docBox}>
        <Text style={styles.docText}>{application.tailoredCoverLetter}</Text>
      </View>

      <PrimaryButton
        label={`Apply on ${sourceLabel}`}
        onPress={handleApply}
        style={styles.applyButton}
      />
      <Text style={styles.disclaimer}>
        This opens the original posting on {sourceLabel} — review and submit your application there.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.screenSide,
    paddingTop: 24,
    paddingBottom: 48,
  },
  notFound: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.body,
    color: colors.textSecondary,
    padding: spacing.screenSide,
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.cardTitle,
    color: colors.textPrimary,
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.body,
    color: colors.textSecondary,
    marginTop: 4,
    marginBottom: spacing.gapXLarge,
  },
  sectionLabel: {
    fontFamily: fontFamily.semibold,
    fontSize: fontSize.eyebrow,
    textTransform: 'uppercase',
    letterSpacing: 0.9,
    color: colors.textTertiary,
    marginBottom: 10,
  },
  docBox: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: radius.card,
    padding: 16,
    marginBottom: spacing.gapXLarge,
  },
  docText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.body,
    lineHeight: fontSize.body * 1.5,
    color: colors.textStrong,
  },
  applyButton: {
    marginTop: 8,
  },
  disclaimer: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.metaSmall,
    color: colors.textQuaternary,
    marginTop: 12,
    textAlign: 'center',
  },
});
