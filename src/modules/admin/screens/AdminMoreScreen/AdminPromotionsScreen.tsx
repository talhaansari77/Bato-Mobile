import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { useAppTheme } from '../../../../app/providers/ThemeProvider';
import { AppButton } from '../../../../shared/ui/atoms/AppButton';
import { AppIcon, AppIconName } from '../../../../shared/ui/atoms/AppIcon';
import { AppInput } from '../../../../shared/ui/atoms/AppInput';
import { AppText } from '../../../../shared/ui/atoms/AppText';
import { Screen } from '../../../../shared/ui/templates/Screen';

type PromotionStatus = 'active' | 'scheduled' | 'expired';
type FilterType = 'all' | PromotionStatus;

type Promotion = {
  id: string;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  status: PromotionStatus;
  usage: string;
  icon: AppIconName;
};

const filters: Array<{ label: string; value: FilterType }> = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Scheduled', value: 'scheduled' },
  { label: 'Expired', value: 'expired' },
];

const promotions: Promotion[] = [
  {
    id: '1',
    title: 'Glow Skin Package',
    description: 'Discount on hydration facial and skin consultation.',
    discount: '20% OFF',
    validUntil: 'Jun 30',
    status: 'active',
    usage: '42 used',
    icon: 'Sparkles',
  },
  {
    id: '2',
    title: 'Hair Growth Care',
    description: 'Special offer for hair growth consultation and therapy.',
    discount: '15% OFF',
    validUntil: 'Jul 10',
    status: 'scheduled',
    usage: 'Not started',
    icon: 'BadgePercent',
  },
  {
    id: '3',
    title: 'Botox Consultation Offer',
    description: 'Limited campaign for face and anti-aging consultation.',
    discount: '10% OFF',
    validUntil: 'Jun 01',
    status: 'expired',
    usage: '31 used',
    icon: 'Gift',
  },
];

