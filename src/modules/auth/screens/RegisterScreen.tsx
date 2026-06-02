import React from 'react';
import { View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AuthStackParamList } from '../../../core/navigation/navigation.types';
import { Screen } from '../../../shared/ui/templates/Screen';
import { AppButton } from '../../../shared/ui/atoms/AppButton';
import { AppInput } from '../../../shared/ui/atoms/AppInput';
import { AuthCard } from '../../../shared/ui/molecules/AuthCard';
import { useAppTheme } from '../../../app/providers/ThemeProvider';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

export function RegisterScreen({ navigation }: Props) {
  const theme = useAppTheme();
  const [secure, setSecure] = React.useState(true);

  return (
    <Screen
      title="Create Account"
      subtitle="Join BATO Clinic"
      showBack
      onBackPress={() => navigation.goBack()}
      footer={
        <AppButton
          title="Create Account"
          onPress={() => navigation.navigate('OtpVerification')}
        />
      }
    >
      <AuthCard
        title="Start your care profile"
        subtitle="Create your BATO account to book treatments and track your wellness journey."
      >
        <View style={{ gap: theme.spacing.md }}>
          <AppInput
            label="Full Name"
            placeholder="Enter your full name"
            leftIcon="UserRound"
          />

          <AppInput
            label="Email"
            placeholder="Enter your email"
            autoCapitalize="none"
            keyboardType="email-address"
            leftIcon="Mail"
          />

          <AppInput
            label="Phone Number"
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            leftIcon="Phone"
          />

          <AppInput
            label="Password"
            placeholder="Create a password"
            secureTextEntry={secure}
            leftIcon="LockKeyhole"
            rightIcon={secure ? 'Eye' : 'EyeOff'}
            onRightIconPress={() => setSecure((value) => !value)}
          />
        </View>
      </AuthCard>
    </Screen>
  );
}