'use client';

import { Shield, X } from 'lucide-react';
import { useState } from 'react';

export default function SafetyDisclaimer() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass max-w-md w-full p-6 animate-slide-up">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-6 h-6 text-primary-orange" />
          <h2 className="text-xl font-semibold text-white">Adult Content Warning</h2>
        </div>
        
        <div className="space-y-4 text-white/80 text-sm">
          <p>
            This application contains adult content and is intended for users 18 years of age or older.
          </p>
          
          <p>
            By continuing, you confirm that:
          </p>
          
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>You are at least 18 years old</li>
            <li>Adult content is legal in your jurisdiction</li>
            <li>You understand this is for educational/demonstration purposes</li>
            <li>You will use this responsibly and in compliance with local laws</li>
          </ul>
          
          <p className="text-xs text-white/60">
            This is a demonstration application showcasing API integration and modern web development techniques.
          </p>
        </div>
        
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setIsVisible(false)}
            className="btn-primary flex-1"
          >
            I Understand & Continue
          </button>
          
          <button
            onClick={() => window.location.href = 'https://google.com'}
            className="btn-secondary px-4"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}