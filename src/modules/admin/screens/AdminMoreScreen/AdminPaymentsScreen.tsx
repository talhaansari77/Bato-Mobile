import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { useAppTheme } from '../../../../app/providers/ThemeProvider';
import { AppIcon, AppIconName } from '../../../../shared/ui/atoms/AppIcon';
import { AppInput } from '../../../../shared/ui/atoms/AppInput';
import { AppText } from '../../../../shared/ui/atoms/AppText';
import { Screen } from '../../../../shared/ui/templates/Screen';

type PaymentStatus = 'paid' | 'pending' | 'refunded';
type FilterType = 'all' | PaymentStatus;

type Payment = {
  id: string;
  patientName: string;
  service: string;
  amount: string;
  method: 'Online' | 'Pay at Clinic';
  date: string;
  status: PaymentStatus;
  icon: AppIconName;
};

const filters: Array<{ label: string; value: FilterType }> = [
  { label: 'All', value: 'all' },
  { label: 'Paid', value: 'paid' },
  { label: 'Pending', value: 'pending' },
  { label: 'Refunded', value: 'refunded' },
];

const payments: Payment[] = [
  {
    id: 'pay-1',
    patientName: 'Muhammad Talha',
    service: 'Hair Growth Treatment',
    amount: '25 KWD',
    method: 'Pay at Clinic',
    date: 'Today',
    status: 'pending',
    icon: 'Sparkles',
  },
  {
    id: 'pay-2',
    patientName: 'Aisha Khan',
    service: 'Skin Consultation',
    amount: '22 KWD',
    method: 'Online',
    date: 'Today',
    status: 'paid',
    icon: 'ScanFace',
  },
  {
    id: 'pay-3',
    patientName: 'Omar Ali',
    service: 'Hydration Facial Therapy',
    amount: '30 KWD',
    method: 'Online',
    date: 'Jun 17',
    status: 'paid',
    icon: 'Droplets',
  },
  {
    id: 'pay-4',
    patientName: 'Mariam Yousef',
    service: 'Botox Consultation',
    amount: '35 KWD',
    method: 'Online',
    date: 'Jun 12',
    status: 'refunded',
    icon: 'CreditCard',
  },
];

