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

export interface ImageData {
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

// interface BlogDescItem {
//   type: string;
//   children: { type: string; text: string }[];
// }

export interface BlogData {
  gallery: any;
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  News: string;
  NewsDesc: string;
  BlogDate: string;
  BlogTitle: string;
  BlogDesc: BlogDescItem[];
  ReadTime: string;
  TimeDuration: string;
  slug: string;
  blogbg: ImageData;
  coverBlog: ImageData[];
  galleryImages: ImageData[]; // image gallary store update
}

interface BlogStore {
  data: BlogData[] | null;
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
  fetchBlogData: (page: number, pageSize: number) => Promise<void>;
  setPage: (page: number) => void;
  addNewBlog: (newBlog: BlogData) => void;
}

// slung 

export interface BlogDescChild {
  bold: any;
  italic: any;
  type: string;
  text: string;
}

export interface BlogDescHeading {
  type: "heading";
  level: number;
  children: BlogDescChild[];
}

export interface BlogDescParagraph {
  type: "paragraph";
  children: BlogDescChild[];
}

export type BlogDescItem = BlogDescHeading | BlogDescParagraph;


export const useBlogStore = create<BlogStore>((set) => ({
  data: null,
  loading: false,
  error: null,
  totalPages: 1, // Default to 1 page
  currentPage: 1, // Default to first page

  fetchBlogData: async (page: number, pageSize: number) => {
    set({ loading: true, error: null });

    try {
      const response = await fetch(
        `http://localhost:1337/api/blogs?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Fetched data:', result.data);

      if (Array.isArray(result.data)) {
        set({
          data: result.data,
          loading: false,
          totalPages: result.meta.pagination.pageCount, // Set total pages from the response metadata
          currentPage: result.meta.pagination.page, // Set current page from the response metadata
        });
      } else {
        throw new Error('No blog data found');
      }
    } catch (error) {
      console.error('Error fetching blog data:', error);
      set({
        error: error instanceof Error ? error.message : 'An unknown error occurred',
        loading: false,
      });
    }
  },

  setPage: (page: number) => {
    set({ currentPage: page });
  },

  addNewBlog: (newBlog: BlogData) => {
    set((state) => ({
      data: state.data ? [...state.data, newBlog] : [newBlog],
    }));
  },
}));
