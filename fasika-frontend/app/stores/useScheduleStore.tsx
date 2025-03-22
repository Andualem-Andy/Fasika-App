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

  // Fetch schedules from the backend
  fetchSchedules: async () => {
    try {
      const response = await fetch('http://localhost:1337/api/schedules');
      const data = await response.json();
      set({ schedules: data.data });
    } catch (error) {
      console.error('Error fetching schedules:', error);
      toast.error('Failed to fetch schedules. Please try again.');
    }
  },

  // Create a new schedule and send it to the backend
  createSchedule: async (schedule) => {
    try {
      console.log('Payload:', JSON.stringify({ data: schedule })); // Log the payload
      const response = await fetch('http://localhost:1337/api/schedules', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: schedule,
        }),
      });

      if (response.ok) {
        const newSchedule = await response.json();
        set((state) => ({ schedules: [...state.schedules, newSchedule.data] }));
        toast.success('Schedule created successfully!');
        return true; // Indicate success
      } else {
        const errorData = await response.json();
        console.error('Error creating schedule:', errorData);
        toast.error('Failed to create schedule. Please check the console for details.');
        return false; // Indicate failure
      }
    } catch (error) {
      console.error('Error creating schedule:', error);
      toast.error('An error occurred while creating the schedule.');
      return false; // Indicate failure
    }
  },
}));