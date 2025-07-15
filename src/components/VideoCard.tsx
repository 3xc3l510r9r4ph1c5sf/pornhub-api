'use client';

import { VideoData } from '@/types';
import { Play, Clock, Eye } from 'lucide-react';
import { useState } from 'react';

interface VideoCardProps {
  video: VideoData;
}

export default function VideoCard({ video }: VideoCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleWatchClick = () => {
    if (video.url && video.url !== '#') {
      window.open(video.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="card-glass group cursor-pointer animate-slide-up">
      <div className="relative overflow-hidden rounded-lg mb-4">
        {/* Thumbnail */}
        <div className="aspect-video bg-gray-800 relative">
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-primary-orange border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          
          {!imageError ? (
            <img
              src={video.img_url}
              alt={video.title}
              className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 ${
                imageLoading ? 'opacity-0' : 'opacity-100'
              }`}
              onError={handleImageError}
              onLoad={handleImageLoad}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
              <Play className="w-12 h-12 text-white/50" />
            </div>
          )}
          
          {/* Duration overlay */}
          {video.duration && (
            <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {video.duration}
            </div>
          )}
          
          {/* Play button overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
            <div className="w-16 h-16 bg-primary-orange/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
              <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
            </div>
          </div>
        </div>

        {/* Video info */}
        <div className="space-y-3">
          <h3 className="text-white font-medium text-sm line-clamp-2 leading-tight group-hover:text-primary-orange transition-colors duration-300">
            {video.title}
          </h3>
          
          {/* Stats */}
          <div className="flex items-center justify-between text-xs text-white/60">
            {video.views && (
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                <span>{video.views}</span>
              </div>
            )}
            
            {video.rating && video.rating > 0 && (
              <div className="flex items-center gap-1">
                <span className="text-primary-orange">★</span>
                <span>{video.rating}%</span>
              </div>
            )}
          </div>
          
          {/* Watch button */}
          <button
            onClick={handleWatchClick}
            className="w-full btn-primary text-sm py-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
          >
            Watch Video
          </button>
        </div>
      </div>
    </div>
  );
}