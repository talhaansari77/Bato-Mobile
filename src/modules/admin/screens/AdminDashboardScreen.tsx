import React, { useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';

import { useAppTheme } from '../../../app/providers/ThemeProvider';
import { AdminTabParamList } from '../../../core/navigation/navigation.types';
import { AppButton } from '../../../shared/ui/atoms/AppButton';
import { AppIcon, AppIconName } from '../../../shared/ui/atoms/AppIcon';
import { AppText } from '../../../shared/ui/atoms/AppText';
import { Screen } from '../../../shared/ui/templates/Screen';

type AdminDashboardNavigation = BottomTabNavigationProp<
  AdminTabParamList,
  'AdminDashboard'
>;

type AdminStat = {
  id: string;
  label: string;
  value: string;
  subtitle: string;
  icon: AppIconName;
};

type QuickAction = {
  id: string;
  title: string;
  subtitle: string;
  icon: AppIconName;
  route: keyof AdminTabParamList;
};

type ApprovalItem = {
  id: string;
  patientName: string;
  service: string;
  time: string;
  branch: string;
  paymentType: string;
  icon: AppIconName;
};

type ActivityItem = {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  icon: AppIconName;
};

const stats: AdminStat[] = [
  {
    id: 'appointments',
    label: 'Today',
    value: '32',
    subtitle: 'Appointments',
    icon: 'CalendarDays',
  },
  {
    id: 'pending',
    label: 'Pending',
    value: '7',
    subtitle: 'Approvals',
    icon: 'Clock',
  },
  {
    id: 'doctors',
    label: 'Active',
    value: '12',
    subtitle: 'Doctors',
    icon: 'Stethoscope',
  },
  {
    id: 'patients',
    label: 'Total',
    value: '284',
    subtitle: 'Patients',
    icon: 'UsersRound',
  },
];

const quickActions: QuickAction[] = [
  {
    id: 'appointments',
    title: 'Appointments',
    subtitle: 'Approve & manage',
    icon: 'CalendarClock',
    route: 'AdminAppointments',
  },
  {
    id: 'patients',
    title: 'Patients',
    subtitle: 'Profiles & records',
    icon: 'UsersRound',
    route: 'AdminPatients',
  },
  {
    id: 'doctors',
    title: 'Doctors',
    subtitle: 'Staff & schedule',
    icon: 'Stethoscope',
    route: 'AdminDoctors',
  },
  {
    id: 'more',
    title: 'More Tools',
    subtitle: 'Services & reports',
    icon: 'Menu',
    route: 'AdminMore',
  },
];

const pendingApprovals: ApprovalItem[] = [
  {
    id: 'approval-1',
    patientName: 'Muhammad Talha',
    service: 'Hair Growth Treatment',
    time: 'Today · 06:15 PM',
    branch: 'Salmiya Branch',
    paymentType: 'Pay at Clinic',
    icon: 'Sparkles',
  },
  {
    id: 'approval-2',
    patientName: 'Aisha Khan',
    service: 'Skin Consultation',
    time: 'Tomorrow · 04:30 PM',
    branch: 'Main Branch',
    paymentType: 'Pay at Clinic',
    icon: 'ScanFace',
  },
];

const activities: ActivityItem[] = [
  {
    id: 'activity-1',
    title: 'New appointment booked',
    subtitle: 'Omar Ali booked Hydration Facial Therapy',
    time: '12 min ago',
    icon: 'CalendarPlus',
  },
  {
    id: 'activity-2',
    title: 'New patient registered',
    subtitle: 'Mariam Yousef created a patient account',
    time: '34 min ago',
    icon: 'UserPlus',
  },
  {
    id: 'activity-3',
    title: 'Doctor schedule updated',
    subtitle: 'Dr. Sarah Ahmed changed availability',
    time: '1 hr ago',
    icon: 'CalendarCheck',
  },
];

export function AdminDashboardScreen() {
  const theme = useAppTheme();
  const navigation = useNavigation<AdminDashboardNavigation>();

  const styles = useMemo(() => createStyles(theme), [theme]);

  const navigateToTab = (route: keyof AdminTabParamList) => {
    navigation.navigate(route);
  };

  return (
    <Screen
      title="Dashboard"
      subtitle="Admin"
      actions={[
        {
          icon: 'Bell',
          onPress: () => {},
        },
      ]}
    >
      <View style={styles.root}>
        <View style={styles.heroCard}>
          <View style={styles.heroTop}>
            <View style={styles.avatar}>
              <AppIcon
                name="LayoutDashboard"
                size={34}
                color={theme.colors.primaryDark}
              />
            </View>

            <View style={styles.heroText}>
              <AppText variant="caption" color={theme.colors.textMuted}>
                Welcome back
              </AppText>

              <AppText variant="h2">Clinic Admin</AppText>

              <AppText color={theme.colors.textMuted}>
                Monitor appointments, approvals, doctors, patients, revenue,
                and branch activity.
              </AppText>
            </View>
          </View>

          <View style={styles.branchCard}>
            <View style={styles.branchLeft}>
              <View style={styles.branchIcon}>
                <AppIcon
                  name="MapPin"
                  size={20}
                  color={theme.colors.primaryDark}
                />
              </View>

              <View style={styles.cardText}>
                <AppText variant="bodyMedium">Current Branch</AppText>

                <AppText variant="caption" color={theme.colors.textMuted}>
                  Main Branch · Kuwait
                </AppText>
              </View>
            </View>

            <View style={styles.openBadge}>
              <AppText variant="small" color={theme.colors.successText}>
                Open
              </AppText>
            </View>
          </View>
        </View>

        <View style={styles.statsGrid}>
          {stats.map((stat) => (
            <StatCard key={stat.id} stat={stat} />
          ))}
        </View>

        <View style={styles.section}>
          <SectionHeader title="Quick Actions" />

          <View style={styles.quickGrid}>
            {quickActions.map((action) => (
              <Pressable
                key={action.id}
                onPress={() => navigateToTab(action.route)}
                style={({ pressed }) => [
                  styles.quickCard,
                  pressed && styles.pressed,
                ]}
              >
                <View style={styles.quickIcon}>
                  <AppIcon
                    name={action.icon}
                    size={22}
                    color={theme.colors.primaryDark}
                  />
                </View>

                <AppText variant="bodyMedium">{action.title}</AppText>

                <AppText variant="caption" color={theme.colors.textMuted}>
                  {action.subtitle}
                </AppText>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.revenueCard}>
          <View style={styles.revenueHeader}>
            <View>
              <AppText variant="h3">Revenue Summary</AppText>

              <AppText variant="caption" color={theme.colors.textMuted}>
                Mock clinic financial overview
              </AppText>
            </View>

            <View style={styles.revenueIcon}>
              <AppIcon
                name="ChartNoAxesColumnIncreasing"
                size={24}
                color={theme.colors.primaryDark}
              />
            </View>
          </View>

          <View style={styles.revenueMain}>
            <View>
              <AppText variant="caption" color={theme.colors.textMuted}>
                Today
              </AppText>

              <AppText variant="h2">1,240 KWD</AppText>
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

          <View style={styles.revenueBreakdown}>
            <RevenueItem label="Week" value="7,860 KWD" />
            <View style={styles.statDivider} />
            <RevenueItem label="Month" value="31,420 KWD" />
          </View>
        </View>

        <View style={styles.section}>
          <SectionHeader
            title="Pending Approvals"
            actionLabel="View all"
            onActionPress={() => navigateToTab('AdminAppointments')}
          />

          <View style={styles.list}>
            {pendingApprovals.map((approval) => (
              <ApprovalCard key={approval.id} approval={approval} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <SectionHeader title="Recent Activity" />

          <View style={styles.list}>
            {activities.map((activity) => (
              <ActivityRow key={activity.id} activity={activity} />
            ))}
          </View>
        </View>

        <View style={styles.footerCard}>
          <View style={styles.footerIcon}>
            <AppIcon
              name="Settings"
              size={24}
              color={theme.colors.primaryDark}
            />
          </View>

          <View style={styles.cardText}>
            <AppText variant="bodyMedium">Need more admin tools?</AppText>

            <AppText variant="caption" color={theme.colors.textMuted}>
              Services, reports, branches, promotions, payments, and settings
              are grouped inside More.
            </AppText>
          </View>

          <AppButton
            title="Open More"
            fullWidth={false}
            style={styles.footerButton}
            onPress={() => navigateToTab('AdminMore')}
          />
        </View>
      </View>
    </Screen>
  );
}

function SectionHeader({
  title,
  actionLabel,
  onActionPress,
}: {
  title: string;
  actionLabel?: string;
  onActionPress?: () => void;
}) {
  const theme = useAppTheme();

  return (
    <View style={sectionHeaderStyles.row}>
      <AppText variant="h3">{title}</AppText>

      {actionLabel ? (
        <Pressable onPress={onActionPress} hitSlop={10}>
          <AppText variant="caption" color={theme.colors.primaryDark}>
            {actionLabel}
          </AppText>
        </Pressable>
      ) : null}
    </View>
  );
}

function StatCard({ stat }: { stat: AdminStat }) {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.statCard}>
      <View style={styles.statIcon}>
        <AppIcon name={stat.icon} size={21} color={theme.colors.primaryDark} />
      </View>

      <AppText variant="h3">{stat.value}</AppText>

      <View>
        <AppText variant="caption">{stat.label}</AppText>

        <AppText variant="small" color={theme.colors.textMuted}>
          {stat.subtitle}
        </AppText>
      </View>
    </View>
  );
}

function RevenueItem({ label, value }: { label: string; value: string }) {
  const theme = useAppTheme();

  return (
    <View style={{ flex: 1, gap: theme.spacing.xs }}>
      <AppText variant="small" color={theme.colors.textMuted}>
        {label}
      </AppText>

      <AppText variant="bodyMedium">{value}</AppText>
    </View>
  );
}

function ApprovalCard({ approval }: { approval: ApprovalItem }) {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.approvalCard}>
      <View style={styles.approvalTop}>
        <View style={styles.approvalIcon}>
          <AppIcon
            name={approval.icon}
            size={23}
            color={theme.colors.primaryDark}
          />
        </View>

        <View style={styles.cardText}>
          <AppText variant="bodyMedium">{approval.patientName}</AppText>

          <AppText variant="caption" color={theme.colors.textMuted}>
            {approval.service}
          </AppText>

          <AppText variant="caption" color={theme.colors.primaryDark}>
            {approval.time}
          </AppText>
        </View>
      </View>

      <View style={styles.approvalMeta}>
        <View style={styles.inlineInfo}>
          <AppIcon name="MapPin" size={15} color={theme.colors.textMuted} />

          <AppText variant="caption" color={theme.colors.textMuted}>
            {approval.branch}
          </AppText>
        </View>

        <View style={styles.inlineInfo}>
          <AppIcon
            name="CreditCard"
            size={15}
            color={theme.colors.textMuted}
          />

          <AppText variant="caption" color={theme.colors.textMuted}>
            {approval.paymentType}
          </AppText>
        </View>
      </View>

      <View style={styles.approvalActions}>
        <AppButton
          title="Approve"
          fullWidth={false}
          style={styles.approvalButton}
        />

        <AppButton
          title="Reject"
          variant="outline"
          fullWidth={false}
          style={styles.approvalButton}
        />
      </View>
    </View>
  );
}

function ActivityRow({ activity }: { activity: ActivityItem }) {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.activityRow}>
      <View style={styles.activityIcon}>
        <AppIcon
          name={activity.icon}
          size={21}
          color={theme.colors.primaryDark}
        />
      </View>

      <View style={styles.cardText}>
        <AppText variant="bodyMedium">{activity.title}</AppText>

        <AppText variant="caption" color={theme.colors.textMuted}>
          {activity.subtitle}
        </AppText>
      </View>

      <AppText variant="small" color={theme.colors.textMuted}>
        {activity.time}
      </AppText>
    </View>
  );
}

