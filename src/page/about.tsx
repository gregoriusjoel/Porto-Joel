'use client';

import { useEffect, useRef } from 'react';
import Lanyard from '@/components/Lanyard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from "@/components/SplitText";
import TextType from '@/components/TextType';
import ScrollVelocity from '@/components/ScrollVelocity';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none reverse'
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });

      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };

  
  

  return (
    <section ref={sectionRef} id="about" className="min-h-screen flex flex-col items-center justify-center py-24 border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl w-full px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-16">
            <div className="space-y-8">
              <h3 ref={titleRef} className="text-6xl md:text-7xl font-bold">
                Gregorius Joel
              </h3>
              <SplitText
                text="Hello Everyone, Welcome to my art!"
                className="text-2xl font-semibold text-center"
                delay={50}
                duration={0.6}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="center"
                onLetterAnimationComplete={handleAnimationComplete}
              />
              <div className="text-2xl md:text-3xl text-gray-400">
                <TextType 
                  text={["Front-end Developer", "Back-end Developer", "Full-stack Developer", "UI/UX Designer", "Content Creator", "Video Editor"]}
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={true}
                  cursorCharacter="|"
                />
              </div>
            </div>
            
            <div className="w-full h-px bg-white/10" />
            
            <div ref={contentRef} className="space-y-6">
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                Inovasi digital yang mengubah ide menjadi solusi nyata. 
                Setiap project adalah perjalanan untuk menciptakan pengalaman 
                yang bermakna dan berdampak.
              </p>
            </div>
          </div>

          {/* Right Side - Lanyard */}
          <div className="hidden lg:block h-[600px] relative">
            <Lanyard 
              position={[0, 0, 20]}
              gravity={[0, -40, 0]}
              fov={17}
              transparent={true}
            />
          </div>
        </div>
      </div>

      {/* ScrollVelocity - Full Width */}
      <div className="w-screen mt-24 overflow-hidden">
        <ScrollVelocity
          texts={[
            'DESIGN • DEVELOP • INNOVATE',
            'CREATE • BUILD • INSPIRE'
          ]}
          velocity={100}
          className="text-white/20"
          parallaxClassName="py-3"
          scrollerClassName="text-7xl md:text-9xl font-black"
        />
      </div>
    </section>
  );
}
