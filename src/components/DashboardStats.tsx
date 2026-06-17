import React from "react";
import { ShieldAlert, Server, ShieldCheck, Zap, Sparkles } from "lucide-react";

interface DashboardStatsProps {
  componentCount: number;
  vulnerabilityCount: number;
  criticalCount: number;
  isSimulated: boolean;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({
  componentCount,
  vulnerabilityCount,
  criticalCount,
  isSimulated,
}) => {
  return (
    <div id="stats-container" className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 relative z-10">
      
      {/* Stat 1: Nodes */}
      <div 
        id="stat-card-components" 
        className="glass-card rounded-2xl p-4.5 flex items-center space-x-3.5 border-teal-500/20 hover:border-teal-400/40 transition-all duration-300 group hover:shadow-lg hover:shadow-teal-500/5"
      >
        <div id="stat-icon-wrap-1" className="p-3 bg-teal-500/10 text-teal-400 rounded-xl group-hover:scale-105 transition-transform">
          <Server id="stat-icon-1" className="w-5 h-5 text-teal-400" />
        </div>
        <div>
          <p id="stat-lbl-1" className="text-[10px] text-teal-400/80 font-mono tracking-widest font-bold uppercase">DETECTED NODES</p>
          <div className="flex items-baseline space-x-1">
            <p id="stat-val-1" className="text-2xl font-bold font-display text-gray-100 tracking-tight">{componentCount || 0}</p>
            <span className="text-[10px] text-gray-500 font-mono">active</span>
          </div>
        </div>
      </div>

      {/* Stat 2: Security Risks */}
      <div 
        id="stat-card-vulnerabilities" 
        className="glass-card rounded-2xl p-4.5 flex items-center space-x-3.5 border-rose-500/20 hover:border-rose-400/40 transition-all duration-300 group hover:shadow-lg hover:shadow-rose-500/5"
      >
        <div id="stat-icon-wrap-2" className="p-3 bg-rose-500/10 text-rose-400 rounded-xl group-hover:scale-105 transition-transform">
          <ShieldAlert id="stat-icon-2" className="w-5 h-5 text-rose-400" />
        </div>
        <div>
          <p id="stat-lbl-2" className="text-[10px] text-rose-400/80 font-mono tracking-widest font-bold uppercase">SECURITY RISKS</p>
          <div className="flex items-baseline space-x-1">
            <p id="stat-val-2" className={`text-2xl font-bold font-display tracking-tight ${vulnerabilityCount > 0 ? "text-rose-400" : "text-emerald-400"}`}>
              {vulnerabilityCount || 0}
            </p>
            <span className="text-[10px] text-gray-500 font-mono">targets</span>
          </div>
        </div>
      </div>

      {/* Stat 3: Threat Class */}
      <div 
        id="stat-card-threats" 
        className="glass-card rounded-2xl p-4.5 flex items-center space-x-3.5 border-amber-500/20 hover:border-amber-400/40 transition-all duration-300 group hover:shadow-lg hover:shadow-amber-500/5"
      >
        <div id="stat-icon-wrap-3" className="p-3 bg-amber-500/10 text-amber-400 rounded-xl group-hover:scale-105 transition-transform">
          <ShieldCheck id="stat-icon-3" className="w-5 h-5 text-amber-400" />
        </div>
        <div>
          <p id="stat-lbl-3" className="text-[10px] text-amber-400/80 font-mono tracking-widest font-bold uppercase">INTEGRITY RATING</p>
          <p id="stat-val-3" className={`text-sm font-bold font-display tracking-tight ${criticalCount > 0 ? "text-rose-400" : "text-amber-400"}`}>
            {criticalCount > 0 ? "HIGH VULN RISK" : vulnerabilityCount > 0 ? "WARNINGS" : "SECURE BASELINE"}
          </p>
        </div>
      </div>

      {/* Stat 4: Synthesis Model */}
      <div 
        id="stat-card-engine" 
        className="glass-card rounded-2xl p-4.5 flex items-center space-x-3.5 border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 group hover:shadow-lg hover:shadow-purple-500/5"
      >
        <div id="stat-icon-wrap-4" className="p-3 bg-purple-500/10 text-purple-400 rounded-xl group-hover:scale-105 transition-transform">
          <Zap id="stat-icon-4" className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <p id="stat-lbl-4" className="text-[10px] text-purple-400/80 font-mono tracking-widest font-bold uppercase">AUDIT ENGINE</p>
          <div className="flex items-center space-x-1 mt-0.5">
            <Sparkles className="w-3.5 h-3.5 text-purple-300 animate-pulse" />
            <p id="stat-val-4" className="text-[10px] font-bold font-mono text-purple-300 uppercase tracking-widest">
              {isSimulated ? "SANDBOX VM" : "GEMINI FLASH"}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
