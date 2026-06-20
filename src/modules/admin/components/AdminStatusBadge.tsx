import React from 'react';
import { View } from 'react-native';

import { useAppTheme } from '../../../app/providers/ThemeProvider';
import { AppText } from '../../../shared/ui/atoms/AppText';

type Props = {
  label: string;
  type: 'success' | 'warning' | 'error' | 'info';
};

export function AdminStatusBadge({
  label,
  type,
}: Props) {
  const theme = useAppTheme();

  const colors = {
    success: {
      bg: theme.colors.success,
      text: theme.colors.successText,
    },
    warning: {
      bg: theme.colors.warning,
      text: theme.colors.warningText,
    },
    error: {
      bg: theme.colors.error,
      text: theme.colors.errorText,
    },
    info: {
      bg: theme.colors.info,
      text: theme.colors.infoText,
    },
  };

  return (
    <View
      style={{
        backgroundColor: colors[type].bg,
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: theme.spacing.xs,
        borderRadius: theme.radius.full,
      }}
    >
      <AppText
        variant="small"
        color={colors[type].text}
      >
        {label}
      </AppText>
    </View>
  );
}