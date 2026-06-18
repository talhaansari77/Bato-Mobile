import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { useAppTheme } from '../../../app/providers/ThemeProvider';
import { AppButton } from '../../../shared/ui/atoms/AppButton';
import { AppIcon, AppIconName } from '../../../shared/ui/atoms/AppIcon';
import { AppInput } from '../../../shared/ui/atoms/AppInput';
import { AppText } from '../../../shared/ui/atoms/AppText';
import { Screen } from '../../../shared/ui/templates/Screen';

type PatientStatus = 'active' | 'new' | 'inactive';
type FilterType = 'all' | PatientStatus;

type AdminPatient = {
  id: string;
  name: string;
  phone: string;
  email: string;
  status: PatientStatus;
  activePlan: string;
  lastVisit: string;
  nextVisit: string;
  appointments: number;
  branch: string;
  icon: AppIconName;
};

const filters: Array<{ label: string; value: FilterType }> = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'New', value: 'new' },
  { label: 'Inactive', value: 'inactive' },
];

const patients: AdminPatient[] = [
  {
    id: '1',
    name: 'Muhammad Talha',
    phone: '+965 0000 0000',
    email: 'muhammad.talha@email.com',
    status: 'active',
    activePlan: 'Hair Rejuvenation Plan',
    lastVisit: 'Jun 14',
    nextVisit: 'Jun 22',
    appointments: 12,
    branch: 'Salmiya Branch',
    icon: 'UserRound',
  },
  {
    id: '2',
    name: 'Aisha Khan',
    phone: '+965 1111 2222',
    email: 'aisha.khan@email.com',
    status: 'active',
    activePlan: 'Acne Treatment Plan',
    lastVisit: 'Jun 12',
    nextVisit: 'Jun 25',
    appointments: 8,
    branch: 'Main Branch',
    icon: 'UserRound',
  },
  {
    id: '3',
    name: 'Omar Ali',
    phone: '+965 3333 4444',
    email: 'omar.ali@email.com',
    status: 'new',
    activePlan: 'Consultation Pending',
    lastVisit: 'Not visited',
    nextVisit: 'Today',
    appointments: 1,
    branch: 'Main Branch',
    icon: 'UserRound',
  },
  {
    id: '4',
    name: 'Mariam Yousef',
    phone: '+965 5555 6666',
    email: 'mariam.yousef@email.com',
    status: 'inactive',
    activePlan: 'No active plan',
    lastVisit: 'May 18',
    nextVisit: 'Not scheduled',
    appointments: 4,
    branch: 'Avenues Branch',
    icon: 'UserRound',
  },
];

