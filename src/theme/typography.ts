export const fontFamily = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semibold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
} as const;

export const fontSize = {
  eyebrow: 11,
  metaSmall: 12,
  meta: 13,
  body: 14,
  row: 15,
  salary: 17,
  cardTitle: 21,
  sectionTitle: 20,
  screenTitleSmall: 24,
  screenTitle: 26,
} as const;

export const letterSpacing = {
  eyebrow: 0.08 * fontSize.eyebrow,
} as const;
