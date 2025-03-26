import { create } from 'zustand';
import toast from 'react-hot-toast';

interface Schedule {
  id?: number;
  name: string;
  email: string;
  phone: string;
  time: string;
  programme: string;
  age: number;
  source: string;
  center: string;
  message: string;
}

interface ScheduleStore {
  schedules: Schedule[];
  fetchSchedules: () => Promise<void>;
  createSchedule: (schedule: Omit<Schedule, 'id'>) => Promise<boolean>;
}

export const useScheduleStore = create<ScheduleStore>((set) => ({
  schedules: [],

  fetchSchedules: async () => {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:1337'}/api/schedules`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        const errorMessage = `Failed to fetch schedules: ${response.status} - ${response.statusText}`;
        throw new Error(errorMessage);
      }

      const data = await response.json();
      set({ schedules: data.data });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch schedules';
      toast.error(errorMessage);
      console.error('Fetch schedules error:', error);
    }
  },

  createSchedule: async (schedule) => {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:1337'}/api/schedules`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: schedule,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.error?.message || 'Failed to create schedule';
        throw new Error(errorMessage);
      }

      const newSchedule = await response.json();
      set((state) => ({ schedules: [...state.schedules, newSchedule.data] }));
      toast.success('Schedule created successfully!');
      return true;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      toast.error(errorMessage);
      console.error('Create schedule error:', error);
      return false;
    }
  },
}));