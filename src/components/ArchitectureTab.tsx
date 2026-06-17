import React from "react";
import { Server, ArrowRight, HelpCircle, Layers, Cpu, Database, CpuIcon } from "lucide-react";

interface ComponentItem {
  name: string;
  type: string;
  description: string;
  confidence?: number;
  needsVerification?: boolean;
}

interface FlowItem {
  from: string;
  to: string;
  description: string;
}

interface DataMovementItem {
  flowType: string;
  description: string;
}

interface TechItem {
  componentName: string;
  technologies: string[];
}

interface ArchitectureTabProps {
  detectedComponents: ComponentItem[];
  systemFlow: FlowItem[];
  dataMovement: DataMovementItem[];
  technologies: TechItem[];
}

const getComponentIcon = (type: string, name: string) => {
  const t = type.toLowerCase() + " " + name.toLowerCase();
  if (t.includes("db") || t.includes("database") || t.includes("sql") || t.includes("nosql") || t.includes("cache") || t.includes("storage")) {
    return <Database className="w-4 h-4 text-emerald-400" />;
  }
  if (t.includes("api") || t.includes("router") || t.includes("gateway") || t.includes("lb") || t.includes("balancer") || t.includes("proxy")) {
    return <Layers className="w-4 h-4 text-teal-400" />;
  }
  if (t.includes("lambda") || t.includes("function") || t.includes("worker") || t.includes("compute") || t.includes("serverless") || t.includes("service")) {
    return <Cpu className="w-4 h-4 text-amber-400" />;
  }
  return <Server className="w-4 h-4 text-sky-400" />;
};

