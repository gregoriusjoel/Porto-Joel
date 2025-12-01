'use client';

import { useEffect, useRef, useState } from 'react';
import 'remixicon/fonts/remixicon.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects as projectsData } from '@/components/data/projects';
import ProjectCard from '@/ui/ProjectCard';
import Modal from '@/ui/Modal';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = ['Semua Project', 'Web Development', 'Android Apps', 'UI/UX Design', 'Video'];
  const [activeCategory, setActiveCategory] = useState('Semua Project');

  const handlePreviewClick = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300); // Clear after animation
  };

  const getCategoryKey = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      'Semua Project': 'all',
      'Web Development': 'web',
      'Android Apps': 'android',
      'UI/UX Design': 'design',
      'Video': 'video'
    };
    return categoryMap[category] || 'all';
  };

  const filteredProjects = activeCategory === 'Semua Project' 
    ? projectsData 
    : projectsData.filter(p => p.category === getCategoryKey(activeCategory));

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const cards = cardsRef.current?.querySelectorAll('.project-card');
    if (cards && cards.length > 0) {
      gsap.killTweensOf(cards);
      
      gsap.fromTo(cards,
        {
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          onComplete: () => {
            cards.forEach(card => {
              card.removeAttribute('style');
            });
          }
        }
      );
    }
  }, [filteredProjects]);

  return (
    <section ref={sectionRef} id="projects" className="min-h-screen flex items-center justify-center px-6 md:px-12 py-24 border-t border-white/10">
      <div className="max-w-7xl w-full">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h3 className="text-5xl md:text-6xl font-bold mb-6">
            Featured Projects
          </h3>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Kumpulan project terbaik yang pernah saya kerjakan, dari web development hingga Video Editor
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full border transition-all ${
                activeCategory === category
                  ? 'bg-white text-black border-white'
                  : 'border-white/20 hover:border-white/50'
              }`}
            >
              {category === 'Semua Project' && <i className="ri-apps-line mr-2"></i>}
              {category === 'Web Development' && <i className="ri-computer-line mr-2"></i>}
              {category === 'Android Apps' && <i className="ri-smartphone-line mr-2"></i>}
              {category === 'UI/UX Design' && <i className="ri-palette-line mr-2"></i>}
              {category === 'Video' && <i className="ri-film-line mr-2"></i>}
              {category}
            </button>
          ))}
        </div>
        
        {/* Projects Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div key={index} className="project-card">
              <ProjectCard 
                project={project}
                delay={index * 100}
                onPreviewClick={handlePreviewClick}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Preview */}
      <Modal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        images={selectedProject?.screenshots}
        title={selectedProject?.title}
        videoUrl={selectedProject?.video || (selectedProject?.demo?.includes('instagram.com') ? selectedProject.demo : undefined)}
      />
    </section>
  );
}
