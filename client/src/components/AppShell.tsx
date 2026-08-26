// Orbital Workbench: left-rail shell, signal-lime actions, calm utility motion.
import { Link, useLocation } from "wouter";
import InstallWorkbench from "@/components/InstallWorkbench";
import ShortcutReference from "@/components/ShortcutReference";
import { Gamepad2, Menu, Orbit, Wrench } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";

const orbitMark = "/manus-storage/toolbox-galaxy-orbit-mark_c8160386.png";

const navItems = [
  { href: "/", label: "Overview", icon: Orbit },
  { href: "/tools", label: "Tools", icon: Wrench },
  { href: "/games", label: "Games", icon: Gamepad2 },
];

export default function AppShell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <div className="app-shell min-h-screen bg-[#0b1020] text-[#f4f2ea]">
      <aside className={`site-rail ${open ? "site-rail--open" : ""}`}>
        <div className="rail-brand">
          <img src={orbitMark} alt="Toolbox Galaxy orbit mark" className="orbit-mark" />
          <div>
            <p className="mono-label text-[#c7f36b]">TOOLBOX</p>
            <p className="font-display text-lg font-bold tracking-[-0.04em]">GALAXY</p>
          </div>
        </div>
        <nav aria-label="Primary navigation" className="rail-nav">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = href === "/" ? location === href : location.startsWith(href);
            return <Link href={href} key={href} onClick={() => setOpen(false)} className={`rail-link ${active ? "rail-link--active" : ""}`}><Icon size={18} strokeWidth={1.8} /><span>{label}</span>{active && <span className="active-pip" aria-hidden="true" />}</Link>;
          })}
        </nav>
        <div className="rail-bottom">
          <ShortcutReference />
          <InstallWorkbench />
          <div className="rail-status"><span className="status-dot" aria-hidden="true" /><div><p className="mono-label">SYSTEM STATUS</p><p className="text-sm text-white/80">Local-first build</p></div></div>
          <Link href="/contact" className="rail-contact">Send feedback <span>↗</span></Link>
          <div className="rail-legal"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div>
        </div>
      </aside>
      <header className="mobile-bar">
        <Link href="/" className="flex items-center gap-2"><img src={orbitMark} alt="" className="h-10 w-10" /><span className="font-display font-bold tracking-tight">TOOLBOX GALAXY</span></Link>
        <button className="icon-button" onClick={() => setOpen((value) => !value)} aria-label="Toggle navigation" aria-expanded={open}><Menu size={21} /></button>
      </header>
      <main className="content-runway"><div className="page-grid" aria-hidden="true" /><div className="runway-stamp" aria-hidden="true"><img src={orbitMark} alt="" /><span>ORBITAL<br />WORKBENCH</span></div>{children}</main>
      {open && <button className="mobile-scrim" aria-label="Close navigation" onClick={() => setOpen(false)} />}
    </div>
  );
}
