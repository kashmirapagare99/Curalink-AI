import { Brain, TrendingUp, AlertTriangle, User, Link2, ChevronRight } from "lucide-react";
import type { AISummary } from "../data/mockData";

interface AISummaryViewProps {
  summary: AISummary;
  disease: string;
}

export function AISummaryView({ summary, disease }: AISummaryViewProps) {
  return (
    <div className="space-y-4">
      {/* Condition Overview */}
      <div
        className="rounded-xl p-4"
        style={{
          background: "linear-gradient(135deg, #023E62 0%, #035080 100%)",
          color: "white",
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Brain className="w-4 h-4" style={{ color: "#66AC49" }} />
          <h3 className="text-sm" style={{ fontWeight: 700, color: "white" }}>Condition Overview</h3>
        </div>
        <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.85)" }}>
          {summary.conditionOverview}
        </p>
      </div>

      {/* Key Insights */}
      <div
        className="rounded-xl p-4 border"
        style={{
          backgroundColor: "#fff",
          borderColor: "rgba(102, 172, 73, 0.2)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(102, 172, 73, 0.15)" }}>
            <ChevronRight className="w-4 h-4" style={{ color: "#66AC49" }} />
          </div>
          <h3 className="text-sm" style={{ fontWeight: 700, color: "#023E62" }}>Key Research Insights</h3>
        </div>
        <ul className="space-y-2">
          {summary.keyInsights.map((insight, i) => (
            <li key={i} className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                style={{ backgroundColor: "#66AC49", minWidth: "1.25rem" }}>
                <span className="text-white" style={{ fontSize: "10px", fontWeight: 700 }}>{i + 1}</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "#374151" }}>{insight}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Treatment Trends */}
      <div
        className="rounded-xl p-4 border"
        style={{
          backgroundColor: "#fff",
          borderColor: "rgba(2, 62, 98, 0.1)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(2, 62, 98, 0.08)" }}>
            <TrendingUp className="w-4 h-4" style={{ color: "#023E62" }} />
          </div>
          <h3 className="text-sm" style={{ fontWeight: 700, color: "#023E62" }}>Treatment Trends</h3>
        </div>
        <ul className="space-y-2">
          {summary.treatmentTrends.map((trend, i) => (
            <li key={i} className="flex items-start gap-2">
              <div
                className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5"
                style={{ backgroundColor: "#023E62" }}
              />
              <p className="text-xs leading-relaxed" style={{ color: "#374151" }}>{trend}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Risks / Notes */}
      <div
        className="rounded-xl p-4 border"
        style={{
          backgroundColor: "#FFFBEB",
          borderColor: "#FCD34D",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="w-4 h-4" style={{ color: "#D97706" }} />
          <h3 className="text-sm" style={{ fontWeight: 700, color: "#92400E" }}>Risks & Clinical Notes</h3>
        </div>
        <ul className="space-y-2">
          {summary.risksNotes.map((note, i) => (
            <li key={i} className="flex items-start gap-2">
              <div
                className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5"
                style={{ backgroundColor: "#D97706" }}
              />
              <p className="text-xs leading-relaxed" style={{ color: "#92400E" }}>{note}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Personalized Insight */}
      <div
        className="rounded-xl p-4 border"
        style={{
          background: "linear-gradient(135deg, rgba(102,172,73,0.08) 0%, rgba(2,62,98,0.05) 100%)",
          borderColor: "rgba(102, 172, 73, 0.3)",
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <User className="w-4 h-4" style={{ color: "#66AC49" }} />
          <h3 className="text-sm" style={{ fontWeight: 700, color: "#023E62" }}>Personalized Insight</h3>
        </div>
        <p className="text-xs leading-relaxed" style={{ color: "#374151" }}>
          {summary.personalizedInsight}
        </p>
      </div>

      {/* Sources */}
      <div className="rounded-xl p-4 border" style={{ borderColor: "rgba(0,0,0,0.08)", backgroundColor: "#F9FAFB" }}>
        <div className="flex items-center gap-2 mb-2.5">
          <Link2 className="w-4 h-4" style={{ color: "#6B7280" }} />
          <h3 className="text-sm" style={{ fontWeight: 700, color: "#374151" }}>Data Sources</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {summary.sources.map((source, i) => (
            <span
              key={i}
              className="text-xs px-2.5 py-1 rounded-full"
              style={{
                backgroundColor: "rgba(2, 62, 98, 0.06)",
                color: "#023E62",
                fontWeight: 500,
                border: "1px solid rgba(2, 62, 98, 0.12)",
              }}
            >
              {source}
            </span>
          ))}
        </div>
        <p className="mt-3 text-xs" style={{ color: "#9CA3AF" }}>
          ⚠️ For informational purposes only. Not a substitute for professional medical advice.
        </p>
      </div>
    </div>
  );
}
