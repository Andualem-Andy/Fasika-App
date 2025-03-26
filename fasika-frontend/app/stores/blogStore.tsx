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

export interface ImageFormats {
  thumbnail?: ImageFormat;
  small?: ImageFormat;
  medium?: ImageFormat;
  large?: ImageFormat;
  [key: string]: ImageFormat | undefined;
}

export interface ImageData {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: ImageFormats;
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

export interface BlogDescChild {
  bold?: boolean;
  italic?: boolean;
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

export interface BlogData {
  Authorbio: string | undefined;
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
  galleryImages: ImageData[] | null;
  authorName: string;
  AuthorBio: string;
  Authorimg: ImageData;
}

interface ApiResponse {
  data: BlogData[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
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

export const useBlogStore = create<BlogStore>((set) => ({
  data: null,
  loading: false,
  error: null,
  totalPages: 1,
  currentPage: 1,

  fetchBlogData: async (page: number, pageSize: number) => {
    set({ loading: true, error: null });

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.statusText}`);
      }

      const result: ApiResponse = await response.json();

      if (Array.isArray(result.data)) {
        set({
          data: result.data,
          loading: false,
          totalPages: result.meta.pagination.pageCount,
          currentPage: result.meta.pagination.page,
        });
      } else {
        throw new Error('No blog data found');
      }
    } catch (error: unknown) {
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