// Orbital Workbench: searchable verified-tool registry and no unverified legacy links.
import AppShell from "@/components/AppShell";
import SectionHeading from "@/components/SectionHeading";
import ToolCard from "@/components/ToolCard";
import { categories, tools } from "@/data/toolRegistry";
import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";

export default function Tools() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("All");
  const visibleTools = useMemo(() => tools.filter((tool) => {
    const matchesQuery = `${tool.name} ${tool.description} ${tool.category}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (activeCategory === "All" || tool.category === activeCategory);
  }), [activeCategory, query]);

  return (
    <AppShell>
      <section className="page-section page-section--tools">
        <div className="page-kicker"><span>01</span><span>VERIFIED TOOL FOUNDRY</span></div>
        <SectionHeading eyebrow="LOCAL-FIRST / ZERO SERVER DEPENDENCIES" title="Small tools. Clear outcomes." copy="The first release keeps only browser-run utilities that can be tested, explained, and used without sending your input away." />

        <div className="tool-controls">
          <label className="search-field">
            <Search size={18} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search verified tools" aria-label="Search verified tools" />
          </label>
          <div className="category-bar" aria-label="Tool categories">
            <SlidersHorizontal size={16} className="text-[#c7f36b]" />
            {categories.map((category) => <button key={category} className={`filter-chip ${activeCategory === category ? "filter-chip--active" : ""}`} onClick={() => setActiveCategory(category)}>{category}</button>)}
          </div>
        </div>

        <div className="tools-result-line"><span>{visibleTools.length.toString().padStart(2, "0")} verified modules</span><span>runs in your browser</span></div>
        <div className="tool-grid">
          {visibleTools.map((tool) => <ToolCard key={tool.slug} tool={tool} />)}
        </div>
        {visibleTools.length === 0 && <div className="empty-state"><p className="mono-label">NO MODULE FOUND</p><p>Try a shorter search or return to all categories.</p></div>}
      </section>
    </AppShell>
  );
}
