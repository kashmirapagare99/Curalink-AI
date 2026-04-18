import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Activity,
  Search,
  MapPin,
  User,
  Stethoscope,
  Brain,
  FlaskConical,
  ChevronRight,
  BookOpen,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Header } from "../components/Header";

const DEMO_SCENARIOS = [
  { label: "Lung Cancer", query: "Latest treatment approaches", icon: "🫁" },
  { label: "Diabetes", query: "Clinical trials for diabetes", icon: "🩸" },
  { label: "Alzheimer's", query: "Recent research and disease-modifying therapies", icon: "🧠" },
];

const FEATURES = [
  {
    icon: <BookOpen className="w-5 h-5" />,
    title: "PubMed & OpenAlex",
    desc: "Access 100+ research papers per query from top medical databases",
    color: "#023E62",
    bg: "rgba(2, 62, 98, 0.08)",
  },
  {
    icon: <FlaskConical className="w-5 h-5" />,
    title: "Clinical Trials",
    desc: "Real-time ClinicalTrials.gov data with eligibility matching",
    color: "#66AC49",
    bg: "rgba(102, 172, 73, 0.1)",
  },
  {
    icon: <Brain className="w-5 h-5" />,
    title: "AI Reasoning",
    desc: "LLM-powered structured insights using Mistral 7B / LLaMA 3",
    color: "#7C3AED",
    bg: "rgba(124, 58, 237, 0.08)",
  },
  {
    icon: <Sparkles className="w-5 h-5" />,
    title: "Context Memory",
    desc: "Conversation-aware follow-ups with full disease context",
    color: "#D97706",
    bg: "rgba(217, 119, 6, 0.08)",
  },
];

