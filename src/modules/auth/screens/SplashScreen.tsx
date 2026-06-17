import React from 'react';
import { View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AuthStackParamList } from '../../../core/navigation/navigation.types';
import { Screen } from '../../../shared/ui/templates/Screen';
import { AppText } from '../../../shared/ui/atoms/AppText';
import { AppButton } from '../../../shared/ui/atoms/AppButton';
import { useAppTheme } from '../../../app/providers/ThemeProvider';

type Props = NativeStackScreenProps<AuthStackParamList, 'Splash'>;

export function SplashScreen({ navigation }: Props) {
  const theme = useAppTheme();

  return (
    <Screen
      scroll={false}
      contentStyle={{flex:1}}
      footer={
        <AppButton
          title="Continue"
          onPress={() => navigation.navigate('Welcome')}
        />
      }
    >
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: theme.spacing.xl,
        }}
      >
        <AppText
          variant="h1"
          color={theme.colors.primaryDark}
          align="center"
          style={{ letterSpacing: 4 }}
        >
          BATO
        </AppText>

        <AppText
          variant="body"
          color={theme.colors.textMuted}
          align="center"
          style={{ marginTop: theme.spacing.sm }}
        >
          Premium medical beauty & wellness clinic
        </AppText>
      </View>
    </Screen>
  );
}