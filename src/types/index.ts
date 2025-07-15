export interface VideoData {
  title: string;
  url: string;
  duration: string;
  img_url: string;
  rating?: number;
  views?: string;
}

export interface SearchParams {
  query?: string;
  category?: string;
  page?: number;
}

export interface ApiResponse {
  success: boolean;
  data?: VideoData[];
  error?: string;
  totalPages?: number;
  currentPage?: number;
}