export function Home() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    disease: "",
    query: "",
    location: "",
  });
  const [errors, setErrors] = useState({ disease: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (e.target.name === "disease") setErrors({ disease: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.disease.trim()) {
      setErrors({ disease: "Disease is required to proceed" });
      return;
    }
    const params = new URLSearchParams();
    if (form.name) params.set("name", form.name);
    params.set("disease", form.disease);
    if (form.query) params.set("query", form.query);
    if (form.location) params.set("location", form.location);
    navigate(`/chat?${params.toString()}`);
  };

  const handleDemo = (disease: string, query: string) => {
    const params = new URLSearchParams({ disease, query });
    navigate(`/chat?${params.toString()}`);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F8FAFC" }}>
      <Header variant="home" />

      {/* Hero Section */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #023E62 0%, #034F7E 50%, #023E62 100%)",
        }}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #66AC49, transparent)" }}
          />
          <div
            className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #66AC49, transparent)" }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div>
              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
                style={{
                  backgroundColor: "rgba(102, 172, 73, 0.15)",
                  border: "1px solid rgba(102, 172, 73, 0.3)",
                }}
              >
                <div
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: "#66AC49" }}
                />
                <span className="text-xs" style={{ color: "#66AC49", fontWeight: 600 }}>
                  AI-Powered Medical Research
                </span>
              </div>

              <h1
                className="mb-4"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 800,
                  color: "white",
                  lineHeight: 1.15,
                }}
              >
                AI Medical Research{" "}
                <span style={{ color: "#66AC49" }}>Assistant</span>
              </h1>

              <p
                className="mb-8 leading-relaxed"
                style={{ color: "rgba(255,255,255,0.75)", fontSize: "1.05rem" }}
              >
                Get structured, source-backed insights from PubMed, OpenAlex, and
                ClinicalTrials.gov — powered by open-source LLMs for accurate medical
                reasoning.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { value: "200+", label: "Papers per query" },
                  { value: "50+", label: "Clinical trials" },
                  { value: "3", label: "User types" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: 800,
                        color: "#66AC49",
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "rgba(255,255,255,0.6)",
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* User type badges */}
              <div className="flex flex-wrap gap-2">
                {["Patients", "Researchers", "Healthcare Professionals"].map((type) => (
                  <span
                    key={type}
                    className="px-3 py-1 rounded-full text-xs"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.8)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      fontWeight: 500,
                    }}
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Form */}
            <div>
              <div
                className="rounded-2xl p-6 shadow-2xl"
                style={{
                  backgroundColor: "white",
                  boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
                }}
              >
                <div className="flex items-center gap-2.5 mb-5">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "#66AC49" }}
                  >
                    <Search className="w-4 h-4 text-white" />
                  </div>
                  <h2 style={{ color: "#023E62", fontWeight: 700 }}>Start Your Research</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Patient Name */}
                  <div>
                    <label
                      className="block text-sm mb-1.5"
                      style={{ color: "#374151", fontWeight: 600 }}
                    >
                      <User
                        className="w-3.5 h-3.5 inline mr-1.5"
                        style={{ color: "#9CA3AF" }}
                      />
                      Patient Name{" "}
                      <span style={{ color: "#9CA3AF", fontWeight: 400 }}>(optional)</span>
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none transition-all"
                      style={{
                        border: "1.5px solid #E5E7EB",
                        backgroundColor: "#F9FAFB",
                        color: "#111827",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#023E62";
                        e.target.style.backgroundColor = "#fff";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#E5E7EB";
                        e.target.style.backgroundColor = "#F9FAFB";
                      }}
                    />
                  </div>

                  {/* Disease */}
                  <div>
                    <label
                      className="block text-sm mb-1.5"
                      style={{ color: "#374151", fontWeight: 600 }}
                    >
                      <Stethoscope
                        className="w-3.5 h-3.5 inline mr-1.5"
                        style={{ color: "#9CA3AF" }}
                      />
                      Disease / Condition{" "}
                      <span style={{ color: "#EF4444" }}>*</span>
                    </label>
                    <input
                      name="disease"
                      value={form.disease}
                      onChange={handleChange}
                      placeholder="e.g. Lung Cancer, Parkinson's, Diabetes"
                      className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none transition-all"
                      style={{
                        border: `1.5px solid ${errors.disease ? "#EF4444" : "#E5E7EB"}`,
                        backgroundColor: "#F9FAFB",
                        color: "#111827",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = errors.disease ? "#EF4444" : "#023E62";
                        e.target.style.backgroundColor = "#fff";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = errors.disease ? "#EF4444" : "#E5E7EB";
                        e.target.style.backgroundColor = "#F9FAFB";
                      }}
                    />
                    {errors.disease && (
                      <p className="text-xs mt-1" style={{ color: "#EF4444" }}>
                        {errors.disease}
                      </p>
                    )}
                  </div>

                  {/* Query */}
                  <div>
                    <label
                      className="block text-sm mb-1.5"
                      style={{ color: "#374151", fontWeight: 600 }}
                    >
                      <Brain
                        className="w-3.5 h-3.5 inline mr-1.5"
                        style={{ color: "#9CA3AF" }}
                      />
                      Research Query{" "}
                      <span style={{ color: "#9CA3AF", fontWeight: 400 }}>(optional)</span>
                    </label>
                    <input
                      name="query"
                      value={form.query}
                      onChange={handleChange}
                      placeholder="e.g. Deep Brain Stimulation, immunotherapy"
                      className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none transition-all"
                      style={{
                        border: "1.5px solid #E5E7EB",
                        backgroundColor: "#F9FAFB",
                        color: "#111827",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#023E62";
                        e.target.style.backgroundColor = "#fff";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#E5E7EB";
                        e.target.style.backgroundColor = "#F9FAFB";
                      }}
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <label
                      className="block text-sm mb-1.5"
                      style={{ color: "#374151", fontWeight: 600 }}
                    >
                      <MapPin
                        className="w-3.5 h-3.5 inline mr-1.5"
                        style={{ color: "#9CA3AF" }}
                      />
                      Location{" "}
                      <span style={{ color: "#9CA3AF", fontWeight: 400 }}>(optional)</span>
                    </label>
                    <input
                      name="location"
                      value={form.location}
                      onChange={handleChange}
                      placeholder="e.g. New York, USA"
                      className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none transition-all"
                      style={{
                        border: "1.5px solid #E5E7EB",
                        backgroundColor: "#F9FAFB",
                        color: "#111827",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#023E62";
                        e.target.style.backgroundColor = "#fff";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#E5E7EB";
                        e.target.style.backgroundColor = "#F9FAFB";
                      }}
                    />
                  </div>

                  {/* CTA */}
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl text-white flex items-center justify-center gap-2.5 transition-all hover:opacity-90 active:scale-[0.99]"
                    style={{
                      backgroundColor: "#023E62",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                    }}
                  >
                    <Activity className="w-4 h-4" />
                    Ask AI
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                {/* Demo scenarios */}
                <div className="mt-4">
                  <p
                    className="text-xs mb-2"
                    style={{ color: "#9CA3AF", fontWeight: 600, letterSpacing: "0.05em" }}
                  >
                    TRY A DEMO SCENARIO
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {DEMO_SCENARIOS.map((s) => (
                      <button
                        key={s.label}
                        onClick={() => handleDemo(s.label, s.query)}
                        className="text-xs px-3 py-1.5 rounded-full transition-all hover:opacity-80"
                        style={{
                          backgroundColor: "rgba(2, 62, 98, 0.06)",
                          color: "#023E62",
                          border: "1px solid rgba(2, 62, 98, 0.15)",
                          fontWeight: 500,
                        }}
                      >
                        {s.icon} {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 style={{ color: "#023E62", fontWeight: 800, fontSize: "1.75rem" }}>
            How Curalink Works
          </h2>
          <p className="mt-2" style={{ color: "#6B7280" }}>
            A 4-step pipeline from query to structured clinical insights
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="rounded-2xl p-5 border transition-all hover:shadow-md hover:-translate-y-0.5"
              style={{
                backgroundColor: "white",
                borderColor: "rgba(0,0,0,0.08)",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: f.bg, color: f.color }}
                >
                  {f.icon}
                </div>
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white"
                  style={{ backgroundColor: f.color, fontSize: "11px", fontWeight: 800 }}
                >
                  {i + 1}
                </div>
              </div>
              <h3 className="mb-1.5 text-sm" style={{ fontWeight: 700, color: "#111827" }}>
                {f.title}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: "#6B7280" }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Pipeline visual */}
        <div
          className="mt-12 rounded-2xl overflow-hidden"
          style={{ border: "1px solid rgba(2,62,98,0.1)" }}
        >
          <div
            style={{ background: "linear-gradient(135deg, #023E62, #034F7E)" }}
            className="px-6 py-4"
          >
            <h3 className="text-sm" style={{ color: "white", fontWeight: 700 }}>
              Query Processing Pipeline
            </h3>
          </div>
          <div className="p-6 bg-white">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
              {[
                { step: "1", label: "Query Expansion", sub: "Disease + context" },
                { step: "2", label: "Data Retrieval", sub: "PubMed • OpenAlex • Trials" },
                {
                  step: "3",
                  label: "AI Ranking",
                  sub: "Relevance + recency + credibility",
                },
                { step: "4", label: "LLM Analysis", sub: "Structured output" },
              ].map((item, i) => (
                <div key={item.step} className="flex items-center gap-3 flex-1">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0"
                      style={{
                        backgroundColor: "#023E62",
                        fontSize: "12px",
                        fontWeight: 800,
                      }}
                    >
                      {item.step}
                    </div>
                    <div>
                      <p className="text-xs" style={{ fontWeight: 700, color: "#111827" }}>
                        {item.label}
                      </p>
                      <p className="text-xs" style={{ color: "#9CA3AF" }}>
                        {item.sub}
                      </p>
                    </div>
                  </div>
                  {i < 3 && (
                    <ChevronRight
                      className="w-4 h-4 shrink-0 hidden md:block"
                      style={{ color: "#D1D5DB" }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 border-t" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "#023E62" }}
            >
              <Activity className="w-3 h-3 text-white" />
            </div>
            <span style={{ fontWeight: 700, color: "#023E62", fontSize: "0.9rem" }}>
              Cura<span style={{ color: "#66AC49" }}>link</span>
            </span>
          </div>
          <p className="text-xs" style={{ color: "#9CA3AF" }}>
            For research purposes only. Not a substitute for professional medical advice. © 2026
            Curalink
          </p>
        </div>
      </footer>
    </div>
  );
}
