import React, { useRef } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useAppDispatch, useAppState } from '../state/store';
import { SwipeCard, SwipeCardHandle, SwipeDirection } from '../components/SwipeCard';
import { IconX } from '../components/icons/IconX';
import { IconHeart } from '../components/icons/IconHeart';
import { colors, fontFamily, fontSize, spacing } from '../theme';

export function SwipeFeedScreen() {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const topCardRef = useRef<SwipeCardHandle>(null);

  const queue = state.feedQueue;
  const activeJob = queue[0];
  const peekJob = queue[1];

  const handleSwiped = (direction: SwipeDirection) => {
    if (!activeJob) return;
    if (direction === 'right') {
      dispatch({ type: 'SWIPE_LIKE', payload: { jobId: activeJob.id } });
    } else {
      dispatch({ type: 'SWIPE_PASS', payload: { jobId: activeJob.id } });
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Today's matches</Text>
        <Text style={styles.headerCounter}>{queue.length} left</Text>
      </View>

      <View style={styles.stack}>
        {peekJob && <View style={styles.peekCard} />}

        {activeJob ? (
          <SwipeCard key={activeJob.id} ref={topCardRef} job={activeJob} onSwiped={handleSwiped} isTop />
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>You're all caught up</Text>
            <Text style={styles.emptySubtitle}>Check back tomorrow for new matches.</Text>
          </View>
        )}
      </View>

      {activeJob && (
        <View style={styles.actionRow}>
          <Pressable
            style={styles.passButton}
            onPress={() => topCardRef.current?.swipeLeft()}
            accessibilityLabel="Pass"
          >
            <IconX size={18} color={colors.textSecondary} />
          </Pressable>
          <Pressable
            style={styles.likeButton}
            onPress={() => topCardRef.current?.swipeRight()}
            accessibilityLabel="Like"
          >
            <IconHeart width={20} height={18} color="#FFFFFF" />
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 64,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  headerTitle: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.sectionTitle,
    color: colors.textPrimary,
  },
  headerCounter: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.meta,
    color: colors.textSecondary,
  },
  stack: {
    height: 560,
    position: 'relative',
  },
  peekCard: {
    position: 'absolute',
    top: 12,
    left: 6,
    right: 6,
    bottom: 0,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.hairline,
    borderRadius: 20,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.hairline,
    borderRadius: 20,
  },
  emptyTitle: {
    fontFamily: fontFamily.semibold,
    fontSize: fontSize.row,
    color: colors.textPrimary,
    marginBottom: 6,
  },
  emptySubtitle: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.body,
    color: colors.textSecondary,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.gapLarge,
    marginTop: 20,
  },
  passButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  likeButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
