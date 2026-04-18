import { ExternalLink, Calendar, Users, BookOpen } from "lucide-react";
import type { ResearchPaper } from "../data/mockData";

interface ResearchPaperCardProps {
  paper: ResearchPaper;
  index: number;
}

const sourceColors: Record<string, string> = {
  PubMed: "#B45309",
  OpenAlex: "#1D4ED8",
};

const sourceBg: Record<string, string> = {
  PubMed: "#FEF3C7",
  OpenAlex: "#DBEAFE",
};

export function ResearchPaperCard({ paper, index }: ResearchPaperCardProps) {
  return (
    <div
      className="rounded-xl p-4 border transition-all hover:shadow-md group"
      style={{
        backgroundColor: "#fff",
        borderColor: "rgba(2, 62, 98, 0.1)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
      }}
    >
      {/* Source badge + year */}
      <div className="flex items-center justify-between mb-2.5">
        <span
          className="text-xs px-2 py-0.5 rounded-full"
          style={{
            backgroundColor: sourceBg[paper.source] || "#F3F4F6",
            color: sourceColors[paper.source] || "#374151",
            fontWeight: 600,
          }}
        >
          {paper.source}
        </span>
        <div className="flex items-center gap-1 text-xs" style={{ color: "#6B7280" }}>
          <Calendar className="w-3 h-3" />
          {paper.year}
        </div>
      </div>

      {/* Title */}
      <h4
        className="mb-1.5 line-clamp-2 group-hover:text-[#023E62] transition-colors text-sm leading-snug"
        style={{ fontWeight: 600, color: "#111827" }}
      >
        {paper.title}
      </h4>

      {/* Journal */}
      <div className="flex items-center gap-1 mb-2" style={{ color: "#66AC49" }}>
        <BookOpen className="w-3 h-3 shrink-0" />
        <span className="text-xs" style={{ fontWeight: 500 }}>{paper.journal}</span>
      </div>

      {/* Authors */}
      <div className="flex items-start gap-1 mb-2.5">
        <Users className="w-3 h-3 shrink-0 mt-0.5" style={{ color: "#9CA3AF" }} />
        <p className="text-xs line-clamp-1" style={{ color: "#6B7280" }}>
          {paper.authors.join(", ")}
        </p>
      </div>

      {/* Snippet */}
      <p className="text-xs leading-relaxed line-clamp-3 mb-3" style={{ color: "#4B5563" }}>
        {paper.snippet}
      </p>

      {/* View source button */}
      <a
        href={paper.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all hover:opacity-90"
        style={{
          backgroundColor: "rgba(2, 62, 98, 0.06)",
          color: "#023E62",
          fontWeight: 600,
          border: "1px solid rgba(2, 62, 98, 0.15)",
        }}
      >
        <ExternalLink className="w-3 h-3" />
        View Source
      </a>
    </div>
  );
}
