export interface Bookmark {
    id: string;
    title: string;
    link: string;
    description?: string | null;
}

export interface BookmarkCreateRequest {
  title: string;
  link: string;
  description?: string | null;
}