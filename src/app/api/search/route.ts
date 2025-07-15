import { NextRequest, NextResponse } from 'next/server';
import AdultDataLinkAPI from '@/lib/adultDataLink';

// Initialize API client
const getAPIClient = () => {
  const apiKey = process.env.ADULTDATALINK_API_KEY;
  if (!apiKey || apiKey === 'your_api_key_here') {
    console.warn('AdultDataLink API key not configured. Using mock data.');
  }
  return new AdultDataLinkAPI(apiKey || 'mock-key');
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '';
    const category = searchParams.get('category') || 'all';
    const page = parseInt(searchParams.get('page') || '1');

    console.log('API Request:', { query, category, page });

    // Validate inputs
    if (page < 1 || page > 100) {
      return NextResponse.json({
        success: false,
        error: 'Invalid page number',
        data: []
      }, { status: 400 });
    }

    const validCategories = ['all', 'gay', 'lesbian', 'straight', 'trans', 'milf', 'teen'];
    if (!validCategories.includes(category.toLowerCase())) {
      return NextResponse.json({
        success: false,
        error: 'Invalid category',
        data: []
      }, { status: 400 });
    }

    // Initialize API client
    const apiClient = getAPIClient();

    // Perform search
    const result = await apiClient.search(query, category, page);

    // Add CORS headers for development
    const response = NextResponse.json(result);
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return response;

  } catch (error: any) {
    console.error('API Route Error:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to fetch videos. Please check your API configuration.',
      data: []
    }, { status: 500 });
  }
}

// Handle OPTIONS requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}