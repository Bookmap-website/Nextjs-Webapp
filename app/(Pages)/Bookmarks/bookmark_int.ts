export interface Bookmark {
    id: number;
    title: string;
    link: string;
    description?: string | null;
}

export interface BookmarkCreateRequest {
  title: string;
  link: string;
  description?: string | null;
}