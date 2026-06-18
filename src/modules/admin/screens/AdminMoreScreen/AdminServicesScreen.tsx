import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { useAppTheme } from '../../../../app/providers/ThemeProvider';
import { AppButton } from '../../../../shared/ui/atoms/AppButton';
import { AppIcon, AppIconName } from '../../../../shared/ui/atoms/AppIcon';
import { AppInput } from '../../../../shared/ui/atoms/AppInput';
import { AppText } from '../../../../shared/ui/atoms/AppText';
import { Screen } from '../../../../shared/ui/templates/Screen';

type ServiceCategory = 'hair' | 'skin' | 'face';
type FilterType = 'all' | ServiceCategory;

type AdminService = {
  id: string;
  name: string;
  category: ServiceCategory;
  duration: string;
  price: string;
  doctors: number;
  status: 'active' | 'inactive';
  icon: AppIconName;
};

const filters: Array<{ label: string; value: FilterType }> = [
  { label: 'All', value: 'all' },
  { label: 'Hair', value: 'hair' },
  { label: 'Skin', value: 'skin' },
  { label: 'Face', value: 'face' },
];

const services: AdminService[] = [
  {
    id: '1',
    name: 'Hair Growth Treatment',
    category: 'hair',
    duration: '45 min',
    price: '25 KWD',
    doctors: 3,
    status: 'active',
    icon: 'Sparkles',
  },
  {
    id: '2',
    name: 'Acne Treatment',
    category: 'skin',
    duration: '45 min',
    price: '22 KWD',
    doctors: 4,
    status: 'active',
    icon: 'ScanFace',
  },
  {
    id: '3',
    name: 'Hydration Facial Therapy',
    category: 'skin',
    duration: '60 min',
    price: '30 KWD',
    doctors: 2,
    status: 'active',
    icon: 'Droplets',
  },
  {
    id: '4',
    name: 'Fillers Consultation',
    category: 'face',
    duration: '35 min',
    price: '35 KWD',
    doctors: 2,
    status: 'inactive',
    icon: 'Syringe',
  },
];

export function AdminServicesScreen() {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const [search, setSearch] = useState('');

  const filteredServices = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return services.filter((service) => {
      const matchesFilter =
        selectedFilter === 'all' || service.category === selectedFilter;

      const matchesSearch =
        normalizedSearch.length === 0 ||
        service.name.toLowerCase().includes(normalizedSearch) ||
        service.category.toLowerCase().includes(normalizedSearch);

      return matchesFilter && matchesSearch;
    });
  }, [search, selectedFilter]);

  return (
    <Screen
      title="Services"
      subtitle="Treatment management"
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
                name="Sparkles"
                size={34}
                color={theme.colors.primaryDark}
              />
            </View>

            <View style={styles.cardText}>
              <AppText variant="h2">Clinic Services</AppText>

              <AppText color={theme.colors.textMuted}>
                Manage treatment names, categories, pricing, duration, assigned
                doctors, and service status.
              </AppText>
            </View>
          </View>

          <View style={styles.statsRow}>
            <StatItem label="Total" value={`${services.length}`} />
            <View style={styles.statDivider} />
            <StatItem label="Active" value="3" />
            <View style={styles.statDivider} />
            <StatItem label="Inactive" value="1" />
          </View>

          <AppButton title="Add Service" />
        </View>

        <AppInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search services..."
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
            <AppText variant="h3">Service List</AppText>

            <AppText variant="caption" color={theme.colors.textMuted}>
              {filteredServices.length} services found
            </AppText>
          </View>

          <View style={styles.list}>
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
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

function ServiceCard({ service }: { service: AdminService }) {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const isActive = service.status === 'active';

  return (
    <Pressable
      style={({ pressed }) => [styles.serviceCard, pressed && styles.pressed]}
    >
      <View style={styles.serviceTop}>
        <View style={styles.serviceIcon}>
          <AppIcon
            name={service.icon}
            size={24}
            color={theme.colors.primaryDark}
          />
        </View>

        <View style={styles.cardText}>
          <View style={styles.titleRow}>
            <AppText variant="bodyMedium" style={styles.title}>
              {service.name}
            </AppText>

            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor: isActive
                    ? theme.colors.success
                    : theme.colors.error,
                },
              ]}
            >
              <AppText
                variant="small"
                color={isActive ? theme.colors.successText : theme.colors.errorText}
              >
                {isActive ? 'Active' : 'Inactive'}
              </AppText>
            </View>
          </View>

          <AppText variant="caption" color={theme.colors.textMuted}>
            {service.category.toUpperCase()}
          </AppText>
        </View>
      </View>

      <View style={styles.detailsBox}>
        <DetailItem icon="Clock" label="Duration" value={service.duration} />
        <DetailItem icon="CreditCard" label="Price" value={service.price} />
        <DetailItem
          icon="Stethoscope"
          label="Doctors"
          value={`${service.doctors} assigned`}
        />
      </View>

      <View style={styles.actionRow}>
        <AppButton
          title="Edit"
          fullWidth={false}
          style={styles.actionButton}
        />

        <AppButton
          title={isActive ? 'Disable' : 'Enable'}
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

    serviceCard: {
      borderRadius: theme.radius.xl,
      backgroundColor: theme.colors.card,
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: theme.spacing.lg,
      gap: theme.spacing.md,
      ...(theme.shadows.card ?? {}),
    },

    serviceTop: {
      flexDirection: 'row',
      gap: theme.spacing.md,
      alignItems: 'center',
    },

    serviceIcon: {
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