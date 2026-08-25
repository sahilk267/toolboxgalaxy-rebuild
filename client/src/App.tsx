// Orbital Workbench: route map for the tools hub, game bay, honest contact route, and verified modules.
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Contact from "@/pages/Contact";
import Games from "@/pages/Games";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import Tools from "@/pages/Tools";
import ToolWorkspace from "@/pages/ToolWorkspace";
import { Route, Switch } from "wouter";
import { lazy, Suspense } from "react";

const OrbitDash = lazy(() => import("@/pages/OrbitDash"));
const SignalSwitch = lazy(() => import("@/pages/SignalSwitch"));
const CircuitShift = lazy(() => import("@/pages/CircuitShift"));

function GameRoute() {
  return <Suspense fallback={<div className="game-route-loading"><span className="status-dot" /> Loading Orbit Dash…</div>}><OrbitDash /></Suspense>;
}

function SignalSwitchRoute() {
  return <Suspense fallback={<div className="game-route-loading"><span className="status-dot" /> Loading Signal Switch…</div>}><SignalSwitch /></Suspense>;
}

function CircuitShiftRoute() {
  return <Suspense fallback={<div className="game-route-loading"><span className="status-dot" /> Loading Circuit Shift…</div>}><CircuitShift /></Suspense>;
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster theme="dark" position="bottom-right" />
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/tools" component={Tools} />
            <Route path="/tools/:slug" component={ToolWorkspace} />
            <Route path="/games" component={Games} />
            <Route path="/games/orbit-dash" component={GameRoute} />
            <Route path="/games/signal-switch" component={SignalSwitchRoute} />
            <Route path="/games/circuit-shift" component={CircuitShiftRoute} />
            <Route path="/contact" component={Contact} />
            <Route path="/privacy" component={Privacy} />
            <Route path="/terms" component={Terms} />
            <Route component={NotFound} />
          </Switch>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
