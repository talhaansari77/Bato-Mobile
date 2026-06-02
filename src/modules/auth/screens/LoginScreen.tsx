import React from 'react';
import { Pressable, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AuthStackParamList } from '../../../core/navigation/navigation.types';
import { Screen } from '../../../shared/ui/templates/Screen';
import { AppText } from '../../../shared/ui/atoms/AppText';
import { AppButton } from '../../../shared/ui/atoms/AppButton';
import { AppInput } from '../../../shared/ui/atoms/AppInput';
import { AuthCard } from '../../../shared/ui/molecules/AuthCard';
import { AuthDivider } from '../../../shared/ui/molecules/AuthDivider';
import { useAppTheme } from '../../../app/providers/ThemeProvider';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  const theme = useAppTheme();
  const [secure, setSecure] = React.useState(true);

  return (
    <Screen
      title="Login"
      subtitle="Access your BATO account"
      showBack
      onBackPress={() => navigation.goBack()}
      footer={
        <AppButton
          title="Login"
          onPress={() => navigation.navigate('RoleSelection')}
        />
      }
    >
      <AuthCard
        title="Welcome back"
        subtitle="Login with your email and password, or continue securely using phone OTP."
      >
        <View style={{ gap: theme.spacing.md }}>
          <AppInput
            label="Email"
            placeholder="Enter your email"
            autoCapitalize="none"
            keyboardType="email-address"
            leftIcon="Mail"
          />

          <AppInput
            label="Password"
            placeholder="Enter your password"
            secureTextEntry={secure}
            leftIcon="LockKeyhole"
            rightIcon={secure ? 'Eye' : 'EyeOff'}
            onRightIconPress={() => setSecure((value) => !value)}
          />
        </View>

        <Pressable
          onPress={() => navigation.navigate('ForgotPassword')}
          style={{ marginTop: theme.spacing.md }}
        >
          <AppText
            variant="bodyMedium"
            color={theme.colors.primaryDark}
            align="right"
          >
            Forgot password?
          </AppText>
        </Pressable>

        <AuthDivider />

        <AppButton
          title="Continue with Phone OTP"
          variant="outline"
          onPress={() => navigation.navigate('OtpVerification')}
        />
      </AuthCard>
    </Screen>
  );
}