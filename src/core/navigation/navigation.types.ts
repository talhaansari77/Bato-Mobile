// src/core/navigation/navigation.types.ts

export type AuthStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  OtpVerification: {
    phone?: string;
    email?: string;
  } | undefined;
  ForgotPassword: undefined;
  RoleSelection: undefined;
};

export type PatientTabParamList = {
  PatientHome: undefined;
  PatientServices: undefined;
  PatientAppointments: undefined;
  PatientProgress: undefined;
  PatientProfile: undefined;
};

export type DoctorTabParamList = {
  DoctorDashboard: undefined;
  DoctorAppointments: undefined;
  DoctorPatients: undefined;
  DoctorMessages: undefined;
  DoctorProfile: undefined;
};

export type AdminTabParamList = {
  AdminDashboard: undefined;
  AdminAppointments: undefined;
  AdminPatients: undefined;
  AdminDoctors: undefined;
  AdminMore: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  PatientApp: undefined;
  DoctorApp: undefined;
  AdminApp: undefined;
};