'use client';

import { useState, useEffect } from 'react';
import { VideoMetadata, SearchResponse } from '@/lib/adultDataLink';
import VideoCard from '@/components/VideoCard';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import Pagination from '@/components/Pagination';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import SafetyDisclaimer from '@/components/SafetyDisclaimer';
import { Sparkles, Settings, Info } from 'lucide-react';

export default function HomePage() {
  const [videos, setVideos] = useState<VideoMetadata[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [apiStatus, setApiStatus] = useState<'unknown' | 'mock' | 'real'>('unknown');

  const fetchVideos = async (query: string = '', category: string = 'all', page: number = 1) => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        query,
        category,
        page: page.toString(),
      });

      const response = await fetch(`/api/search?${params}`);
      const data: SearchResponse = await response.json();

      if (data.success && data.data) {
        setVideos(data.data);
        setCurrentPage(data.currentPage || page);
        setTotalPages(data.totalPages || 1);
        
        // Detect if using mock data
        if (data.error && data.error.includes('mock data')) {
          setApiStatus('mock');
        } else {
          setApiStatus('real');
        }
      } else {
        setError(data.error || 'Failed to fetch videos');
        setVideos([]);
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
      setVideos([]);
      setApiStatus('unknown');
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchVideos();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    fetchVideos(query, selectedCategory, 1);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    fetchVideos(searchQuery, category, 1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchVideos(searchQuery, selectedCategory, page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetry = () => {
    fetchVideos(searchQuery, selectedCategory, currentPage);
  };

  return (
    <>
      <SafetyDisclaimer />
      
      <div className="min-h-screen">
        {/* Header */}
        <header className="glass-hover sticky top-0 z-40 border-b border-white/10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-primary-orange to-primary-pink rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold gradient-text">VideoHub</h1>
                  <p className="text-xs text-white/60">AdultDataLink Integration</p>
                </div>
              </div>
              
              {/* API Status Indicator */}
              <div className="flex items-center gap-2">
                {apiStatus === 'mock' && (
                  <div className="flex items-center gap-2 px-3 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-full">
                    <Settings className="w-4 h-4 text-yellow-400" />
                    <span className="text-xs text-yellow-300">Demo Mode</span>
                  </div>
                )}
                {apiStatus === 'real' && (
                  <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-300">Live API</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 text-shadow">
              Discover Premium
              <span className="gradient-text block">Adult Content</span>
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
              Powered by AdultDataLink API with advanced search capabilities and category filtering. 
              Built with Next.js and modern web technologies.
            </p>
            
            {/* API Configuration Notice */}
            {apiStatus === 'mock' && (
              <div className="glass p-4 max-w-md mx-auto mb-8">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="w-5 h-5 text-blue-400" />
                  <span className="text-blue-300 font-medium">Configuration Required</span>
                </div>
                <p className="text-white/70 text-sm">
                  Add your AdultDataLink API key to <code className="bg-white/10 px-1 rounded">.env.local</code> for live data.
                  Currently showing demo content.
                </p>
              </div>
            )}
          </div>

          {/* Search and Filter Controls */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-12">
            <SearchBar onSearch={handleSearch} loading={loading} />
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              loading={loading}
            />
          </div>

          {/* Results Section */}
          <div className="mb-8">
            {loading ? (
              <LoadingSpinner />
            ) : error ? (
              <ErrorMessage message={error} onRetry={handleRetry} />
            ) : videos.length === 0 ? (
              <div className="text-center py-20">
                <div className="glass p-8 max-w-md mx-auto">
                  <h3 className="text-xl font-semibold text-white mb-2">No videos found</h3>
                  <p className="text-white/70">
                    Try adjusting your search terms or selecting a different category.
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Results Info */}
                <div className="flex items-center justify-between mb-6">
                  <p className="text-white/70">
                    Showing {videos.length} results
                    {searchQuery && ` for "${searchQuery}"`}
                    {selectedCategory !== 'all' && ` in ${selectedCategory}`}
                  </p>
                  <p className="text-white/60 text-sm">
                    Page {currentPage} of {totalPages}
                  </p>
                </div>

                {/* Video Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {videos.map((video, index) => (
                    <VideoCard key={`${video.id}-${index}`} video={video} />
                  ))}
                </div>

                {/* Pagination */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  loading={loading}
                />
              </>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="glass-hover border-t border-white/10 mt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-orange to-primary-pink rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-semibold gradient-text">VideoHub</span>
              </div>
              
              <p className="text-white/60 text-sm max-w-2xl mx-auto">
                Modern adult content platform built with Next.js, TypeScript, and AdultDataLink API. 
                Features glassmorphism UI, SWC compilation fallbacks, and comprehensive error handling.
              </p>
              
              <div className="flex items-center justify-center gap-6 text-xs text-white/40">
                <span>© 2024 VideoHub Demo</span>
                <span>•</span>
                <span>AdultDataLink Integration</span>
                <span>•</span>
                <span>18+ Content Warning</span>
                <span>•</span>
                <span>Educational Purpose</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}