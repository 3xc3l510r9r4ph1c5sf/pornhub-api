'use client';

import { Shield, X, AlertTriangle, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function SafetyDisclaimer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already acknowledged
    const hasAcknowledged = localStorage.getItem('adult-content-acknowledged');
    if (!hasAcknowledged) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('adult-content-acknowledged', 'true');
    setIsVisible(false);
  };

  const handleDecline = () => {
    window.location.href = 'https://google.com';
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass max-w-lg w-full p-8 animate-slide-up">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Adult Content Warning</h2>
            <p className="text-white/60 text-sm">Age Verification Required</p>
          </div>
        </div>
        
        <div className="space-y-4 text-white/80 text-sm mb-6">
          <div className="flex items-start gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-red-300 mb-1">18+ Content Only</p>
              <p className="text-red-200/80">This application contains explicit adult content and is restricted to users 18 years of age or older.</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <p className="font-medium text-white">By continuing, you confirm that:</p>
            
            <div className="space-y-2">
              {[
                'You are at least 18 years of age',
                'Adult content is legal in your jurisdiction',
                'You understand this is for educational/demonstration purposes',
                'You will comply with all applicable local laws and regulations',
                'You acknowledge this uses AdultDataLink API for content delivery'
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <p className="text-blue-200 text-xs">
              <strong>Technical Note:</strong> This application demonstrates modern web development techniques 
              including Next.js, TypeScript, and API integration. It includes SWC compilation fallbacks 
              for broader compatibility.
            </p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={handleAccept}
            className="btn-primary flex-1 flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            I Understand & Continue
          </button>
          
          <button
            onClick={handleDecline}
            className="btn-secondary px-6 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <p className="text-center text-xs text-white/40 mt-4">
          This disclaimer ensures legal compliance and responsible usage
        </p>
      </div>
    </div>
  );
}