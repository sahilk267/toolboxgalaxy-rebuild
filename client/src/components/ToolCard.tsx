// Orbital Workbench: compact tool card with telemetry strip and disciplined color accents.
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import type { ToolDefinition } from "@/data/toolRegistry";

export default function ToolCard({ tool, compact = false }: { tool: ToolDefinition; compact?: boolean }) {
  return (
    <Link href={`/tools/${tool.slug}`} className={`tool-card tool-card--${tool.accent} ${compact ? "tool-card--compact" : ""}`}>
      <div className="telemetry-strip">
        <span><CheckCircle2 size={13} /> VERIFIED</span>
        <span>LOCAL</span>
      </div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="mono-label text-white/45">{tool.category}</p>
          <h3 className="font-display mt-2 text-xl font-semibold leading-tight tracking-[-0.035em]">{tool.name}</h3>
        </div>
        <span className="card-arrow"><ArrowUpRight size={19} /></span>
      </div>
      {!compact && <p className="mt-5 max-w-[30ch] text-sm leading-6 text-white/62">{tool.description}</p>}
      <div className="mt-auto flex gap-2 pt-6">
        {tool.tags.map((tag) => <span className="tag-chip" key={tag}>{tag}</span>)}
      </div>
    </Link>
  );
}
