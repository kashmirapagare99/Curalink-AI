import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "react-router";
import {
  Send,
  Bot,
  User,
  BookOpen,
  FlaskConical,
  BarChart3,
  Loader2,
  ChevronDown,
  Sparkles,
  Database,
  CheckCircle2,
} from "lucide-react";
import { Header } from "../components/Header";
import { ResearchPaperCard } from "../components/ResearchPaperCard";
import { ClinicalTrialCard } from "../components/ClinicalTrialCard";
import { AISummaryView } from "../components/AISummaryView";
import { ContextMemoryView } from "../components/ContextMemoryView";
import {
  type ResearchPaper,
  type ClinicalTrial,
  type AISummary,
} from "../data/mockData";
import {
  History
} from "lucide-react";

type MessageRole = "user" | "ai";

interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

type ActiveTab = "papers" | "trials" | "summary" | "memory";

const PROCESSING_STEPS = [
  { icon: <Sparkles className="w-3.5 h-3.5" />, label: "Expanding query with disease context..." },
  { icon: <Database className="w-3.5 h-3.5" />, label: "Fetching PubMed & OpenAlex (200 results)..." },
  { icon: <FlaskConical className="w-3.5 h-3.5" />, label: "Retrieving ClinicalTrials.gov data..." },
  { icon: <BarChart3 className="w-3.5 h-3.5" />, label: "Ranking by relevance, recency & credibility..." },
  { icon: <Bot className="w-3.5 h-3.5" />, label: "Running LLM reasoning (Mistral 7B)..." },
];

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-3 py-2">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-full"
          style={{
            backgroundColor: "#66AC49",
            animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function ProcessingOverlay({ steps, currentStep }: { steps: typeof PROCESSING_STEPS; currentStep: number }) {
  return (
    <div className="flex flex-col gap-2 p-3 rounded-xl" style={{ backgroundColor: "rgba(2,62,98,0.04)", border: "1px solid rgba(2,62,98,0.1)" }}>
      <p className="text-xs mb-1" style={{ color: "#023E62", fontWeight: 700 }}>Processing your query...</p>
      {steps.map((step, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
            style={{
              backgroundColor: i < currentStep ? "#66AC49" : i === currentStep ? "#023E62" : "rgba(0,0,0,0.08)",
              color: i <= currentStep ? "white" : "#9CA3AF",
              transition: "all 0.3s",
            }}
          >
            {i < currentStep ? (
              <CheckCircle2 className="w-3 h-3" />
            ) : i === currentStep ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <span style={{ fontSize: "8px", fontWeight: 800 }}>{i + 1}</span>
            )}
          </div>
          <span
            className="text-xs"
            style={{
              color: i < currentStep ? "#66AC49" : i === currentStep ? "#023E62" : "#9CA3AF",
              fontWeight: i === currentStep ? 600 : 400,
              transition: "color 0.3s",
            }}
          >
            {step.label}
          </span>
          {i < currentStep && (
            <CheckCircle2 className="w-3 h-3 ml-auto" style={{ color: "#66AC49" }} />
          )}
        </div>
      ))}
    </div>
  );
}

// Simple markdown-like renderer
function MessageContent({ content }: { content: string }) {
  const lines = content.split("\n");
  return (
    <div className="text-sm leading-relaxed space-y-1">
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-1" />;

        // Bold (**text**)
        const renderInline = (text: string) => {
          const parts = text.split(/(\*\*[^*]+\*\*)/g);
          return parts.map((part, j) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return (
                <strong key={j} style={{ fontWeight: 700 }}>
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return <span key={j}>{part}</span>;
          });
        };

        // Blockquote
        if (line.startsWith("> ")) {
          return (
            <div
              key={i}
              className="pl-3 py-1.5 rounded-r-lg text-xs"
              style={{
                borderLeft: "3px solid #66AC49",
                backgroundColor: "rgba(102,172,73,0.08)",
                color: "#374151",
              }}
            >
              {renderInline(line.slice(2))}
            </div>
          );
        }

        // List item
        if (line.startsWith("- ") || line.match(/^\d+\.\s/)) {
          const text = line.replace(/^[-\d.]\s*/, "");
          return (
            <div key={i} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ backgroundColor: "#66AC49" }} />
              <span>{renderInline(text)}</span>
            </div>
          );
        }

        return <p key={i}>{renderInline(line)}</p>;
      })}
    </div>
  );
}

