import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ChevronDown, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const headlineRef = useRef(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Word by word animation
    const words = document.querySelectorAll('.hero-word');
    gsap.fromTo(words, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out', delay: 0.2 }
    );
    
    gsap.fromTo('.hero-fade-up',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out', delay: 0.8 }
    );
    
    // Parallax on scroll
    const handleScroll = () => {
      if (window.scrollY < window.innerHeight) {
        gsap.to('.hero-content', { y: window.scrollY * 0.15, duration: 0 });
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="home" className="min-h-screen relative flex items-center overflow-hidden pt-24 pb-16">
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-12 flex items-center justify-between gap-12 hero-content">
        
        {/* Left Content */}
        <div className="flex-1 max-w-[680px]">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-glow/30 border border-violet-border text-violet-light font-mono text-[12px] tracking-widest mb-7 hero-fade-up">
            <span className="text-amber-500">◈</span> Powered by Agentic GraphRAG + Llama-3
          </span>
          
          <h1 ref={headlineRef} className="font-display font-extrabold text-[clamp(44px,6vw,84px)] leading-[1.05] tracking-tight mb-6">
            <span className="block text-text-main hero-word">The AI That</span>
            <span className="block text-gradient hero-word">Thinks Like</span>
            <span className="block text-gradient-amber hero-word">a Detective.</span>
          </h1>

          <p className="text-lg text-text-muted max-w-[540px] leading-relaxed mb-10 hero-fade-up">
            Upload thousands of disconnected FIR documents. Crime-Connect builds a living Knowledge Graph — and sends autonomous AI agents to find the criminal connections no human could spot.
          </p>

          <div className="flex flex-wrap gap-4 hero-fade-up">
            <button 
              onClick={() => navigate('/login?mode=signup')}
              className="interactive btn-primary flex-shrink-0"
            >
              Start Investigation &rarr;
            </button>
            <button className="interactive btn-secondary flex-shrink-0">
              <Play size={16} className="fill-current" /> Watch Demo
            </button>
          </div>
          
          <div className="flex flex-wrap gap-10 mt-16 pt-10 border-t border-violet-border/30 hero-fade-up">
            <div className="flex flex-col gap-1">
              <span className="font-display font-bold text-3xl text-amber-500">1,247+</span>
              <span className="text-[13px] text-text-placeholder font-body tracking-wide">FIR Documents Analyzed</span>
            </div>
            <div className="w-px bg-violet-border/50 hidden md:block" />
            <div className="flex flex-col gap-1">
              <span className="font-display font-bold text-3xl text-amber-500">94.3%</span>
              <span className="text-[13px] text-text-placeholder font-body tracking-wide">Entity Extraction Accuracy</span>
            </div>
            <div className="w-px bg-violet-border/50 hidden md:block" />
            <div className="flex flex-col gap-1">
              <span className="font-display font-bold text-3xl text-amber-500">0</span>
              <span className="text-[13px] text-text-placeholder font-body tracking-wide">Hallucinations (Source-Traced)</span>
            </div>
          </div>
        </div>

        {/* Right Graphic */}
        <div className="hidden lg:block flex-shrink-0 w-[400px] h-[320px] glass-card p-0 animate-float hero-fade-up shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
          <div className="flex justify-between items-center px-4 py-3 border-b border-violet-border/50 bg-[#0e0b14]/60 backdrop-blur-md">
            <span className="font-mono text-[10px] text-amber-500 tracking-[0.1em]">LIVE INVESTIGATION GRAPH</span>
            <span className="flex items-center gap-1.5 font-mono text-[10px] text-success">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-blink" /> LIVE
            </span>
          </div>
          {/* Mock canvas structure for the floating card */}
          <div className="relative w-full h-[calc(100%-41px)] bg-bg-deep/50 overflow-hidden flex items-center justify-center flex-col gap-6">
            <div className="w-12 h-12 rounded-full border border-violet bg-violet-glow flex items-center justify-center animate-pulse">
               <span className="text-white text-xs">FIR</span>
            </div>
            <div className="w-[1px] h-12 bg-amber-border"></div>
            <div className="w-12 h-12 rounded-full border border-amber bg-amber-glow flex flex-col items-center justify-center animate-pulse">
               <span className="text-white text-xs">SUSPECT</span>
            </div>
          </div>
        </div>

      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 hero-fade-up" style={{ animationDelay: '2s' }}>
        <span className="text-[12px] text-text-placeholder">Scroll to explore</span>
        <ChevronDown size={20} className="text-amber-500 animate-bounce-down" />
      </div>
    </section>
  );
};

export default Hero;