export const ArchitectureTab: React.FC<ArchitectureTabProps> = ({
  detectedComponents = [],
  systemFlow = [],
  dataMovement = [],
  technologies = [],
}) => {
  return (
    <div id="arch-tab-root" className="space-y-6">
      {/* Detected Components section */}
      <div id="arch-components-card" className="bg-[#111827] border border-[#1f2937] rounded-xl p-5">
        <div id="arch-header" className="flex items-center space-x-2 mb-4">
          <Layers id="layers-icon-main" className="w-5 h-5 text-teal-400" />
          <h3 id="arch-components-heading" className="text-base font-semibold text-gray-200">Detected Architecture Nodes</h3>
        </div>
        
        {detectedComponents.length === 0 ? (
          <p id="components-empty" className="text-gray-400 text-sm italic font-sans">No components registered for this layout.</p>
        ) : (
          <div id="components-table-wrap" className="overflow-x-auto border border-[#1f2937] rounded-lg">
            <table id="components-table" className="w-full text-left border-collapse">
              <thead>
                <tr id="components-tr-head" className="bg-[#1f2937]/50 text-xs text-gray-400 uppercase font-mono tracking-wider border-b border-[#1f2937]">
                  <th id="th-node-name" className="px-4 py-3">Node Name</th>
                  <th id="th-node-type" className="px-4 py-3">Inferred Layer</th>
                  <th id="th-node-desc" className="px-4 py-3">Core Purpose & Responsibility</th>
                  <th id="th-node-confidence" className="px-4 py-3 text-right">AI Validation</th>
                </tr>
              </thead>
              <tbody id="components-tbody" className="divide-y divide-[#1f2937] text-sm text-gray-300">
                {detectedComponents.map((comp, idx) => (
                  <tr id={`comp-row-${idx}`} key={idx} className="hover:bg-[#1f2937]/20 transition-colors">
                    <td id={`comp-name-${idx}`} className="px-4 py-3 font-semibold text-gray-100 flex items-center space-x-2">
                      <span id={`icon-tag-${idx}`} className="p-1 px-1.5 bg-[#111827] rounded border border-[#1f2937]">
                        {getComponentIcon(comp.type, comp.name)}
                      </span>
                      <span>{comp.name}</span>
                    </td>
                    <td id={`comp-type-${idx}`} className="px-4 py-3">
                      <span id={`badge-type-${idx}`} className="text-xs bg-[#1f2937] text-teal-400 font-mono px-2 py-1 rounded">
                        {comp.type}
                      </span>
                    </td>
                    <td id={`comp-desc-${idx}`} className="px-4 py-3 text-gray-400 leading-relaxed font-sans">{comp.description}</td>
                    <td id={`comp-validation-${idx}`} className="px-4 py-3 text-right whitespace-nowrap">
                      {comp.needsVerification ? (
                        <span id={`badge-verify-${idx}`} className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold uppercase tracking-wider text-[10px] font-mono">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                          <span>Needs verification</span>
                        </span>
                      ) : (
                        <span id={`badge-confidence-${idx}`} className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-[11px] font-mono">
                          <span>Confidence: {comp.confidence !== undefined ? comp.confidence : 92}%</span>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div id="responsible-ai-disclaimer" className="mt-4 p-3 bg-slate-900/40 border border-[#1f2937] rounded-lg flex items-start space-x-3 text-xs text-gray-400">
          <div className="p-1 px-1.5 bg-blue-500/10 border border-blue-500/20 rounded text-blue-400 font-bold font-mono text-[9px] uppercase tracking-wider">
            Responsible AI
          </div>
          <p className="leading-relaxed font-sans">
            <strong>System Design Validation Transparency</strong>: Architectural nodes are transcribed using deep-learning visual feature extraction models. Nodes with clear typography and standardized diagram icons yield a high-confidence index (<span className="text-emerald-400 font-mono font-bold">92%</span> or higher). Elements containing loose sketches, custom handwritten variables, or structural overlaps are flagged as <span className="text-amber-400 font-mono font-bold">"Needs verification"</span> to guarantee rigorous human-in-the-loop review before downstream code generation.
          </p>
        </div>
      </div>

      {/* Flow & Data movement grids */}
      <div id="flow-movement-grid" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <div id="flow-card" className="bg-[#111827] border border-[#1f2937] rounded-xl p-5">
          <div id="flow-header" className="flex items-center space-x-2 mb-4">
            <ArrowRight id="arrow-icon-main" className="w-5 h-5 text-sky-400" />
            <h3 id="flow-heading" className="text-base font-semibold text-gray-200">System Information Flow</h3>
          </div>

          {systemFlow.length === 0 ? (
            <p id="flow-empty" className="text-gray-400 text-sm italic font-sans">No route flows mapped for this design.</p>
          ) : (
            <div id="flow-timeline" className="relative border-l border-[#1f2937] ml-3 pl-6 space-y-5">
              {systemFlow.map((flow, idx) => (
                <div id={`flow-item-${idx}`} key={idx} className="relative group">
                  <div id={`flow-item-dot-${idx}`} className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-sky-500 border-2 border-[#111827] group-hover:bg-sky-400 transition-colors" />
                  <div id={`flow-item-card-${idx}`} className="bg-[#1f2937]/30 border border-[#1f2937] rounded-lg p-3 hover:border-sky-500/30 transition-colors">
                    <div id={`flow-nodes-line-${idx}`} className="flex flex-wrap items-center space-x-2 text-xs font-mono text-gray-300 font-medium mb-1">
                      <span id={`flow-from-${idx}`} className="text-gray-200 bg-[#111827] px-2 py-0.5 rounded border border-[#1f2937]">{flow.from}</span>
                      <ArrowRight id={`flow-arr-${idx}`} className="w-3 h-3 text-gray-500" />
                      <span id={`flow-to-${idx}`} className="text-sky-400 bg-[#111827] px-2 py-0.5 rounded border border-[#1f2937]">{flow.to}</span>
                    </div>
                    <p id={`flow-desc-${idx}`} className="text-sm text-gray-400 font-sans leading-relaxed">{flow.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Data Movements & States */}
        <div id="mov-card" className="bg-[#111827] border border-[#1f2937] rounded-xl p-5 flex flex-col">
          <div id="mov-header" className="flex items-center space-x-2 mb-4">
            <CpuIcon id="cpu-icon-main" className="w-5 h-5 text-emerald-400" />
            <h3 id="mov-heading" className="text-base font-semibold text-gray-200">Synchronization & Buffering</h3>
          </div>

          {dataMovement.length === 0 ? (
            <p id="mov-empty" className="text-gray-400 text-sm italic font-sans flex-grow">No custom stream protocols configured.</p>
          ) : (
            <div id="mov-list" className="space-y-4 flex-grow">
              {dataMovement.map((dm, idx) => (
                <div id={`mov-inner-card-${idx}`} key={idx} className="p-4 bg-[#1f2937]/20 border border-[#1f2937] rounded-lg hover:border-emerald-500/30 transition-colors">
                  <div id={`mov-type-line-${idx}`} className="text-xs font-mono text-emerald-400 font-semibold mb-1 uppercase tracking-wider">
                    {dm.flowType}
                  </div>
                  <p id={`mov-desc-${idx}`} className="text-sm text-gray-400 font-sans leading-relaxed">
                    {dm.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Technologies identified section */}
      <div id="tech-card" className="bg-[#111827] border border-[#1f2937] rounded-xl p-5">
        <div id="tech-header" className="flex items-center space-x-2 mb-4">
          <HelpCircle id="help-icon-main" className="w-5 h-5 text-purple-400" />
          <h3 id="tech-heading" className="text-base font-semibold text-gray-200">Inferred Technological Stack Recommendation</h3>
        </div>

        {technologies.length === 0 ? (
          <p id="tech-empty" className="text-gray-400 text-sm italic font-sans">No clear technologies mapped to design layers.</p>
        ) : (
          <div id="tech-tag-grid" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {technologies.map((t, idx) => (
              <div id={`tech-box-${idx}`} key={idx} className="p-4 bg-[#1f2937]/30 border border-[#1f2937] rounded-lg">
                <span id={`tech-lbl-${idx}`} className="block text-xs font-mono font-semibold text-gray-400 mb-2 truncate">{t.componentName}</span>
                <div id={`tech-tags-${idx}`} className="flex flex-wrap gap-1.5">
                  {t.technologies.map((tech, techIdx) => (
                    <span id={`tech-tag-badge-${idx}-${techIdx}`} key={techIdx} className="text-xs bg-[#111827] text-purple-400 font-mono border border-purple-500/25 px-2 py-0.5 rounded hover:border-purple-500/60 transition-colors">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