export function AdminPromotionsScreen() {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const [search, setSearch] = useState('');

  const filteredPromotions = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return promotions.filter((promotion) => {
      const matchesFilter =
        selectedFilter === 'all' || promotion.status === selectedFilter;

      const matchesSearch =
        normalizedSearch.length === 0 ||
        promotion.title.toLowerCase().includes(normalizedSearch) ||
        promotion.description.toLowerCase().includes(normalizedSearch);

      return matchesFilter && matchesSearch;
    });
  }, [search, selectedFilter]);

  return (
    <Screen
      title="Promotions"
      subtitle="Offers & campaigns"
      showBack
      actions={[
        {
          icon: 'Bell',
          onPress: () => {},
        },
      ]}
    >
      <View style={styles.root}>
        <View style={styles.summaryCard}>
          <View style={styles.summaryTop}>
            <View style={styles.summaryIcon}>
              <AppIcon
                name="BadgePercent"
                size={34}
                color={theme.colors.primaryDark}
              />
            </View>

            <View style={styles.cardText}>
              <AppText variant="h2">Promotion Center</AppText>

              <AppText color={theme.colors.textMuted}>
                Manage offers, discounts, banners, coupon campaigns, and active
                marketing promotions.
              </AppText>
            </View>
          </View>

          <View style={styles.statsRow}>
            <StatItem label="Active" value="1" />
            <View style={styles.statDivider} />
            <StatItem label="Scheduled" value="1" />
            <View style={styles.statDivider} />
            <StatItem label="Expired" value="1" />
          </View>

          <AppButton title="Create Promotion" />
        </View>

        <AppInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search promotions..."
          leftIcon="Search"
          rightIcon={search ? 'X' : undefined}
          onRightIconPress={() => setSearch('')}
        />

        <View style={styles.filterRow}>
          {filters.map((filter) => {
            const isSelected = selectedFilter === filter.value;

            return (
              <Pressable
                key={filter.value}
                onPress={() => setSelectedFilter(filter.value)}
                style={({ pressed }) => [
                  styles.filterChip,
                  isSelected && styles.filterChipActive,
                  pressed && styles.pressed,
                ]}
              >
                <AppText
                  variant="caption"
                  color={
                    isSelected
                      ? theme.colors.primaryDark
                      : theme.colors.textMuted
                  }
                  style={isSelected ? styles.selectedText : undefined}
                >
                  {filter.label}
                </AppText>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.section}>
          <View>
            <AppText variant="h3">Campaign List</AppText>

            <AppText variant="caption" color={theme.colors.textMuted}>
              {filteredPromotions.length} promotions found
            </AppText>
          </View>

          <View style={styles.list}>
            {filteredPromotions.map((promotion) => (
              <PromotionCard key={promotion.id} promotion={promotion} />
            ))}
          </View>
        </View>
      </View>
    </Screen>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  const theme = useAppTheme();

  return (
    <View style={{ flex: 1, alignItems: 'center', gap: theme.spacing.xs }}>
      <AppText variant="h3" color={theme.colors.primaryDark}>
        {value}
      </AppText>

      <AppText variant="small" color={theme.colors.textMuted}>
        {label}
      </AppText>
    </View>
  );
}

function PromotionCard({ promotion }: { promotion: Promotion }) {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const statusConfig = getStatusConfig(promotion.status, theme);

  return (
    <Pressable
      style={({ pressed }) => [styles.promotionCard, pressed && styles.pressed]}
    >
      <View style={styles.promotionTop}>
        <View style={styles.promotionIcon}>
          <AppIcon
            name={promotion.icon}
            size={24}
            color={theme.colors.primaryDark}
          />
        </View>

        <View style={styles.cardText}>
          <View style={styles.titleRow}>
            <AppText variant="bodyMedium" style={styles.title}>
              {promotion.title}
            </AppText>

            <View
              style={[
                styles.statusBadge,
                { backgroundColor: statusConfig.backgroundColor },
              ]}
            >
              <AppText variant="small" color={statusConfig.textColor}>
                {statusConfig.label}
              </AppText>
            </View>
          </View>

          <AppText variant="caption" color={theme.colors.textMuted}>
            {promotion.description}
          </AppText>
        </View>
      </View>

      <View style={styles.discountBox}>
        <View>
          <AppText variant="small" color={theme.colors.textMuted}>
            Discount
          </AppText>

          <AppText variant="h3" color={theme.colors.primaryDark}>
            {promotion.discount}
          </AppText>
        </View>

        <View>
          <AppText variant="small" color={theme.colors.textMuted}>
            Valid Until
          </AppText>

          <AppText variant="caption">{promotion.validUntil}</AppText>
        </View>

        <View>
          <AppText variant="small" color={theme.colors.textMuted}>
            Usage
          </AppText>

          <AppText variant="caption">{promotion.usage}</AppText>
        </View>
      </View>

      <View style={styles.actionRow}>
        <AppButton
          title="Edit"
          fullWidth={false}
          style={styles.actionButton}
        />

        <AppButton
          title={promotion.status === 'active' ? 'Disable' : 'Preview'}
          variant="outline"
          fullWidth={false}
          style={styles.actionButton}
        />
      </View>
    </Pressable>
  );
}

function getStatusConfig(
  status: PromotionStatus,
  theme: ReturnType<typeof useAppTheme>,
) {
  const config = {
    active: {
      label: 'Active',
      backgroundColor: theme.colors.success,
      textColor: theme.colors.successText,
    },
    scheduled: {
      label: 'Scheduled',
      backgroundColor: theme.colors.info,
      textColor: theme.colors.infoText,
    },
    expired: {
      label: 'Expired',
      backgroundColor: theme.colors.error,
      textColor: theme.colors.errorText,
    },
  };

  return config[status];
}

function createStyles(theme: ReturnType<typeof useAppTheme>) {
  return StyleSheet.create({
    root: {
      gap: theme.spacing.xl,
    },

    summaryCard: {
      borderRadius: theme.radius['2xl'],
      backgroundColor: theme.colors.card,
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: theme.spacing.xl,
      gap: theme.spacing.lg,
      ...(theme.shadows.card ?? {}),
    },

    summaryTop: {
      flexDirection: 'row',
      gap: theme.spacing.md,
    },

    summaryIcon: {
      width: 70,
      height: 70,
      borderRadius: theme.radius['2xl'],
      backgroundColor: theme.colors.cardMuted,
      alignItems: 'center',
      justifyContent: 'center',
    },

    cardText: {
      flex: 1,
      gap: theme.spacing.xs,
    },

    statsRow: {
      minHeight: 82,
      borderRadius: theme.radius.xl,
      backgroundColor: theme.colors.background,
      borderWidth: 1,
      borderColor: theme.colors.border,
      flexDirection: 'row',
      alignItems: 'center',
    },

    statDivider: {
      width: 1,
      height: '65%',
      backgroundColor: theme.colors.border,
    },

    filterRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.spacing.sm,
    },

    filterChip: {
      minHeight: 40,
      paddingHorizontal: theme.spacing.md,
      borderRadius: theme.radius.full,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.card,
      alignItems: 'center',
      justifyContent: 'center',
    },

    filterChipActive: {
      borderColor: theme.colors.primaryDark,
      backgroundColor: theme.colors.cardMuted,
    },

    selectedText: {
      fontWeight: '700',
    },

    section: {
      gap: theme.spacing.md,
    },

    list: {
      gap: theme.spacing.md,
    },

    promotionCard: {
      borderRadius: theme.radius.xl,
      backgroundColor: theme.colors.card,
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: theme.spacing.lg,
      gap: theme.spacing.md,
      ...(theme.shadows.card ?? {}),
    },

    promotionTop: {
      flexDirection: 'row',
      gap: theme.spacing.md,
      alignItems: 'center',
    },

    promotionIcon: {
      width: 54,
      height: 54,
      borderRadius: theme.radius.lg,
      backgroundColor: theme.colors.cardMuted,
      alignItems: 'center',
      justifyContent: 'center',
    },

    titleRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: theme.spacing.sm,
    },

    title: {
      flex: 1,
    },

    statusBadge: {
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      borderRadius: theme.radius.full,
    },

    discountBox: {
      borderRadius: theme.radius.lg,
      backgroundColor: theme.colors.background,
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: theme.spacing.md,
      gap: theme.spacing.md,
    },

    actionRow: {
      flexDirection: 'row',
      gap: theme.spacing.sm,
    },

    actionButton: {
      flex: 1,
      minHeight: 42,
    },

    pressed: {
      opacity: 0.82,
      transform: [{ scale: 0.99 }],
    },
  });
}