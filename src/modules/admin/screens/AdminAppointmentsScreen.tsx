import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { useAppTheme } from '../../../app/providers/ThemeProvider';
import { AppButton } from '../../../shared/ui/atoms/AppButton';
import { AppIcon, AppIconName } from '../../../shared/ui/atoms/AppIcon';
import { AppInput } from '../../../shared/ui/atoms/AppInput';
import { AppText } from '../../../shared/ui/atoms/AppText';
import { Screen } from '../../../shared/ui/templates/Screen';

type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';
type FilterType = 'all' | AppointmentStatus;

type AdminAppointment = {
  id: string;
  patientName: string;
  doctorName: string;
  service: string;
  branch: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  paymentType: 'Online Paid' | 'Pay at Clinic';
  icon: AppIconName;
};

const filters: Array<{ label: string; value: FilterType }> = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Confirmed', value: 'confirmed' },
  { label: 'Completed', value: 'completed' },
  { label: 'Cancelled', value: 'cancelled' },
];

const appointments: AdminAppointment[] = [
  {
    id: 'apt-1',
    patientName: 'Muhammad Talha',
    doctorName: 'Dr. Omar Khalid',
    service: 'Hair Growth Treatment',
    branch: 'Salmiya Branch',
    date: 'Today',
    time: '06:15 PM',
    status: 'pending',
    paymentType: 'Pay at Clinic',
    icon: 'Sparkles',
  },
  {
    id: 'apt-2',
    patientName: 'Aisha Khan',
    doctorName: 'Dr. Sarah Ahmed',
    service: 'Skin Consultation',
    branch: 'Main Branch',
    date: 'Tomorrow',
    time: '04:30 PM',
    status: 'pending',
    paymentType: 'Pay at Clinic',
    icon: 'ScanFace',
  },
  {
    id: 'apt-3',
    patientName: 'Omar Ali',
    doctorName: 'Dr. Lina Hassan',
    service: 'Hydration Facial Therapy',
    branch: 'Main Branch',
    date: 'Today',
    time: '07:00 PM',
    status: 'confirmed',
    paymentType: 'Online Paid',
    icon: 'Droplets',
  },
  {
    id: 'apt-4',
    patientName: 'Mariam Yousef',
    doctorName: 'Dr. Sarah Ahmed',
    service: 'Acne Treatment Follow-up',
    branch: 'Avenues Branch',
    date: 'Jun 17',
    time: '03:45 PM',
    status: 'completed',
    paymentType: 'Online Paid',
    icon: 'Activity',
  },
  {
    id: 'apt-5',
    patientName: 'Khalid Hassan',
    doctorName: 'Dr. Omar Khalid',
    service: 'Hair Nourishment Therapy',
    branch: 'Salmiya Branch',
    date: 'Jun 15',
    time: '05:00 PM',
    status: 'cancelled',
    paymentType: 'Pay at Clinic',
    icon: 'Leaf',
  },
];

export function AdminAppointmentsScreen() {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const [search, setSearch] = useState('');

  const filteredAppointments = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return appointments.filter((appointment) => {
      const matchesFilter =
        selectedFilter === 'all' || appointment.status === selectedFilter;

      const matchesSearch =
        normalizedSearch.length === 0 ||
        appointment.patientName.toLowerCase().includes(normalizedSearch) ||
        appointment.doctorName.toLowerCase().includes(normalizedSearch) ||
        appointment.service.toLowerCase().includes(normalizedSearch) ||
        appointment.branch.toLowerCase().includes(normalizedSearch);

      return matchesFilter && matchesSearch;
    });
  }, [search, selectedFilter]);

  const pendingCount = appointments.filter(
    (appointment) => appointment.status === 'pending',
  ).length;

  const confirmedCount = appointments.filter(
    (appointment) => appointment.status === 'confirmed',
  ).length;

  return (
    <Screen
      title="Appointments"
      subtitle="Management"
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
                name="CalendarClock"
                size={34}
                color={theme.colors.primaryDark}
              />
            </View>

            <View style={styles.cardText}>
              <AppText variant="h2">Appointment Control</AppText>

              <AppText color={theme.colors.textMuted}>
                Approve pay-at-clinic requests, review doctor assignments, and
                manage booking statuses.
              </AppText>
            </View>
          </View>

          <View style={styles.statsRow}>
            <StatItem label="Pending" value={`${pendingCount}`} />
            <View style={styles.statDivider} />
            <StatItem label="Confirmed" value={`${confirmedCount}`} />
            <View style={styles.statDivider} />
            <StatItem label="Total" value={`${appointments.length}`} />
          </View>
        </View>

        <AppInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search patient, doctor, service, branch..."
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

        <View style={styles.noticeCard}>
          <View style={styles.noticeIcon}>
            <AppIcon
              name="Info"
              size={22}
              color={theme.colors.warningText}
            />
          </View>

          <View style={styles.cardText}>
            <AppText variant="bodyMedium">Pay-at-clinic approvals</AppText>

            <AppText variant="caption" color={theme.colors.textMuted}>
              Pending cash bookings require admin approval before confirmation.
            </AppText>
          </View>
        </View>

        <View style={styles.section}>
          <View>
            <AppText variant="h3">Appointment List</AppText>

            <AppText variant="caption" color={theme.colors.textMuted}>
              {filteredAppointments.length} bookings found
            </AppText>
          </View>

          <View style={styles.list}>
            {filteredAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
              />
            ))}
          </View>
        </View>

        {filteredAppointments.length === 0 ? (
          <View style={styles.emptyCard}>
            <View style={styles.emptyIcon}>
              <AppIcon
                name="CalendarX"
                size={30}
                color={theme.colors.primaryDark}
              />
            </View>

            <AppText variant="bodyMedium" align="center">
              No appointments found
            </AppText>

            <AppText
              variant="caption"
              color={theme.colors.textMuted}
              align="center"
            >
              Try another search term or choose a different status filter.
            </AppText>
          </View>
        ) : null}
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

