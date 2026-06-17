import { create } from 'zustand';

import {
  ClinicService,
  servicesApi,
} from '../services/servicesApi';

type ServicesState = {
  services: ClinicService[];
  isLoading: boolean;
  error: string | null;
  fetchServices: () => Promise<void>;
};

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Failed to load services';
}

export const useServicesStore = create<ServicesState>((set) => ({
  services: [],
  isLoading: false,
  error: null,

  fetchServices: async () => {
    try {
      set({ isLoading: true, error: null });

      const services = await servicesApi.getServices();

      set({
        services,
        isLoading: false,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: getErrorMessage(error),
      });
    }
  },
}));