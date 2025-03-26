import { create } from 'zustand';

interface CTAButton {
  id: number;
  href: string;
  text: string;
  external: boolean;
}

interface Video {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  formats: any | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface Hero {
  id: number;
  documentId: string;
  title: string;
  subtitle: string;
  description: string;
  welcome: string;
  about: string;
  Inspiring: string;
  Commitment: string;
  Vision: string;
  Mission: string;
  fasikadesc: string;
  practice: string;
  Programs: string;
  Nurturing: string;
  DaycareService: string;
  PreschoolEducation: string;
  NannyTraining: string;
  Offeringsafe: string;
  curriculum: string;
  TrainingDesc: string;
  Believe: string;
  powerplay: string;
  playdesc: string;
  FredRogers: string;
  Testimonials: string;
  TestimonialsDesc: string;
  Newsletter: string;
  LittleMinds: string;
  LittleMindsDesc: string;
  subscribe?: string | null;
  CompanyInfo: string;
  GetInTouch: string;
  Phone1: string;
  Phone2: string;
  address: string;
  fasikaemail: string;
  FASIKAInternational: string;
  Testimonialsvideo1?: Video[];
  Testimonialsvideo2?: Video[];
  Testimonialsvideo3?: Video[];
  Icon: CTAButton[];
  Icon2: CTAButton[];
  Icon3: CTAButton[];
  Icon4?: CTAButton[];
  Icon5?: CTAButton[];
  FredRogersImg?: {
    url: string;
    alternativeText?: string | null;
  };
  CTAButton1?: CTAButton;
  CTAButton2?: CTAButton[];
  CTAButton3?: CTAButton[];
  image?: {
    url: string;
    alternativeText?: string | null;
    formats?: {
      small?: { url: string };
      thumbnail?: { url: string };
    };
  };
  hero2image?: {
    url: string;
    alternativeText?: string | null;
  };
  MobileView?: {
    url: string;
    alternativeText?: string | null;
    formats?: {
      thumbnail?: {
        url: string;
        width: number;
        height: number;
        size: number;
        sizeInBytes: number;
      };
    };
  };
}

interface HeroStore {
  heroes: Hero[];
  loading: boolean;
  error: string | null;
  fetchHeroes: () => Promise<void>;
}

export const useHeroStore = create<HeroStore>((set) => ({
  heroes: [],
  loading: false,
  error: null,

  fetchHeroes: async () => {
    set({ loading: true, error: null });

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:1337'}/api/hero-sections?populate=*`;
      const res = await fetch(apiUrl);

      if (!res.ok) {
        throw new Error('Failed to fetch hero data');
      }

      const json = await res.json();
      const heroes = json.data?.map((item: any) => ({
        id: item.id,
        documentId: item.documentId,
        title: item.title,
        subtitle: item.subtitle,
        description: item.description,
        welcome: item.welcome,
        about: item.about,
        Inspiring: item.Inspiring,
        Commitment: item.Commitment,
        Vision: item.Vision,
        Mission: item.Mission,
        fasikadesc: item.fasikadesc,
        practice: item.practice,
        Programs: item.Programs,
        Nurturing: item.Nurturing,
        DaycareService: item.DaycareService,
        PreschoolEducation: item.PreschoolEducation,
        NannyTraining: item.NannyTraining,
        Offeringsafe: item.Offeringsafe,
        curriculum: item.curriculum,
        TrainingDesc: item.TrainingDesc,
        Believe: item.Believe,
        powerplay: item.powerplay,
        playdesc: item.playdesc,
        FredRogers: item.FredRogers,
        Testimonials: item.Testimonials,
        TestimonialsDesc: item.TestimonialsDesc,
        Newsletter: item.Newsletter,
        LittleMinds: item.LittleMinds,
        LittleMindsDesc: item.LittleMindsDesc,
        subscribe: item.subscribe,
        CompanyInfo: item.CompanyInfo,
        GetInTouch: item.GetInTouch,
        Phone1: item.Phone1,
        Phone2: item.Phone2,
        address: item.address,
        fasikaemail: item.fasikaemail,
        FASIKAInternational: item.FASIKAInternational,
        Testimonialsvideo1: item.Testimonialsvideo1?.map((video: any) => ({
          id: video.id,
          url: video.url,
        })),
        Testimonialsvideo2: item.Testimonialsvideo2?.map((video: any) => ({
          id: video.id,
          url: video.url,
        })),
        Testimonialsvideo3: item.Testimonialsvideo3?.map((video: any) => ({
          id: video.id,
          url: video.url,
        })),
        Icon: item.Icon || [],
        Icon2: item.Icon2 || [],
        Icon3: item.Icon3 || [],
        Icon4: item.Icon4 || [],
        Icon5: item.Icon5 || [],
        FredRogersImg: item.FredRogersImg ? {
          url: item.FredRogersImg.url,
          alternativeText: item.FredRogersImg.alternativeText,
        } : undefined,
        CTAButton1: item.CTAButton1,
        CTAButton2: item.CTAButton2,
        CTAButton3: item.CTAButton3,
        image: item.image ? {
          url: item.image.url,
          alternativeText: item.image.alternativeText,
          formats: item.image.formats,
        } : undefined,
        hero2image: item.hero2image ? {
          url: item.hero2image.url,
          alternativeText: item.hero2image.alternativeText,
        } : undefined,
        MobileView: item.MobileView ? {
          url: item.MobileView.url,
          alternativeText: item.MobileView.alternativeText,
          formats: item.MobileView.formats ? {
            thumbnail: item.MobileView.formats.thumbnail ? {
              url: item.MobileView.formats.thumbnail.url,
              width: item.MobileView.formats.thumbnail.width,
              height: item.MobileView.formats.thumbnail.height,
              size: item.MobileView.formats.thumbnail.size,
              sizeInBytes: item.MobileView.formats.thumbnail.sizeInBytes,
            } : undefined,
          } : undefined,
        } : undefined,
      })) || [];

      set({ heroes, loading: false, error: null });
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      });
    }
  },
}));