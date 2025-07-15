'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  loading?: boolean;
}

const categories = [
  { value: 'all', label: 'All Categories', icon: '🔥' },
  { value: 'gay', label: 'Gay', icon: '🏳️‍🌈' },
  { value: 'lesbian', label: 'Lesbian', icon: '👩‍❤️‍👩' },
  { value: 'straight', label: 'Straight', icon: '👫' },
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
        className="btn-secondary flex items-center gap-3 min-w-[160px] justify-between disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">{selectedCategoryData.icon}</span>
          <span>{selectedCategoryData.label}</span>
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
              <span>{category.label}</span>
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