function AppointmentCard({
  appointment,
}: {
  appointment: AdminAppointment;
}) {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const statusConfig = getStatusConfig(appointment.status, theme);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.appointmentCard,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.appointmentTop}>
        <View style={styles.appointmentIcon}>
          <AppIcon
            name={appointment.icon}
            size={24}
            color={theme.colors.primaryDark}
          />
        </View>

        <View style={styles.cardText}>
          <View style={styles.titleRow}>
            <AppText variant="bodyMedium" style={styles.title}>
              {appointment.patientName}
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
            {appointment.service}
          </AppText>

          <AppText variant="caption" color={theme.colors.primaryDark}>
            {appointment.date} · {appointment.time}
          </AppText>
        </View>
      </View>

      <View style={styles.detailsBox}>
        <DetailItem
          icon="Stethoscope"
          label="Doctor"
          value={appointment.doctorName}
        />

        <DetailItem icon="MapPin" label="Branch" value={appointment.branch} />

        <DetailItem
          icon="CreditCard"
          label="Payment"
          value={appointment.paymentType}
        />
      </View>

      {appointment.status === 'pending' ? (
        <View style={styles.actionRow}>
          <AppButton
            title="Approve"
            fullWidth={false}
            style={styles.actionButton}
          />

          <AppButton
            title="Reject"
            variant="outline"
            fullWidth={false}
            style={styles.actionButton}
          />
        </View>
      ) : null}

      {appointment.status === 'confirmed' ? (
        <View style={styles.actionRow}>
          <AppButton
            title="Reschedule"
            variant="outline"
            fullWidth={false}
            style={styles.actionButton}
          />

          <AppButton
            title="Mark Complete"
            fullWidth={false}
            style={styles.actionButton}
          />
        </View>
      ) : null}

      {appointment.status === 'completed' ? (
        <View style={styles.infoRow}>
          <AppIcon
            name="CircleCheck"
            size={17}
            color={theme.colors.successText}
          />

          <AppText variant="caption" color={theme.colors.textMuted}>
            This appointment has been completed.
          </AppText>
        </View>
      ) : null}

      {appointment.status === 'cancelled' ? (
        <View style={styles.infoRow}>
          <AppIcon name="CircleX" size={17} color={theme.colors.errorText} />

          <AppText variant="caption" color={theme.colors.textMuted}>
            This appointment was cancelled.
          </AppText>
        </View>
      ) : null}
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
  status: AppointmentStatus,
  theme: ReturnType<typeof useAppTheme>,
) {
  const config = {
    pending: {
      label: 'Pending',
      backgroundColor: theme.colors.warning,
      textColor: theme.colors.warningText,
    },
    confirmed: {
      label: 'Confirmed',
      backgroundColor: theme.colors.success,
      textColor: theme.colors.successText,
    },
    completed: {
      label: 'Completed',
      backgroundColor: theme.colors.info,
      textColor: theme.colors.infoText,
    },
    cancelled: {
      label: 'Cancelled',
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

    noticeCard: {
      borderRadius: theme.radius.xl,
      backgroundColor: theme.colors.warning,
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: theme.spacing.lg,
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.md,
    },

    noticeIcon: {
      width: 46,
      height: 46,
      borderRadius: theme.radius.lg,
      backgroundColor: theme.colors.card,
      alignItems: 'center',
      justifyContent: 'center',
    },

    section: {
      gap: theme.spacing.md,
    },

    list: {
      gap: theme.spacing.md,
    },

    appointmentCard: {
      borderRadius: theme.radius.xl,
      backgroundColor: theme.colors.card,
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: theme.spacing.lg,
      gap: theme.spacing.md,
      ...(theme.shadows.card ?? {}),
    },

    appointmentTop: {
      flexDirection: 'row',
      gap: theme.spacing.md,
    },

    appointmentIcon: {
      width: 52,
      height: 52,
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

    actionRow: {
      flexDirection: 'row',
      gap: theme.spacing.sm,
    },

    actionButton: {
      flex: 1,
      minHeight: 42,
    },

    infoRow: {
      minHeight: 42,
      borderRadius: theme.radius.lg,
      backgroundColor: theme.colors.background,
      borderWidth: 1,
      borderColor: theme.colors.border,
      paddingHorizontal: theme.spacing.md,
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.xs,
    },

    emptyCard: {
      borderRadius: theme.radius.xl,
      backgroundColor: theme.colors.card,
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: theme.spacing['2xl'],
      alignItems: 'center',
      gap: theme.spacing.sm,
      ...(theme.shadows.card ?? {}),
    },

    emptyIcon: {
      width: 58,
      height: 58,
      borderRadius: theme.radius.full,
      backgroundColor: theme.colors.cardMuted,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: theme.spacing.sm,
    },

    pressed: {
      opacity: 0.82,
      transform: [{ scale: 0.99 }],
    },
  });
}