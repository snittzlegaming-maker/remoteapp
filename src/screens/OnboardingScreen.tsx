import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useAppDispatch, useAppState } from '../state/store';
import { sourceLabels } from '../data/mockData';
import { fetchJobFeed } from '../api/jobsApi';
import { Chip } from '../components/Chip';
import { Toggle } from '../components/Toggle';
import { SalarySlider } from '../components/SalarySlider';
import { PrimaryButton } from '../components/PrimaryButton';
import { colors, fontFamily, fontSize, letterSpacing, spacing } from '../theme';
import { JobSourceId } from '../types';

const SALARY_MIN = 60000;
const SALARY_MAX = 170000;
const SALARY_STEP = 5000;

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

export function OnboardingScreen({ navigation }: Props) {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const [isAddingRole, setIsAddingRole] = useState(false);
  const [roleDraft, setRoleDraft] = useState('');
  const [loading, setLoading] = useState(false);

  const sourceIds = Object.keys(sourceLabels) as JobSourceId[];

  const submitRole = () => {
    if (roleDraft.trim()) {
      dispatch({ type: 'ADD_ROLE', payload: roleDraft.trim() });
    }
    setRoleDraft('');
    setIsAddingRole(false);
  };

  const handleStart = async () => {
    setLoading(true);
    const jobs = await fetchJobFeed(state.profile);
    dispatch({ type: 'HYDRATE_FEED', payload: jobs });
    dispatch({ type: 'COMPLETE_ONBOARDING' });
    setLoading(false);
    navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Set your job radar</Text>
        <Text style={styles.subtitle}>
          We scan every board and notify you the moment a match lands.
        </Text>

        <Text style={styles.sectionLabel}>Looking for</Text>
        <View style={styles.chipRow}>
          {state.profile.roles.map((role) => (
            <Chip
              key={role}
              label={role}
              variant="filled"
              onPress={() => dispatch({ type: 'REMOVE_ROLE', payload: role })}
            />
          ))}
          {isAddingRole ? (
            <TextInput
              autoFocus
              value={roleDraft}
              onChangeText={setRoleDraft}
              onSubmitEditing={submitRole}
              onBlur={submitRole}
              placeholder="Role title"
              placeholderTextColor={colors.textTertiary}
              style={styles.roleInput}
              returnKeyType="done"
            />
          ) : (
            <Chip label="+ Add role" variant="outline" onPress={() => setIsAddingRole(true)} />
          )}
        </View>

        <Text style={styles.sectionLabel}>Sources</Text>
        <View style={styles.sourcesGroup}>
          {sourceIds.map((id) => (
            <View key={id} style={styles.row}>
              <Text style={styles.rowLabel}>{sourceLabels[id]}</Text>
              <Toggle
                value={state.profile.sources[id]}
                onValueChange={() => dispatch({ type: 'TOGGLE_SOURCE', payload: id })}
                accessibilityLabel={sourceLabels[id]}
              />
            </View>
          ))}
        </View>

        <View style={styles.salaryHeaderRow}>
          <Text style={styles.rowLabel}>Minimum salary</Text>
          <Text style={styles.salaryValue}>${Math.round(state.profile.salaryFloor / 1000)}k+</Text>
        </View>
        <View style={styles.sliderWrap}>
          <SalarySlider
            min={SALARY_MIN}
            max={SALARY_MAX}
            step={SALARY_STEP}
            value={state.profile.salaryFloor}
            onValueChange={(next) => dispatch({ type: 'SET_SALARY_FLOOR', payload: next })}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.rowLabel}>Remote only</Text>
          <Toggle
            value={state.profile.remoteOnly}
            onValueChange={() => dispatch({ type: 'TOGGLE_REMOTE_ONLY' })}
            accessibilityLabel="Remote only"
          />
        </View>
        <View style={[styles.row, styles.lastRow]}>
          <Text style={styles.rowLabel}>Notify instantly</Text>
          <Toggle
            value={state.profile.notifyInstantly}
            onValueChange={() => dispatch({ type: 'TOGGLE_NOTIFY_INSTANTLY' })}
            accessibilityLabel="Notify instantly"
          />
        </View>

        <PrimaryButton label="Start swiping" onPress={handleStart} disabled={loading} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.screenSide,
    paddingTop: 64,
    paddingBottom: 40,
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.screenTitle,
    color: colors.textPrimary,
    lineHeight: fontSize.screenTitle * 1.2,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.body,
    color: colors.textSecondary,
    lineHeight: fontSize.body * 1.5,
    marginBottom: spacing.gapXLarge,
  },
  sectionLabel: {
    fontFamily: fontFamily.semibold,
    fontSize: fontSize.eyebrow,
    textTransform: 'uppercase',
    letterSpacing: letterSpacing.eyebrow,
    color: colors.textTertiary,
    marginBottom: 10,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.gapSmall,
    marginBottom: spacing.gapXLarge,
  },
  roleInput: {
    borderWidth: 1,
    borderColor: colors.chipOutline,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
    fontFamily: fontFamily.medium,
    fontSize: fontSize.body,
    color: colors.textStrong,
    minWidth: 140,
  },
  sourcesGroup: {
    marginBottom: spacing.gapXLarge,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.rowVerticalSmall,
    borderBottomWidth: 1,
    borderBottomColor: colors.hairline,
  },
  lastRow: {
    borderBottomWidth: 0,
    marginBottom: spacing.gapXLarge,
  },
  rowLabel: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.row,
    color: colors.textStrong,
  },
  salaryHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  salaryValue: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.row,
    color: colors.accent,
  },
  sliderWrap: {
    marginBottom: spacing.gapXLarge,
  },
});
