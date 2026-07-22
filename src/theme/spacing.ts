export const spacing = {
  screenSide: 24,
  rowVerticalSmall: 13,
  rowVertical: 16,
  gapSmall: 8,
  gap: 14,
  gapLarge: 24,
  gapXLarge: 28,
} as const;

export const radius = {
  chip: 8,
  button: 12,
  avatarSmall: 10,
  avatarLarge: 12,
  card: 20,
  pill: 999,
} as const;

export const shadow = {
  card: {
    shadowColor: 'rgba(20,20,40,1)',
    shadowOpacity: 0.06,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 12 },
    elevation: 6,
  },
} as const;
