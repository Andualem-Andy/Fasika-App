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

interface ServiceData {
  SafeandEngaging: string;
  NurturingDaycare: string;
  DaycareService: string;
  DaycareServiceSubtitle: string;
  DaycareServicelistdown: string;
  titlemotto1: string;
  foundation: string;
  PreschoolCurriculum: string;
  PreschoolCurriculumSubtitle: string;
  PreschoolCurriculumlist: string;
  SpecialNeedsServices: string;
  SpecialNeedsSubtitle: string;
  SpecialNeedslistdown: string;
  NannyTrainingCenter: string;
  NannyTrainingSubtitle: string;
  NannyTraininglistdown: string;
  EarlyIntervention: string;
  EarlyInterventionSubtitle: string;
  EarlyInterventionlistdown: string;
  servicebgimg: ImageData;
  daycareimg: ImageData;
  preschoolimg: ImageData;
  specialimg: ImageData;
  nannyimg: ImageData;
  earlyimg: ImageData;
}

interface ServiceStore {
  data: ServiceData | null;
  loading: boolean;
  error: string | null;
  fetchServiceData: () => Promise<void>;
}

export const useServiceStore = create<ServiceStore>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchServiceData: async () => {
    set({ loading: true, error: null });

    try {
      const response = await fetch('http://localhost:1337/api/service-pages?populate=*'); // Replace with your API endpoint

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.statusText}`);
      }

      const result = await response.json();

      // Check if result.data is an array and contains at least one item
      if (Array.isArray(result.data) && result.data.length > 0) {
        set({ data: result.data[0], loading: false });
      } else {
        throw new Error('No service data found');
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An unknown error occurred',
        loading: false,
      });
    }
  },
}));