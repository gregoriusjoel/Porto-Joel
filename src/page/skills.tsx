'use client';

import { useEffect, useRef } from 'react';
import LogoLoop from '@/components/LogoLoop';
import 'remixicon/fonts/remixicon.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });

      gsap.from('.tech-card', {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)'
      });

      gsap.from('.skill-progress-card', {
        scrollTrigger: {
          trigger: skillsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      });

      gsap.from('.progress-bar', {
        scrollTrigger: {
          trigger: skillsRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        },
        width: 0,
        duration: 1.5,
        stagger: 0.08,
        ease: 'power2.out',
        delay: 0.5
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const logoItems = [
    {
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      alt: 'React',
      title: 'React'
    },
    {
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
      alt: 'Next.js',
      title: 'Next.js'
    },
    {
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      alt: 'TypeScript',
      title: 'TypeScript'
    },
    {
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      alt: 'Node.js',
      title: 'Node.js'
    },
    {
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
      alt: 'Tailwind CSS',
      title: 'Tailwind CSS'
    },
    {
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
      alt: 'PostgreSQL',
      title: 'PostgreSQL'
    },
    {
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
      alt: 'MongoDB',
      title: 'MongoDB'
    },
    {
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
      alt: 'Git',
      title: 'Git'
    },
    {
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
      alt: 'Docker',
      title: 'Docker'
    },
    {
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original-wordmark.svg',
      alt: 'Golang',
      title: 'Golang'
    },
    {
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      alt: 'Python',
      title: 'Python'
    },
    {
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg',
      alt: 'Figma',
      title: 'Figma'
    }
  ];

  return (
    <section ref={sectionRef} id="skills" className="min-h-screen flex items-center justify-center px-6 md:px-12 py-24 border-t border-white/10">
      <div className="max-w-5xl w-full space-y-20">
        <h3 ref={titleRef} className="text-5xl md:text-6xl font-bold mb-20">
          Tech Stack
        </h3>
        <LogoLoop
            logos={logoItems}
            speed={50}
            direction="left"
            logoHeight={48}
            gap={48}
            pauseOnHover={true}
            fadeOut={true}
            fadeOutColor="rgb(0, 0, 0)"
            scaleOnHover={true}
          />


        {/* Skill Levels - Technical Skills & Tools */}
        <div ref={skillsRef} className="mt-20 grid md:grid-cols-2 gap-8">
          {/* Technical Skills */}
          <div className="skill-progress-card p-8 border border-white rounded-2xl space-y-6">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                <i className="ri-code-s-slash-line text-2xl"></i>
              </div>
              <div>
                <h5 className="text-xl font-bold">Technical Skills</h5>
                <p className="text-sm text-gray-400">Programming & Development</p>
              </div>
            </div>

            <div className="space-y-6">
              {[
                { name: 'Python', level: 80 },
                { name: 'JavaScript', level: 80 },
                { name: 'React JS', level: 75 },
                { name: 'TypeScript', level: 75 },
                { name: 'Laravel', level: 70 },
                { name: 'Golang', level: 50 },
                { name: 'Flutter', level: 70 },
                { name: 'MySQL', level: 80 },
                { name: 'Tailwind CSS', level: 85 }
              ].map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-xs bg-white/10 px-2 py-1 rounded">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="progress-bar h-full bg-white rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tools & Platforms */}
          <div className="skill-progress-card p-8 border border-white rounded-2xl space-y-6">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                <i className="ri-tools-line text-2xl"></i>
              </div>
              <div>
                <h5 className="text-xl font-bold">Tools & Platforms</h5>
                <p className="text-sm text-gray-400">Development Environment</p>
              </div>
            </div>

            <div className="space-y-6">
              {[
                { name: 'VS Code', description: 'Code Editor', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
                { name: 'Figma', description: 'Design Tool', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
                { name: 'Git & GitHub', description: 'Version Control', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
                { name: 'MySQL', description: 'Database', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
                { name: 'Docker', description: 'Containerization', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
                { name: 'Postman', description: 'API Testing', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg' }
              ].map((tool) => (
                <div key={tool.name} className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 p-2">
                    <img src={tool.icon} alt={tool.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1">
                    <h6 className="font-medium">{tool.name}</h6>
                    <p className="text-xs text-gray-400">{tool.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
