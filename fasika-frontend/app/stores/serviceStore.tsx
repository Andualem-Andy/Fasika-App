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
  fetchServiceData: (options?: { signal?: AbortSignal }) => Promise<void>;
}

export const useServiceStore = create<ServiceStore>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchServiceData: async (options) => {
    set({ loading: true, error: null });

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:1337'}/api/service-pages?populate=*`;
      const response = await fetch(apiUrl, {
        signal: options?.signal,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      if (!result.data || !Array.isArray(result.data) || result.data.length === 0) {
        throw new Error('No service data found');
      }

      set({ data: result.data[0], loading: false });
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        console.log('Fetch aborted');
        return;
      }
      
      set({
        error: error instanceof Error ? error.message : 'An unknown error occurred',
        loading: false,
      });
    }
  },
}));