export function Chat() {
  const [searchParams] = useSearchParams();
  const disease = searchParams.get("disease") || "Unknown Condition";
  const query = searchParams.get("query") || "";
  const userName = searchParams.get("name") || "";
  const location = searchParams.get("location") || "";

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [processingStep, setProcessingStep] = useState(0);
  const [activeTab, setActiveTab] = useState<ActiveTab>("papers");
  const [papers, setPapers] = useState<ResearchPaper[]>([]);
  const [trials, setTrials] = useState<ClinicalTrial[]>([]);
  const [summary, setSummary] = useState<AISummary | null>(null);
  const [context, setContext] = useState({ disease: "", lastQuery: "" });
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;
    const handler = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      setShowScrollBtn(scrollHeight - scrollTop - clientHeight > 100);
    };
    container.addEventListener("scroll", handler);
    return () => container.removeEventListener("scroll", handler);
  }, []);

  // Initialize with processing animation
  useEffect(() => {
    let step = 0;

    const stepInterval = setInterval(() => {
      step++;
      setProcessingStep(step);
      if (step >= PROCESSING_STEPS.length) {
        clearInterval(stepInterval);
      }
    }, 700);

    const initChat = async () => {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      try {
        const response = await fetch(`${API_URL}/api/query`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: userName || "anonymous_user", patientName: userName, disease, query, location })
        });
        const data = await response.json();

        clearInterval(stepInterval);
        setProcessingStep(PROCESSING_STEPS.length);

        setPapers(data.sources?.publications || []);
        setTrials(data.sources?.trials || []);
        
        // Populate the AI Summary structure with the raw markdown for now
        setSummary({
          conditionOverview: data.response || "",
          keyInsights: ["Refer to the generated assistant response for context."],
          treatmentTrends: ["Analysis inferred from the text above."],
          risksNotes: ["Always consult your primary care provider or specialist."],
          personalizedInsight: "Response created dynamically by Mistral-7B.",
          sources: ["PubMed", "OpenAlex", "ClinicalTrials.gov"]
        });

        if (data.context) {
          setContext(data.context);
        }

        const expandedQuery = query
          ? `${query} + ${disease}`
          : `Latest research on ${disease}`;

        const aiMsg: Message = {
          id: `ai-init`,
          role: "ai",
          content: data.response || "No response generated by AI.",
          timestamp: new Date(),
        };

        const userMsg: Message = {
          id: `user-init`,
          role: "user",
          content: `${disease}${query ? ` — ${query}` : ""}${location ? ` (${location})` : ""}`,
          timestamp: new Date(Date.now() - 100),
        };

        setMessages([userMsg, aiMsg]);
        setIsInitializing(false);
      } catch (e) {
        console.error(e);
        clearInterval(stepInterval);
        setIsInitializing(false);
        setMessages([{
          id: `ai-err`,
          role: "ai",
          content: "Failed to connect to the backend server. Please verify it is running on port 5000.",
          timestamp: new Date()
        }]);
      }
    };

    initChat();
    return () => clearInterval(stepInterval);
  }, [disease, query, location, userName]);

  useEffect(() => {
    if (!isInitializing) {
      setTimeout(scrollToBottom, 100);
    }
  }, [messages, isInitializing, scrollToBottom]);

  const generateFollowUpResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    if (input.includes("vitamin d") || input.includes("supplement")) {
      return `Regarding **Vitamin D** and **${disease}**:\n\n📊 A 2024 meta-analysis found that Vitamin D supplementation (2000 IU/day) showed modest benefits in reducing inflammatory markers but did not significantly alter primary disease outcomes in ${disease} patients.\n\n**Key Points:**\n- Vitamin D deficiency is common in patients with ${disease}\n- Supplementation to achieve serum levels >30 ng/mL is generally recommended\n- Evidence for direct disease modification remains insufficient (Grade B evidence)\n- Monitor calcium levels with high-dose supplementation\n\n> ⚠️ Always consult your specialist before starting any supplementation regimen.`;
    }

    if (input.includes("side effect") || input.includes("adverse")) {
      return `**Common side effects** in ${disease} treatment:\n\nBased on current trial data and post-marketing surveillance:\n\n- **Grade 1–2 toxicities** (most common): Fatigue (60–80%), nausea (30–50%), appetite changes (25–40%)\n- **Immune-related events**: Pneumonitis (8–15%), hepatitis (5–10%), colitis (5–8%)\n- **Hematologic**: Neutropenia (20–30% with chemo-combinations)\n\nManagement typically involves dose modification, supportive care, or corticosteroids for immune events.\n\n> Report any new or worsening symptoms to your care team immediately.`;
    }

    if (input.includes("trial") || input.includes("enroll") || input.includes("clinical")) {
      return `For **${disease}** clinical trial eligibility, the ${trials.length} trials identified in your search include:\n\n- **${trials.filter(t => t.status === "Recruiting").length} actively recruiting** trials\n- **${trials.filter(t => t.status === "Completed").length} completed** trials with published results\n- **${trials.filter(t => t.status === "Active, not recruiting").length} active (not recruiting)** trials\n\nTo explore enrollment, I recommend:\n1. Checking ClinicalTrials.gov directly with NCT IDs shown in the Trials tab\n2. Contacting your oncologist/specialist to review eligibility criteria\n3. Reaching out to trial coordinators at the listed institutions\n\nWould you like me to narrow down trials by location or specific eligibility criteria?`;
    }

    if (input.includes("prognosis") || input.includes("survival") || input.includes("outlook")) {
      return `**Prognosis and Survival Data for ${disease}:**\n\nBased on the latest 2024 registry data and clinical trial outcomes:\n\n- **5-year overall survival** varies significantly by stage and molecular subtype\n- **Early-stage disease** (Stage I–II): Generally favorable outcomes with curative intent treatment\n- **Advanced/metastatic**: Median OS improved significantly with modern targeted and immunotherapy approaches\n- **Molecular biomarkers** (actionable mutations) are the strongest predictor of treatment response\n\nThe research papers in the panel provide specific survival data from recent trials. The AI Summary tab includes a comprehensive condition overview with current outcome benchmarks.\n\n> Prognosis is highly individualized — your specialist can provide personalized risk assessment.`;
    }

    if (input.includes("diet") || input.includes("nutrition") || input.includes("food")) {
      return `**Nutrition and ${disease}:**\n\nCurrent evidence on dietary factors in ${disease}:\n\n- **Mediterranean diet**: Associated with reduced inflammation and improved treatment tolerance\n- **Processed foods/sugar**: Linked to worse outcomes in several observational studies\n- **Omega-3 fatty acids**: Anti-inflammatory effects; 2–3g EPA/DHA daily studied in multiple trials\n- **Caloric restriction**: Under active investigation — not yet standard recommendation\n\nA 2023 systematic review (Lancet Oncology) found that structured dietary intervention improved quality of life scores by 23% in patients with similar conditions.\n\n> Work with a registered dietitian specializing in your condition for personalized guidance.`;
    }

    // Default contextual response
    return `Based on our ongoing conversation about **${disease}**, here's what the current research suggests regarding your question:\n\nThis is an area of active investigation. The ${papers.length} publications in your research panel collectively address related aspects of this query. Key findings from recent high-impact journals suggest evolving evidence in this domain.\n\n**What the evidence indicates:**\n- Multiple RCTs and meta-analyses have examined this in the context of ${disease}\n- Expert consensus guidelines (NCCN/ESMO 2024) provide structured recommendations\n- Individual variation in treatment response requires personalized clinical assessment\n\nI've cross-referenced your question with the disease context from our session. The Research Papers tab contains the most relevant publications for deeper exploration.\n\n> 📚 For the most current evidence, consult your specialist and the latest clinical guidelines.`;
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userContent = inputValue.trim();
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: userContent,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await fetch(`${API_URL}/api/query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: userName || "anonymous_user", disease, query: userContent })
      });
      const data = await response.json();

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        role: "ai",
        content: data.response || "Could not generate response.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMsg]);
      
      if (data.sources) {
        if (data.sources.publications) setPapers(data.sources.publications);
        if (data.sources.trials) setTrials(data.sources.trials);
      }
      if (data.context) {
        setContext(data.context);
      }
    } catch (e) {
      console.error(e);
      setMessages((prev) => [...prev, {
        id: `ai-err-${Date.now()}`,
        role: "ai",
        content: "Error connecting to the backend server.",
        timestamp: new Date()
      }]);
    }

    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const tabs = [
    {
      key: "papers" as ActiveTab,
      label: "Research Papers",
      icon: <BookOpen className="w-3.5 h-3.5" />,
      count: papers.length,
    },
    {
      key: "trials" as ActiveTab,
      label: "Clinical Trials",
      icon: <FlaskConical className="w-3.5 h-3.5" />,
      count: trials.length,
    },
    {
      key: "summary" as ActiveTab,
      label: "AI Summary",
      icon: <BarChart3 className="w-3.5 h-3.5" />,
      count: null,
    },
    {
      key: "memory" as ActiveTab,
      label: "Context Memory",
      icon: <History className="w-3.5 h-3.5" />,
      count: null,
    },
  ];

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ backgroundColor: "#F0F4F8" }}>
      <Header variant="chat" disease={disease} onTabChange={setActiveTab} />

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
      `}</style>

      <div className="flex flex-1 overflow-hidden">
        {/* ===== LEFT PANEL: Chat ===== */}
        <div
          className="flex flex-col w-full lg:w-[42%] shrink-0"
          style={{ borderRight: "1px solid rgba(0,0,0,0.08)" }}
        >
          {/* Chat header */}
          <div
            className="px-4 py-3 flex items-center gap-3"
            style={{
              backgroundColor: "white",
              borderBottom: "1px solid rgba(0,0,0,0.07)",
            }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#023E62" }}
            >
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm" style={{ fontWeight: 700, color: "#111827" }}>
                Curalink AI
              </p>
              <p className="text-xs" style={{ color: "#66AC49" }}>
                {isInitializing ? "Processing..." : "Ready · Medical Research Assistant"}
              </p>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: isInitializing ? "#F59E0B" : "#22C55E",
                  animation: isInitializing ? "pulse 1.5s ease-in-out infinite" : "none",
                }}
              />
              <span className="text-xs" style={{ color: "#6B7280" }}>
                {isInitializing ? "Analyzing" : "Live"}
              </span>
            </div>
          </div>

          {/* Messages area */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
            style={{ backgroundColor: "#F8FAFC" }}
          >
            {/* Processing state */}
            {isInitializing && (
              <div>
                <div className="flex items-start gap-2.5 mb-4">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "#023E62" }}
                  >
                    <Bot className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="flex-1">
                    <ProcessingOverlay steps={PROCESSING_STEPS} currentStep={processingStep} />
                  </div>
                </div>
              </div>
            )}

            {/* Messages */}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                {/* Avatar */}
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: msg.role === "user" ? "#66AC49" : "#023E62",
                  }}
                >
                  {msg.role === "user" ? (
                    <User className="w-3.5 h-3.5 text-white" />
                  ) : (
                    <Bot className="w-3.5 h-3.5 text-white" />
                  )}
                </div>

                {/* Bubble */}
                <div
                  className="max-w-[80%] rounded-2xl px-4 py-3"
                  style={
                    msg.role === "user"
                      ? {
                          backgroundColor: "#023E62",
                          color: "white",
                          borderBottomRightRadius: "4px",
                        }
                      : {
                          backgroundColor: "white",
                          color: "#111827",
                          borderBottomLeftRadius: "4px",
                          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                          border: "1px solid rgba(0,0,0,0.06)",
                        }
                  }
                >
                  {msg.role === "user" ? (
                    <p className="text-sm" style={{ color: "white" }}>
                      {msg.content}
                    </p>
                  ) : (
                    <MessageContent content={msg.content} />
                  )}
                  <p
                    className="text-right mt-1.5"
                    style={{
                      fontSize: "10px",
                      color: msg.role === "user" ? "rgba(255,255,255,0.5)" : "#9CA3AF",
                    }}
                  >
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isLoading && (
              <div className="flex items-start gap-2.5">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "#023E62" }}
                >
                  <Bot className="w-3.5 h-3.5 text-white" />
                </div>
                <div
                  className="rounded-2xl px-3 py-2"
                  style={{
                    backgroundColor: "white",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                    border: "1px solid rgba(0,0,0,0.06)",
                    borderBottomLeftRadius: "4px",
                  }}
                >
                  <TypingIndicator />
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Scroll to bottom */}
          {showScrollBtn && (
            <div className="relative">
              <button
                onClick={scrollToBottom}
                className="absolute bottom-2 right-4 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all hover:scale-105"
                style={{ backgroundColor: "#023E62", color: "white" }}
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Suggested follow-ups */}
          {!isInitializing && !isLoading && messages.length > 0 && (
            <div className="px-4 pb-2 flex gap-2 flex-wrap">
              {[
                `Side effects of treatment?`,
                `Active clinical trials?`,
                `Vitamin D supplementation?`,
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    setInputValue(suggestion);
                    inputRef.current?.focus();
                  }}
                  className="text-xs px-2.5 py-1 rounded-full transition-all hover:opacity-80 whitespace-nowrap"
                  style={{
                    backgroundColor: "rgba(2,62,98,0.06)",
                    color: "#023E62",
                    border: "1px solid rgba(2,62,98,0.15)",
                    fontWeight: 500,
                  }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {/* Input area */}
          <div
            className="px-4 py-3"
            style={{
              backgroundColor: "white",
              borderTop: "1px solid rgba(0,0,0,0.07)",
            }}
          >
            <div
              className="flex items-end gap-2 rounded-xl px-3 py-2"
              style={{
                border: "1.5px solid rgba(2,62,98,0.2)",
                backgroundColor: "#F9FAFB",
              }}
            >
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  isInitializing
                    ? "Processing your query..."
                    : `Ask a follow-up about ${disease}...`
                }
                disabled={isInitializing || isLoading}
                rows={1}
                className="flex-1 outline-none resize-none text-sm bg-transparent"
                style={{
                  color: "#111827",
                  maxHeight: "100px",
                  overflowY: "auto",
                }}
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || isLoading || isInitializing}
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all hover:opacity-90 disabled:opacity-40"
                style={{ backgroundColor: "#023E62" }}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 text-white animate-spin" />
                ) : (
                  <Send className="w-4 h-4 text-white" />
                )}
              </button>
            </div>
            <p className="text-center mt-1.5 text-xs" style={{ color: "#9CA3AF" }}>
              Press Enter to send · Shift+Enter for new line
            </p>
          </div>
        </div>

        {/* ===== RIGHT PANEL: Insights ===== */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Tabs */}
          <div
            className="flex items-center px-4 gap-1"
            style={{
              backgroundColor: "white",
              borderBottom: "1px solid rgba(0,0,0,0.07)",
              minHeight: "52px",
            }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="flex items-center gap-1.5 px-4 py-3 text-sm transition-all relative"
                style={{
                  color: activeTab === tab.key ? "#023E62" : "#6B7280",
                  fontWeight: activeTab === tab.key ? 700 : 400,
                  borderBottom: activeTab === tab.key ? "2px solid #023E62" : "2px solid transparent",
                }}
              >
                {tab.icon}
                {tab.label}
                {tab.count !== null && (
                  <span
                    className="px-1.5 py-0.5 rounded-full text-xs"
                    style={{
                      backgroundColor:
                        activeTab === tab.key
                          ? "rgba(2,62,98,0.1)"
                          : "rgba(0,0,0,0.06)",
                      color: activeTab === tab.key ? "#023E62" : "#6B7280",
                      fontWeight: 700,
                    }}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            ))}

            {/* Source info */}
            <div className="ml-auto flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                style={{ backgroundColor: "rgba(102,172,73,0.08)", border: "1px solid rgba(102,172,73,0.2)" }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#66AC49" }} />
                <span className="text-xs" style={{ color: "#166534", fontWeight: 600 }}>
                  PubMed · OpenAlex · ClinicalTrials.gov
                </span>
              </div>
            </div>
          </div>

          {/* Tab content */}
          <div
            className="flex-1 overflow-y-auto p-4"
            style={{ backgroundColor: "#F0F4F8" }}
          >
            {isInitializing ? (
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "rgba(2,62,98,0.08)" }}
                >
                  <Loader2 className="w-7 h-7 animate-spin" style={{ color: "#023E62" }} />
                </div>
                <div className="text-center">
                  <p className="text-sm" style={{ color: "#023E62", fontWeight: 700 }}>
                    Retrieving research data...
                  </p>
                  <p className="text-xs mt-1" style={{ color: "#6B7280" }}>
                    Fetching from PubMed, OpenAlex & ClinicalTrials.gov
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Research Papers Tab */}
                {activeTab === "papers" && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-sm" style={{ fontWeight: 700, color: "#111827" }}>
                          Research Publications
                        </h3>
                        <p className="text-xs" style={{ color: "#6B7280" }}>
                          Top {papers.length} papers ranked by relevance · recency · credibility
                        </p>
                      </div>
                    </div>
                    <div className="grid gap-3">
                      {papers.map((paper) => (
                        <ResearchPaperCard key={paper.id} paper={paper} index={0} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Clinical Trials Tab */}
                {activeTab === "trials" && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-sm" style={{ fontWeight: 700, color: "#111827" }}>
                          Clinical Trials
                        </h3>
                        <p className="text-xs" style={{ color: "#6B7280" }}>
                          {trials.filter((t) => t.status === "Recruiting").length} actively recruiting ·{" "}
                          {trials.filter((t) => t.status === "Completed").length} completed
                        </p>
                      </div>
                    </div>
                    <div className="grid gap-3">
                      {trials.map((trial) => (
                        <ClinicalTrialCard key={trial.id} trial={trial} />
                      ))}
                    </div>
                  </div>
                )}

                {/* AI Summary Tab */}
                {activeTab === "summary" && summary && (
                  <div>
                    <div className="mb-3">
                      <h3 className="text-sm" style={{ fontWeight: 700, color: "#111827" }}>
                        AI-Generated Analysis
                      </h3>
                      <p className="text-xs" style={{ color: "#6B7280" }}>
                        Structured insights · Powered by Mistral 7B via Ollama
                      </p>
                    </div>
                    <AISummaryView summary={summary} disease={disease} />
                  </div>
                )}

                {/* Context Memory Tab */}
                {activeTab === "memory" && (
                  <ContextMemoryView 
                    context={context} 
                    userId={userName || "anonymous_user"} 
                    historyCount={messages.length} 
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>


    </div>
  );
}
