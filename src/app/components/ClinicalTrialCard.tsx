import { MapPin, Phone, FlaskConical, CheckCircle, Clock, UserCheck } from "lucide-react";
import type { ClinicalTrial } from "../data/mockData";

interface ClinicalTrialCardProps {
  trial: ClinicalTrial;
}

const statusConfig = {
  Recruiting: {
    color: "#166534",
    bg: "#DCFCE7",
    icon: <Clock className="w-3 h-3" />,
    dot: "#22C55E",
  },
  Completed: {
    color: "#1E40AF",
    bg: "#DBEAFE",
    icon: <CheckCircle className="w-3 h-3" />,
    dot: "#3B82F6",
  },
  "Active, not recruiting": {
    color: "#92400E",
    bg: "#FEF3C7",
    icon: <Clock className="w-3 h-3" />,
    dot: "#F59E0B",
  },
  "Enrolling by invitation": {
    color: "#6B21A8",
    bg: "#F3E8FF",
    icon: <UserCheck className="w-3 h-3" />,
    dot: "#A855F7",
  },
};

export function ClinicalTrialCard({ trial }: ClinicalTrialCardProps) {
  const status = statusConfig[trial.status] || statusConfig["Completed"];

  return (
    <div
      className="rounded-xl p-4 border transition-all hover:shadow-md"
      style={{
        backgroundColor: "#fff",
        borderColor: "rgba(2, 62, 98, 0.1)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-start gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ backgroundColor: "rgba(102, 172, 73, 0.1)" }}
          >
            <FlaskConical className="w-4 h-4" style={{ color: "#66AC49" }} />
          </div>
          <div>
            <span className="text-xs font-mono" style={{ color: "#9CA3AF" }}>{trial.nctId}</span>
            <div className="flex items-center gap-2 mt-0.5">
              <span
                className="text-xs px-2 py-0.5 rounded-full flex items-center gap-1"
                style={{
                  backgroundColor: status.bg,
                  color: status.color,
                  fontWeight: 600,
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: status.dot }}
                />
                {trial.status}
              </span>
              <span
                className="text-xs px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: "rgba(2, 62, 98, 0.06)",
                  color: "#023E62",
                  fontWeight: 600,
                }}
              >
                {trial.phase}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Title */}
      <h4
        className="mb-3 line-clamp-2 text-sm leading-snug"
        style={{ fontWeight: 600, color: "#111827" }}
      >
        {trial.title}
      </h4>

      {/* Location */}
      <div className="flex items-start gap-1.5 mb-2">
        <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: "#9CA3AF" }} />
        <p className="text-xs line-clamp-2" style={{ color: "#4B5563" }}>
          {trial.location}
        </p>
      </div>

      {/* Eligibility */}
      <div
        className="rounded-lg p-2.5 mb-2.5 text-xs"
        style={{ backgroundColor: "rgba(102, 172, 73, 0.06)", border: "1px solid rgba(102, 172, 73, 0.2)" }}
      >
        <p className="mb-0.5" style={{ color: "#166534", fontWeight: 600 }}>Eligibility</p>
        <p className="leading-relaxed line-clamp-2" style={{ color: "#4B5563" }}>{trial.eligibility}</p>
      </div>

      {/* Contact */}
      <div className="flex items-start gap-1.5">
        <Phone className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: "#9CA3AF" }} />
        <p className="text-xs line-clamp-2" style={{ color: "#6B7280" }}>{trial.contact}</p>
      </div>
    </div>
  );
}
