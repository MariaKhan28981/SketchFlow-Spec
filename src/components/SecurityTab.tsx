import React, { useState } from "react";
import { ShieldAlert, Eye, CheckCircle2, Lock, Unlock, AlertOctagon, HelpCircle } from "lucide-react";

interface Vulnerability {
  title: string;
  severity: "High" | "Medium" | "Low" | string;
  description: string;
  recommendation: string;
}

interface AttackSurface {
  area: string;
  risks: string[];
}

interface SecurityRecommendation {
  title: string;
  priority: "Critical" | "High" | "Medium" | "Low" | string;
  steps: string[];
}

interface SecurityTabProps {
  vulnerabilities: Vulnerability[];
  attackSurfaces: AttackSurface[];
  recommendations: SecurityRecommendation[];
}

export const SecurityTab: React.FC<SecurityTabProps> = ({
  vulnerabilities = [],
  attackSurfaces = [],
  recommendations = [],
}) => {
  // Add interactive state for checklist to let developers simulate remediations
  const [solvedSteps, setSolvedSteps] = useState<Record<string, boolean>>({});

  const toggleStep = (key: string) => {
    setSolvedSteps((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const getSeverityBadgeClass = (severity: string) => {
    const s = severity.toLowerCase();
    if (s.includes("high") || s.includes("critical")) {
      return "text-rose-400 bg-rose-500/10 border-rose-500/20";
    }
    if (s.includes("medium") || s.includes("mod")) {
      return "text-amber-400 bg-amber-500/10 border-amber-500/20";
    }
    return "text-sky-400 bg-sky-500/10 border-sky-500/20";
  };

  const getPriorityBadgeClass = (priority: string) => {
    const p = priority.toLowerCase();
    if (p.includes("critical") || p.includes("high")) {
      return "text-rose-400 bg-rose-500/10 border-rose-500/20";
    }
    return "text-purple-400 bg-purple-500/10 border-purple-500/20";
  };

  return (
    <div id="sec-tab-root" className="space-y-6">
      
      {/* Upper Grid: Vulnerabilities and Attack Surfaces */}
      <div id="sec-upper-grid" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Possible Vulnerabilities Panel */}
        <div id="vulnerabilities-card" className="bg-[#111827] border border-[#1f2937] rounded-xl p-5">
          <div id="vulnerabilities-header" className="flex items-center space-x-2 mb-4">
            <ShieldAlert id="shield-alert-icon" className="w-5 h-5 text-rose-500" />
            <h3 id="vulnerabilities-heading" className="text-base font-semibold text-gray-200">Threat Vulnerability Diagnostics</h3>
          </div>

          {vulnerabilities.length === 0 ? (
            <p id="vulnerabilities-empty" className="text-gray-400 text-sm italic font-sans">No immediate security vulnerabilities detected in design.</p>
          ) : (
            <div id="vulnerabilities-list" className="space-y-4">
              {vulnerabilities.map((vul, idx) => (
                <div id={`vul-box-${idx}`} key={idx} className="p-4 bg-[#1f2937]/30 border border-[#1f2937] rounded-lg">
                  <div id={`vul-top-line-${idx}`} className="flex items-center justify-between mb-2">
                    <span id={`vul-title-${idx}`} className="font-semibold text-sm text-gray-100 pr-2">{vul.title}</span>
                    <span id={`vul-severity-${idx}`} className={`text-xs px-2.5 py-0.5 rounded-full border font-mono ${getSeverityBadgeClass(vul.severity)}`}>
                      {vul.severity}
                    </span>
                  </div>
                  <p id={`vul-desc-${idx}`} className="text-sm text-gray-450 leading-relaxed font-sans mb-3 text-gray-400">{vul.description}</p>
                  <div id={`vul-rec-box-${idx}`} className="p-3 bg-[#111827]/60 border-l-2 border-emerald-500 rounded-r text-xs text-gray-300 font-sans leading-relaxed">
                    <span id={`vul-rec-lbl-${idx}`} className="font-mono font-semibold text-emerald-400 block mb-1">REMEDIATION VECTOR:</span>
                    {vul.recommendation}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Attack Surfaces */}
        <div id="attack-surfaces-card" className="bg-[#111827] border border-[#1f2937] rounded-xl p-5">
          <div id="attack-header" className="flex items-center space-x-2 mb-4">
            <Eye id="eye-icon" className="w-5 h-5 text-amber-500" />
            <h3 id="attack-heading" className="text-base font-semibold text-gray-200">Inferred Attack Surfaces</h3>
          </div>

          {attackSurfaces.length === 0 ? (
            <p id="attack-empty" className="text-gray-400 text-sm italic font-sans font-medium">No external boundary threats logged.</p>
          ) : (
            <div id="attack-list" className="space-y-4">
              {attackSurfaces.map((as, idx) => (
                <div id={`as-box-${idx}`} key={idx} className="p-4 bg-[#1f2937]/30 border border-[#1f2937] rounded-lg">
                  <div id={`as-area-line-${idx}`} className="flex items-center space-x-2 mb-2">
                    <AlertOctagon id={`as-logo-${idx}`} className="w-4 h-4 text-amber-500" />
                    <span id={`as-area-name-${idx}`} className="font-mono text-sm font-semibold text-gray-200">{as.area}</span>
                  </div>
                  <ul id={`as-risks-ul-${idx}`} className="space-y-1.5 list-disc pl-5">
                    {as.risks.map((risk, rIdx) => (
                      <li id={`as-risk-${idx}-${rIdx}`} key={rIdx} className="text-xs text-gray-400 leading-relaxed font-sans">
                        {risk}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Hardening Recommendations & Active Verification steps */}
      <div id="hardening-card" className="bg-[#111827] border border-[#1f2937] rounded-xl p-5">
        <div id="hardening-header" className="flex items-center space-x-2 mb-4">
          <Lock id="lock-icon" className="w-5 h-5 text-purple-400" />
          <h3 id="hardening-heading" className="text-base font-semibold text-gray-200">Execution Hardening Playbook</h3>
        </div>

        {recommendations.length === 0 ? (
          <p id="hardening-empty" className="text-gray-400 text-sm italic font-sans">No additional playbook actions mapped.</p>
        ) : (
          <div id="hardening-grid" className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.map((rec, idx) => (
              <div id={`rec-card-${idx}`} key={idx} className="p-4 bg-[#1f2937]/30 border border-[#1f2937] rounded-lg">
                <div id={`rec-title-line-${idx}`} className="flex items-center justify-between mb-3">
                  <span id={`rec-title-${idx}`} className="font-semibold text-sm text-gray-100">{rec.title}</span>
                  <span id={`rec-priority-${idx}`} className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded border ${getPriorityBadgeClass(rec.priority)}`}>
                    {rec.priority}
                  </span>
                </div>
                <div id={`rec-steps-wrap-${idx}`} className="space-y-2">
                  {rec.steps.map((step, sIdx) => {
                    const stepKey = `${idx}-${sIdx}`;
                    const isCompleted = !!solvedSteps[stepKey];
                    return (
                      <div
                        id={`rec-step-row-${idx}-${sIdx}`}
                        key={sIdx}
                        onClick={() => toggleStep(stepKey)}
                        className={`flex items-start space-x-2 p-2 rounded cursor-pointer transition-colors ${
                          isCompleted ? "bg-emerald-500/10 border border-emerald-500/20" : "bg-[#111827]/40 border border-[#1f2937] hover:border-gray-700"
                        }`}
                      >
                        <CheckCircle2
                          id={`step-check-icon-${idx}-${sIdx}`}
                          className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isCompleted ? "text-emerald-400 fill-emerald-400/20" : "text-gray-500"}`}
                        />
                        <span id={`step-text-${idx}-${sIdx}`} className={`text-xs ${isCompleted ? "line-through text-gray-400" : "text-gray-300"} font-sans leading-relaxed`}>
                          {step}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
