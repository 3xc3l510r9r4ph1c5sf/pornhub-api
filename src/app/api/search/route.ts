import { NextRequest, NextResponse } from 'next/server';
import PornHub from '@justalk/pornhub-api';

const pornhub = new PornHub();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '';
    const category = searchParams.get('category') || 'all';
    const page = parseInt(searchParams.get('page') || '1');

    console.log('API Request:', { query, category, page });

    let videos: any[] = [];

    // Handle different search scenarios
    if (category === 'all' && !query) {
      // Get trending videos when no specific search
      videos = await pornhub.search('', {
        page,
        order: 'mostviewed'
      });
    } else if (category === 'gay') {
      // Search specifically in gay category
      const searchQuery = query || 'gay';
      videos = await pornhub.search(searchQuery, {
        page,
        category: 'gay',
        order: 'mostviewed'
      });
    } else if (category === 'lesbian') {
      const searchQuery = query || 'lesbian';
      videos = await pornhub.search(searchQuery, {
        page,
        category: 'lesbian',
        order: 'mostviewed'
      });
    } else if (category === 'straight') {
      const searchQuery = query || 'straight';
      videos = await pornhub.search(searchQuery, {
        page,
        category: 'straight',
        order: 'mostviewed'
      });
    } else {
      // General search with query
      videos = await pornhub.search(query, {
        page,
        order: 'mostviewed'
      });
    }

    // Transform the data to match our interface
    const transformedVideos = videos.map((video: any) => ({
      title: video.title || 'Untitled',
      url: video.url || '#',
      duration: video.duration || '00:00',
      img_url: video.thumb || video.img_url || '/placeholder-video.jpg',
      rating: video.rating || 0,
      views: video.views || '0'
    }));

    return NextResponse.json({
      success: true,
      data: transformedVideos,
      currentPage: page,
      totalPages: Math.min(page + 5, 50) // Limit pagination for demo
    });

  } catch (error) {
    console.error('API Error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch videos. This might be due to network restrictions or API limitations.',
      data: []
    }, { status: 500 });
  }
}