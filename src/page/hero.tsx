'use client';

import { useState, useEffect, useRef } from 'react';
import Prism from '@/components/Prism';
import Dock from '@/components/Dock';
import 'remixicon/fonts/remixicon.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const [showDock, setShowDock] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowDock(true);
      } else {
        setShowDock(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        delay: 0.3
      });

      gsap.from(buttonsRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.8
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const dockItems = [
    {
      icon: <i className="ri-home-line text-xl text-white"></i>,
      label: 'Home',
      onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    {
      icon: <i className="ri-user-line text-xl text-white"></i>,
      label: 'About',
      onClick: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
    },
    {
      icon: <i className="ri-code-box-line text-xl text-white"></i>,
      label: 'Skills',
      onClick: () => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })
    },
    {
      icon: <i className="ri-folder-line text-xl text-white"></i>,
      label: 'Projects',
      onClick: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
    },
    {
      icon: <i className="ri-mail-line text-xl text-white"></i>,
      label: 'Contact',
      onClick: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    }
  ];

  return (
    <section ref={heroRef} className="min-h-screen flex items-center justify-center px-6 md:px-12 relative overflow-hidden">
      {/* Prism Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-60">
        <div className="w-[600px] h-[600px]">
          <Prism 
            height={3.5}
            baseWidth={5.5}
            animationType="3drotate"
            glow={1.5}
            scale={1}
            hueShift={0}
            colorFrequency={4}
            bloom={1.5}
            noise={0}
            transparent={true}
            timeScale={0.3}
          />
        </div>
      </div>

      {/* Center Content */}
      <div className="max-w-4xl w-full text-center space-y-12 z-10 relative">
        {/* Main Heading */}
        <h1 ref={headingRef} className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
          Creativity and the Arts
          <br />
          All in One Place
        </h1>

        {/* CTA Buttons */}
        <div ref={buttonsRef} className="flex flex-wrap gap-4 justify-center mt-12">
          <button 
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-white/90 transition-all"
          >
            Get Started
          </button>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 border border-white/30 text-white rounded-full font-semibold hover:bg-white/10 transition-all backdrop-blur-sm"
          >
            Contact Me
          </button>
        </div>
      </div>

      {/* Dock Navigation - Only show when scrolled */}
      <div 
        className={`fixed bottom-0 left-0 right-0 z-50 pointer-events-none transition-all duration-500 ${
          showDock 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-32 opacity-0'
        }`}
      >
        <div className="pointer-events-auto">
          <Dock 
            items={dockItems}
            magnification={70}
            distance={150}
            panelHeight={64}
            baseItemSize={50}
          />
        </div>
      </div>
    </section>
  );
}