export function AdminPatientsScreen() {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const [search, setSearch] = useState('');

  const filteredPatients = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return patients.filter((patient) => {
      const matchesFilter =
        selectedFilter === 'all' || patient.status === selectedFilter;

      const matchesSearch =
        normalizedSearch.length === 0 ||
        patient.name.toLowerCase().includes(normalizedSearch) ||
        patient.phone.toLowerCase().includes(normalizedSearch) ||
        patient.email.toLowerCase().includes(normalizedSearch) ||
        patient.activePlan.toLowerCase().includes(normalizedSearch) ||
        patient.branch.toLowerCase().includes(normalizedSearch);

      return matchesFilter && matchesSearch;
    });
  }, [search, selectedFilter]);

  const activeCount = patients.filter((patient) => patient.status === 'active').length;
  const newCount = patients.filter((patient) => patient.status === 'new').length;

  return (
    <Screen
      title="Patients"
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
                name="UsersRound"
                size={34}
                color={theme.colors.primaryDark}
              />
            </View>

            <View style={styles.cardText}>
              <AppText variant="h2">Patient Management</AppText>

              <AppText color={theme.colors.textMuted}>
                Manage patient profiles, treatment plans, appointment history,
                and account status.
              </AppText>
            </View>
          </View>

          <View style={styles.statsRow}>
            <StatItem label="Total" value={`${patients.length}`} />
            <View style={styles.statDivider} />
            <StatItem label="Active" value={`${activeCount}`} />
            <View style={styles.statDivider} />
            <StatItem label="New" value={`${newCount}`} />
          </View>

          <AppButton title="Add Patient" />
        </View>

        <AppInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search patient, phone, email, plan..."
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
            <AppText variant="h3">Patient List</AppText>

            <AppText variant="caption" color={theme.colors.textMuted}>
              {filteredPatients.length} patients found
            </AppText>
          </View>

          <View style={styles.list}>
            {filteredPatients.map((patient) => (
              <PatientCard key={patient.id} patient={patient} />
            ))}
          </View>
        </View>

        {filteredPatients.length === 0 ? (
          <View style={styles.emptyCard}>
            <View style={styles.emptyIcon}>
              <AppIcon
                name="SearchX"
                size={30}
                color={theme.colors.primaryDark}
              />
            </View>

            <AppText variant="bodyMedium" align="center">
              No patients found
            </AppText>

            <AppText
              variant="caption"
              color={theme.colors.textMuted}
              align="center"
            >
              Try another keyword or change the patient status filter.
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

function PatientCard({ patient }: { patient: AdminPatient }) {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const statusConfig = getStatusConfig(patient.status, theme);

  return (
    <Pressable
      style={({ pressed }) => [styles.patientCard, pressed && styles.pressed]}
    >
      <View style={styles.patientTop}>
        <View style={styles.patientAvatar}>
          <AppIcon
            name={patient.icon}
            size={25}
            color={theme.colors.primaryDark}
          />
        </View>

        <View style={styles.cardText}>
          <View style={styles.titleRow}>
            <AppText variant="bodyMedium" style={styles.title}>
              {patient.name}
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
            {patient.phone}
          </AppText>

          <AppText variant="caption" color={theme.colors.textMuted}>
            {patient.email}
          </AppText>
        </View>
      </View>

      <View style={styles.planCard}>
        <View style={styles.planIcon}>
          <AppIcon
            name="ClipboardList"
            size={20}
            color={theme.colors.primaryDark}
          />
        </View>

        <View style={styles.cardText}>
          <AppText variant="caption" color={theme.colors.textMuted}>
            Active Plan
          </AppText>

          <AppText variant="bodyMedium">{patient.activePlan}</AppText>
        </View>
      </View>

      <View style={styles.detailsBox}>
        <DetailItem icon="MapPin" label="Branch" value={patient.branch} />
        <DetailItem icon="CalendarCheck" label="Last Visit" value={patient.lastVisit} />
        <DetailItem icon="Clock" label="Next Visit" value={patient.nextVisit} />
        <DetailItem
          icon="CalendarDays"
          label="Appointments"
          value={`${patient.appointments}`}
        />
      </View>

      <View style={styles.actionRow}>
        <AppButton
          title="View Profile"
          fullWidth={false}
          style={styles.actionButton}
        />

        <AppButton
          title="Manage"
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
  status: PatientStatus,
  theme: ReturnType<typeof useAppTheme>,
) {
  const config = {
    active: {
      label: 'Active',
      backgroundColor: theme.colors.success,
      textColor: theme.colors.successText,
    },
    new: {
      label: 'New',
      backgroundColor: theme.colors.info,
      textColor: theme.colors.infoText,
    },
    inactive: {
      label: 'Inactive',
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

    patientCard: {
      borderRadius: theme.radius.xl,
      backgroundColor: theme.colors.card,
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: theme.spacing.lg,
      gap: theme.spacing.md,
      ...(theme.shadows.card ?? {}),
    },

    patientTop: {
      flexDirection: 'row',
      gap: theme.spacing.md,
      alignItems: 'center',
    },

    patientAvatar: {
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

    planCard: {
      borderRadius: theme.radius.lg,
      backgroundColor: theme.colors.info,
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: theme.spacing.md,
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.md,
    },

    planIcon: {
      width: 42,
      height: 42,
      borderRadius: theme.radius.lg,
      backgroundColor: theme.colors.card,
      alignItems: 'center',
      justifyContent: 'center',
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