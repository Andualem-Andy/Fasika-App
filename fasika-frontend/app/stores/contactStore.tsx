import { create } from 'zustand';

interface ImageFormat {
  url: string;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  name: string;
}

interface ImageData {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail: ImageFormat;
    small: ImageFormat;
    medium: ImageFormat;
    large: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface ContactData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  TrainingCenter: string;
  PreschoolOpen: string;
  whereFind: string;
  Location1: string;
  Location1Phone: string;
  Location2: string;
  Location2Phone: string;
  Location3: string;
  Location3Phone: string;
  DaycareOpen: string;
  TrainingCenterHour: string;
  PreschoolOpenHour: string;
  DaycareOpenHour: string;
  contactbg: ImageData;
}

interface ContactStore {
  data: ContactData | null;
  loading: boolean;
  error: string | null;
  fetchContactData: () => Promise<void>;
}

export const useContactStore = create<ContactStore>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchContactData: async () => {
    set({ loading: true, error: null });

    try {
      const response = await fetch('http://localhost:1337/api/contact-uses?populate=*');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.statusText}`);
      }

      const result = await response.json();

      if (Array.isArray(result.data) && result.data.length > 0) {
        set({ data: result.data[0], loading: false });
      } else {
        throw new Error('No contact data found');
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An unknown error occurred',
        loading: false,
      });
    }
  },
}));