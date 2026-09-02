import { useState } from "react";
import { Coffee, Check, Copy, Shield, X } from "lucide-react";

export default function SupportModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState<"global" | "india">("global");

  if (!open) return null;

  const upiId = "sahil.k00267@okaxis"; // Support UPI address

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md rounded-2xl border border-white/15 bg-[#0e1628] p-6 shadow-2xl text-[#f4f2ea]"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-white/50 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#c7f36b]/15 text-[#c7f36b] border border-[#c7f36b]/30">
            <Coffee size={22} />
          </div>
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#c7f36b]">SUPPORT COMMUNITY UTILITY</span>
            <h3 className="font-display text-xl font-semibold tracking-tight">Support Toolbox Galaxy</h3>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-white/70">
          Toolbox Galaxy is <b>100% free, private, and subscription-free</b>. If our in-browser tools or games saved you time and subscription fees today, consider sponsoring a coffee!
        </p>

        {/* Currency / Region Tabs */}
        <div className="mt-5 grid grid-cols-2 gap-2 p-1 rounded-xl bg-white/5 border border-white/10 text-xs font-medium">
          <button
            type="button"
            onClick={() => setTab("global")}
            className={`py-2 rounded-lg transition-all ${tab === "global" ? "bg-[#c7f36b] text-[#0b1020] font-bold shadow-md" : "text-white/70 hover:text-white"}`}
          >
            🌍 Global / US / UK ($)
          </button>
          <button
            type="button"
            onClick={() => setTab("india")}
            className={`py-2 rounded-lg transition-all ${tab === "india" ? "bg-[#c7f36b] text-[#0b1020] font-bold shadow-md" : "text-white/70 hover:text-white"}`}
          >
            🇮🇳 India (UPI / ₹)
          </button>
        </div>

        {tab === "global" ? (
          <div className="mt-5 space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <a
                href="https://www.buymeacoffee.com/MohdAziz"
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center justify-center p-3 rounded-xl border border-white/10 bg-white/5 hover:border-[#c7f36b]/50 hover:bg-[#c7f36b]/10 transition-all text-center group"
              >
                <span className="text-lg font-bold text-[#c7f36b]">$3</span>
                <span className="text-[11px] text-white/60 group-hover:text-white">Espresso</span>
              </a>
              <a
                href="https://www.buymeacoffee.com/MohdAziz"
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center justify-center p-3 rounded-xl border border-[#c7f36b]/30 bg-[#c7f36b]/5 hover:border-[#c7f36b] hover:bg-[#c7f36b]/15 transition-all text-center group"
              >
                <span className="text-lg font-bold text-[#c7f36b]">$5</span>
                <span className="text-[11px] text-white/60 group-hover:text-white">Coffee + Donut</span>
              </a>
              <a
                href="https://www.buymeacoffee.com/MohdAziz"
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center justify-center p-3 rounded-xl border border-white/10 bg-white/5 hover:border-[#c7f36b]/50 hover:bg-[#c7f36b]/10 transition-all text-center group"
              >
                <span className="text-lg font-bold text-[#c7f36b]">$10</span>
                <span className="text-[11px] text-white/60 group-hover:text-white">Server Sponsor</span>
              </a>
            </div>

            <div className="flex justify-center pt-2">
              <a 
                href="https://www.buymeacoffee.com/MohdAziz" 
                target="_blank" 
                rel="noreferrer"
                className="inline-block transition-transform hover:scale-105 active:scale-95"
              >
                <img 
                  src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" 
                  alt="Buy Me a Coffee" 
                  style={{ height: "60px", width: "217px" }}
                  className="rounded-xl shadow-lg"
                />
              </a>
            </div>
          </div>
        ) : (
          <div className="mt-5 space-y-3">
            <div className="p-3.5 rounded-xl border border-white/10 bg-white/5 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-mono text-white/50">UPI ID / GPAY / PHONEPE</p>
                <p className="font-mono text-sm font-semibold text-[#c7f36b]">{upiId}</p>
              </div>
              <button
                type="button"
                onClick={handleCopyUpi}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors"
              >
                {copied ? <Check size={14} className="text-[#c7f36b]" /> : <Copy size={14} />}
                <span>{copied ? "Copied" : "Copy UPI"}</span>
              </button>
            </div>

            <p className="text-center text-xs text-white/50">
              Any micro-donation (₹10, ₹20, ₹50) directly supports domain and local tool development by <b>Aaditech Solution</b>.
            </p>
          </div>
        )}

        <div className="mt-5 flex items-center justify-between pt-4 border-t border-white/10 text-[11px] text-white/50 font-mono">
          <span className="flex items-center gap-1"><Shield size={12} className="text-[#c7f36b]" /> 100% On-Device Privacy</span>
          <span>By Aaditech Solution</span>
        </div>
      </div>
    </div>
  );
}
