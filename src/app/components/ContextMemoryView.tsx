import { History, Target, User, Clock, ShieldCheck } from "lucide-react";

interface ContextMemoryViewProps {
  context: {
    disease: string;
    lastQuery: string;
  };
  userId: string;
  historyCount: number;
}

export function ContextMemoryView({ context, userId, historyCount }: ContextMemoryViewProps) {
  return (
    <div className="space-y-4">
      <div 
        className="rounded-2xl p-6 border shadow-sm"
        style={{ backgroundColor: "white", borderColor: "rgba(2, 62, 98, 0.08)" }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(217, 119, 6, 0.08)", color: "#D97706" }}>
            <History className="w-5 h-5" />
          </div>
          <div>
            <h3 style={{ fontWeight: 700, color: "#023E62", fontSize: "1rem" }}>Session Context Memory</h3>
            <p className="text-xs" style={{ color: "#6B7280" }}>Tracking medical parameters throughout this conversation</p>
          </div>
        </div>

        <div className="grid gap-4">
          {/* Active Disease */}
          <div className="flex items-center justify-between p-4 rounded-xl" style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0" }}>
            <div className="flex items-center gap-3">
              <Target className="w-4 h-4" style={{ color: "#023E62" }} />
              <div>
                <p className="text-[10px] uppercase tracking-wider font-bold" style={{ color: "#94A3B8" }}>Primary Condition</p>
                <p className="text-sm font-semibold" style={{ color: "#0F172A" }}>{context.disease || "Not set"}</p>
              </div>
            </div>
            <div className="px-2 py-1 rounded text-[10px] font-bold bg-green-100 text-green-700 uppercase tracking-tight">Active Tracking</div>
          </div>

          {/* User Tracking */}
          <div className="flex items-center justify-between p-4 rounded-xl" style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0" }}>
            <div className="flex items-center gap-3">
              <User className="w-4 h-4" style={{ color: "#023E62" }} />
              <div>
                <p className="text-[10px] uppercase tracking-wider font-bold" style={{ color: "#94A3B8" }}>Identifier / Patient</p>
                <p className="text-sm font-semibold" style={{ color: "#0F172A" }}>{userId}</p>
              </div>
            </div>
          </div>

          {/* Activity */}
          <div className="flex items-center justify-between p-4 rounded-xl" style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0" }}>
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4" style={{ color: "#023E62" }} />
              <div>
                <p className="text-[10px] uppercase tracking-wider font-bold" style={{ color: "#94A3B8" }}>Conversation History</p>
                <p className="text-sm font-semibold" style={{ color: "#0F172A" }}>{historyCount} Interactions logged</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 rounded-xl border-dashed border-2 flex flex-col gap-2" style={{ borderColor: "rgba(2, 62, 98, 0.1)", backgroundColor: "rgba(2, 62, 98, 0.02)" }}>
           <div className="flex items-center gap-2">
             <ShieldCheck className="w-4 h-4" style={{ color: "#66AC49" }} />
             <p className="text-xs font-bold" style={{ color: "#023E62" }}>Privacy & Persistence</p>
           </div>
           <p className="text-[11px] leading-relaxed" style={{ color: "#64748B" }}>
             This data is securely persisted in your MongoDB cluster. The AI uses this "Memory" to personalize follow-up responses without requiring you to re-stating your condition.
           </p>
        </div>
      </div>
    </div>
  );
}
