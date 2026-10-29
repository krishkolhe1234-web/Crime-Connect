import React from 'react';

const Footer = () => {
  return (
    <footer id="footer" className="relative z-10 pt-16 pb-8 bg-[#08060c] border-t border-violet-border/30">
      <div className="w-full max-w-[1200px] mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="font-display font-bold text-[18px] text-text-main mb-2">◈ CRIME-CONNECT</div>
            <div className="text-[14px] text-text-placeholder mb-1">Autonomous Forensic Intelligence System</div>
            <div className="font-mono text-[11px] text-text-placeholder mb-6">Built with Neo4j · LangGraph · Llama-3</div>
            
            <div className="flex gap-2.5">
              {['GitHub', 'LinkedIn', 'Twitter'].map(social => (
                <button key={social} className="interactive w-9 h-9 rounded-full border border-violet-border/50 bg-transparent text-text-placeholder flex items-center justify-center text-[12px] transition-all hover:border-amber-border hover:text-amber-500 hover:scale-110">
                   {social.substring(0,2)}
                </button>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-display font-semibold text-[14px] text-text-main mb-4">Platform</h4>
            <div className="flex flex-col gap-2.5">
              {['Dashboard', 'Graph Explorer', 'AI Detective', 'Upload Documents', 'Timeline'].map(link => (
                <a key={link} href="#" className="interactive text-[14px] text-text-placeholder hover:text-amber-500 transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Project */}
          <div>
            <h4 className="font-display font-semibold text-[14px] text-text-main mb-4">Project</h4>
            <div className="flex flex-col gap-2.5">
              {['About', 'Architecture', 'Tech Stack', 'Research Paper', 'GitHub'].map(link => (
                <a key={link} href="#" className="interactive text-[14px] text-text-placeholder hover:text-amber-500 transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Contact / Team */}
          <div>
            <h4 className="font-display font-semibold text-[14px] text-text-main mb-4">Team</h4>
            <div className="text-[13px] text-text-placeholder leading-[1.8]">
              <p>Mini Project — 2025-26</p>
              <p>Group No: 15</p>
              <p className="mt-2">Team: <span className="text-violet-light font-medium">Pradhyumn · Ashish · Krish · Dhruv</span></p>
              <p>Guide: <span className="text-violet-light font-medium">Prof. Sujata Wankhede</span></p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-violet-border/30 text-[13px] text-text-placeholder">
          <div>© 2025 Crime-Connect — All rights reserved</div>
          <div>Made with <span className="text-amber-500 mx-1">◈</span> for forensic intelligence</div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
