import { create } from 'zustand';
import api from '@/lib/apiService';

interface User {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  phoneNumber?: string;
  country?: string;
  isActive?: boolean;
  communicationPreferences?: {
    whatsapp: boolean;
    email: boolean;
    phone: boolean;
  };
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  initialized: boolean;
  initialize: () => Promise<void>;
  setAuth: (user: User, token?: string) => void;
  logout: (callback?: () => void) => Promise<void>;
}

const defaultState = {
  user: null,
  isAuthenticated: false,
  initialized: false
};

const useAuthStore = create<AuthState>()((set, get) => ({
  ...defaultState,

  initialize: async () => {
    if (get().initialized) return;

    try {
      const response = await api.get('/auth/me');

      if (response.data.message === "not logged in") {
        set({
          user: null,
          isAuthenticated: false,
          initialized: true
        });
      } else {
        set({
          user: response.data,
          isAuthenticated: true,
          initialized: true
        });
      }
    } catch (error) {
      set({ initialized: true });
    }
  },

  setAuth: (user, token) => {
    set({
      user,
      isAuthenticated: true,
      initialized: true
    });
  },

  logout: async (callback) => {
    try {
      await api.post('/auth/logout');
    } catch {
      console.error('Error logging out');
    }

    set({
      user: null,
      isAuthenticated: false,
      initialized: true
    });

    if (callback) callback();
  },
}));

export default useAuthStore;
