'use client';

import React, { useState } from "react";
import ContributorsPopup from "./ContributorsPopup";
import 'boxicons/css/boxicons.min.css';

interface Contributor {
  name: string;
  role: string;
  avatar: string;
  linkedin?: string;
}

interface ProjectDescription {
  id: string;
  en: string;
}

interface Project {
  title: string;
  description: string | ProjectDescription;
  image: string;
  demo?: string;
  github?: string;
  video?: string;
  screenshots?: string[];
  status: string;
  technologies: string[];
  category: string;
  rating?: string;
  duration?: string;
  year: string;
  contributors?: Contributor[];
}

interface ProjectCardProps {
  project: Project;
  delay?: number;
  onPreviewClick: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, delay = 0, onPreviewClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showContributors, setShowContributors] = useState(false);

  const getDescription = (description: string | ProjectDescription): string => {
    if (typeof description === 'object' && description !== null) {
      // Default to Indonesian for now, can add language context later
      return description.id;
    }
    return description;
  };

  const isEditorOrVideo = (
    project?.category === 'video' ||
    (project?.contributors && project.contributors.some(c => c.role && c.role.toLowerCase().includes('video')))
  );

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className={`group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition-all duration-700 hover:shadow-2xl transform hover:scale-[1.02] hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Project Image or Video Thumbnail */}
      <div className="relative h-64 overflow-hidden">
        {((project.category === 'video') || project.video || (project.demo && project.demo.includes('instagram.com'))) ? (
          // Use iframe embed of the video as a visual thumbnail
          <div className="w-full h-full bg-gray-900">
            <iframe
              src={project.video || (project.demo && project.demo.includes('instagram.com') ? project.demo.replace(/\/?(\?.*)?$/, '/embed') : project.demo)}
              title={project.title}
              className="w-full h-full object-cover pointer-events-none border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
          </div>
        ) : (
          <>
            <img 
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
          </>
        )}
        
        {/* Overlay with buttons */}
        <div className={`absolute inset-0 flex items-center justify-center gap-3 transition-all duration-500 flex-wrap p-4 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          {/* Watch button for video projects */}
          {(project.video || (project.demo && project.demo.includes('instagram.com'))) && (
            <button
              onClick={() => onPreviewClick(project)}
              className="px-4 py-2 bg-white/90 hover:bg-white text-black rounded-full text-sm font-medium flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
            >
              <i className='bx bx-play-circle text-base'></i>
              Watch
            </button>
          )}
          
          {/* Demo button */}
          {!isEditorOrVideo && project.demo && project.demo !== '#' && (
            <a 
              href={project.demo} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/90 hover:bg-white text-black rounded-full text-sm font-medium flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
              style={{ transitionDelay: '100ms' }}
            >
              <i className='bx bx-link-external text-base'></i> 
              Live Demo
            </a>
          )}
          
          {/* Code button */}
          {!isEditorOrVideo && project.github && project.github !== '#' && (
            <a 
              href={project.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/90 hover:bg-white text-black rounded-full text-sm font-medium flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
              style={{ transitionDelay: '200ms' }}
            >
              <i className='bx bx-code-alt text-base'></i>
              Code
            </a>
          )}
          
          {/* Preview button */}
          {!isEditorOrVideo && project.screenshots && project.screenshots.length > 0 && (
            <button 
              onClick={() => onPreviewClick(project)}
              className="px-4 py-2 bg-white/90 hover:bg-white text-black rounded-full text-sm font-medium flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
              style={{ transitionDelay: '300ms' }}
            >
              <i className='bx bx-image-alt text-base'></i>
              Preview
            </button>
          )}
        </div>
      </div>

      {/* Project Info */}
      <div className="p-6">
        {/* Status Badge */}
        <div className="mb-3">
          <span className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold rounded-full transition-all duration-300 ${
            project.status === 'completed' 
              ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
              : project.status === 'in-progress'
              ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
              : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
          }`}>
            {project.status === 'completed' ? (
              <>
                <i className='bx bx-check-circle'></i> Selesai
              </>
            ) : project.status === 'in-progress' ? (
              <>
                <i className='bx bx-loader-circle bx-spin'></i> In Progress
              </>
            ) : (
              <>
                <i className='bx bx-bulb'></i> Konsep
              </>
            )}
          </span>
        </div>
        
        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-white/90 transition-colors duration-300 line-clamp-2">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-3">
          {getDescription(project.description)}
        </p>

        {/* Technologies */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs border border-white/20 rounded-full hover:border-white/40 transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Project Stats */}
        <div className="flex items-center justify-between text-sm text-gray-400 pt-4 border-t border-white/10">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <i className='bx bx-star'></i>
              {project.rating || '5.0'}
            </span>
            <span className="flex items-center gap-1">
              <i className='bx bx-time'></i>
              {project.duration}
            </span>
          </div>
          <span className="text-white/70 font-medium">{project.year}</span>
        </div>

        {/* Contributors Section */}
        {project.contributors && project.contributors.length > 0 && (
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <i className="bx bx-group text-gray-400 text-sm"></i>
                  <span className="text-gray-400 text-sm">Contributors</span>
                </div>
                <div className="flex -space-x-2">
                  {(() => {
                    const contributors = Array.isArray(project.contributors) ? project.contributors : [];
                    const visibleCount = Math.min(3, contributors.length);
                    const extra = Math.max(0, contributors.length - visibleCount);

                    return (
                      <>
                        {contributors.slice(0, visibleCount).map((contributor, index) => (
                          <div
                            key={index}
                            className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full border-2 border-black flex items-center justify-center text-sm hover:scale-110 transition-transform duration-200 text-white"
                            title={contributor.name}
                          >
                            <i className={`bx ${contributor.avatar}`}></i>
                          </div>
                        ))}
                        {extra > 0 && (
                          <div
                            className="w-8 h-8 bg-white/10 rounded-full border-2 border-black flex items-center justify-center text-xs text-gray-300"
                            title={`${extra} more contributors`}
                          >
                            +{extra}
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>
              </div>
              <button
                onClick={() => setShowContributors(true)}
                className="text-xs text-white/70 hover:text-white hover:underline transition-colors duration-200"
              >
                View Team
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Contributors Popup */}
      <ContributorsPopup 
        isOpen={showContributors}
        onClose={() => setShowContributors(false)}
        contributors={project.contributors || []}
        projectTitle={project.title}
      />
    </div>
  );
};

export default ProjectCard;
