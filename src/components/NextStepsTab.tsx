import React from "react";
import { TrendingUp, Rocket, Calendar, ArrowUpRight, HelpCircle } from "lucide-react";

interface ScalabilityImprovement {
  name: string;
  benefit: string;
  difficulty: "Easy" | "Medium" | "Hard" | string;
}

interface DeploymentSuggestion {
  phase: string;
  description: string;
}

interface NextStepsTabProps {
  scalability: ScalabilityImprovement[];
  deployment: DeploymentSuggestion[];
}

export const NextStepsTab: React.FC<NextStepsTabProps> = ({
  scalability = [],
  deployment = [],
}) => {
  
  const getDifficultyClass = (difficulty: string) => {
    const d = difficulty.toLowerCase();
    if (d.includes("hard")) {
      return "text-rose-400 bg-rose-500/10 border-rose-500/20";
    }
    if (d.includes("medium")) {
      return "text-amber-400 bg-amber-500/10 border-amber-500/20";
    }
    return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
  };

  return (
    <div id="next-steps-tab-root" className="space-y-6">
      
      <div id="next-steps-grid" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Scalability Improvements Panel */}
        <div id="scalability-card" className="bg-[#111827] border border-[#1f2937] rounded-xl p-5">
          <div id="scalability-header" className="flex items-center space-x-2 mb-4">
            <TrendingUp id="scalability-icon" className="w-5 h-5 text-emerald-400" />
            <h3 id="scalability-heading" className="text-base font-semibold text-gray-200">Scalability Growth Path</h3>
          </div>

          {scalability.length === 0 ? (
            <p id="scalability-empty" className="text-gray-400 text-sm italic font-sans">No scalability vectors mapped.</p>
          ) : (
            <div id="scalability-list" className="space-y-4">
              {scalability.map((item, idx) => (
                <div id={`scale-box-${idx}`} key={idx} className="p-4 bg-[#1f2937]/30 border border-[#1f2937] rounded-lg flex items-start justify-between space-x-4 hover:border-emerald-500/20 transition-colors">
                  <div id={`scale-content-${idx}`} className="space-y-1">
                    <span id={`scale-name-${idx}`} className="font-semibold text-sm text-gray-100 flex items-center space-x-1">
                      <span>{item.name}</span>
                      <ArrowUpRight id={`scale-ext-arrow-${idx}`} className="w-3.5 h-3.5 text-gray-500" />
                    </span>
                    <p id={`scale-benefit-${idx}`} className="text-xs text-gray-400 leading-relaxed font-sans">{item.benefit}</p>
                  </div>
                  <span id={`scale-difficulty-${idx}`} className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded border flex-shrink-0 ${getDifficultyClass(item.difficulty)}`}>
                    {item.difficulty}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Deployment Progression map */}
        <div id="deployment-card" className="bg-[#111827] border border-[#1f2937] rounded-xl p-5">
          <div id="deployment-header" className="flex items-center space-x-2 mb-4">
            <Rocket id="rocket-icon" className="w-5 h-5 text-purple-400" />
            <h3 id="deployment-heading" className="text-base font-semibold text-gray-200">Recommended Rollout Blueprint</h3>
          </div>

          {deployment.length === 0 ? (
            <p id="deployment-empty" className="text-gray-400 text-sm italic font-sans">No deployment phases designated.</p>
          ) : (
            <div id="deployment-timeline" className="relative border-l border-[#1f2937] ml-3 pl-6 space-y-6">
              {deployment.map((dep, idx) => (
                <div id={`dep-element-${idx}`} key={idx} className="relative group">
                  <div id={`dep-dot-${idx}`} className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-purple-500 border-2 border-[#111827] group-hover:bg-purple-400 transition-all shadow-glow" />
                  <div id={`dep-wrapper-${idx}`} className="space-y-1">
                    <span id={`dep-phase-lbl-${idx}`} className="flex items-center space-x-1.5 text-xs font-mono font-bold text-purple-400 uppercase tracking-widest">
                      <Calendar id={`dep-calendar-${idx}`} className="w-3.5 h-3.5" />
                      <span>{dep.phase}</span>
                    </span>
                    <p id={`dep-desc-${idx}`} className="text-sm text-gray-450 text-gray-300 leading-relaxed font-sans">
                      {dep.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
