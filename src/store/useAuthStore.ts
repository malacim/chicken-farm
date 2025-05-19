import { create } from 'zustand';
import { setCookie, getCookie, removeCookie } from '@/utils/cookies';

const isBrowser = typeof window !== 'undefined';

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
  token: string | null;
  isAuthenticated: boolean;
  initialized: boolean;
  initialize: () => void;
  setAuth: (user: User, token: string) => void;
  logout: (callback?: () => void) => void;
}

const defaultState = {
  user: null,
  token: null,
  isAuthenticated: false,
  initialized: false
};

const useAuthStore = create<AuthState>()((set, get) => ({
  ...defaultState,

  initialize: () => {
    if (!isBrowser || get().initialized) return;

    try {
      const userCookie = JSON.parse(getCookie('user') || '{}');
      const tokenCookie = JSON.parse(getCookie('auth-token') || '{}');

      if (userCookie && tokenCookie && userCookie._id && userCookie.role) {
        set({
          user: userCookie,
          token: tokenCookie.token,
          isAuthenticated: true,
          initialized: true
        });
      } else {
        set({ initialized: true });
      }
    } catch (e) {
      console.error('Error initializing auth state from cookies:', e);
      set({ initialized: true });
    }
  },

  setAuth: (user, token) => {
    setCookie('user', JSON.stringify(user));
    setCookie('auth-token', JSON.stringify({ token }));

    set({ user, token, isAuthenticated: true, initialized: true });
  },

  logout: async (callback) => {
    const currentToken = get().token;

    if (currentToken) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: currentToken }),
        });
      } catch (error) {
        console.error('Error logging out:', error);
      }
    }

    removeCookie('user');
    removeCookie('auth-token');

    set({ user: null, token: null, isAuthenticated: false, initialized: true });

    if (callback) callback();
  },
}));

export default useAuthStore;
