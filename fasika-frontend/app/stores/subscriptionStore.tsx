import { create } from 'zustand';

interface SubscriptionState {
  email: string;
  error: string;
  isLoading: boolean;
  isSubscribed: boolean;
  setEmail: (email: string) => void;
  validateEmail: () => boolean;
  subscribe: () => Promise<void>;
  reset: () => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set, get) => ({
  email: '',
  error: '',
  isLoading: false,
  isSubscribed: false,

  // Set the email
  setEmail: (email) => set({ email }),

  // Validate the email format
  validateEmail: () => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(get().email).toLowerCase());
  },

  // Subscribe function
  subscribe: async () => {
    set({ isLoading: true, error: '' });

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:1337'}/api/subscriptions`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: { email: get().email },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          error: { message: 'Subscription failed. Please try again.' },
        }));

        if (errorData.error?.message === 'This attribute must be unique') {
          throw new Error('This email is already subscribed.');
        } else {
          throw new Error(errorData.error?.message || 'Subscription failed. Please try again.');
        }
      }

      set({ isSubscribed: true, email: '' });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Subscription failed. Please try again.',
      });
    } finally {
      set({ isLoading: false });
    }
  },

  // Reset the subscription state
  reset: () => {
    set({ isSubscribed: false, error: '' });
  },
}));