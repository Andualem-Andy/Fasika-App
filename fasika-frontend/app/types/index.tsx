
export interface StrapiImage {
    id: number;
    url: string;
    alternativeText: string;
    name: string;
  }
  
  export interface NavLink {
    href: string;
    id: number;
    url: string;
    text: string;
    external: boolean;
  }
  
  export interface CTA {
    id: number;
    href: string;
    text: string;
    external: boolean;
  }
  
  export interface Topnav {
    logoLink?: {
      image?: StrapiImage;
    };
    links?: NavLink[];
    cta?: CTA;
  }
  
  export interface GlobalData {
    topnav?: Topnav;
  }
  
  export interface StrapiResponse<T> {
    data: {
      id: number;
      attributes: T;
    };
    meta?: Record<string, unknown>;
  }
  
  export interface GlobalStoreState {
    data: GlobalData | null;
    loading: boolean;
    error: string | null;
    fetchGlobalData: () => Promise<void>;
  }