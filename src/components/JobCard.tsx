import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { JobListing } from '../types';
import { colors, fontFamily, fontSize, radius, shadow } from '../theme';

interface JobCardProps {
  job: JobListing;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.companyMark}>
          <Text style={styles.companyMarkText}>{job.companyInitials}</Text>
        </View>
        <View style={styles.matchBadge}>
          <Text style={styles.matchBadgeText}>{job.matchPercent}% match</Text>
        </View>
      </View>

      <Text style={styles.title}>{job.title}</Text>
      <Text style={styles.subtitle}>
        {job.companyName} · {job.location}
      </Text>
      <Text style={styles.salary}>
        ${Math.round(job.salaryMin / 1000)}k – ${Math.round(job.salaryMax / 1000)}k
      </Text>

      <View style={styles.metaRow}>
        <Text style={styles.metaText}>{job.employmentType}</Text>
        <Text style={styles.metaText}>{job.remote ? 'Remote' : 'On-site'}</Text>
        <Text style={styles.metaText}>{job.companyStage}</Text>
      </View>

      <View style={styles.descriptionBox}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.descriptionText}>{job.description}</Text>
        </ScrollView>
      </View>

      <Text style={styles.footer}>{job.postedAtLabel}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: radius.card,
    padding: 22,
    ...shadow.card,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  companyMark: {
    width: 48,
    height: 48,
    borderRadius: radius.avatarSmall,
    backgroundColor: colors.neutralFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  companyMarkText: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    color: colors.textAvatar,
  },
  matchBadge: {
    borderWidth: 1,
    borderColor: colors.successBorder,
    borderRadius: radius.pill,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  matchBadgeText: {
    fontFamily: fontFamily.semibold,
    fontSize: fontSize.meta,
    color: colors.successText,
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.cardTitle,
    color: colors.textPrimary,
    lineHeight: fontSize.cardTitle * 1.25,
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.body,
    color: colors.textSecondary,
    marginTop: 4,
    marginBottom: 16,
  },
  salary: {
    fontFamily: fontFamily.semibold,
    fontSize: fontSize.salary,
    color: colors.textStrong,
    marginBottom: 16,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 18,
  },
  metaText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.metaSmall,
    color: colors.textSecondary,
  },
  descriptionBox: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: colors.background,
    padding: 12,
  },
  descriptionText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.body,
    lineHeight: fontSize.body * 1.5,
    color: colors.textSecondary,
  },
  footer: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.metaSmall,
    color: colors.textQuaternary,
    marginTop: 12,
  },
});