export function AdminPaymentsScreen() {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const [search, setSearch] = useState('');

  const filteredPayments = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return payments.filter((payment) => {
      const matchesFilter =
        selectedFilter === 'all' || payment.status === selectedFilter;

      const matchesSearch =
        normalizedSearch.length === 0 ||
        payment.patientName.toLowerCase().includes(normalizedSearch) ||
        payment.service.toLowerCase().includes(normalizedSearch) ||
        payment.method.toLowerCase().includes(normalizedSearch);

      return matchesFilter && matchesSearch;
    });
  }, [search, selectedFilter]);

  return (
    <Screen
      title="Payments"
      subtitle="Transactions"
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
                name="CreditCard"
                size={34}
                color={theme.colors.primaryDark}
              />
            </View>

            <View style={styles.cardText}>
              <AppText variant="h2">Payment Center</AppText>

              <AppText color={theme.colors.textMuted}>
                Track online payments, pay-at-clinic collections, refunds, and
                pending transaction actions.
              </AppText>
            </View>
          </View>

          <View style={styles.statsRow}>
            <StatItem label="Today" value="1,240 KWD" />
            <View style={styles.statDivider} />
            <StatItem label="Pending" value="25 KWD" />
          </View>
        </View>

        <View style={styles.revenueCard}>
          <View style={styles.revenueIcon}>
            <AppIcon
              name="ChartNoAxesColumnIncreasing"
              size={24}
              color={theme.colors.primaryDark}
            />
          </View>

          <View style={styles.cardText}>
            <AppText variant="bodyMedium">Monthly Revenue</AppText>

            <AppText variant="h2">31,420 KWD</AppText>

            <AppText variant="caption" color={theme.colors.textMuted}>
              +12% compared to previous month
            </AppText>
          </View>

          <View style={styles.growthBadge}>
            <AppIcon
              name="TrendingUp"
              size={15}
              color={theme.colors.successText}
            />

            <AppText variant="small" color={theme.colors.successText}>
              +12%
            </AppText>
          </View>
        </View>

        <AppInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search payments..."
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
            <AppText variant="h3">Transactions</AppText>

            <AppText variant="caption" color={theme.colors.textMuted}>
              {filteredPayments.length} payments found
            </AppText>
          </View>

          <View style={styles.list}>
            {filteredPayments.map((payment) => (
              <PaymentCard key={payment.id} payment={payment} />
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

function PaymentCard({ payment }: { payment: Payment }) {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const statusConfig = getStatusConfig(payment.status, theme);

  return (
    <Pressable
      style={({ pressed }) => [styles.paymentCard, pressed && styles.pressed]}
    >
      <View style={styles.paymentTop}>
        <View style={styles.paymentIcon}>
          <AppIcon
            name={payment.icon}
            size={24}
            color={theme.colors.primaryDark}
          />
        </View>

        <View style={styles.cardText}>
          <View style={styles.titleRow}>
            <AppText variant="bodyMedium" style={styles.title}>
              {payment.patientName}
            </AppText>

            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor: statusConfig.backgroundColor,
                },
              ]}
            >
              <AppText variant="small" color={statusConfig.textColor}>
                {statusConfig.label}
              </AppText>
            </View>
          </View>

          <AppText variant="caption" color={theme.colors.textMuted}>
            {payment.service}
          </AppText>
        </View>
      </View>

      <View style={styles.detailsBox}>
        <DetailItem icon="CircleDollarSign" label="Amount" value={payment.amount} />
        <DetailItem icon="CreditCard" label="Method" value={payment.method} />
        <DetailItem icon="Calendar" label="Date" value={payment.date} />
      </View>
    </Pressable>
  );
}

function DetailItem({
  icon,
  label,
  value,
}: {
  icon: AppIconName;
  label: string;
  value: string;
}) {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.detailItem}>
      <AppIcon name={icon} size={17} color={theme.colors.primaryDark} />

      <View>
        <AppText variant="small" color={theme.colors.textMuted}>
          {label}
        </AppText>

        <AppText variant="caption">{value}</AppText>
      </View>
    </View>
  );
}

function getStatusConfig(
  status: PaymentStatus,
  theme: ReturnType<typeof useAppTheme>,
) {
  const config = {
    paid: {
      label: 'Paid',
      backgroundColor: theme.colors.success,
      textColor: theme.colors.successText,
    },
    pending: {
      label: 'Pending',
      backgroundColor: theme.colors.warning,
      textColor: theme.colors.warningText,
    },
    refunded: {
      label: 'Refunded',
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

    revenueCard: {
      borderRadius: theme.radius.xl,
      backgroundColor: theme.colors.info,
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: theme.spacing.lg,
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.md,
    },

    revenueIcon: {
      width: 52,
      height: 52,
      borderRadius: theme.radius.lg,
      backgroundColor: theme.colors.card,
      alignItems: 'center',
      justifyContent: 'center',
    },

    growthBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.xs,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      borderRadius: theme.radius.full,
      backgroundColor: theme.colors.success,
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

    paymentCard: {
      borderRadius: theme.radius.xl,
      backgroundColor: theme.colors.card,
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: theme.spacing.lg,
      gap: theme.spacing.md,
      ...(theme.shadows.card ?? {}),
    },

    paymentTop: {
      flexDirection: 'row',
      gap: theme.spacing.md,
      alignItems: 'center',
    },

    paymentIcon: {
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

    detailsBox: {
      borderRadius: theme.radius.lg,
      backgroundColor: theme.colors.background,
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: theme.spacing.md,
      gap: theme.spacing.md,
    },

    detailItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.sm,
    },

    pressed: {
      opacity: 0.82,
      transform: [{ scale: 0.99 }],
    },
  });
}