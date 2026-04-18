import { Link, useLocation } from "react-router";
import { Activity, BookOpen, FlaskConical, Menu, X } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  variant?: "home" | "chat";
  disease?: string;
  onTabChange?: (tab: any) => void;
}

export function Header({ variant = "home", disease, onTabChange }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className="w-full sticky top-0 z-50 backdrop-blur-md"
      style={{
        backgroundColor: variant === "chat" ? "#023E62" : "rgba(2, 62, 98, 0.95)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "#66AC49" }}
            >
              <Activity className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-white text-xl" style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>
              Cura<span style={{ color: "#66AC49" }}>link</span>
            </span>
          </Link>

          {/* Center: disease context in chat mode */}
          {variant === "chat" && disease && (
            <div className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full"
              style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#66AC49" }} />
              <span className="text-white/80 text-sm">Researching:</span>
              <span className="text-white text-sm" style={{ fontWeight: 600 }}>{disease}</span>
            </div>
          )}

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-1">
            <a
              href={variant === "home" ? "#how-it-works" : undefined}
              onClick={(e) => {
                if (variant === "chat" && onTabChange) {
                  e.preventDefault();
                  onTabChange("papers");
                }
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              Research
            </a>
            <a
              href={variant === "home" ? "#how-it-works" : undefined}
              onClick={(e) => {
                if (variant === "chat" && onTabChange) {
                  e.preventDefault();
                  onTabChange("trials");
                }
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm cursor-pointer"
            >
              <FlaskConical className="w-4 h-4" />
              Trials
            </a>
            <Link
              to="/"
              className="ml-2 px-4 py-2 rounded-lg text-white text-sm transition-all"
              style={{ backgroundColor: "#66AC49", fontWeight: 600 }}
            >
              New Query
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10" style={{ backgroundColor: "#023E62" }}>
          <div className="px-4 py-3 space-y-1">
            <a 
              href={variant === "home" ? "#how-it-works" : undefined}
              onClick={(e) => {
                if (variant === "chat" && onTabChange) {
                  e.preventDefault();
                  onTabChange("papers");
                  setMobileMenuOpen(false);
                }
              }}
              className="block px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm"
            >
              Research
            </a>
            <a 
              href={variant === "home" ? "#how-it-works" : undefined}
              onClick={(e) => {
                if (variant === "chat" && onTabChange) {
                  e.preventDefault();
                  onTabChange("trials");
                  setMobileMenuOpen(false);
                }
              }}
              className="block px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm"
            >
              Clinical Trials
            </a>
            <Link
              to="/"
              className="block px-3 py-2 rounded-lg text-white text-sm text-center"
              style={{ backgroundColor: "#66AC49", fontWeight: 600 }}
            >
              New Query
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
