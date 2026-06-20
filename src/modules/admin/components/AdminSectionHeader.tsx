import React from 'react';

import { AppText } from '../../../shared/ui/atoms/AppText';

type Props = {
  title: string;
  subtitle?: string;
};

export function AdminSectionHeader({ title, subtitle }: Props) {
  return (
    <>
      <AppText variant="h3">{title}</AppText>

      {subtitle ? (
        <AppText variant="caption" color="textMuted">
          {subtitle}
        </AppText>
      ) : null}
    </>
  );
}