import { Link, useLocation } from "wouter";
import InstallWorkbench from "@/components/InstallWorkbench";
import ShortcutReference from "@/components/ShortcutReference";
import CommandPalette from "@/components/CommandPalette";
import {
  FileText,
  Gamepad2,
  Menu,
  Orbit,
  Wrench,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import type { ReactNode } from "react";
import { useState, useEffect } from "react";

const orbitMark = "/orbit-mark.svg";

const navItems = [
  { href: "/", label: "Overview", icon: Orbit },
  { href: "/studio", label: "PDF & Doc Studio", icon: FileText },
  { href: "/tools", label: "Tools", icon: Wrench },
  { href: "/games", label: "Games", icon: Gamepad2 },
];

export default function AppShell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("tg_sidebar_collapsed");
      if (saved !== null) return saved === "true";
    }
    return false;
  });

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      const next = !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem("tg_sidebar_collapsed", String(next));
      }
      return next;
    });
  };

  return (
    <div className={`app-shell min-h-screen bg-[#0b1020] text-[#f4f2ea] ${collapsed ? "app-shell--collapsed" : ""}`}>
      {/* Sidebar Rail */}
      <aside className={`site-rail ${open ? "site-rail--open" : ""} ${collapsed ? "site-rail--collapsed" : ""}`}>
        <div className="rail-brand flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src={orbitMark} alt="Toolbox Galaxy orbit mark" className="orbit-mark" />
            <div>
              <p className="mono-label text-[#c7f36b]">TOOLBOX</p>
              <p className="font-display text-lg font-bold tracking-[-0.04em]">GALAXY</p>
            </div>
          </Link>
          <button
            onClick={toggleCollapsed}
            className="hidden md:flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/70 hover:border-[#c7f36b]/40 hover:bg-[#c7f36b]/10 hover:text-[#c7f36b] transition-colors"
            title="Collapse Sidebar"
            aria-label="Collapse Sidebar"
          >
            <PanelLeftClose size={16} />
          </button>
        </div>
        <nav aria-label="Primary navigation" className="rail-nav">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = href === "/" ? location === href : location.startsWith(href);
            return (
              <Link
                href={href}
                key={href}
                onClick={() => setOpen(false)}
                className={`rail-link ${active ? "rail-link--active" : ""}`}
              >
                <Icon size={18} strokeWidth={1.8} />
                <span>{label}</span>
                {active && <span className="active-pip" aria-hidden="true" />}
              </Link>
            );
          })}
        </nav>
        <div className="rail-bottom">
          <CommandPalette />
          <ShortcutReference />
          <InstallWorkbench />
          <div className="rail-status">
            <span className="status-dot" aria-hidden="true" />
            <div>
              <p className="mono-label">SYSTEM STATUS</p>
              <p className="text-sm text-white/80">Local-first build</p>
            </div>
          </div>
          <Link href="/contact" className="rail-contact">
            Send feedback <span>↗</span>
          </Link>
          <div className="rail-legal">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </aside>

      {/* Floating Re-open Sidebar Button when collapsed on desktop */}
      {collapsed && (
        <button
          onClick={toggleCollapsed}
          className="fixed top-4 left-4 z-40 hidden md:flex items-center gap-2 rounded-xl border border-white/15 bg-[#0e1628]/90 px-3 py-2 text-xs font-medium text-white shadow-xl backdrop-blur-md hover:border-[#c7f36b]/60 hover:bg-[#121c33] hover:text-[#c7f36b] transition-all"
          title="Expand Sidebar Navigation"
        >
          <PanelLeftOpen size={16} className="text-[#c7f36b]" />
          <span>Show Menu</span>
        </button>
      )}

      {/* Mobile Top Bar */}
      <header className="mobile-bar">
        <Link href="/" className="flex items-center gap-2">
          <img src={orbitMark} alt="" className="h-10 w-10" />
          <span className="font-display font-bold tracking-tight">TOOLBOX GALAXY</span>
        </Link>
        <button
          className="icon-button"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <Menu size={21} />
        </button>
      </header>

      {/* Main Content Area */}
      <main className={`content-runway ${collapsed ? "content-runway--full" : ""}`}>
        <div className="page-grid" aria-hidden="true" />
        <div className="runway-stamp" aria-hidden="true">
          <img src={orbitMark} alt="" />
          <span>ORBITAL<br />WORKBENCH</span>
        </div>
        {children}
      </main>

      {open && <button className="mobile-scrim" aria-label="Close navigation" onClick={() => setOpen(false)} />}
    </div>
  );
}
