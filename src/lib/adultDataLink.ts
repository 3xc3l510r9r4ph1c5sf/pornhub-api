import axios, { AxiosResponse } from 'axios';

export interface VideoMetadata {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  link: string;
  category?: string;
  views?: string;
  rating?: number;
}

export interface SearchResponse {
  success: boolean;
  data: VideoMetadata[];
  totalPages?: number;
  currentPage?: number;
  error?: string;
}

class AdultDataLinkAPI {
  private apiKey: string;
  private baseURL: string = 'https://api.adultdatalink.com';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async makeRequest(endpoint: string, params: Record<string, any> = {}): Promise<AxiosResponse> {
    try {
      const response = await axios.get(`${this.baseURL}${endpoint}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'User-Agent': 'VideoHub-App/1.0'
        },
        params,
        timeout: 10000,
        // Optional proxy configuration
        ...(process.env.HTTP_PROXY && {
          proxy: {
            host: process.env.HTTP_PROXY.split('://')[1].split(':')[0],
            port: parseInt(process.env.HTTP_PROXY.split(':')[2] || '8080'),
            protocol: process.env.HTTP_PROXY.split('://')[0]
          }
        })
      });
      return response;
    } catch (error) {
      console.error('AdultDataLink API Error:', error);
      throw error;
    }
  }

  async search(query: string = '', category: string = 'all', page: number = 1): Promise<SearchResponse> {
    try {
      const params: Record<string, any> = {
        page,
        limit: 20
      };

      if (query.trim()) {
        params.query = query.trim();
      }

      if (category && category !== 'all') {
        params.category = category;
      }

      const response = await this.makeRequest('/search', params);
      
      // Transform API response to our format
      const videos: VideoMetadata[] = (response.data.results || []).map((item: any) => ({
        id: item.id || Math.random().toString(36),
        title: item.title || 'Untitled',
        thumbnail: item.thumbnail || item.thumb || '/placeholder-video.jpg',
        duration: item.duration || '00:00',
        link: item.link || item.url || '#',
        category: item.category,
        views: item.views,
        rating: item.rating
      }));

      return {
        success: true,
        data: videos,
        currentPage: page,
        totalPages: Math.ceil((response.data.total || 20) / 20)
      };

    } catch (error: any) {
      console.error('Search error:', error);
      
      // Return mock data for demonstration if API fails
      return this.getMockData(query, category, page);
    }
  }

  async getByCategory(category: string, page: number = 1): Promise<SearchResponse> {
    return this.search('', category, page);
  }

  // Mock data for demonstration purposes
  private getMockData(query: string, category: string, page: number): SearchResponse {
    const mockVideos: VideoMetadata[] = Array.from({ length: 12 }, (_, i) => ({
      id: `mock-${page}-${i}`,
      title: `${category !== 'all' ? category.charAt(0).toUpperCase() + category.slice(1) : 'Sample'} Video ${(page - 1) * 12 + i + 1}${query ? ` - ${query}` : ''}`,
      thumbnail: `https://picsum.photos/400/225?random=${page * 12 + i}`,
      duration: `${Math.floor(Math.random() * 30 + 5)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
      link: `https://example.com/video/${page}-${i}`,
      category: category !== 'all' ? category : 'general',
      views: `${Math.floor(Math.random() * 1000000).toLocaleString()} views`,
      rating: Math.floor(Math.random() * 40 + 60)
    }));

    return {
      success: true,
      data: mockVideos,
      currentPage: page,
      totalPages: 10,
      error: 'Using mock data - Configure ADULTDATALINK_API_KEY for real data'
    };
  }
}

export default AdultDataLinkAPI;