function createStyles(theme: ReturnType<typeof useAppTheme>) {
  return StyleSheet.create({
    root: {
      gap: theme.spacing['2xl'],
    },

    heroCard: {
      borderRadius: theme.radius['2xl'],
      backgroundColor: theme.colors.card,
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: theme.spacing['2xl'],
      gap: theme.spacing.lg,
      ...(theme.shadows.card ?? {}),
    },

    heroTop: {
      flexDirection: 'row',
      gap: theme.spacing.lg,
    },

    avatar: {
      width: 76,
      height: 76,
      borderRadius: theme.radius.full,
      backgroundColor: theme.colors.cardMuted,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: theme.colors.border,
    },

    heroText: {
      flex: 1,
      gap: theme.spacing.xs,
    },

    branchCard: {
      borderRadius: theme.radius.xl,
      backgroundColor: theme.colors.background,
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: theme.spacing.lg,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: theme.spacing.md,
    },

    branchLeft: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.md,
    },

    branchIcon: {
      width: 42,
      height: 42,
      borderRadius: theme.radius.lg,
      backgroundColor: theme.colors.cardMuted,
      alignItems: 'center',
      justifyContent: 'center',
    },

    openBadge: {
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      borderRadius: theme.radius.full,
      backgroundColor: theme.colors.success,
    },

    cardText: {
      flex: 1,
      gap: theme.spacing.xs,
    },

    statsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.spacing.md,
    },

    statCard: {
      width: '47.8%',
      minHeight: 132,
      borderRadius: theme.radius.xl,
      backgroundColor: theme.colors.card,
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: theme.spacing.lg,
      gap: theme.spacing.sm,
      ...(theme.shadows.card ?? {}),
    },

    statIcon: {
      width: 42,
      height: 42,
      borderRadius: theme.radius.lg,
      backgroundColor: theme.colors.cardMuted,
      alignItems: 'center',
      justifyContent: 'center',
    },

    section: {
      gap: theme.spacing.md,
    },

    quickGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.spacing.md,
    },

    quickCard: {
      width: '47.8%',
      minHeight: 126,
      borderRadius: theme.radius.xl,
      backgroundColor: theme.colors.card,
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: theme.spacing.lg,
      gap: theme.spacing.xs,
      ...(theme.shadows.card ?? {}),
    },

    quickIcon: {
      width: 44,
      height: 44,
      borderRadius: theme.radius.lg,
      backgroundColor: theme.colors.cardMuted,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: theme.spacing.sm,
    },

    revenueCard: {
      borderRadius: theme.radius.xl,
      backgroundColor: theme.colors.card,
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: theme.spacing.lg,
      gap: theme.spacing.lg,
      ...(theme.shadows.card ?? {}),
    },

    revenueHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: theme.spacing.md,
    },

    revenueIcon: {
      width: 48,
      height: 48,
      borderRadius: theme.radius.lg,
      backgroundColor: theme.colors.cardMuted,
      alignItems: 'center',
      justifyContent: 'center',
    },

    revenueMain: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: theme.spacing.md,
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

    revenueBreakdown: {
      borderRadius: theme.radius.lg,
      backgroundColor: theme.colors.background,
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: theme.spacing.md,
      flexDirection: 'row',
      gap: theme.spacing.md,
    },

    statDivider: {
      width: 1,
      minHeight: 42,
      backgroundColor: theme.colors.border,
    },

    list: {
      gap: theme.spacing.md,
    },

    approvalCard: {
      borderRadius: theme.radius.xl,
      backgroundColor: theme.colors.card,
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: theme.spacing.lg,
      gap: theme.spacing.md,
      ...(theme.shadows.card ?? {}),
    },

    approvalTop: {
      flexDirection: 'row',
      gap: theme.spacing.md,
    },

    approvalIcon: {
      width: 50,
      height: 50,
      borderRadius: theme.radius.lg,
      backgroundColor: theme.colors.cardMuted,
      alignItems: 'center',
      justifyContent: 'center',
    },

    approvalMeta: {
      borderRadius: theme.radius.lg,
      backgroundColor: theme.colors.background,
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: theme.spacing.md,
      gap: theme.spacing.sm,
    },

    inlineInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.xs,
    },

    approvalActions: {
      flexDirection: 'row',
      gap: theme.spacing.sm,
    },

    approvalButton: {
      flex: 1,
      minHeight: 42,
    },

    activityRow: {
      borderRadius: theme.radius.xl,
      backgroundColor: theme.colors.card,
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: theme.spacing.lg,
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.md,
      ...(theme.shadows.card ?? {}),
    },

    activityIcon: {
      width: 46,
      height: 46,
      borderRadius: theme.radius.lg,
      backgroundColor: theme.colors.cardMuted,
      alignItems: 'center',
      justifyContent: 'center',
    },

    footerCard: {
      borderRadius: theme.radius.xl,
      backgroundColor: theme.colors.info,
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: theme.spacing.lg,
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.md,
      marginBottom: theme.spacing.lg,
    },

    footerIcon: {
      width: 48,
      height: 48,
      borderRadius: theme.radius.lg,
      backgroundColor: theme.colors.card,
      alignItems: 'center',
      justifyContent: 'center',
    },

    footerButton: {
      minHeight: 42,
      paddingHorizontal: theme.spacing.lg,
    },

    pressed: {
      opacity: 0.82,
      transform: [{ scale: 0.99 }],
    },
  });
}

const sectionHeaderStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});