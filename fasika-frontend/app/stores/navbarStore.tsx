import { create } from 'zustand';

interface NavLink {
  id: number;
  href: string;
  text: string;
  external: boolean;
}

interface NavbarData {
  logoLink: {
    text: string;
    href: string;
    image?: {
      url: string;
      alternativeText?: string | null;
    };
  };
  link: NavLink[];
  cta?: {
    href: string;
    text: string;
    external: boolean;
  };
}

interface NavbarStore {
  data: NavbarData | null;
  loading: boolean;
  error: string | null;
  fetchNavbar: () => Promise<void>;
}

export const useNavbarStore = create<NavbarStore>((set) => ({
  data: null,
  loading: true,
  error: null,

  fetchNavbar: async () => {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/global?populate[topnav][populate][logoLink][populate][image]=true&populate[topnav][populate][link]=true&populate[topnav][populate][cta]=true`;
      const res = await fetch(apiUrl);

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status} - ${res.statusText}`);
      }

      const json = await res.json();

      if (json.data?.topnav) {
        set({ data: json.data.topnav, loading: false, error: null });
      } else {
        throw new Error('Navbar data not found in response');
      }
    } catch (error) {
      console.error('Failed to fetch navbar:', error);
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch navbar data' 
      });
    }
  },
}));