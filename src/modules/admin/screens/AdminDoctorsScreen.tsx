import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { useAppTheme } from '../../../app/providers/ThemeProvider';
import { AppButton } from '../../../shared/ui/atoms/AppButton';
import { AppIcon, AppIconName } from '../../../shared/ui/atoms/AppIcon';
import { AppInput } from '../../../shared/ui/atoms/AppInput';
import { AppText } from '../../../shared/ui/atoms/AppText';
import { Screen } from '../../../shared/ui/templates/Screen';

type DoctorStatus = 'available' | 'busy' | 'offline';
type FilterType = 'all' | DoctorStatus;

type AdminDoctor = {
  id: string;
  name: string;
  specialty: string;
  branch: string;
  experience: string;
  appointmentsToday: number;
  rating: string;
  status: DoctorStatus;
  icon: AppIconName;
};

const filters: Array<{ label: string; value: FilterType }> = [
  { label: 'All', value: 'all' },
  { label: 'Available', value: 'available' },
  { label: 'Busy', value: 'busy' },
  { label: 'Offline', value: 'offline' },
];

const doctors: AdminDoctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Ahmed',
    specialty: 'Dermatologist',
    branch: 'Main Branch',
    experience: '8 years',
    appointmentsToday: 8,
    rating: '4.9',
    status: 'available',
    icon: 'Stethoscope',
  },
  {
    id: '2',
    name: 'Dr. Omar Khalid',
    specialty: 'Hair Specialist',
    branch: 'Salmiya Branch',
    experience: '10 years',
    appointmentsToday: 6,
    rating: '4.8',
    status: 'busy',
    icon: 'Stethoscope',
  },
  {
    id: '3',
    name: 'Dr. Lina Hassan',
    specialty: 'Facial Therapy Specialist',
    branch: 'Main Branch',
    experience: '6 years',
    appointmentsToday: 4,
    rating: '4.7',
    status: 'available',
    icon: 'Stethoscope',
  },
  {
    id: '4',
    name: 'Dr. Mariam Ali',
    specialty: 'Aesthetic Specialist',
    branch: 'Avenues Branch',
    experience: '9 years',
    appointmentsToday: 0,
    rating: '4.9',
    status: 'offline',
    icon: 'Stethoscope',
  },
];

export function AdminDoctorsScreen() {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const [search, setSearch] = useState('');

  const filteredDoctors = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return doctors.filter((doctor) => {
      const matchesFilter =
        selectedFilter === 'all' || doctor.status === selectedFilter;

      const matchesSearch =
        normalizedSearch.length === 0 ||
        doctor.name.toLowerCase().includes(normalizedSearch) ||
        doctor.specialty.toLowerCase().includes(normalizedSearch) ||
        doctor.branch.toLowerCase().includes(normalizedSearch);

      return matchesFilter && matchesSearch;
    });
  }, [search, selectedFilter]);

  const availableCount = doctors.filter(
    (doctor) => doctor.status === 'available',
  ).length;

  const busyCount = doctors.filter((doctor) => doctor.status === 'busy').length;

  return (
    <Screen
      title="Doctors"
      subtitle="Staff"
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
                name="Stethoscope"
                size={34}
                color={theme.colors.primaryDark}
              />
            </View>

            <View style={styles.cardText}>
              <AppText variant="h2">Doctor Management</AppText>

              <AppText color={theme.colors.textMuted}>
                Manage doctors, specialties, branches, schedules, and daily
                appointment load.
              </AppText>
            </View>
          </View>

          <View style={styles.statsRow}>
            <StatItem label="Total" value={`${doctors.length}`} />
            <View style={styles.statDivider} />
            <StatItem label="Available" value={`${availableCount}`} />
            <View style={styles.statDivider} />
            <StatItem label="Busy" value={`${busyCount}`} />
          </View>

          <AppButton title="Add Doctor" />
        </View>

        <AppInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search doctor, specialty, branch..."
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
            <AppText variant="h3">Doctor List</AppText>

            <AppText variant="caption" color={theme.colors.textMuted}>
              {filteredDoctors.length} doctors found
            </AppText>
          </View>

          <View style={styles.list}>
            {filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </View>
        </View>

        {filteredDoctors.length === 0 ? (
          <View style={styles.emptyCard}>
            <View style={styles.emptyIcon}>
              <AppIcon
                name="SearchX"
                size={30}
                color={theme.colors.primaryDark}
              />
            </View>

            <AppText variant="bodyMedium" align="center">
              No doctors found
            </AppText>

            <AppText
              variant="caption"
              color={theme.colors.textMuted}
              align="center"
            >
              Try another keyword or change the availability filter.
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

function DoctorCard({ doctor }: { doctor: AdminDoctor }) {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const statusConfig = getStatusConfig(doctor.status, theme);

  return (
    <Pressable
      style={({ pressed }) => [styles.doctorCard, pressed && styles.pressed]}
    >
      <View style={styles.doctorTop}>
        <View style={styles.doctorAvatar}>
          <AppIcon
            name={doctor.icon}
            size={26}
            color={theme.colors.primaryDark}
          />
        </View>

        <View style={styles.cardText}>
          <View style={styles.titleRow}>
            <AppText variant="bodyMedium" style={styles.title}>
              {doctor.name}
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
            {doctor.specialty}
          </AppText>
        </View>
      </View>

      <View style={styles.detailsBox}>
        <DetailItem icon="MapPin" label="Branch" value={doctor.branch} />
        <DetailItem icon="BadgeCheck" label="Experience" value={doctor.experience} />
        <DetailItem
          icon="CalendarDays"
          label="Today"
          value={`${doctor.appointmentsToday} appointments`}
        />
        <DetailItem icon="Star" label="Rating" value={doctor.rating} />
      </View>

      <View style={styles.actionRow}>
        <AppButton
          title="Manage Schedule"
          fullWidth={false}
          style={styles.actionButton}
        />

        <AppButton
          title="Edit"
          variant="outline"
          fullWidth={false}
          style={styles.actionButton}
        />
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
  status: DoctorStatus,
  theme: ReturnType<typeof useAppTheme>,
) {
  const config = {
    available: {
      label: 'Available',
      backgroundColor: theme.colors.success,
      textColor: theme.colors.successText,
    },
    busy: {
      label: 'Busy',
      backgroundColor: theme.colors.warning,
      textColor: theme.colors.warningText,
    },
    offline: {
      label: 'Offline',
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

    doctorCard: {
      borderRadius: theme.radius.xl,
      backgroundColor: theme.colors.card,
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: theme.spacing.lg,
      gap: theme.spacing.md,
      ...(theme.shadows.card ?? {}),
    },

    doctorTop: {
      flexDirection: 'row',
      gap: theme.spacing.md,
      alignItems: 'center',
    },

    doctorAvatar: {
      width: 54,
      height: 54,
      borderRadius: theme.radius.full,
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