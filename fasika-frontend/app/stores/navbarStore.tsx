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
  fetchNavbar: () => Promise<void>;
}

export const useNavbarStore = create<NavbarStore>((set) => ({
  data: null,
  loading: true,
  fetchNavbar: async () => {
    try {
      const res = await fetch(
        'http://localhost:1337/api/global?populate[topnav][populate][logoLink][populate][image]=true&populate[topnav][populate][link]=true&populate[topnav][populate][cta]=true'
      );
      const json = await res.json();
      if (json.data?.topnav) {
        set({ data: json.data.topnav, loading: false });
      } else {
        console.error('Error: topnav is missing in API response', json);
        set({ loading: false });
      }
    } catch (error) {
      console.error('Error fetching Navbar:', error);
      set({ loading: false });
    }
  },
}));