import { create } from 'zustand';
type Paragraph = {
  type: string;
  children: Array<{
    type: string;
    text: string;
  }>;
};
interface AboutData {
  aboutmotto: string;
  Genesis: string;
  Genesisdesc: string;
  Missionvision: string;
  Missiondesc: string;
  Visiondesc: string;
  Valuesdesc: string;
  Commitment: string;
  HolisticGrowth: string;
  SpecialNeeds: string;
  Learningevt: string;
  HolisticGrowthdesc: Paragraph[];
  HolisticGrowthAdditional?: string;
  SpecialNeedsdesc: Paragraph[];
  SpecialNeedsAdditional?: string; 
  Learningevtdesc: Paragraph[];
  LearningevtAdditional?: string;
  Everychild: string;
  FosteringGrowth: string;
  aboutbg: {
    url: string;
    alternativeText?: string | null;
    formats?: {
      small?: { url: string };
      thumbnail?: { url: string };
    };
  };
  Genesisimg: {
    url: string;
    alternativeText?: string | null;
    formats?: {
      large?: { url: string };
      thumbnail?: { url: string };
    };
  };
}

interface AboutStore {
  data: AboutData | null;
  loading: boolean;
  error: string | null;
  fetchAboutData: () => Promise<void>;
}

export const useAboutStore = create<AboutStore>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchAboutData: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch('http://localhost:1337/api/about-pages?populate=*');
      if (!res.ok) throw new Error('Failed to fetch about data');

      const json = await res.json();

      // Access data directly (assuming json.data is an array, access the first element)
      const aboutData = json.data[0];

      if (!aboutData) throw new Error('No data found');

      // Store the full data and extract URLs for images
      const data: AboutData = {
        aboutmotto: aboutData.aboutmotto,
        Genesis: aboutData.Genesis,
        Genesisdesc: aboutData.Genesisdesc,
        Missionvision: aboutData.Missionvision,
        Missiondesc: aboutData.Missiondesc,
        Visiondesc: aboutData.Visiondesc,
        Valuesdesc: aboutData.Valuesdesc,
        Commitment: aboutData.Commitment,
        HolisticGrowth: aboutData.HolisticGrowth,
        SpecialNeeds: aboutData.SpecialNeeds,
        Learningevt: aboutData.Learningevt,
        HolisticGrowthdesc: aboutData.HolisticGrowthdesc,
        SpecialNeedsdesc: aboutData.SpecialNeedsdesc,
        Learningevtdesc: aboutData.Learningevtdesc,
        Everychild: aboutData.Everychild,
        FosteringGrowth: aboutData.FosteringGrowth,

        // Extract the aboutbg image
        aboutbg: {
          url: aboutData.aboutbg?.url || '',
          alternativeText: aboutData.aboutbg?.alternativeText || null,
          formats: aboutData.aboutbg?.formats || {},
        },

        // Extract the Genesisimg image
        Genesisimg: {
          url: aboutData.Genesisimg?.url || '',
          alternativeText: aboutData.Genesisimg?.alternativeText || null,
          formats: aboutData.Genesisimg?.formats || {},
        },
      };

      set({ data, loading: false, error: null });
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      });
    }
  },
}));
