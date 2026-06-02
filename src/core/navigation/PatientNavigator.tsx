// src/core/navigation/PatientNavigator.tsx

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PatientTabParamList } from './navigation.types';
import { useAppTheme } from '../../app/providers/ThemeProvider';
import { AppIcon, AppIconName } from '../../shared/ui/atoms/AppIcon';

import { PatientHomeScreen } from '../../modules/patient/screens/PatientHomeScreen';
import { PatientServicesScreen } from '../../modules/patient/screens/PatientServicesScreen';
import { PatientAppointmentsScreen } from '../../modules/patient/screens/PatientAppointmentsScreen';
import { PatientProgressScreen } from '../../modules/patient/screens/PatientProgressScreen';
import { PatientProfileScreen } from '../../modules/patient/screens/PatientProfileScreen';

const Tab = createBottomTabNavigator<PatientTabParamList>();

const icons: Record<keyof PatientTabParamList, AppIconName> = {
  PatientHome: 'House',
  PatientServices: 'Sparkles',
  PatientAppointments: 'CalendarDays',
  PatientProgress: 'ChartNoAxesColumnIncreasing',
  PatientProfile: 'UserRound',
};

export function PatientNavigator() {
  const theme = useAppTheme();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primaryDark,
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarStyle: {
          height: 64 + insets.bottom,
          paddingTop: 8,
          paddingBottom: insets.bottom + 8,
          backgroundColor: theme.colors.card,
          borderTopColor: theme.colors.border,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        tabBarIcon: ({ color, size }) => (
          <AppIcon name={icons[route.name]} color={color} size={size} />
        ),
      })}
    >
      <Tab.Screen
        name="PatientHome"
        component={PatientHomeScreen}
        options={{ title: 'Home' }}
      />
      <Tab.Screen
        name="PatientServices"
        component={PatientServicesScreen}
        options={{ title: 'Services' }}
      />
      <Tab.Screen
        name="PatientAppointments"
        component={PatientAppointmentsScreen}
        options={{ title: 'Appointments' }}
      />
      <Tab.Screen
        name="PatientProgress"
        component={PatientProgressScreen}
        options={{ title: 'Progress' }}
      />
      <Tab.Screen
        name="PatientProfile"
        component={PatientProfileScreen}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
}