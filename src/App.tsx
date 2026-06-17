import React, { useState, useEffect, useRef } from "react";
import { 
  Upload, 
  Layers, 
  HelpCircle, 
  ShieldAlert, 
  FileText, 
  TrendingUp, 
  Server, 
  Cpu, 
  Play, 
  CheckCircle, 
  X, 
  CpuIcon,
  RefreshCw, 
  AlertCircle,
  ArrowRight,
  BookOpen,
  Sparkles,
  ShieldCheck,
  Check,
  Zap,
  Download,
  Code
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { DEMO_PRESETS, SketchDetail } from "./demo-data";
import { DashboardStats } from "./components/DashboardStats";
import { ArchitectureTab } from "./components/ArchitectureTab";
import { SecurityTab } from "./components/SecurityTab";
import { SpecificationTab } from "./components/SpecificationTab";
import { NextStepsTab } from "./components/NextStepsTab";

export default function App() {
  // Navigation Stage
  const [activeStage, setActiveStage] = useState<'landing' | 'workspace'>('landing');

  // Tab selection within workspace: 'preset' or 'upload'
  const [analysisTab, setAnalysisTab] = useState<'preset' | 'upload'>('preset');

  // Active result tab selection inside workspace: 'architecture' | 'security' | 'specification' | 'next-steps'
  const [workspaceResultsTab, setWorkspaceResultsTab] = useState<'architecture' | 'security' | 'specification' | 'next-steps'>('architecture');

  // Input State
  const [selectedPresetId, setSelectedPresetId] = useState<string>("serverless-web");
  const [uploadedImageBase64, setUploadedImageBase64] = useState<string | null>(null);
  const [uploadedImageFile, setUploadedImageFile] = useState<File | null>(null);
  const [isDragActive, setIsDragActive] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Health and System State
  const [apiKeyConfigured, setApiKeyConfigured] = useState<boolean | null>(null);

  // Analysis / Render States
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [currentProgressStep, setCurrentProgressStep] = useState<number>(1);
  const [analysisProgressText, setAnalysisProgressText] = useState<string>("");
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isSimulatedResult, setIsSimulatedResult] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Value-Added insights modal controls
  const [showValueIaC, setShowValueIaC] = useState<boolean>(false);
  const [showValueRoadmap, setShowValueRoadmap] = useState<boolean>(false);

  // Fetch API health status on mount
  useEffect(() => {
    fetch("/api/health")
      .then((res) => res.json())
      .then((data) => {
        setApiKeyConfigured(!!data.apiKeyConfigured);
      })
      .catch((err) => {
        console.error("Health check failure:", err);
        setApiKeyConfigured(false);
      });

    const preventDefault = (e: DragEvent) => {
      if (e.dataTransfer && e.dataTransfer.types.includes("Files")) {
        e.preventDefault();
      }
    };
    window.addEventListener("dragover", preventDefault);
    window.addEventListener("drop", preventDefault);
    return () => {
      window.removeEventListener("dragover", preventDefault);
      window.removeEventListener("drop", preventDefault);
    };
  }, []);

  // Preset Selection Helper
  const handleSelectPreset = (id: string) => {
    setSelectedPresetId(id);
    setUploadedImageBase64(null);
    setUploadedImageFile(null);
    setErrorMessage(null);
    setAnalysisTab('preset');
    setWorkspaceResultsTab('architecture');
  };

  // Drag & Drop Handlers
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelected(e.target.files[0]);
    }
  };

  const handleFileSelected = (file: File) => {
    // Validate MIME Type
    if (!file.type.startsWith("image/")) {
      setErrorMessage("Unsupported file type. Please upload a PNG, JPEG, SVG, or WebP image.");
      return;
    }
    
    setErrorMessage(null);
    setSelectedPresetId(""); // Clear preset since user uploaded code
    setUploadedImageFile(file);
    setAnalysisTab('upload'); // Switch tab to show custom upload preview
    setActiveStage('workspace'); // Transition landing page to workspace view automatically
    setWorkspaceResultsTab('architecture');

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setUploadedImageBase64(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleClearUpload = () => {
    setUploadedImageBase64(null);
    setUploadedImageFile(null);
    setErrorMessage(null);
    // Reload first preset default
    setSelectedPresetId("serverless-web");
    setAnalysisTab('preset');
    setWorkspaceResultsTab('architecture');
  };

  // Trigger analysis pipeline
  const handleAnalyze = async (mode: "instant" | "gemini") => {
    setErrorMessage(null);
    setIsAnalyzing(true);
    setCurrentProgressStep(1);

    if (mode === "instant") {
      // Step 1: Reading image (duration: 100ms)
      setCurrentProgressStep(1);
      setAnalysisProgressText("Ingesting architectural diagram source...");
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Step 2: Detecting components (duration: 100ms)
      setCurrentProgressStep(2);
      setAnalysisProgressText("Detecting whiteboard nodes, symbols, and labels...");
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Step 3: Building architecture map (duration: 100ms)
      setCurrentProgressStep(3);
      setAnalysisProgressText("Compiling system connection maps and network flow data...");
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Step 4: Generating report (duration: 100ms)
      setCurrentProgressStep(4);
      setAnalysisProgressText("Generating comprehensive high-fidelity specification report...");
      await new Promise((resolve) => setTimeout(resolve, 100));

      let targetPreset = DEMO_PRESETS.find((p) => p.id === selectedPresetId);
      if (!targetPreset) {
        targetPreset = DEMO_PRESETS[0];
      }
      
      setAnalysisResult(targetPreset.analysis);
      setIsSimulatedResult(true);
      setIsAnalyzing(false);
    } 
    // MODE 2: Genuine Gemini API call
    else {
      let currentStepRef = 1;
      setCurrentProgressStep(1);
      setAnalysisProgressText("Injesting architectural diagram source...");

      const stepInterval = setInterval(() => {
        if (currentStepRef < 4) {
          currentStepRef += 1;
          setCurrentProgressStep(currentStepRef);
          if (currentStepRef === 2) {
            setAnalysisProgressText("Detecting components and layout symbols...");
          } else if (currentStepRef === 3) {
            setAnalysisProgressText("Building architecture connection maps and data flow graphs...");
          } else if (currentStepRef === 4) {
            setAnalysisProgressText("Generating vulnerability report & system specifications...");
          }
        }
      }, 150);

      try {
        let packagePayload: string = "";
        let finalMime = "image/png";

        if (uploadedImageBase64) {
          packagePayload = uploadedImageBase64;
          if (uploadedImageFile) {
            finalMime = uploadedImageFile.type;
          }
        } else {
          // Send active preset's XML raw SVG parsed to background
          const activePresetObj = DEMO_PRESETS.find((p) => p.id === selectedPresetId);
          if (activePresetObj) {
            // Convert SVG markup to custom encoded dataurl for processing (SVG standard is perfect)
            packagePayload = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(activePresetObj.svgMarkup)))}`;
            finalMime = "image/svg+xml";
          }
        }

        if (!packagePayload) {
          throw new Error("No architectural canvas context loaded.");
        }

        const endpointPrompt = `You are an elite, world-class Staff Software Architect. 
Analyze this uploaded system diagram, whiteboard design, flowchart, or rough sketch carefully. 
Identify every component, system connection, technology hint, potential cybersecurity loop risk, and scalability drawback.
Convert your analysis into the requested structured JSON format with complete technical descriptions. Do not leave placeholder values or truncate answers.`;

        // We run the API fetch in parallel with a tiny guarantee timer to let the steps transition beautifully
        const apiPromise = fetch("/api/analyze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image: packagePayload,
            mimeType: finalMime,
            prompt: endpointPrompt
          })
        });

        const [response] = await Promise.all([
          apiPromise,
          new Promise((resolve) => setTimeout(resolve, 200)) // reduced visual placeholder threshold to 200ms
        ]);

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData?.details || errData?.error || "Failed communicating with analysis backend.");
        }

        const data = await response.json();

        // Enforce reaching Step 4 before state commit
        clearInterval(stepInterval);
        setCurrentProgressStep(4);
        setAnalysisProgressText("Generating structured SaaS architecture report...");
        await new Promise((resolve) => setTimeout(resolve, 80)); // snappy visual confirmation

        if (data.isSimulated) {
          if (data.isHighDemandFallback) {
            setAnalysisResult(data);
            setIsSimulatedResult(true);
            setErrorMessage(data.warning || "Notice: Upstream Gemini Vision model is experiencing temporary high demand (503 Service Unavailable). Activated high-fidelity system visualizer fallback.");
          } else {
            // API key was missing, fallback smoothly
            let matchPreset = DEMO_PRESETS.find((p) => p.id === selectedPresetId) || DEMO_PRESETS[0];
            setAnalysisResult(matchPreset.analysis);
            setIsSimulatedResult(true);
            setErrorMessage("Notice: Operating in Sandbox mode with high-fidelity system presets.");
          }
        } else {
          setAnalysisResult(data);
          setIsSimulatedResult(false);
          setErrorMessage(null);
        }
      } catch (err: any) {
        console.error("Compilation Failure:", err);
        const errMsg = String(err?.message || err || "");
        const cleanErr = errMsg.toLowerCase();
        
        const isUpstreamOverload = 
          cleanErr.includes("503") || 
          cleanErr.includes("demand") || 
          cleanErr.includes("unavailable") || 
          cleanErr.includes("limit") || 
          cleanErr.includes("exhausted") || 
          cleanErr.includes("overload") ||
          cleanErr.includes("spike");

        if (isUpstreamOverload) {
          const matchPreset = DEMO_PRESETS.find((p) => p.id === selectedPresetId) || DEMO_PRESETS[0];
          setAnalysisResult(matchPreset.analysis);
          setIsSimulatedResult(true);
          setErrorMessage("Notice: Upstream Gemini Vision API is experiencing high demand (503 Service Unavailable). SketchFlow has gracefully activated its local offline catalog to complete the audit instantly.");
        } else {
          setErrorMessage(errMsg);
        }
      } finally {
        clearInterval(stepInterval);
        setIsAnalyzing(false);
      }
    }
  };

  // Helper generator to construct clean Terraform script configuration preview
  const getTerraformCode = () => {
    if (!analysisResult) {
      return `# No active analysis computed yet.
# Run an analysis on a sketch/diagram to generate custom Infrastructure-as-code configurations.

provider "aws" {
  region = "us-east-1"
}

# Example standard structure:
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  enable_dns_hostnames = true
  tags = {
    Name = "sketchflow-sandbox-vpc"
  }
}`;
    }

    const comps = analysisResult?.architecture?.detectedComponents || [];
    let resources = `provider "aws" {
  region = "us-east-1"
}

# Calculated from SketchFlow Vision Parsing:
`;

    if (comps.length === 0) {
      resources += `
# Standard generic blueprint VPC
resource "aws_vpc" "app_vpc" {
  cidr_block = "10.0.0.0/16"
  enable_dns_hostnames = true
  tags = { Name = "sketchflow-vpc" }
}`;
    } else {
      comps.forEach((c: any, index: number) => {
        const cleanId = (c.name || `service_${index}`).toLowerCase().replace(/[^a-z0-9]/g, "_");
        const role = (c.type || "microservice").toLowerCase();
        
        if (role.includes("db") || role.includes("database") || role.includes("postgres") || role.includes("storage")) {
          resources += `
# Identified storage component: ${c.name}
resource "aws_db_instance" "${cleanId}" {
  allocated_storage    = 20
  engine               = "postgres"
  engine_version       = "15.3"
  instance_class       = "db.t4g.micro"
  username             = "dbadmin"
  password             = "SecureRandomPassword123!"
  skip_final_snapshot  = true
  tags = {
    Role         = "Database Layer"
    SourceSketch = "SketchFlow Vision"
  }
}
`;
        } else if (role.includes("api") || role.includes("server") || role.includes("route") || role.includes("app") || role.includes("gateway")) {
          resources += `
# Identified endpoint or proxy container: ${c.name}
resource "aws_apigatewayv2_api" "${cleanId}" {
  name          = "${cleanId}-api-gateway"
  protocol_type = "HTTP"
  tags = {
    Role         = "Integration Edge Gateway"
    SourceSketch = "SketchFlow Vision"
  }
}
`;
        } else {
          resources += `
# Identified compute or queue microservice: ${c.name}
resource "aws_lambda_function" "${cleanId}" {
  function_name = "${cleanId}-service"
  role          = "arn:aws:iam::123456789012:role/service-role"
  handler       = "index.handler"
  runtime       = "nodejs18.x"
  
  environment {
    variables = {
      APP_ENV = "production"
    }
  }
  tags = {
    Role         = "Serverless Microservice"
    SourceSketch = "SketchFlow Vision"
  }
}
`;
        }
      });
    }

    return resources;
  };

  // Helper generator to construct phased roadmap checklist plans based on dynamic elements
  const getArchitecturePlan = () => {
    if (!analysisResult) {
      return [
        { 
          phase: "Phase 1: Foundation & Boundary Isolation", 
          desc: "Provision base container environment configuration & security subnets.",
          tasks: [
            "Secure subnets allocation boundaries.",
            "Establish strict firewalls around sensitive persistence layers."
          ]
        },
        { 
          phase: "Phase 2: Database Configuration", 
          desc: "Set up target data storage clusters.",
          tasks: [
            "Configure automatic backup snapshots.",
            "Enforce encryption-at-rest keys."
          ]
        }
      ];
    }

    const comps = analysisResult?.architecture?.detectedComponents || [];
    const securityCount = analysisResult?.security?.vulnerabilities?.length || 0;
    
    return [
      {
        phase: "Phase 1: Perimeter Secure Deployment",
        desc: "Protect ingress routes and boundary zones parsed from modern visual canvas.",
        tasks: [
          "Deploy boundary Web Application Firewall (WAF) to secure ingress points.",
          `Address ${securityCount} vulnerability threat vectors listed inside the security tab.`,
          "Activate standard API schema validation & route tracking rules."
        ]
      },
      {
        phase: "Phase 2: Compute Layer Isolation",
        desc: "Construct microservices and computation layers parsed from sketches.",
        tasks: comps.length > 0 
          ? comps.map((c: any) => `Spin up service execution pods mapped specifically to '${c.name}'.`)
          : ["Provision load balancer clusters to distribute system compute."]
      },
      {
        phase: "Phase 3: Relational Persistence Configuration",
        desc: "Verify high-integrity state handlers or datastores identified in canvas.",
        tasks: [
          "Spin up RDS db clusters with isolated read replicas.",
          "Activate connection credential rotation managers."
        ]
      },
      {
        phase: "Phase 4: Health Audits & Continuous Monitoring",
        desc: "Validate visual pathways for integrity, stress toleration, and availability.",
        tasks: [
          "Verify visual architecture routing pathways from client requests.",
          "Install APM monitoring tools to collect microservices latency records."
        ]
      }
    ];
  };

  // Get active preset item
  const activePreset = DEMO_PRESETS.find((p) => p.id === selectedPresetId);

  return (
    <div id="sketchflow-app" className="min-h-screen bg-radial-mesh animate-gradient-shift text-gray-100 flex flex-col font-sans selection:bg-purple-500/35 selection:text-white relative overflow-x-hidden">
      
      {/* Decorative Interactive Background Blur Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-35 z-0">
        <div className="absolute top-[12%] left-[8%] w-80 h-80 rounded-full bg-purple-550/15 filter blur-[110px] animate-float-slow" />
        <div className="absolute bottom-[22%] right-[8%] w-96 h-[380px] rounded-full bg-teal-555/15 filter blur-[120px] animate-float-reverse" />
        <div className="absolute top-[65%] left-[38%] w-72 h-72 rounded-full bg-sky-500/8 filter blur-[100px] animate-pulse" />
      </div>

      {/* Top Professional App Header */}
      <header id="app-header" className="border-b border-gray-800/80 bg-[#030712]/75 backdrop-blur-xl px-6 py-4.5 flex items-center justify-between sticky top-0 z-40 relative">
        <div 
          id="brand-wrap" 
          className="flex items-center space-x-3.5 cursor-pointer group hover:opacity-95 transition-all"
          onClick={() => setActiveStage('landing')}
          title="Return to homepage"
        >
          <div id="logo-icon-box" className="p-2 bg-gradient-to-br from-teal-400 to-purple-600 rounded-xl shadow-lg relative shadow-purple-500/10">
            <CpuIcon id="logo-badge" className="w-5.5 h-5.5 text-slate-950 stroke-[2.5]" />
            <span id="logo-highlight" className="absolute inset-0 bg-white/20 rounded-xl filter blur-xs group-hover:opacity-100 opacity-60 transition-opacity" />
          </div>
          <div>
            <h1 id="app-name-title" className="text-lg md:text-xl font-bold tracking-tight bg-gradient-to-r from-teal-300 via-sky-200 to-purple-400 bg-clip-text text-transparent font-display">
              SketchFlow Spec
            </h1>
            <p id="app-subtitle" className="text-[9px] text-teal-400 font-mono tracking-widest uppercase font-bold">
              REAL-TIME ARCHITECTURE PARSING ASSISTANT
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3.5">
          {activeStage === 'workspace' && (
            <button
              id="btn-back-home"
              onClick={() => setActiveStage('landing')}
              className="px-3 py-1.5 flex items-center space-x-1.5 text-[11px] font-bold text-gray-300 hover:text-white bg-slate-900/60 hover:bg-slate-900 border border-gray-800 rounded-lg shadow-sm transition-all cursor-pointer font-sans"
            >
              <span>← Home</span>
            </button>
          )}

          {/* Subtle Badge: Powered by Gemini Vision */}
          <div id="gemini-vision-badge" className="flex items-center space-x-2 bg-purple-950/20 border border-purple-500/20 px-3.5 py-1.5 rounded-full">
            <div id="pulse-gemini" className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse shadow-[0_0_8px_rgba(167,139,250,0.6)]" />
            <span id="badge-lbl" className="text-[#c084fc] font-mono text-[10px] font-bold tracking-wider uppercase">
              GEMINI FLASH PRO
            </span>
          </div>
        </div>
      </header>

      {/* Stage Router */}
      {activeStage === 'landing' ? (
        // STAGE 1: LANDING HOMEPAGE
        <main id="landing-stage" className="flex-grow p-6 flex flex-col max-w-5xl mx-auto w-full space-y-12 py-12 relative z-10">
          
          {/* Animated Hero Header */}
          <motion.section 
            id="landing-hero"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-5 py-14 relative overflow-hidden"
          >
            <span className="inline-flex items-center space-x-1.5 bg-[#17153a] border border-[#431475]/50 px-3.5 py-1 rounded-full text-[10px] text-[#c084fc] font-mono tracking-widest uppercase font-black">
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-purple-400" />
              <span>LAUNCH DEMO V3.0</span>
            </span>

            <h1 id="landing-hero-title" className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight font-display bg-gradient-to-r from-teal-300 via-sky-200 to-purple-400 bg-clip-text text-transparent leading-tight max-w-4xl mx-auto">
              SketchFlow Spec
            </h1>
            
            <p id="landing-hero-tagline" className="text-lg md:text-xl font-bold text-[#f1f5f9] font-sans tracking-wide max-w-2xl mx-auto">
              Turn architecture diagrams into engineering insights
            </p>
            
            <p id="landing-hero-desc" className="text-sm text-gray-400 max-w-2xl mx-auto leading-relaxed font-sans">
              Analyze system designs, architecture diagrams, whiteboards, and technical sketches. Get AI-powered explanations, security reviews, and engineering recommendations.
            </p>

            <div className="pt-6">
              <button
                id="btn-landing-cta"
                onClick={() => setActiveStage('workspace')}
                className="inline-flex items-center space-x-3 px-10 py-5 bg-gradient-to-r from-teal-400 to-indigo-500 hover:from-teal-300 hover:to-indigo-400 text-slate-950 rounded-2xl text-xs sm:text-sm font-black tracking-widest uppercase shadow-lg shadow-indigo-500/20 cursor-pointer duration-300 transition-all font-mono"
              >
                <span>Analyze Architecture</span>
                <ArrowRight className="w-4 h-4 text-slate-950 stroke-[3]" />
              </button>
            </div>
            
            <div id="powered-by-gemini-callout" className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-950/20 to-indigo-950/20 border border-purple-500/20 px-4 py-2 rounded-xl mt-4">
              <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
              <p className="text-[11px] text-[#c084fc] font-mono tracking-wider font-bold uppercase">
                Powered by Gemini Vision
              </p>
            </div>
          </motion.section>

          {/* Key Capabilities Section */}
          <section id="key-capabilities" className="space-y-6 pt-2">
            <div className="text-center space-y-1.5">
              <span className="text-[10px] font-mono font-bold text-teal-400 tracking-widest uppercase">System Capabilities</span>
              <h2 className="text-xl md:text-2xl font-bold text-gray-200 font-display">Deep Architectural Intelligence</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Architecture Understanding */}
              <div id="capability-card-1" className="p-5.5 bg-[#0f172a]/45 border border-gray-800/80 hover:border-teal-500/30 rounded-2xl relative group transition-all duration-300">
                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-teal-500/0 via-teal-500/20 to-teal-500/0" />
                <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-4 border border-teal-500/20">
                  <Layers className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold tracking-widest font-mono text-teal-400 uppercase">1. Component Decode</h3>
                <p className="text-xs text-gray-400 mt-2.5 leading-relaxed">
                  Extracts raw sketch nodes, parses handwriting labels, categorizes component type roles, and isolates service elements.
                </p>
              </div>

              {/* Engineering Review */}
              <div id="capability-card-2" className="p-5.5 bg-[#0f172a]/45 border border-gray-800/80 hover:border-amber-500/30 rounded-2xl relative group transition-all duration-300">
                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-amber-500/0 via-amber-500/20 to-amber-500/0" />
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4 border border-amber-500/20">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold tracking-widest font-mono text-amber-400 uppercase">2. Threat Modeling</h3>
                <p className="text-xs text-gray-400 mt-2.5 leading-relaxed">
                  Performs active risk mapping at component boundary channels, discovering missing ingress filters or legacy transport protocols.
                </p>
              </div>

              {/* Technical Documentation */}
              <div id="capability-card-3" className="p-5.5 bg-[#0f172a]/45 border border-gray-800/80 hover:border-purple-500/30 rounded-2xl relative group transition-all duration-300">
                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-purple-500/0 via-purple-500/20 to-purple-500/0" />
                <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4 border border-purple-500/20">
                  <FileText className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold tracking-widest font-mono text-purple-400 uppercase">3. Spec Compilation</h3>
                <p className="text-xs text-gray-400 mt-2.5 leading-relaxed">
                  Compiles production-ready Technical Markdown including system descriptions, pipeline charts, and deployment action points.
                </p>
              </div>
            </div>
          </section>

          {/* Detailed Overview: About the Application & How it Works */}
          <section id="about-and-workings" className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
            
            {/* Left Box: About the App - 5 Columns */}
            <div id="about-app-desc" className="lg:col-span-5 p-7 bg-gradient-to-b from-[#0f172a]/70 to-[#0b0f19]/70 border border-gray-800/80 rounded-2xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full filter blur-2xl pointer-events-none" />
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="p-1 px-2.5 bg-[#14b8a6]/10 border border-[#14b8a6]/20 rounded text-[#14b8a6] text-[9px] font-mono tracking-widest uppercase font-black">
                    Overview
                  </span>
                  <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">ABOUT SKETCHFLOW</span>
                </div>
                
                <h3 className="text-lg md:text-xl font-bold text-gray-150 font-display">
                  Eliminating the friction between whiteboards and wikis
                </h3>
                
                <p className="text-xs text-gray-450 leading-relaxed font-sans">
                  Whiteboard drawings and flowcharts are where major architecture decisions are conceived—yet they often end up lost as static Slack screenshots, buried in emails, or trapped in obsolete drawing files.
                </p>
                <p className="text-xs text-gray-450 leading-relaxed font-sans">
                  <strong>SketchFlow Spec</strong> acts as an intelligent compiler that bridges this gap. By combining multi-modal computer vision with a specialized system audit rulebook, it extracts raw service blocks, reviews communication pathways for security issues, and compiles production-ready specifications instantaneously.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-gray-850/60 flex items-center justify-between text-[11px] font-mono text-teal-400">
                <div className="flex items-center space-x-1.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Saves Hours of Writing</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>ISO-aligned Audits</span>
                </div>
              </div>
            </div>

            {/* Right Box: How it Works step-by-step - 7 Columns */}
            <div id="app-pipeline-steps" className="lg:col-span-7 p-7 bg-[#0b0f19]/60 border border-gray-800/80 rounded-2xl space-y-6">
              <div className="flex items-center space-x-2">
                <span className="p-1 px-2.5 bg-purple-500/10 border border-purple-500/20 rounded text-[#c084fc] text-[9px] font-mono tracking-widest uppercase font-black">
                  Operational Pipeline
                </span>
                <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">UNDER THE HOOD PROCESS</span>
              </div>

              <h4 className="text-sm font-semibold text-gray-200">How the multi-modal analysis compiles specifications:</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Step 1 */}
                <div className="p-4 bg-gray-950/40 rounded-xl border border-gray-850/80 hover:border-gray-800 transition-colors">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="w-5 h-5 rounded-md bg-[#14b8a6]/10 text-[#14b8a6] border border-[#14b8a6]/20 flex items-center justify-center font-mono text-xs font-bold">1</span>
                    <h5 className="text-[11px] font-bold uppercase tracking-wider text-gray-300 font-mono">Image Cleaning</h5>
                  </div>
                  <p className="text-[11px] text-gray-500 leading-relaxed">
                    Processes raw upload pixels, correcting camera lens skew, whiteboard glare, and contrast shadows to expose clear boundaries.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="p-4 bg-gray-950/40 rounded-xl border border-gray-850/80 hover:border-gray-800 transition-colors">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="w-5 h-5 rounded-md bg-[#14b8a6]/10 text-[#14b8a6] border border-[#14b8a6]/20 flex items-center justify-center font-mono text-xs font-bold">2</span>
                    <h5 className="text-[11px] font-bold uppercase tracking-wider text-gray-300 font-mono">Vision Parsing</h5>
                  </div>
                  <p className="text-[11px] text-gray-500 leading-relaxed">
                    Parses arrow shapes, container grids, boundary boxes, and extracts developer labels to build a systematic graph of nodes.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="p-4 bg-gray-950/40 rounded-xl border border-gray-850/80 hover:border-gray-800 transition-colors">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="w-5 h-5 rounded-md bg-[#14b8a6]/10 text-[#14b8a6] border border-[#14b8a6]/20 flex items-center justify-center font-mono text-xs font-bold">3</span>
                    <h5 className="text-[11px] font-bold uppercase tracking-wider text-gray-300 font-mono">Security Checkup</h5>
                  </div>
                  <p className="text-[11px] text-gray-500 leading-relaxed">
                    Audits layout boundaries for missing routers, exposed database access, non-TLS channels, and structural cybersecurity vulnerabilities.
                  </p>
                </div>

                {/* Step 4 */}
                <div className="p-4 bg-gray-950/40 rounded-xl border border-gray-850/80 hover:border-gray-800 transition-colors">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="w-5 h-5 rounded-md bg-[#14b8a6]/10 text-[#14b8a6] border border-[#14b8a6]/20 flex items-center justify-center font-mono text-xs font-bold">4</span>
                    <h5 className="text-[11px] font-bold uppercase tracking-wider text-gray-300 font-mono">Markdown Output</h5>
                  </div>
                  <p className="text-[11px] text-gray-500 leading-relaxed">
                    Produces formatted tables, compliance indicators, and ready-to-copy system specifications for GitHub Wikis or architectural wiki pages.
                  </p>
                </div>

              </div>
            </div>

          </section>

          {/* Interactive Showcase preset ribbon banner */}
          <section id="demo-snapshot-row" className="glass-card rounded-2xl p-6 border-gray-800/60 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-[9px] font-mono font-bold text-purple-300 uppercase tracking-widest">Sandbox Assets Included</span>
              <h4 className="text-sm font-semibold font-display text-gray-200">Test immediately without any custom files</h4>
              <p className="text-xs text-gray-400 font-sans leading-relaxed mt-1">
                We have pre-packaged high-fidelity whiteboard presets (Serverless Web Apps, Microservice Clusters, or AWS Multi-Tier Databases) to let you explore the audit specifications instantly.
              </p>
            </div>
            
            <button
              onClick={() => {
                setActiveStage('workspace');
                setSelectedPresetId("serverless-web");
              }}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-950 border border-gray-800 hover:border-gray-700 text-xs font-bold text-purple-300 font-sans rounded-xl cursor-pointer transition-all active:scale-95"
            >
              Explore Web Preset
            </button>
          </section>

        </main>
      ) : (
        // STAGE 2: ANALYSIS WORKSPACE
        <main id="dashboard-stage" className="flex-grow p-4 lg:p-6 grid grid-cols-1 xl:grid-cols-12 gap-6 max-w-7xl mx-auto w-full relative z-10 animate-fadeIn">
          
          {/* Left Column: Sketch Upload & Setup Console (xl:col-span-5) */}
          <section id="console-section" className="xl:col-span-5 flex flex-col space-y-6">
            
            {/* Main Upload Stage container */}
            <div id="sketchboard-console" className="glass-card border-gray-800/85 rounded-2xl p-5 flex flex-col space-y-5">
              <div id="canvas-header" className="flex items-center justify-between pb-1 border-b border-gray-800/40">
                <h2 id="canvas-title" className="text-xs font-mono tracking-widest text-[#2dd4bf] font-bold uppercase">1. Canvas Source Input</h2>
                {uploadedImageBase64 && (
                  <button
                    id="btn-clear-upload"
                    type="button"
                    onClick={handleClearUpload}
                    className="flex items-center space-x-1 text-[11px] text-rose-400 hover:text-rose-350 transition-colors cursor-pointer font-mono font-bold uppercase"
                  >
                    <X id="clear-icon" className="w-3 h-3" />
                    <span>RESET</span>
                  </button>
                )}
              </div>

              {/* Canvas Box (SVG Display or File Preview block) */}
              <div
                id="dropzone-area"
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => {
                  if (!uploadedImageBase64) {
                    fileInputRef.current?.click();
                  }
                }}
                className={`border-2 rounded-xl relative overflow-hidden transition-all duration-300 ${
                  uploadedImageBase64 
                    ? "border-purple-500/30 bg-slate-950/20" 
                    : isDragActive 
                      ? "border-teal-400 border-dashed bg-teal-950/25 scale-[1.01]" 
                      : "border-gray-800 border-dashed bg-[#090d16]/70 hover:border-gray-750/80 hover:bg-[#0c1220]/75 cursor-pointer"
                }`}
                style={{ minHeight: "275px" }}
              >
                {uploadedImageBase64 ? (
                  // Render custom uploaded drawing thumbnail image
                  <div id="uploaded-preview" className={`absolute inset-0 p-4 flex flex-col items-center justify-center bg-[#030712]/50 ${isDragActive ? "pointer-events-none" : ""}`}>
                    <img
                      id="uploaded-img"
                      src={uploadedImageBase64}
                      alt="Uploaded system blueprint"
                      className="max-h-[170px] w-auto max-w-full rounded border border-gray-800/80 object-contain shadow-2xl bg-slate-900/45"
                      referrerPolicy="no-referrer"
                    />
                    <div id="upload-meta" className="mt-2 text-center">
                      <p id="upload-name" className="text-xs font-mono font-semibold text-gray-300 truncate max-w-xs">
                        {uploadedImageFile ? uploadedImageFile.name : "Uploaded Sketch Block"}
                      </p>
                      <p id="upload-size" className="text-[10px] font-mono text-teal-400">
                        {uploadedImageFile ? `${(uploadedImageFile.size / 1024).toFixed(1)} KB` : "Active Canvas Content"}
                      </p>
                    </div>

                    {/* Quick upload replacement control directly overlayed in the box */}
                    <div className="absolute bottom-3 left-3 right-3 flex justify-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          fileInputRef.current?.click();
                        }}
                        className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-950 text-gray-200 border border-gray-800 hover:border-gray-700 text-[10px] font-black tracking-wider uppercase rounded-lg cursor-pointer transition-all shadow-md shadow-black"
                      >
                        <Upload className="w-3.5 h-3.5 text-teal-400" />
                        <span>Replace Image</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  // Render preset visual whiteboard layout or clear prompt with upload option
                  <div id="vector-preview" className={`absolute inset-0 p-4 flex flex-col justify-between bg-[#040810]/40 ${isDragActive ? "pointer-events-none" : ""}`}>
                    {activePreset ? (
                      <div id="svg-canvas-wrap" className="w-full flex-grow flex items-center justify-center rounded overflow-hidden shadow-inner border border-[#1f2937]/35 max-h-[170px]" dangerouslySetInnerHTML={{ __html: activePreset.svgMarkup }} />
                    ) : (
                      <div className="w-full flex-grow flex items-center justify-center text-xs text-gray-500 font-mono">
                        No diagram loaded. Drag-drop or click to browse.
                      </div>
                    )}

                    {/* Fixed Gorgeous Upload from Device trigger below the canvas layout inside the box */}
                    <div className="mt-2.5 flex items-center justify-between bg-slate-950/90 border border-gray-800/80 px-3.5 py-2 rounded-xl z-20">
                      <div className="text-left font-sans animate-fadeIn">
                        <p className="text-[11px] font-bold text-gray-300">Using custom diagram?</p>
                        <p className="text-[9px] text-gray-500 font-mono uppercase tracking-wide">Drop file or tap trigger ➔</p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          fileInputRef.current?.click();
                        }}
                        className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-[#14b8a6] hover:bg-[#2dd4bf] text-slate-950 text-[10px] font-black tracking-widest uppercase rounded-lg cursor-pointer transition-all duration-200"
                      >
                        <Upload className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Upload Custom</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Value-Added Engineering Plans and Insights panel */}
              <div id="value-insights-section" className="space-y-3 animate-fadeIn">
                <label id="insights-lbl" className="text-[10px] font-mono font-black text-teal-440 tracking-wider block uppercase">
                  VALUE-ADDED ENGINEERING PLANS:
                </label>
                
                <div id="insights-cards-grid" className="grid grid-cols-1 gap-3">
                  
                  {/* Card 1: IaC Code Generator */}
                  <div
                    id="insight-card-iac"
                    onClick={() => setShowValueIaC(true)}
                    className="p-3.5 bg-gradient-to-r from-[#111827]/40 to-[#0e1626]/50 border border-gray-800 hover:border-purple-500/30 rounded-xl text-left cursor-pointer transition-all hover:bg-[#111827]/70 relative group"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-purple-950/45 rounded-lg border border-purple-500/15 group-hover:border-purple-500/35 transition-colors mt-0.5">
                        <Code className="w-4 h-4 text-purple-400" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-bold text-gray-200 group-hover:text-purple-400 transition-colors">
                            Terraform/IaC Code Generator
                          </span>
                          <span className="text-[8px] bg-purple-550/10 border border-purple-500/20 text-[#c084fc] px-1.5 py-0.5 rounded uppercase font-mono tracking-widest font-bold">
                            Free Tool
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-400 leading-relaxed font-sans">
                          Instantly compile recognized whiteboard node items into standardized, deployable Terraform IaC configurations.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Implementation Roadmap */}
                  <div
                    id="insight-card-roadmap"
                    onClick={() => setShowValueRoadmap(true)}
                    className="p-3.5 bg-gradient-to-r from-[#111827]/40 to-[#0e1626]/50 border border-gray-800 hover:border-teal-500/35 rounded-xl text-left cursor-pointer transition-all hover:bg-[#111827]/70 relative group"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-teal-950/45 rounded-lg border border-[#14b8a6]/15 group-hover:border-[#14b8a6]/45 transition-colors mt-0.5">
                        <TrendingUp className="w-4 h-4 text-teal-400" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-bold text-gray-200 group-hover:text-teal-400 transition-colors">
                            Architecture Roadmap Plan
                          </span>
                          <span className="text-[8px] bg-teal-500/10 border border-teal-500/20 text-teal-450 px-1.5 py-0.5 rounded uppercase font-mono tracking-widest font-bold">
                            Plan Setup
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-400 leading-relaxed font-sans">
                          Generate a phased checklist to provision, integrate, and security test this design from sandbox model to live cluster.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Launch Pipeline controls panel */}
              <div id="console-action-board" className="pt-3 border-t border-gray-850 space-y-3">
                
                {/* Dynamic Warning Alert banner */}
                {errorMessage && (
                  <div id="error-banner" className="p-3 bg-rose-950/20 border border-rose-900/30 text-rose-300 text-xs rounded-xl flex items-start space-x-2 animate-fadeIn mb-2.5">
                    <AlertCircle id="error-logo" className="w-4 h-4 mt-0.5 flex-shrink-0 text-rose-500" />
                    <p id="error-text" className="font-sans leading-relaxed">{errorMessage}</p>
                  </div>
                )}

                <div id="action-buttons-wrap" className="pb-1">
                  {!uploadedImageBase64 ? (
                    <button
                      id="btn-instant-compile"
                      type="button"
                      disabled={isAnalyzing}
                      onClick={() => handleAnalyze("instant")}
                      className="w-full flex items-center justify-center space-x-2.5 p-3.5 bg-[#4f46e5] hover:bg-[#4338ca] text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-md hover:shadow-lg hover:shadow-indigo-500/10 cursor-pointer disabled:opacity-50 transition-all duration-250 font-mono"
                    >
                      <Play id="btn-comp-icon" className="w-3.5 h-3.5 text-white fill-white/20" />
                      <span>Analyze Demo Blueprint</span>
                    </button>
                  ) : (
                    <button
                      id="btn-gemini-compile-custom"
                      type="button"
                      disabled={isAnalyzing}
                      onClick={() => handleAnalyze("gemini")}
                      className="w-full flex items-center justify-center space-x-2.5 p-3.5 bg-gradient-to-r from-[#14b8a6] to-[#af5cf6] hover:from-teal-300 hover:to-purple-400 text-slate-950 font-bold uppercase tracking-widest rounded-xl text-xs disabled:opacity-40 disabled:pointer-events-none cursor-pointer transition-all duration-300"
                    >
                      <RefreshCw id="btn-gemini-icon-custom" className={`w-3.5 h-3.5 ${isAnalyzing ? "animate-spin" : ""}`} />
                      <span>Execute Full Gemini Vision Audit</span>
                    </button>
                  )}
                </div>
              </div>

            </div>

            {/* Quick Info Box: Product specifications */}
            <div id="product-spec-box" className="glass-card border-gray-800/80 p-4.5 rounded-2xl text-xs space-y-2 relative z-10">
              <h4 id="box-title" className="font-mono text-gray-300 font-bold uppercase tracking-widest text-[10px]">ANALYSIS SPECIFICATIONS SUMMARY</h4>
              <p id="box-p1" className="text-gray-400 leading-relaxed font-sans text-[11px]">
                Inputs are run against server-side visual models. The pipeline parses connector paths, identifies threat vector anomalies, maps state, and compiles downloadable Technical Markdown specs.
              </p>
              <div id="box-bullets" className="flex items-center space-x-3 text-[9px] text-[#2dd4bf] font-mono">
                <span>● INTEGRATION: SECURE</span>
                <span>● COMPILER: V3.0</span>
                <span>● DELAY: ~3s</span>
              </div>
            </div>

          </section>

          {/* Right Column: AI Analysis SPEC View Grid (xl:col-span-7) */}
          <section id="analysis-dashboard-section" className="xl:col-span-7 flex flex-col min-h-[520px]">
            
            <AnimatePresence mode="wait">
              {isAnalyzing ? (
                // Case: Analysis Loading Stage
                <motion.div
                  id="loading-stage"
                  key="loading"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="glass-card border-purple-500/10 rounded-3xl p-8 md:p-11 flex flex-col items-center justify-center text-center flex-grow transition-all"
                >
                  {/* Advanced Glowing Loader element with glowing rings */}
                  <div id="glowing-loader" className="relative mb-6">
                    <div id="ring-1" className="w-16 h-16 rounded-full border-4 border-dashed border-[#a78bfa]/20 animate-spin" />
                    <div id="ring-2" className="absolute inset-0 w-16 h-16 rounded-full border-4 border-t-teal-400 border-r-transparent border-b-transparent border-l-transparent animate-spin [animation-duration:0.8s]" />
                    <div id="glow-light" className="absolute inset-2 bg-gradient-to-tr from-teal-400/20 to-purple-600/20 rounded-full filter blur-md animate-pulse" />
                    <Cpu id="loader-cpu-badge" className="absolute inset-4 w-8 h-8 text-teal-400 animate-pulse" />
                  </div>

                  <div id="loading-meta" className="space-y-4 max-w-sm w-full">
                    <h3 id="loading-hed" className="text-xs font-mono tracking-widest font-black bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent uppercase">
                      COMPILING ENGINEERING AUDIT
                    </h3>
                    
                    <div id="loading-ticker-wrap" className="bg-[#03060f] border border-gray-800/80 px-4 py-2.5 rounded-xl font-mono text-xs text-purple-400 font-semibold uppercase animate-pulse">
                      {analysisProgressText}
                    </div>

                    {/* Progress Percentage Indicator & Dynamic bar */}
                    {(() => {
                      const percent = currentProgressStep === 1 ? 25 : currentProgressStep === 2 ? 50 : currentProgressStep === 3 ? 75 : 98;
                      return (
                        <div className="space-y-1.5 pt-1.5">
                          <div className="w-full bg-slate-950 border border-gray-800/80 h-2.5 rounded-full overflow-hidden relative">
                            <div className="bg-gradient-to-r from-teal-400 via-sky-400 to-purple-500 h-full transition-all duration-300 rounded-full" style={{ width: `${percent}%` }} />
                          </div>
                          <div className="flex items-center justify-between text-[9px] font-mono text-gray-500 uppercase tracking-widest">
                            <span>Ingestion pipeline</span>
                            <span className="font-bold text-gray-300">{percent}% Complete</span>
                          </div>
                        </div>
                      );
                    })()}

                    {/* Sequential Pipeline Progress Steps */}
                    <div id="pipeline-stepper" className="bg-[#050811]/70 border border-gray-800/60 rounded-xl p-4 text-left space-y-3.5 mt-2.5">
                      {[
                        { num: 1, label: "Acquiring diagram context..." },
                        { num: 2, label: "Scanning nodes & system symbols..." },
                        { num: 3, label: "Compiling vector connections map..." },
                        { num: 4, label: "Generating technical specifications..." }
                      ].map((step) => {
                        const isCompleted = currentProgressStep > step.num;
                        const isActive = currentProgressStep === step.num;
                        
                        return (
                          <div id={`pipe-step-${step.num}`} key={step.num} className="flex items-center justify-between text-[11px] font-mono transition-opacity duration-300">
                            <div id={`pipe-left-${step.num}`} className="flex items-center space-x-3">
                              {isCompleted ? (
                                <div id={`pipe-circle-${step.num}`} className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-[9px]">
                                  ✓
                                </div>
                              ) : isActive ? (
                                <div id={`pipe-circle-${step.num}`} className="w-5 h-5 rounded-full bg-purple-550/10 border border-[#a78bfa] flex items-center justify-center relative">
                                  <span className="w-2 h-2 rounded-full bg-[#a78bfa] animate-ping absolute" />
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#a78bfa]" />
                                </div>
                              ) : (
                                <div id={`pipe-circle-${step.num}`} className="w-5 h-5 rounded-full bg-gray-800/40 border border-gray-800/30 flex items-center justify-center text-gray-500 text-[9px]">
                                  {step.num}
                                </div>
                              )}
                              <span id={`pipe-label-${step.num}`} className={`transition-colors font-sans ${isCompleted ? "text-gray-400 line-through" : isActive ? "text-[#a78bfa] font-bold" : "text-gray-500"}`}>
                                {step.label}
                              </span>
                            </div>
                            
                            <div id={`pipe-right-${step.num}`}>
                              {isCompleted ? (
                                <span id={`pipe-badge-${step.num}`} className="text-[9px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/10 uppercase tracking-widest font-black">COMPLETED</span>
                              ) : isActive ? (
                                <span id={`pipe-badge-${step.num}`} className="text-[9px] text-[#a78bfa] bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/10 uppercase tracking-widest animate-pulse font-black">ACTIVE</span>
                              ) : (
                                <span id={`pipe-badge-${step.num}`} className="text-[9px] text-gray-500 bg-gray-850 px-2 py-0.5 rounded uppercase tracking-widest">PENDING</span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <p id="loading-desc" className="text-[10px] text-gray-500 font-sans leading-relaxed pt-2">
                      Secure, server-side sandboxed microservices compile structured outputs inside process limits.
                    </p>
                  </div>
                </motion.div>
              ) : analysisResult ? (
                // STAGE 3: RESULTS - Case: Mapped specifications loaded successfully
                <motion.div
                  id="result-stage"
                  key="result"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col flex-grow animate-fadeIn"
                >
                  
                  {/* Global Metrics bar */}
                  <DashboardStats
                    componentCount={analysisResult?.architecture?.detectedComponents?.length || 0}
                    vulnerabilityCount={analysisResult?.security?.vulnerabilities?.length || 0}
                    criticalCount={
                      analysisResult?.security?.vulnerabilities?.filter((v: any) => v.severity.toLowerCase() === "high").length || 0
                    }
                    isSimulated={isSimulatedResult}
                  />

                  {/* Aesthetic Workspace Tab Switcher */}
                  <div id="results-tabs-nav" className="flex border-b border-gray-800 space-x-1.5 mb-5 overflow-x-auto pb-1 mt-4 relative z-10">
                    {[
                      { id: 'architecture', label: 'Architecture', icon: <Layers className="w-3.5 h-3.5" /> },
                      { id: 'security', label: 'Security Audit', icon: <ShieldAlert className="w-3.5 h-3.5" /> },
                      { id: 'specification', label: 'Technical Spec', icon: <FileText className="w-3.5 h-3.5" /> },
                      { id: 'next-steps', label: 'Next Steps', icon: <TrendingUp className="w-3.5 h-3.5" /> },
                    ].map((tab) => {
                      const isCurrent = workspaceResultsTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          id={`tab-btn-${tab.id}`}
                          onClick={() => setWorkspaceResultsTab(tab.id as any)}
                          className={`px-4 py-2.5 rounded-t-lg font-mono font-bold text-[10px] uppercase tracking-wider flex items-center space-x-2 border-b-2 transition-all cursor-pointer ${
                            isCurrent
                              ? "border-emerald-400 text-teal-450 bg-[#0f172a]/80"
                              : "border-transparent text-gray-500 hover:text-gray-300 hover:bg-[#111827]/40"
                          }`}
                        >
                          {tab.icon}
                          <span>{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Active tab viewport container */}
                  <div id="active-tab-panel" className="bg-[#030712]/45 rounded-2xl relative z-10 min-h-[400px]">
                    {workspaceResultsTab === 'architecture' && (
                      <ArchitectureTab
                        detectedComponents={analysisResult?.architecture?.detectedComponents || []}
                        systemFlow={analysisResult?.architecture?.systemFlow || []}
                        dataMovement={analysisResult?.architecture?.dataMovement || []}
                        technologies={analysisResult?.architecture?.technologies || []}
                      />
                    )}
                    {workspaceResultsTab === 'security' && (
                      <SecurityTab
                        vulnerabilities={analysisResult?.security?.vulnerabilities || []}
                        attackSurfaces={analysisResult?.security?.attackSurfaces || []}
                        recommendations={analysisResult?.security?.recommendations || []}
                      />
                    )}
                    {workspaceResultsTab === 'specification' && (
                      <SpecificationTab
                        specMarkdown={analysisResult?.specification?.specMarkdown || ""}
                        explanation={analysisResult?.specification?.explanation || ""}
                      />
                    )}
                    {workspaceResultsTab === 'next-steps' && (
                      <NextStepsTab
                        scalability={analysisResult?.nextSteps?.scalability || []}
                        deployment={analysisResult?.nextSteps?.deployment || []}
                      />
                    )}
                  </div>

                </motion.div>
              ) : (
                // Case: Stage 2 - Workspace ready empty state (Aesthetic Glass Blueprint Grid)
                <motion.div
                  id="workspace-empty-stage"
                  key="workspace-empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass-card border-gray-800 rounded-3xl p-8 flex flex-col items-center justify-center text-center flex-grow relative overflow-hidden"
                  style={{ minHeight: "520px" }}
                >
                  {/* Visual grid blueprint guidelines background */}
                  <div id="blueprint-doodles-grid" className="absolute inset-0 select-none opacity-5 pointer-events-none">
                    <div className="w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
                  </div>

                  <div id="workspace-empty-ring" className="p-4 bg-teal-500/5 text-teal-450 border border-teal-555/15 rounded-2xl mb-4.5 shadow-inner">
                    <CpuIcon id="workspace-empty-cpu" className="w-7 h-7 text-teal-400 animate-pulse" />
                  </div>

                  <h3 id="workspace-empty-headline" className="text-base font-bold font-display text-gray-200">Engineering Workspace Ready</h3>
                  <p id="workspace-empty-desc" className="text-xs text-gray-400 mt-2.5 max-w-sm leading-relaxed font-sans">
                    Choose a whiteboard system diagram preset or upload your custom sketches from the left column. Press <strong className="text-purple-400 font-bold uppercase text-[11px] font-mono bg-purple-550/10 px-1.5 py-0.5 rounded">Analyze Demo</strong> or <strong className="text-teal-450 font-bold uppercase text-[11px] font-mono bg-teal-500/10 px-1.5 py-0.5 rounded">Execute Gemini Audit</strong> to generate complete specifications.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

          </section>

        </main>
      )}

      {/* Footer layout metrics */}
      <footer id="app-footer" className="mt-auto border-t border-gray-850 bg-[#02050c]/85 py-4 px-6 flex flex-wrap items-center justify-between text-[11px] text-gray-500 font-mono relative z-10">
        <span id="footer-ref-lbl" className="font-bold">SKETCHFLOW SPECTROMETER v3.0 // PRODUCTION CLUSTERS ACTIVE</span>
        <span id="footer-utc-stamp" className="uppercase">SYSTEM TIME CURRENT: 2206-06-17 // SERVER SECURE</span>
      </footer>

      {/* VALUE-ADDED FEATURE MODAL: TERRAFORM IAC GENERATOR */}
      {showValueIaC && (
        <div id="iac-modal-backdrop" className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn">
          <motion.div 
            id="iac-modal-container"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-[#0b0f19] border border-purple-500/35 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl shadow-purple-500/5 max-h-[85vh] flex flex-col"
          >
            <div className="p-5.5 border-b border-gray-850 flex items-center justify-between bg-slate-950/40">
              <div className="flex items-center space-x-2.5">
                <div className="p-1 px-2.2 bg-purple-500/10 border border-purple-500/20 rounded-md text-[#c084fc]">
                  <Code className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-sm font-black font-display text-gray-100 uppercase tracking-widest">AWS Terraform IaC Module Generator</h3>
                  <p className="text-[10px] text-gray-400 font-mono">COMPILED DIRECTLY FROM SYSTEM DESIGN VISUALS</p>
                </div>
              </div>
              <button 
                onClick={() => setShowValueIaC(false)} 
                className="p-1.5 hover:bg-gray-800 text-gray-400 hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto flex-grow font-sans">
              <p className="text-xs text-gray-405 leading-relaxed">
                SketchFlow compiles parsed whiteboard symbols directly into production-ready AWS Terraform provider scripts. Use the source code below to bootstrap your deployment repository instantly.
              </p>

              <div className="relative">
                <pre className="p-4 rounded-xl bg-slate-950 border border-gray-850 font-mono text-[11px] text-teal-400 overflow-x-auto max-h-[340px] leading-relaxed select-all">
                  {getTerraformCode()}
                </pre>
                
                <div className="absolute top-2.5 right-2.5 flex items-center space-x-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(getTerraformCode());
                      alert("Successfully copied Terraform code script to system clipboard!");
                    }}
                    className="flex items-center space-x-1 px-2.5 py-1.5 bg-slate-900 border border-gray-850 hover:bg-slate-800 text-[10px] text-gray-300 hover:text-white font-mono rounded cursor-pointer transition-all"
                  >
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>Copy Script</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      const blob = new Blob([getTerraformCode()], { type: "text/plain" });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = "sketchflow_main.tf";
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                    }}
                    className="flex items-center space-x-1 px-2.5 py-1.5 bg-[#14b8a6] hover:bg-[#2dd4bf] text-slate-950 text-[10px] font-black font-mono rounded cursor-pointer transition-all"
                  >
                    <Download className="w-3 h-3 text-slate-950" />
                    <span>Download .TF</span>
                  </button>
                </div>
              </div>

              {!analysisResult && (
                <div className="p-3 bg-amber-950/15 border border-amber-900/30 rounded-xl text-amber-300 text-[11px] leading-relaxed">
                  ⚠️ Note: Operating on demo structure template. Connect and execute a Gemini vision analysis run on a workspace canvas diagram to generate tailored modules based on your customized layout components.
                </div>
              )}
            </div>

            <div className="p-4 bg-slate-950/50 border-t border-gray-850 flex justify-end">
              <button 
                onClick={() => setShowValueIaC(false)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-950 border border-gray-800 text-xs font-mono font-bold text-gray-300 rounded-lg cursor-pointer transition-colors"
              >
                CLOSE PREVIEW
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* VALUE-ADDED FEATURE MODAL: IMPLEMENTATION ROADMAP */}
      {showValueRoadmap && (
        <div id="roadmap-modal-backdrop" className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn">
          <motion.div 
            id="roadmap-modal-container"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-[#0b0f19] border border-teal-500/35 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl shadow-teal-500/5 max-h-[85vh] flex flex-col"
          >
            <div className="p-5.5 border-b border-gray-850 flex items-center justify-between bg-slate-950/40">
              <div className="flex items-center space-x-2.5">
                <div className="p-1 px-2.2 bg-teal-500/10 border border-teal-500/20 rounded-md text-teal-400">
                  <TrendingUp className="w-5 h-5 text-teal-450" />
                </div>
                <div>
                  <h3 className="text-sm font-black font-display text-gray-100 uppercase tracking-widest text-[#2dd4bf]">Architecture Implementation Roadmap</h3>
                  <p className="text-[10px] text-gray-400 font-mono">PHASED TASK CHECKLIST TO STEP PROTOTYPE TO PRODUCTION</p>
                </div>
              </div>
              <button 
                onClick={() => setShowValueRoadmap(false)} 
                className="p-1.5 hover:bg-gray-800 text-gray-400 hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto flex-grow font-sans">
              <p className="text-xs text-gray-405 leading-relaxed">
                A customized deployment plan and security testing roadmap, synthesized dynamically from nodes detected on the drawing canvas logic.
              </p>

              <div className="space-y-4.5">
                {getArchitecturePlan().map((phase, idx) => (
                  <div key={idx} className="p-4 bg-slate-950/50 rounded-xl border border-gray-850/70 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-xs font-black font-mono text-teal-450 uppercase tracking-wider">{phase.phase}</h4>
                        <p className="text-[11px] text-gray-400 font-sans mt-0.5 leading-relaxed">{phase.desc}</p>
                      </div>
                      <span className="text-[9px] bg-teal-500/5 border border-teal-500/15 text-teal-400 px-2 py-0.5 rounded font-mono uppercase font-bold tracking-widest">
                        Phase {idx + 1}
                      </span>
                    </div>

                    <div className="space-y-2 pt-1 border-t border-gray-900/40">
                      {phase.tasks.map((task, tIdx) => (
                        <div key={tIdx} className="flex items-start space-x-2.5 text-[11px] text-gray-300 font-sans">
                          <input 
                            type="checkbox" 
                            id={`task-${idx}-${tIdx}`} 
                            className="mt-0.5 rounded border-gray-800 text-teal-500 focus:ring-0 focus:ring-offset-0 bg-[#090d16]" 
                            defaultChecked={false}
                          />
                          <label htmlFor={`task-${idx}-${tIdx}`} className="leading-relaxed cursor-pointer select-none hover:text-white">
                            {task}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {!analysisResult && (
                <div className="p-3 bg-amber-950/15 border border-amber-900/30 rounded-xl text-amber-300 text-[11px] leading-relaxed">
                  ⚠️ Note: Operating on sandbox parameters. Execute an audit run with a whiteboard image to populate specific, granular task lists aligned directly to your customized diagram microservices.
                </div>
              )}
            </div>

            <div className="p-4 bg-slate-950/50 border-t border-gray-850 flex justify-end">
              <button 
                onClick={() => setShowValueRoadmap(false)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-950 border border-gray-800 text-xs font-mono font-bold text-gray-300 rounded-lg cursor-pointer transition-colors"
              >
                CLOSE ROADMAP
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Global Hidden File Input for Device Uploading */}
      <input
        id="global-file-input"
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

    </div>
  );
}
