'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  loading?: boolean;
}

const categories = [
  { value: 'all', label: 'All Categories', icon: '🔥', description: 'Browse all content' },
  { value: 'gay', label: 'Gay', icon: '🏳️‍🌈', description: 'Gay content' },
  { value: 'lesbian', label: 'Lesbian', icon: '👩‍❤️‍👩', description: 'Lesbian content' },
  { value: 'straight', label: 'Straight', icon: '👫', description: 'Straight content' },
  { value: 'trans', label: 'Trans', icon: '🏳️‍⚧️', description: 'Trans content' },
  { value: 'milf', label: 'MILF', icon: '👩‍🦳', description: 'Mature content' },
];

export default function CategoryFilter({ selectedCategory, onCategoryChange, loading }: CategoryFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedCategoryData = categories.find(cat => cat.value === selectedCategory) || categories[0];

  const handleCategorySelect = (category: string) => {
    onCategoryChange(category);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={loading}
        className="btn-secondary flex items-center gap-3 min-w-[180px] justify-between disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">{selectedCategoryData.icon}</span>
          <div className="text-left">
            <div className="font-medium">{selectedCategoryData.label}</div>
            <div className="text-xs text-white/60">{selectedCategoryData.description}</div>
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full glass border border-white/20 rounded-lg overflow-hidden z-50 animate-slide-up">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => handleCategorySelect(category.value)}
              className={`w-full px-4 py-3 text-left hover:bg-white/10 transition-colors duration-200 flex items-center gap-3 ${
                selectedCategory === category.value ? 'bg-primary-orange/20 text-primary-orange' : 'text-white'
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <div>
                <div className="font-medium">{category.label}</div>
                <div className="text-xs opacity-70">{category.description}</div>
              </div>
              {selectedCategory === category.value && (
                <div className="ml-auto w-2 h-2 bg-primary-orange rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}