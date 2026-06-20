import React from 'react';
import { View } from 'react-native';

import { useAppTheme } from '../../../app/providers/ThemeProvider';
import { AppIcon, AppIconName } from '../../../shared/ui/atoms/AppIcon';
import { AppText } from '../../../shared/ui/atoms/AppText';

type Props = {
  title: string;
  value: string;
  icon: AppIconName;
};

export function AdminStatCard({
  title,
  value,
  icon,
}: Props) {
  const theme = useAppTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.card,
        borderRadius: theme.radius.xl,
        borderWidth: 1,
        borderColor: theme.colors.border,
        padding: theme.spacing.lg,
        gap: theme.spacing.sm,
      }}
    >
      <AppIcon
        name={icon}
        size={22}
        color={theme.colors.primaryDark}
      />

      <AppText variant="h3">{value}</AppText>

      <AppText
        variant="caption"
        color={theme.colors.textMuted}
      >
        {title}
      </AppText>
    </View>
  );
}