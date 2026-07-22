import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useAppState } from '../state/store';
import { getWeeklyCounts } from '../state/selectors';
import { ApplicationRecord, ApplicationStatus } from '../types';
import { colors, fontFamily, fontSize, radius, spacing } from '../theme';

const STATUS_LABEL: Record<ApplicationStatus, string> = {
  tailoring: 'Tailoring…',
  ready: 'Ready to apply',
  applied: 'Applied',
  queued: 'Queued',
};

const STATUS_COLOR: Record<ApplicationStatus, string> = {
  tailoring: colors.warningText,
  ready: colors.successText,
  applied: colors.textSecondary,
  queued: colors.textSecondary,
};

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function TrackerScreen() {
  const state = useAppState();
  const navigation = useNavigation<Nav>();
  const weekly = getWeeklyCounts(state.applications);

  const renderRow = ({ item }: { item: ApplicationRecord }) => {
    const isReady = item.status === 'ready';
    return (
      <Pressable
        style={styles.row}
        disabled={!isReady}
        onPress={() => navigation.navigate('ApplicationReview', { applicationId: item.id })}
      >
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{item.job.companyInitials}</Text>
        </View>
        <View style={styles.rowText}>
          <Text style={styles.rowTitle} numberOfLines={1}>
            {item.job.title}
          </Text>
          <Text style={styles.rowCompany}>{item.job.companyName}</Text>
        </View>
        <Text style={[styles.status, { color: STATUS_COLOR[item.status] }]}>
          {STATUS_LABEL[item.status]}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Applications</Text>
        <Text style={styles.streak}>{state.streak.count}-day streak</Text>
      </View>
      <Text style={styles.subtext}>
        {weekly.tailored} tailored this week · {weekly.ready} ready · {weekly.applied} applied
      </Text>

      <FlatList
        data={state.applications}
        keyExtractor={(item) => item.id}
        renderItem={renderRow}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Like a job in the feed to start tracking it here.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.screenSide,
    paddingTop: 64,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  headerTitle: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.screenTitleSmall,
    color: colors.textPrimary,
  },
  streak: {
    fontFamily: fontFamily.semibold,
    fontSize: fontSize.meta,
    color: colors.accent,
  },
  subtext: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.meta,
    color: colors.textSecondary,
    marginBottom: 22,
  },
  listContent: {
    paddingBottom: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.gap,
    paddingVertical: spacing.rowVertical,
    borderBottomWidth: 1,
    borderBottomColor: colors.hairline,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: radius.avatarLarge,
    backgroundColor: colors.neutralFillStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: fontFamily.bold,
    fontSize: 14,
    color: colors.textAvatar,
  },
  rowText: {
    flex: 1,
    minWidth: 0,
  },
  rowTitle: {
    fontFamily: fontFamily.semibold,
    fontSize: fontSize.row,
    color: colors.textPrimary,
  },
  rowCompany: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.meta,
    color: colors.textSecondary,
    marginTop: 2,
  },
  status: {
    fontFamily: fontFamily.semibold,
    fontSize: fontSize.metaSmall,
  },
  emptyText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 40,
  },
});
