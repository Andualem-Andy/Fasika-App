import { create } from 'zustand';

interface DownloadsPdfItem {
  id: number;
  documentId: string;
  name: string;
  alternativeText?: string | null;
  caption?: string | null;
  width: number;
  height: number;
  formats?: null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string | null;
  provider: string;
  provider_metadata?: null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path?: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

interface ImageData {
  id: number;
  documentId: string;
  name: string;
  alternativeText?: string | null;
  caption?: string | null;
  width: number;
  height: number;
  formats?: {
    thumbnail?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    large?: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string | null;
  provider: string;
  provider_metadata?: null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface AdmissionData {
  Enroll: string;
  simpleProcess: string;
  Registration: string;
  ItemRequired: string;
  RequiredDesc: string;
  BirthCert: string;
  ImmunizationCard: string;
  PassportPhoto4: string;
  Passportsize1: string;
  FAQS: string;
  FAQsParagraph: string;
  Q1: string;
  Q1answer: string;
  Q2: string;
  Q2answer?: string | null;
  Q3: string;
  Q3answer?: string | null;
  Q4: string;
  Q4answer?: string | null;
  Q5?: string | null;
  Q5answer?: string | null;
  Q6?: string | null;
  Q6answer?: string | null;
  Q7?: string | null;
  Q7answer?: string | null;
  Q8?: string | null;
  Q8answer?: string | null;
  Q9?: string | null;
  Q9answer?: string | null;
  Q10?: string | null;
  Q10answer?: string | null;
  Q11?: string | null;
  Q11answer?: string | null;
  Q12?: string | null;
  Q12answer?: string | null;
  downloadTitle: string;
  admissionbg: ImageData;
  DownloadsPdf: DownloadsPdfItem[];
  enrollimg: ImageData;
}

interface AdmissionStore {
  data: AdmissionData | null;
  loading: boolean;
  error: string | null;
  fetchServiceData: () => Promise<void>;
}

export const useAdmissionStore = create<AdmissionStore>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchServiceData: async () => {
    set({ loading: true, error: null });

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:1337'}/api/admission-pages?populate=*`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
      }

      const result = await response.json();

      if (result?.data?.length > 0) {
        set({ data: result.data[0] as AdmissionData, loading: false });
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