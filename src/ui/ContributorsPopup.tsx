'use client';

import React, { useEffect, useState } from "react";
import 'boxicons/css/boxicons.min.css';

interface Contributor {
  name: string;
  role: string;
  avatar: string;
  linkedin?: string;
}

interface ContributorsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  contributors: Contributor[];
  projectTitle: string;
}

const ContributorsPopup: React.FC<ContributorsPopupProps> = ({ 
  isOpen, 
  onClose, 
  contributors, 
  projectTitle 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 10);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 300);
  };

  const handleLinkedInClick = (linkedinUrl?: string) => {
    if (linkedinUrl) {
      window.open(linkedinUrl, '_blank', 'noopener,noreferrer');
    }
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all duration-300 ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`} 
      onClick={handleClose}
    >
      <div 
        className={`relative max-w-md w-[90vw] m-4 bg-white rounded-2xl shadow-2xl border border-gray-200 transition-all duration-300 ${
          isAnimating ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        }`} 
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-100 to-gray-50 p-4 border-b border-gray-200 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900 truncate mr-4">Team Contributors</h3>
            <button
              onClick={handleClose}
              className="w-8 h-8 bg-gray-200 hover:bg-red-500 hover:text-white text-gray-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-90 flex-shrink-0"
              title="Close"
            >
              <i className='bx bx-x text-lg'></i>
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-2">{projectTitle}</p>
        </div>
        
        {/* Contributors List */}
        <div className="p-6">
          {/* limit height and allow scrolling when there are many contributors */}
          <div className="space-y-4 max-h-[50vh] overflow-auto pr-2 hide-scrollbar">
            {contributors?.map((contributor, index) => (
              <div 
                key={index}
                className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-gray-300 hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-xl shadow-lg text-white">
                  <i className={`bx ${contributor.avatar}`}></i>
                </div>
                <div className="flex-1 relative min-w-0">
                  <div className="group cursor-pointer" onClick={() => handleLinkedInClick(contributor.linkedin)}>
                    <h4 className="font-semibold text-gray-900 text-lg group-hover:text-blue-600 transition-all duration-200 flex items-center">
                      {/* make name horizontally scrollable if it's too long */}
                      <span className="overflow-x-auto whitespace-nowrap hide-scrollbar" style={{ WebkitOverflowScrolling: 'touch' }}>{contributor.name}</span>
                      {contributor.linkedin && (
                        <i className="bx bx-link-external ml-2 text-sm opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 text-blue-600"></i>
                      )}
                    </h4>
                    <p className="text-gray-600 text-sm pointer-events-none">{contributor.role}</p>
                    {contributor.linkedin && (
                      <p className="text-xs text-blue-500 mt-1 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none">
                        Klik untuk melihat LinkedIn
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            ))}
          </div>
          
          {(!contributors || contributors.length === 0) && (
            <div className="text-center py-8">
              <i className='bx bx-group text-6xl text-gray-400 mb-4'></i>
              <p className="text-gray-500">No contributors data available</p>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="bg-gray-50 p-4 rounded-b-2xl">
          <p className="text-xs text-gray-500 text-center">
            Great teamwork makes great projects!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContributorsPopup;
