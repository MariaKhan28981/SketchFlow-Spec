export interface SketchDetail {
  id: string;
  title: string;
  description: string;
  svgMarkup: string;
  analysis: {
    architecture: {
      detectedComponents: Array<{ name: string; type: string; description: string; confidence?: number; needsVerification?: boolean }>;
      systemFlow: Array<{ from: string; to: string; description: string }>;
      dataMovement: Array<{ flowType: string; description: string }>;
      technologies: Array<{ componentName: string; technologies: string[] }>;
    };
    security: {
      vulnerabilities: Array<{ title: string; severity: "High" | "Medium" | "Low"; description: string; recommendation: string }>;
      attackSurfaces: Array<{ area: string; risks: string[] }>;
      recommendations: Array<{ title: string; priority: "Critical" | "High" | "Medium" | "Low"; steps: string[] }>;
    };
    specification: {
      specMarkdown: string;
      explanation: string;
    };
    nextSteps: {
      scalability: Array<{ name: string; benefit: string; difficulty: "Easy" | "Medium" | "Hard" }>;
      deployment: Array<{ phase: string; description: string }>;
    };
  };
}

export const DEMO_PRESETS: SketchDetail[] = [
  {
    id: "serverless-web",
    title: "Serverless Web App",
    description: "A highly resilient consumer-facing web app using global content delivery, managed API routing, and a NoSQL persistence tier.",
    svgMarkup: `<svg viewBox="0 0 800 450" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="select-none">
      <!-- Background white-board style -->
      <rect width="100%" height="100%" fill="#0a0f1d" />
      <g stroke="#38bdf8" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="0.85">
        <!-- Grid pattern overlay -->
        <path d="M 0 50 L 800 50 M 0 100 L 800 100 M 0 150 L 800 150 M 0 200 L 800 200 M 0 250 L 800 250 M 0 300 L 800 300 M 0 350 L 800 350 M 0 400 L 800 400" stroke="#1e293b" stroke-width="1" />
        <path d="M 100 0 L 100 450 M 200 0 L 200 450 M 300 0 L 300 450 M 400 0 L 400 450 M 500 0 L 500 450 M 600 0 L 600 450 M 700 0 L 700 450" stroke="#1e293b" stroke-width="1" />

        <!-- User / Browser Node -->
        <path d="M 40 210 Q 50 190 60 210 T 80 210 L 80 250 L 40 250 Z" stroke="#38bdf8" stroke-width="2.5" />
        <circle cx="60" cy="180" r="15" stroke="#38bdf8" stroke-width="2.5" />
        <path d="M 25 215 L 95 215" stroke="#38bdf8" stroke-width="2" />
        <text x="35" y="280" fill="#38bdf8" font-family="monospace" font-size="12px">User Client</text>

        <!-- Dynamic Hand-draw Arrow 1 -->
        <path d="M 95 210 L 155 210 M 145 200 L 155 210 L 145 220" stroke="#38bdf8" stroke-width="2" />

        <!-- CloudFront CDN Box -->
        <rect x="170" y="150" width="110" height="120" rx="10" stroke="#f472b6" stroke-width="2.5" />
        <text x="185" y="180" fill="#f472b6" font-family="monospace" font-size="13px" font-weight="bold">CloudFront</text>
        <text x="195" y="200" fill="#94a3b8" font-family="monospace" font-size="11px">Edge Cache</text>
        <path d="M 180 230 Q 225 220 270 230" stroke="#f472b6" stroke-width="1.5" />

        <!-- Arrow CloudFront -> S3 Bucket -->
        <path d="M 225 150 Q 225 100 340 100" stroke="#a78bfa" stroke-width="2" />
        <path d="M 330 90 L 340 100 L 330 110" stroke="#a78bfa" stroke-width="2" />
        <text x="245" y="115" fill="#a78bfa" font-family="monospace" font-size="11px">Static Assets</text>

        <!-- S3 Bucket -->
        <rect x="350" y="60" width="100" height="80" rx="8" stroke="#a78bfa" stroke-width="2.5" />
        <text x="375" y="95" fill="#a78bfa" font-family="monospace" font-size="13px" font-weight="bold">S3 Bucket</text>
        <text x="382" y="115" fill="#94a3b8" font-family="monospace" font-size="11px">SPA HTML</text>

        <!-- Arrow CloudFront -> API Gateway -->
        <path d="M 280 210 L 340 210" stroke="#2dd4bf" stroke-width="2" />
        <path d="M 330 200 L 340 210 L 330 220" stroke="#2dd4bf" stroke-width="2" />
        <text x="285" y="195" fill="#2dd4bf" font-family="monospace" font-size="11px">API Calls</text>

        <!-- API Gateway -->
        <rect x="350" y="170" width="100" height="80" rx="8" stroke="#2dd4bf" stroke-width="2.5" />
        <text x="360" y="205" fill="#2dd4bf" font-family="monospace" font-size="13px" font-weight="bold">API Gateway</text>
        <text x="368" y="225" fill="#94a3b8" font-family="monospace" font-size="11px">Routing/Auth</text>

        <!-- Arrow API Gateway -> Cognito -->
        <path d="M 400 170 L 400 135" stroke="#fb7185" stroke-width="2" stroke-dasharray="4" />
        <text x="410" y="155" fill="#fb7185" font-family="monospace" font-size="11px">Validate</text>

        <!-- Auth Service / Cognito -->
        <rect x="490" y="60" width="90" height="65" rx="5" stroke="#fb7185" stroke-width="2" />
        <text x="505" y="90" fill="#fb7185" font-family="monospace" font-size="12px" font-weight="bold">Cognito</text>
        <text x="502" y="108" fill="#94a3b8" font-family="monospace" font-size="10px">Sign In / IAM</text>
        <path d="M 450 95 L 490 95" stroke="#fb7185" stroke-width="1.5" stroke-dasharray="2" />

        <!-- Arrow API Gateway -> Lambda Functions -->
        <path d="M 450 210 L 510 210" stroke="#fbbf24" stroke-width="2.5" />
        <path d="M 500 200 L 510 210 L 500 220" stroke="#fbbf24" stroke-width="2.5" />

        <!-- AWS Lambda Functions Group -->
        <rect x="520" y="160" width="110" height="100" rx="12" stroke="#fbbf24" stroke-width="2.5" />
        <text x="532" y="195" fill="#fbbf24" font-family="monospace" font-size="13px" font-weight="bold">AWS Lambda</text>
        <text x="546" y="215" fill="#fbbf24" font-family="monospace" font-size="11px">Node.js API</text>
        <path d="M 535 235 L 615 235" stroke="#fbbf24" stroke-width="1" />

        <!-- Arrow Lambda -> DynamoDB -->
        <path d="M 630 210 L 680 210" stroke="#4ade80" stroke-width="2" />
        <path d="M 670 200 L 680 210 L 670 220" stroke="#4ade80" stroke-width="2" />
        <text x="635" y="195" fill="#4ade80" font-family="monospace" font-size="11px">NoSQL</text>

        <!-- DynamoDB Cylinder Shape -->
        <g stroke="#4ade80" stroke-width="2.5">
          <ellipse cx="735" cy="180" rx="40" ry="15" fill="none" />
          <path d="M 695 180 L 695 240 Q 735 255 775 240 L 775 180" />
          <path d="M 695 200 Q 735 215 775 200" />
          <path d="M 695 220 Q 735 235 775 220" />
        </g>
        <text x="708" y="215" fill="#4ade80" font-family="monospace" font-size="12px" font-weight="bold">DynamoDB</text>

        <!-- Technical whiteboard doodles -->
        <path d="M 10 30 Q 30 10 60 20" stroke="#64748b" stroke-width="1" />
        <circle cx="60" cy="20" r="2" fill="#64748b" />
        <text x="15" y="415" fill="#475569" font-family="monospace" font-size="10px">Draft-Ref: SK-204-V2</text>
      </g>
    </svg>`,
    analysis: {
      architecture: {
        detectedComponents: [
          { name: "User Client", type: "Web Browser / SPA App", description: "Mobile and Desktop users launching the React single page app.", confidence: 95 },
          { name: "S3 Bucket", type: "Object Storage Server", description: "Serves static HTML bundles, transpiled JS scripts, and static media content safely.", confidence: 92 },
          { name: "CloudFront CDN", type: "Content Delivery Network", description: "Secures global static asset caching and coordinates SSL/TLS offloading at point of presence locations.", confidence: 92 },
          { name: "API Gateway", type: "Managed Endpoint Routing Engine", description: "Receives public HTTPS API queries, proxies requests to core services, and manages rate limiting.", confidence: 92 },
          { name: "Cognito User Pool", type: "Identity Provider (IdP)", description: "Performs secure identity routing, token issuing, session rotation, and multi-factor verification.", confidence: 81, needsVerification: true },
          { name: "AWS Lambda", type: "FaaS Serverless Compute Runtime", description: "Executes lightweight Node.js lambda queries handling checkout, data aggregation, and session flow.", confidence: 94 },
          { name: "DynamoDB NoSQL", type: "NoSQL KV Document Database", description: "Key-Value serverless storage providing microsecond-level reads and writes for session states and user metadata.", confidence: 96 }
        ],
        systemFlow: [
          { from: "User Client", to: "CloudFront CDN", description: "Client queries the app. Gets static files cached locally. Directs CRUD API mutations over HTTPS securely." },
          { from: "CloudFront CDN", to: "S3 Bucket", description: "Proxies request back to original S3 hosting buckets on Edge cache misses." },
          { from: "CloudFront CDN", to: "API Gateway", description: "Forwards all active API mutations to the routing domain safely." },
          { from: "API Gateway", to: "Cognito User Pool", description: "Performs real-time JSON Web Token (JWT) verification before lambda execution is allowed." },
          { from: "API Gateway", to: "AWS Lambda", description: "Unpacks HTTPS payload variables and invokes context-focused worker containers." },
          { from: "AWS Lambda", to: "DynamoDB NoSQL", description: "Mutates and fetches documents using partition keys under an IAM unified security role." }
        ],
        dataMovement: [
          { flowType: "Stateless SPA Hydration", description: "Transfers compiled code chunk payloads cleanly via HTTP/2 caching." },
          { flowType: "REST Action Payload", description: "Mutates persistent state via compressed application/json query bodies." },
          { flowType: "Database Read/Write Transactions", description: "Low-latency key structural reads and isolated document updates via AWS internal VPC lines." }
        ],
        technologies: [
          { componentName: "User Frontend", technologies: ["React TypeScript", "Vite", "Tailwind CSS"] },
          { componentName: "Routing & Authorization", technologies: ["AWS API Gateway", "JWT Auth", "Amazon Cognito"] },
          { componentName: "Serverless Workers", technologies: ["AWS Lambda", "Node.js 22 LTS", "AWS SDK v3"] },
          { componentName: "Data Caching & Hosting", technologies: ["AWS CloudFront", "Amazon S3"] },
          { componentName: "NoSQL DB", technologies: ["Amazon DynamoDB On-Demand Billing"] }
        ]
      },
      security: {
        vulnerabilities: [
          { title: "Direct S3 Access Vector", severity: "Medium", description: "S3 original bucket could be accessed directly without going through the CDN, causing data extraction threat and traffic billing fatigue.", recommendation: "Implement S3 Origin Access Control (OAC) allowing the bucket to accept read calls STRICTLY originating from dedicated CloudFront service principals." },
          { title: "S3 Bucket Policy Permissiveness", severity: "High", description: "Public access settings or loose IAM permissions on S3 might expose built scripts to hostile script injection.", recommendation: "Add strict Block Public Access to S3 bucket level and use narrow single-purpose IAM bucket policies with read-only restriction." },
          { title: "Unthrottled Key API Endpoints", severity: "Medium", description: "The serverless routing setup lacks default global and user-specific rate quotas, enabling DDoS or extraction scripts.", recommendation: "Enable rate limiting on AWS API Gateway and map AWS WAF rules to inspect HTTP headers and block repeating bad actors." }
        ],
        attackSurfaces: [
          { area: "Public Web Domain", risks: ["Cross-Site Scripting (XSS) through unescaped DOM payloads in incoming user profiles.", "Denial of service via HTTP flood queries." ] },
          { area: "NoSQL Persistence Layer", risks: ["Implicit NoSQL injections if dynamic Lambda queries concatenate keys raw.", "Data theft if AWS IAM policies let lambda scopes execute full scan calls." ] }
        ],
        recommendations: [
          { title: "Introduce Shield Standard & WAF rules", priority: "Critical", steps: ["Establish AWS Web Application Firewall rules for API Gateway endpoints.", "Deploy standard DDoS shielding against volumetric Layer 7 floods."] },
          { title: "Impose Principal Least Privilege", priority: "High", steps: ["Eliminate wildcard permissions (lambda:* or dynamodb:*) from IAM policies.", "Limit Lambda roles exclusively to specific DynamoDB table resource ARNs."] }
        ]
      },
      specification: {
        specMarkdown: `# Technical Specification: Serverless Web Application

## Executive System Overview
This document specifies the target architecture for a fully scalable, secure, and resilient Serverless Web Application designed to service global clients. The system delivers static assets via edge locations and delegates stateful requests to Serverless compute clusters, yielding near-zero idle running expenses.

---

## 1. Concrete System Topologies
\`\`\`
[Clients] -> [CloudFront CDN] -> [S3 Web Host]
                    |
              [API Gateway] -> [Cognito Identity]
                    |
             [AWS Lambda Node]
                    |
             [DynamoDB Persist]
\`\`\`

---

## 2. Dynamic Performance Estimates
- **Global Page Load (FP)**: &lt; 250ms via AWS Edge points.
- **Microservices API Roundtrip**: Max 120ms (FaaS latency overhead included).
- **Persistent DB Response**: Under 10ms for keyed reads/writes under normal loads.
- **Compute Pricing Baseline**: &lt; $0.0000167 per Lambda execution; zero idle server fees.

---

## 3. Storage & Configuration Policies
- **Asset Storage**: Static React files compiled cleanly and versioned. Optimized Cache-Control headers issued during deployment (e.g., \`Cache-Control: public, max-age=31536000, immutable\`).
- **Authorization Flow**: Federated secure OIDC connections via AWS Cognito SDK, returning ephemeral JSON Web Tokens (JWT) for payload signing.`,
        explanation: "This serverless design isolates state from compute completely. By serving static SPA bundles through edge caches and handling transactional requests via ephemeral workers, it achieves optimal availability and cost savings while avoiding traditional operating system patching overhead."
      },
      nextSteps: {
        scalability: [
          { name: "Implement DynamoDB Accelerator (DAX)", benefit: "Heavily reduces DB latency to sub-millisecond levels and prevents key-partition fatigue.", difficulty: "Medium" },
          { name: "Establish CloudFront Edge Workers", benefit: "Enables edge routing, A/B testing, and pre-routing authentication checks right at user regions.", difficulty: "Medium" },
          { name: "Introduce AWS EventBridge Service Bus", benefit: "Decouples synchronous workflows, moving longer tasks to event brokers for background processing.", difficulty: "Hard" }
        ],
        deployment: [
          { phase: "Infrastructure-as-Code Setup", description: "Convert all manual assets to AWS CDK or Terraform templates to guarantee fast, repeatable region clones." },
          { phase: "Advanced Observability Deployment", description: "Enable AWS X-Ray distributed trace tracking and structured JSON logging formats in CloudWatch." }
        ]
      }
    }
  },
  {
    id: "microservice-kafka",
    title: "Microservices Event Pipeline",
    description: "An event-driven microservices backend utilizing high-throughput Apache Kafka as an ingestion broker and asynchronous worker clusters.",
    svgMarkup: `<svg viewBox="0 0 800 450" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="select-none">
      <rect width="100%" height="100%" fill="#0a0f1d" />
      <g stroke="#fbbf24" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="0.85">
        <!-- Grid pattern overlay -->
        <path d="M 0 50 L 800 50 M 0 100 L 800 100 M 0 150 L 800 150 M 0 200 L 800 200 M 0 250 L 800 250 M 0 300 L 800 300 M 0 350 L 800 350 M 0 400 L 800 400" stroke="#1e293b" stroke-width="1" />
        <path d="M 100 0 L 100 450 M 200 0 L 200 450 M 300 0 L 300 450 M 400 0 L 400 450 M 500 0 L 500 450 M 600 0 L 600 450 M 700 0 L 700 450" stroke="#1e293b" stroke-width="1" />

        <!-- Clients/Load Balancer -->
        <rect x="30" y="180" width="90" height="90" rx="8" stroke="#38bdf8" stroke-width="2" />
        <text x="45" y="222" fill="#38bdf8" font-family="monospace" font-size="12px" font-weight="bold">Ingress</text>
        <text x="40" y="240" fill="#94a3b8" font-family="monospace" font-size="10px">Nginx Proxy</text>

        <!-- Arrow Ingress -> Producer -->
        <path d="M 120 225 L 180 225" stroke="#38bdf8" stroke-width="2" />
        <path d="M 170 215 L 180 225 L 170 235" stroke="#38bdf8" stroke-width="2" />

        <!-- Microservice Producer (Order Service) -->
        <rect x="180" y="150" width="120" height="150" rx="6" stroke="#fb923c" stroke-width="2.5" />
        <text x="195" y="190" fill="#fb923c" font-family="monospace" font-size="12px" font-weight="bold">Order Service</text>
        <text x="215" y="215" fill="#94a3b8" font-family="monospace" font-size="11px">(Producer)</text>
        <path d="M 195 245 L 285 245" stroke="#fbbf24" stroke-width="1.5" />
        <rect x="200" y="260" width="80" height="25" rx="3" fill="#1e293b" stroke="#94a3b8" stroke-width="1" />
        <text x="212" y="277" fill="#e2e8f0" font-family="monospace" font-size="11px">PostgreSQL</text>

        <!-- Dynamic Hand-draw Arrow to Topic -->
        <path d="M 300 225 L 360 225" stroke="#a78bfa" stroke-width="2" />
        <path d="M 350 215 L 360 225 L 350 235" stroke="#a78bfa" stroke-width="2" />

        <!-- Apache Kafka Broker -->
        <rect x="370" y="80" width="120" height="290" rx="15" stroke="#a78bfa" stroke-width="3" />
        <text x="390" y="120" fill="#a78bfa" font-family="monospace" font-size="14px" font-weight="bold">Apache Kafka</text>
        
        <!-- Kafka Topic Channels -->
        <rect x="385" y="150" width="90" height="40" rx="4" stroke="#e0e7ff" stroke-width="1.5" />
        <text x="395" y="175" fill="#e0e7ff" font-family="monospace" font-size="11px">orders.created</text>

        <rect x="385" y="210" width="90" height="40" rx="4" stroke="#e0e7ff" stroke-width="1.5" />
        <text x="395" y="235" fill="#e0e7ff" font-family="monospace" font-size="11px">payments.done</text>

        <rect x="385" y="270" width="90" height="40" rx="4" stroke="#e0e7ff" stroke-width="1.5" />
        <text x="395" y="295" fill="#e0e7ff" font-family="monospace" font-size="11px">shipments.sent</text>

        <!-- Consumers Arrows -->
        <path d="M 490 170 L 550 170" stroke="#f43f5e" stroke-width="2" />
        <path d="M 540 160 L 550 170 L 540 180" stroke="#f43f5e" stroke-width="2" />

        <path d="M 490 290 L 550 290" stroke="#10b981" stroke-width="2" />
        <path d="M 540 280 L 550 290 L 540 300" stroke="#10b981" stroke-width="2" />

        <!-- Payment Service Consumer -->
        <rect x="560" y="110" width="130" height="110" rx="10" stroke="#f43f5e" stroke-width="2" />
        <text x="575" y="145" fill="#f43f5e" font-family="monospace" font-size="12px" font-weight="bold">Payment Svc</text>
        <text x="590" y="170" fill="#94a3b8" font-family="monospace" font-size="11px">(Consumer B)</text>
        <path d="M 575 190 Q 625 185 675 190" stroke="#f43f5e" stroke-width="1.5" />

        <!-- Inventory Service Consumer -->
        <rect x="560" y="250" width="130" height="110" rx="10" stroke="#10b981" stroke-width="2" />
        <text x="572" y="285" fill="#10b981" font-family="monospace" font-size="12px" font-weight="bold">Inventory Svc</text>
        <text x="590" y="310" fill="#94a3b8" font-family="monospace" font-size="11px">(Consumer C)</text>
        <path d="M 575 330 Q 625 325 675 330" stroke="#10b981" stroke-width="1.5" />

        <!-- Redis Cache doodle -->
        <ellipse cx="625" cy="40" rx="35" ry="15" stroke="#f43f5e" stroke-width="2" />
        <path d="M 590 40 L 590 65 Q 625 75 660 65 L 660 40" stroke="#f43f5e" stroke-width="2" />
        <text x="605" y="55" fill="#f43f5e" font-family="monospace" font-size="11px">Redis Cache</text>
        <path d="M 625 75 L 625 110" stroke="#f43f5e" stroke-width="1.5" stroke-dasharray="2" />

        <!-- Whitespace whiteboard marks -->
        <text x="50" y="415" fill="#475569" font-family="monospace" font-size="10px">Pipeline-Ref: K-BROKER-PROD-01</text>
      </g>
    </svg>`,
    analysis: {
      architecture: {
        detectedComponents: [
          { name: "Ingress Router", type: "Load Balancer / Gateway", description: "Performs layer-7 route matching and rate quotas before streaming payloads inside.", confidence: 93 },
          { name: "Order Service", type: "Microservice Web Host", description: "Handles checkout logic, validates initial relational state, and publishes to broker pipelines.", confidence: 94 },
          { name: "Apache Kafka Broker", type: "Clustered Event Bus", description: "Guarantees reliable retention, partition balancing, and stream recording for multiple consumer applications.", confidence: 92 },
          { name: "Payment Service", type: "Decoupled consumer worker", description: "Ingests 'orders.created' partition changes, charges client gateways, and commits receipts asynchronously.", confidence: 95 },
          { name: "Inventory Service", type: "Decoupled backend consumer", description: "Monitors payment actions and allocates inventory pools automatically with near-zero synchronous locks.", confidence: 84, needsVerification: true }
        ],
        systemFlow: [
          { from: "Ingress Router", to: "Order Service", description: "Routes public client shopping queries safely over mutual-TLS lines." },
          { from: "Order Service", to: "Apache Kafka Broker", description: "Publishes JSON payload mutations strictly on designated partition keys like OrderId." },
          { from: "Apache Kafka Broker", to: "Payment Service", description: "Streams topic offsets inside a managed consumer-group context." },
          { from: "Apache Kafka Broker", to: "Inventory Service", description: "Triggers background stock allocations after verifying payment complete state offsets." }
        ],
        dataMovement: [
          { flowType: "Fast Binary Event Logging", description: "Transfers raw payload buffers at scale over TCP socket lines securely." },
          { flowType: "Outbox Pattern SQL Commit", description: "Enforces dual state updates by writing to Postgres tables and writing to local outbox states concurrently." }
        ],
        technologies: [
          { componentName: "Microservice runtimes", technologies: ["Go Lang", "Gin Web framework", "Zap Logging Engine"] },
          { componentName: "Event Broker", technologies: ["Apache Kafka", "KRaft Metadata Mode", "Schema Registry"] },
          { componentName: "Persistence Tier", technologies: ["PostgreSQL Cluster", "Redis Memory Cache", "PgBouncer Router"] }
        ]
      },
      security: {
        vulnerabilities: [
          { title: "Plaintext Broker Logs Transmission", severity: "High", description: "Kafka traffic is configured on unencrypted TCP lines, exposing event data to internal network sniffers.", recommendation: "Implement TLS-encryption (SSL protocol option) for all client-to-broker node traffic and mandate SASL/SCRAM security profiles." },
          { title: "Shared Consumer Auth credentials", severity: "Medium", description: "Multiple consumer containers utilize a shared database admin credentials account.", recommendation: "Enforce Postgres roles strictly separating write-only and read-only microservice boundaries using Vault lease rotation." }
        ],
        attackSurfaces: [
          { area: "Broker Ingestion Ports", risks: ["Denial of Service via thread-exhaustion if unauthorized socket clients connect.", "Credential spoofing on unsecured SASL lines." ] },
          { area: "Order Database", risks: ["Hostile state exploitation via transaction lock exploitation or deadlocking queries." ] }
        ],
        recommendations: [
          { title: "Implement Kafka ACL Rules", priority: "Critical", steps: ["Establish explicit ACLs preventing Payment consumer from hijacking Inventory topic scopes.", "Disable auto-topic configuration schemes on production brokers."] },
          { title: "Zero Trust Service mesh integration", priority: "High", steps: ["Mandate Linkerd or Istio sidecars to wrap microservice peer communication inside automatic mTLS.", "Apply network policies blocking ingress directly into payment databases."] }
        ]
      },
      specification: {
        specMarkdown: `# Technical Specification: Event-Driven Processing Core

## Executive Summary
This document defines the core architecture for a multi-service transaction processing system designed to handle high transaction volumes with sub-millisecond data availability. Apache Kafka serves as the backbone data-bus, providing absolute isolation between consumer microservices.

---

## 1. Topologies & Broker Specs
\`\`\`
[Ingress Proxy] -> [Order Svc]
                       |
               [Kafka Cluster Bus]
               /       |       \\
   [Payment Svc]  [Notify Svc] [Inventory Svc]
\`\`\`

---

## 2. Event Partition Strategy
- **Topic Layout**: Topics are configured with a minimum partition factor of \`3\`, distributed evenly across a target 3-broker cluster setup.
- **Partition Key Selection**: All transaction actions emit with a partition target configured to \`OrderId\`, ensuring strict in-order guarantees for all subsequent processes.
- **Log Retention Policy**: Standard logging periods expire after 7 business days, with compression activated for master user profiles.

---

## 3. Worker Crash Recovery and Commit Policies
- **Manual Commit Execution**: Auto-commit flags are strictly disabled (\`enable.auto.commit=false\`). Workers manually acknowledge processing states ONLY after writing to the database lock.
- **Redelivery Thresholds**: Dead-Letter-Queues (DLQ) are configured to trigger automatically after 5 retries.`,
        explanation: "Asynchronous pipelines like this yield maximum availability. When the payment system experiences upstream outages, the ordering gateway continues working unchanged, buffering messages on Kafka brokers to process safely upon database recovery."
      },
      nextSteps: {
        scalability: [
          { name: "Establish Confluent Schema Registry", benefit: "Enforces strict Avro protocol rules, preventing broke/hostile code versions from corrupting event stream formats.", difficulty: "Medium" },
          { name: "Deploy Kafka Connect source adapters", benefit: "Automatically streams persistent SQL database transactions direct to Kafka topics without worker helper loops.", difficulty: "Medium" }
        ],
        deployment: [
          { phase: "Kubernetes Cluster Provisioning", description: "Migrate all microservice workers into standard Amazon EKS with auto-scaling HPA instances tied to live Kafka consumer lag metrics." }
        ]
      }
    }
  },
  {
    id: "analytics-pipeline",
    title: "Real-time Analytics Pipeline",
    description: "An enterprise-grade Big Data pipeline digesting streaming analytical events, processing data on Spark compute grids, and loading datalakes.",
    svgMarkup: `<svg viewBox="0 0 800 450" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="select-none">
      <rect width="100%" height="100%" fill="#0a0f1d" />
      <g stroke="#10b981" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="0.85">
        <!-- Grid pattern overlay -->
        <path d="M 0 50 L 800 50 M 0 100 L 800 100 M 0 150 L 800 150 M 0 200 L 800 200 M 0 250 L 800 250 M 0 300 L 800 300 M 0 350 L 800 350 M 0 400 L 800 400" stroke="#1e293b" stroke-width="1" />
        <path d="M 100 0 L 100 450 M 200 0 L 200 450 M 300 0 L 300 450 M 400 0 L 400 450 M 500 0 L 500 450 M 600 0 L 600 450 M 700 0 L 700 450" stroke="#1e293b" stroke-width="1" />

        <!-- IoT / Mobile Sources -->
        <rect x="25" y="150" width="90" height="150" rx="4" stroke="#e11d48" stroke-width="2" />
        <text x="35" y="185" fill="#e11d48" font-family="monospace" font-size="12px" font-weight="bold">IoT Devices</text>
        <circle cx="70" cy="230" r="18" stroke="#e11d48" stroke-width="2" />
        <path d="M 60 230 L 80 230 M 70 220 L 70 240" stroke="#e11d48" stroke-width="1.5" />
        <text x="35" y="270" fill="#94a3b8" font-family="monospace" font-size="9px">MQTT Streamers</text>

        <!-- Arrow devices -> Event Hub / Kinesis -->
        <path d="M 115 225 L 175 225" stroke="#e11d48" stroke-width="2" />
        <path d="M 165 215 L 175 225 L 165 235" stroke="#e11d48" stroke-width="2" />

        <!-- Amazon Kinesis/Event Hub -->
        <polygon points="180,180 260,150 260,300 180,270" stroke="#f59e0b" stroke-width="2.5" />
        <text x="195" y="215" fill="#f59e0b" font-family="monospace" font-size="12px" font-weight="bold">Kinesis</text>
        <text x="195" y="235" fill="#f59e0b" font-family="monospace" font-size="12px" font-weight="bold">Streams</text>
        <text x="192" y="260" fill="#94a3b8" font-family="monospace" font-size="9px">(Ingest Grid)</text>

        <!-- Arrow stream -> Spark -->
        <path d="M 260 225 L 320 225" stroke="#f59e0b" stroke-width="2" />
        <path d="M 310 215 L 320 225 L 310 235" stroke="#f59e0b" stroke-width="2" />

        <!-- Apache Spark Grid -->
        <rect x="320" y="140" width="130" height="170" rx="8" stroke="#06b6d4" stroke-width="2.5" />
        <text x="340" y="175" fill="#06b6d4" font-family="monospace" font-size="13px" font-weight="bold">Apache Spark</text>
        <text x="345" y="195" fill="#94a3b8" font-family="monospace" font-size="10px">Structured Streaming</text>
        
        <!-- Executor doodles inside Spark block -->
        <rect x="335" y="215" width="40" height="30" rx="2" stroke="#06b6d4" stroke-width="1.5" />
        <text x="340" y="233" fill="#06b6d4" font-family="monospace" font-size="9px">Exec_01</text>
        <rect x="395" y="215" width="40" height="30" rx="2" stroke="#06b6d4" stroke-width="1.5" />
        <text x="400" y="233" fill="#06b6d4" font-family="monospace" font-size="9px">Exec_02</text>
        <path d="M 335 275 L 435 275" stroke="#0a2540" stroke-width="4" />

        <!-- Arrow Spark -> Snowflake Data Lake -->
        <path d="M 450 225 L 510 225" stroke="#10b981" stroke-width="2" />
        <path d="M 500 215 L 510 225 L 500 235" stroke="#10b981" stroke-width="2" />

        <!-- Snowflake / S3 Data Lake -->
        <ellipse cx="560" cy="180" rx="45" ry="25" stroke="#10b981" stroke-width="2.5" />
        <text x="532" y="185" fill="#10b981" font-family="monospace" font-size="12px" font-weight="bold">Snowflake</text>
        <text x="538" y="200" fill="#94a3b8" font-family="monospace" font-size="9px">(Gold Lake)</text>

        <!-- S3 Data Lake doodle -->
        <rect x="515" y="250" width="90" height="70" rx="4" stroke="#a78bfa" stroke-width="2" />
        <text x="535" y="280" fill="#a78bfa" font-family="monospace" font-size="11px" font-weight="bold">S3 Bucket</text>
        <text x="532" y="295" fill="#94a3b8" font-family="monospace" font-size="9px">Silver / Bronze</text>
        <path d="M 560 205 L 560 250" stroke="#10b981" stroke-width="1.5" stroke-dasharray="2" />

        <!-- Arrow Data Lake -> BI dashboard Grafana -->
        <path d="M 605 285 Q 660 285 660 240" stroke="#e11d48" stroke-width="2" />
        <rect x="670" y="150" width="110" height="140" rx="5" stroke="#e11d48" stroke-width="2.5" />
        <text x="682" y="195" fill="#e11d48" font-family="monospace" font-size="13px" font-weight="bold">Grafana / BI</text>
        <line x1="680" y1="230" x2="770" y2="230" stroke="#e11d48" stroke-width="1" />
        <!-- Micro bar-chart doodle -->
        <rect x="690" y="240" width="15" height="40" fill="#e11d48" stroke="none" />
        <rect x="715" y="245" width="15" height="35" fill="#f43f5e" stroke="none" />
        <rect x="740" y="255" width="15" height="25" fill="#fb7185" stroke="none" />

        <!-- Info label -->
        <text x="80" y="415" fill="#475569" font-family="monospace" font-size="10px">Pipeline-Ref: DATA-GRID-2022</text>
      </g>
    </svg>`,
    analysis: {
      architecture: {
        detectedComponents: [
          { name: "IoT Devices Fleet", type: "Sensor Node Network", description: "Thousands of edge physical monitors sending metrics sequentially.", confidence: 79, needsVerification: true },
          { name: "Amazon Kinesis", type: "Raw Streaming Log Broker", description: "Performs low latency partition log recording of dynamic JSON parameters.", confidence: 93 },
          { name: "Apache Spark Grid", type: "Dynamic Core Compute Cluster", description: "Runs Structured Streaming queries in microscopic batches to clean and compute metrics.", confidence: 94 },
          { name: "S3 Staging Lake", type: "Raw Staging Object Store", description: "Saves raw ingested structures using partitioned dates securely.", confidence: 95 },
          { name: "Snowflake Storage", type: "Aggregated Enterprise Warehouse", description: "Hosts gold-certified analytical dimensions supporting SQL query requests.", confidence: 95 },
          { name: "Grafana Analytics Dashboard", type: "Front-end Metrics Display Engine", description: "Renders analytical widgets, real-time trigger alarms, and database metrics charts.", confidence: 92 }
        ],
        systemFlow: [
          { from: "IoT Devices Fleet", to: "Amazon Kinesis", description: "Pushes payloads directly using TLS authenticated HTTP requests." },
          { from: "Amazon Kinesis", to: "Apache Spark Grid", description: "Streams real-time metrics logs through partition readers." },
          { from: "Apache Spark Grid", to: "S3 Staging Lake", description: "Saves raw JSON streams into structured folder hierarchies for future replays." },
          { from: "Apache Spark Grid", to: "Snowflake Storage", description: "Pushes daily cleaned database aggregations into columnar SQL tables." },
          { from: "Snowflake Storage", to: "Grafana Analytics Dashboard", description: "Performs heavy read transactions to display management boards without latency." }
        ],
        dataMovement: [
          { flowType: "Micro-batch Streaming ingest", description: "Calculates metric sums over sliding 60-second execution periods." },
          { flowType: "Bulk Columnar SQL load", description: "Saves cleaned data inside Parquet schemas to achieve premium index speeds." }
        ],
        technologies: [
          { componentName: "Compute Engine & Codebase", technologies: ["Scala 3.2", "Apache Spark Streaming Engine", "Hadoop filesystem adaptors"] },
          { componentName: "Datalake Storehouse", technologies: ["Snowflake Database", "Parquet file layouts", "Amazon S3 object storage"] },
          { componentName: "Visualization & Ingress", technologies: ["Grafana Enterprise dashboards", "Amazon Kinesis streams", "MQTT IoT Gateway proxy"] }
        ]
      },
      security: {
        vulnerabilities: [
          { title: "IoT Device Keys Expiry Overdue", severity: "High", description: "Many physical IoT node keys operate without scheduled certificate rotators.", recommendation: "Establish Amazon IoT Core credential provider roles allowing devices to fetch temporary credentials strictly." },
          { title: "Unencrypted SQL Analytical Queries", severity: "Medium", description: "Standard database credentials are held in plaintext inside Spark executor env values.", recommendation: "Store credentials in AWS Secret Manager and bind values using secure dynamic parameter stores." }
        ],
        attackSurfaces: [
          { area: "IoT Intake Gateways", risks: ["Flooding attacks causing partition exhaustion on Kinesis streams.", "Physical extraction of static AWS keys from captured IoT hardware." ] },
          { area: "Data Warehousing", risks: ["Data extraction attempts if database connection strings leak to outside teams." ] }
        ],
        recommendations: [
          { title: "Enforce JWT Verification at Gateway", priority: "Critical", steps: ["Mandate mutual certificate exchange (mTLS) for all IoT sensors.", "Verify incoming payloads against strict JSON schema rules."] },
          { title: "Conduct S3 Lifecycle Audits", priority: "High", steps: ["Establish lifecycle rules to push cold logs to AWS Glacier after 30 days.", "Audit historical bucket logs to confirm zero global permissions configurations."] }
        ]
      },
      specification: {
        specMarkdown: `# Technical Specification: Real-time Analytics System

## Executive Core Layout
This document establishes the enterprise specifications for an IoT and mobile metric ingestion framework. The system digests streaming telemetry logs, performs real-time rollups via Spark, and maintains a dual storage lake supporting both long-term raw archival and low-latency dimensional analysis.

---

## 1. Dynamic Ingest and Compute Specifications
- **Target Frequency**: Consistently maps and saves &gt; 15,000 measurements per second.
- **Spark Working Window**: Configured dynamically to sliding 10-second micro-batches.
- **Watermarking Limit**: Drops records delayed by &gt; 3 minutes to handle late arrivals safely.
- **Data Format**: Transforms dirty incoming JSON packets into clean, compressed columnar Apache Parquet.

---

## 2. Dynamic Storage & Columns Policy
Data is split immediately upon stream parsing:
1. **Raw Storage Layer**: Pushed directly to S3 partitioned directories: \`s3://analytics-lake/raw/year=YYYY/month=MM/day=DD/\`.
2. **Aggregated Layer**: Loaded cleanly to columnar dimensions to achieve 15x query speed improvements during presentation reviews.`,
        explanation: "This dual-tier layout (Lambda/Kappa design pattern) ensures high performance and data safety. Heavy operational BI queries read processed databases directly, avoiding slow reads on the underlying row-by-row log server files."
      },
      nextSteps: {
        scalability: [
          { name: "Establish Delta Lake formats", benefit: "Enforces strict ACID transaction capabilities on top of cheap object storage like S3.", difficulty: "Medium" },
          { name: "Deploy AWS Glue crawler automations", benefit: "Regularly indexes folder structures and auto-discovers newly added metric columns.", difficulty: "Easy" }
        ],
        deployment: [
          { phase: "Infrastructure Pipeline Activation", description: "Deploy cloud templates with integrated alarms notifying operations teams if Kinesis record lags rise beyond safe benchmarks." }
        ]
      }
    }
  }
];
