// src/core/navigation/RootNavigator.tsx

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AdminNavigator } from "./AdminNavigator";
import { AuthNavigator } from "./AuthNavigator";
import { DoctorNavigator } from "./DoctorNavigator";
import { PatientNavigator } from "./PatientNavigator";
import { RootStackParamList } from "./navigation.types";
import { useAuthStore } from "../../store/auth.store";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const status = useAuthStore((state) => state.status);
  const user = useAuthStore((state) => state.user);

  if (status === "checking") {
    return null; // later we can show splash/loading screen
  }

  return (
    <Stack.Navigator initialRouteName="PatientApp" screenOptions={{ headerShown: false }}>
      {/* {status === "authenticated" && user?.role === "Patient" ? (
      ) : status === "authenticated" && user?.role === "Doctor" ? (
      ) : status === "authenticated" && user?.role === "Admin" ? (
      ) : ( */}
        <Stack.Screen name="PatientApp" component={PatientNavigator} />
        <Stack.Screen name="DoctorApp" component={DoctorNavigator} />
        <Stack.Screen name="AdminApp" component={AdminNavigator} />
        <Stack.Screen name="Auth" component={AuthNavigator} />
      {/* )} */}
    </Stack.Navigator>
  );
}
