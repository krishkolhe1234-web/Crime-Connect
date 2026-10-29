import React from 'react';
import { Network, FileText, AlertOctagon, ScanFace, FileSearch } from 'lucide-react';
import { motion } from 'framer-motion';

const Timeline = () => {
  const events = [
    { time: '2026-04-03 14:30', title: 'System Anomalies Detected', desc: 'Multiple unregistered vehicles spotted near Sector 4 warehouse.', type: 'alert', icon: AlertOctagon },
    { time: '2026-04-03 11:15', title: 'FIR-1042 Analyzed', desc: 'Agent autonomously parsed 4 pages of witness statements. 3 suspects added to graph.', type: 'document', icon: FileSearch },
    { time: '2026-04-02 22:40', title: 'Node Match Discovered', desc: 'Vehicle #KA-9821 linked to suspect Vikram Desai with 94% confidence.', type: 'graph', icon: Network },
    { time: '2026-04-02 18:00', title: 'Facial Recognition Hit', desc: 'Camera feed 4A matched suspect profile near Koregaon Bank.', type: 'intel', icon: ScanFace },
    { time: '2026-04-01 09:00', title: 'Case Opened', desc: 'Operation Neon Trace initialized by Commander.', type: 'system', icon: FileText },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-display font-bold text-text-main tracking-wide">Temporal Analysis</h1>
        <p className="text-text-placeholder font-mono text-sm mt-2">Chronological sequence of intelligence events and AI reasoning operations.</p>
      </div>

      <div className="relative border-l-2 border-cyan-border/50 ml-6 md:ml-12 space-y-12">
        {events.map((ev, i) => (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            key={i} 
            className="relative pl-8 md:pl-12 group"
          >
            {/* Timeline Dot */}
            <div className={`absolute -left-[17px] top-1 w-8 h-8 rounded-full border-2 border-bg-deep flex items-center justify-center
              ${ev.type === 'alert' ? 'bg-warning-DEFAULT shadow-[0_0_15px_rgba(255,171,0,0.4)]' : 
                ev.type === 'graph' ? 'bg-cyan-DEFAULT shadow-[0_0_15px_rgba(0,212,255,0.4)]' : 
                'bg-bg-card border-cyan-border'}`}
            >
              <ev.icon size={14} className={ev.type === 'alert' || ev.type === 'graph' ? 'text-bg-deep' : 'text-cyan-DEFAULT'} />
            </div>

            <div className="font-mono text-xs text-cyan-DEFAULT mb-2 bg-cyan-glow/10 border border-cyan-DEFAULT/20 w-fit px-2 py-0.5 rounded tracking-widest uppercase">
              {ev.time}
            </div>
            
            <div className="bg-bg-card border border-cyan-border rounded-xl p-5 shadow-panel group-hover:border-cyan-DEFAULT/60 transition-colors relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                 <ev.icon size={80} />
              </div>
              <h3 className="font-display text-lg font-bold text-text-main mb-2">{ev.title}</h3>
              <p className="text-text-muted font-body leading-relaxed">{ev.desc}</p>
              
              <div className="mt-4 pt-4 border-t border-dashed border-cyan-border/30 flex items-center gap-4 text-xs font-mono">
                 <span className="text-text-placeholder hover:text-cyan-DEFAULT cursor-pointer transition-colors">Analyze Trace</span>
                 <span className="text-text-placeholder hover:text-cyan-DEFAULT cursor-pointer transition-colors">Find Related</span>
              </div>
            </div>
          </motion.div>
        ))}
        
        {/* End of timeline fade */}
        <div className="absolute bottom-[-50px] left-[-2px] w-1 h-24 bg-gradient-to-b from-cyan-border/50 to-transparent"></div>
      </div>
    </div>
  );
}

export default Timeline;
