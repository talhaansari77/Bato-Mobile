import React from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { useAppTheme } from "../../../app/providers/ThemeProvider";
import { AppText } from "../../../shared/ui/atoms/AppText";
import { LanguageSelector } from "../../../shared/ui/molecules/LanguageSelector";
import { ThemeModeSelector } from "../../../shared/ui/molecules/ThemeModeSelector";
import { Screen } from "../../../shared/ui/templates/Screen";
import { useAuthStore } from "../../../store/auth.store";
import { AppButton } from "../../../shared/ui/atoms/AppButton";

export function PatientProfileScreen() {
  const theme = useAppTheme();
  const { t } = useTranslation();

  const logout = useAuthStore((state) => state.logout);
  const isLoading = useAuthStore((state) => state.isLoading);

  return (
    <Screen
      title={t("common.profile")}
      subtitle={t("profile.account")}
      actions={[
        {
          icon: "Bell",
          onPress: () => {},
        },
      ]}
    >
      <View
        style={{
          backgroundColor: theme.colors.card,
          borderRadius: theme.radius["2xl"],
          padding: theme.spacing["2xl"],
          borderWidth: 1,
          borderColor: theme.colors.border,
        }}
      >
        <AppText variant="h2">Muhammad Talha</AppText>

        <AppText
          color={theme.colors.textMuted}
          style={{ marginTop: theme.spacing.sm }}
        >
          {t("profile.profileDescription")}
        </AppText>
      </View>

      <View style={{ marginTop: theme.spacing["2xl"] }}>
        <AppText variant="h3">{t("common.appearance")}</AppText>

        <AppText
          color={theme.colors.textMuted}
          style={{
            marginTop: theme.spacing.xs,
            marginBottom: theme.spacing.md,
          }}
        >
          {t("profile.appearanceDescription")}
        </AppText>

        <ThemeModeSelector />
      </View>

      <View style={{ marginTop: theme.spacing["2xl"] }}>
        <AppText variant="h3">{t("common.language")}</AppText>

        <AppText
          color={theme.colors.textMuted}
          style={{
            marginTop: theme.spacing.xs,
            marginBottom: theme.spacing.md,
          }}
        >
          {t("profile.languageDescription")}
        </AppText>

        <LanguageSelector />
      </View>
      <AppButton
        title={isLoading ? "Logging out..." : "Logout"}
        onPress={logout}
        disabled={isLoading}
        
      />
    </Screen>
  );
}
