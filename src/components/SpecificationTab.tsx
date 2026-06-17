import React, { useState } from "react";
import Markdown from "react-markdown";
import { FileText, Copy, Check, MessageSquare } from "lucide-react";

interface SpecificationTabProps {
  specMarkdown: string;
  explanation: string;
}

export const SpecificationTab: React.FC<SpecificationTabProps> = ({
  specMarkdown = "",
  explanation = "",
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(specMarkdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Clipboard copy failure:", err);
    }
  };

  return (
    <div id="spec-tab-root" className="space-y-6">
      
      {/* Dynamic Executive Explanation */}
      {explanation && (
        <div id="explanation-card" className="bg-[#111827] border border-[#1f2937] rounded-xl p-5">
          <div id="explanation-header" className="flex items-center space-x-2 mb-3">
            <MessageSquare id="explain-icon" className="w-5 h-5 text-sky-400" />
            <h3 id="explanation-heading" className="text-base font-semibold text-gray-200">Executive Architect Context</h3>
          </div>
          <p id="explanation-body" className="text-sm text-gray-300 font-sans leading-relaxed">
            {explanation}
          </p>
        </div>
      )}

      {/* Structured Technical Specifications Document Panel */}
      <div id="technical-spec-card" className="bg-[#111827] border border-[#1f2937] rounded-xl overflow-hidden">
        
        {/* Document Action bar */}
        <div id="doc-action-bar" className="bg-[#1f2937]/30 border-b border-[#1f2937] px-5 py-3 flex items-center justify-between">
          <div id="doc-title-wrap" className="flex items-center space-x-2">
            <FileText id="doc-icon" className="w-4 h-4 text-purple-400" />
            <span id="doc-title" className="text-xs font-mono font-medium text-gray-300">SYSTEM_SKELETON_SPEC.md</span>
          </div>
          
          <button
            id="btn-copy-md"
            onClick={handleCopy}
            className="flex items-center space-x-1.5 px-3 py-1 bg-[#111827] border border-[#1f2937] rounded text-xs font-mono text-gray-300 hover:text-purple-400 hover:border-purple-500/40 transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check id="copy-check-icon" className="w-3.5 h-3.5 text-emerald-400 animate-scale" />
                <span id="copy-lbl-success" className="text-emerald-400">COPIED!</span>
              </>
            ) : (
              <>
                <Copy id="copy-btn-icon" className="w-3.5 h-3.5" />
                <span id="copy-lbl-ready">COPY MARKDOWN</span>
              </>
            )}
          </button>
        </div>

        {/* Render markdown nicely */}
        <div id="markdown-container" className="p-6 overflow-y-auto max-h-[600px] text-gray-200 font-sans leading-relaxed text-sm prose prose-invert max-w-none prose-sm">
          {specMarkdown ? (
            <div id="rendered-spec-wrapper" className="markdown-body space-y-4">
              <Markdown>{specMarkdown}</Markdown>
            </div>
          ) : (
            <p id="spec-empty" className="text-gray-400 text-sm italic font-sans text-center py-10">No technical specs compiled.</p>
          )}
        </div>

      </div>

    </div>
  );
};
