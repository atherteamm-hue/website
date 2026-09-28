import React, { useState } from 'react';
import { TechnicalModule } from '../types.ts';

const MODULES: TechnicalModule[] = [
  {
    id: 'aria-seek',
    name: '@mainframe/aria-seek-engine',
    version: 'v2.4.1',
    badge: 'CORE ENGINE',
    description:
      'Continuous video canvas seeking with delta acceleration damping, zero-jitter bounds checking, and onSeeked queue pipelining.',
    language: 'typescript',
    installCmd: 'npm install @mainframe/aria-seek-engine',
    codeSnippet: `import { createKineticScrubber } from '@mainframe/aria-seek-engine';

const scrubber = createKineticScrubber({
  video: document.querySelector('#hero-canvas'),
  sensitivity: 0.8,
  clamp: [0, 4.0],
  onSeek: (time) => console.log('Current gaze frame:', time),
});

window.addEventListener('mousemove', (e) => scrubber.feed(e.clientX));`,
    specs: {
      latency: '0.8ms',
      throughput: '120fps lock',
      memory: '4.2MB',
      target: 'Chrome / Safari / Edge'
    }
  },
  {
    id: 'fluid-clamp',
    name: '@mainframe/fluid-typography',
    version: 'v1.8.0',
    badge: 'TYPOGRAPHY',
    description:
      'Continuous multi-axis CSS clamp and variable font interpolator matching Swiss graphic design standards without media query step-jumps.',
    language: 'typescript',
    installCmd: 'npm install @mainframe/fluid-typography',
    codeSnippet: `import { fluidClamp } from '@mainframe/fluid-typography';

// Generates mathematical clamp formula matching optical curve
const heroTextClamp = fluidClamp({
  minSize: 18,
  maxSize: 26,
  minViewport: 320,
  maxViewport: 1440,
  unit: 'px',
});

// Result: clamp(18px, 0.714vw + 15.71px, 26px)`,
    specs: {
      latency: '0.0ms (CSS)',
      throughput: 'Instant reflow',
      memory: '0.1MB',
      target: 'Universal CSS3'
    }
  },
  {
    id: 'aria-protocol',
    name: '@mainframe/aria-agent-protocol',
    version: 'v3.1.2',
    badge: 'AI AGENT PROTOCOL',
    description:
      'Bidirectional state synchronization protocol between A.R.I.A (Adaptive Response Interface Agent) and user kinetic interaction states.',
    language: 'json',
    installCmd: 'npm install @mainframe/aria-agent-protocol',
    codeSnippet: `{
  "agent_id": "ARIA-PRIME-01",
  "attention_vector": [0.72, 0.50, 0.0],
  "gaze_yaw_degrees": -14.2,
  "kinetic_state": {
    "velocity_normalized": 0.42,
    "idle_threshold_ms": 1200,
    "current_time_seconds": 1.48
  },
  "interface_status": "RESPONSIVE_LOCKED"
}`,
    specs: {
      latency: '< 1.2ms',
      throughput: '1,000 evt/s',
      memory: '1.8MB',
      target: 'WebSocket / WebRTC'
    }
  }
];

export const TechnicalLibraryPage: React.FC = () => {
  const [activeModuleId, setActiveModuleId] = useState<string>('aria-seek');
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  // Live Kinetic Calculator Interactive Toy
  const [simWidth, setSimWidth] = useState<number>(1440);
  const [simDelta, setSimDelta] = useState<number>(45);
  const [simSensitivity, setSimSensitivity] = useState<number>(0.8);
  const [simDuration, setSimDuration] = useState<number>(4.0);

  const calculatedOffset = (simDelta / simWidth) * simSensitivity * simDuration;

  const currentModule = MODULES.find((m) => m.id === activeModuleId) || MODULES[0];

  const handleCopyCmd = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <div className="relative z-1 min-h-screen pt-24 sm:pt-28 pb-20 px-5 sm:px-8 md:px-12 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-10 sm:mb-14">
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-neutral-500 uppercase mb-3">
          <span>MAINFRAME SYSTEMS SPECIFICATION</span>
          <span>∙</span>
          <span>DEVELOPER PORTAL</span>
        </div>
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-black mb-4"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Technical Library
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 max-w-2xl font-light leading-relaxed">
          Open-source protocols, kinetic scrubbing algorithms, and interface system architectures developed for high-frequency browser environments.
        </p>
      </div>

      {/* Interactive Kinetic Formula Inspector */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-md border border-neutral-200/80 shadow-xs mb-12">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-neutral-100">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">
              ALGORITHM IN FOCUS
            </span>
            <h3 className="text-2xl font-medium tracking-tight text-black mt-1">
              Horizontal Scrub Time Offset Function
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 font-mono mt-1">
              timeOffset = (delta / window.innerWidth) * SENSITIVITY * video.duration
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-900 text-white font-mono text-center min-w-[200px]">
            <span className="text-[11px] text-neutral-400 block uppercase tracking-wider">
              COMPUTED TIME OFFSET
            </span>
            <span className="text-3xl font-medium text-emerald-400">
              {calculatedOffset >= 0 ? `+${calculatedOffset.toFixed(3)}s` : `${calculatedOffset.toFixed(3)}s`}
            </span>
          </div>
        </div>

        {/* Live Interactive Sliders */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
          <div>
            <div className="flex justify-between text-xs font-mono text-neutral-600 mb-1.5">
              <span>CURSOR DELTA (px)</span>
              <span className="font-semibold text-black">{simDelta}px</span>
            </div>
            <input
              type="range"
              min="-150"
              max="150"
              value={simDelta}
              onChange={(e) => setSimDelta(parseInt(e.target.value))}
              className="w-full accent-black cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono text-neutral-600 mb-1.5">
              <span>VIEWPORT WIDTH</span>
              <span className="font-semibold text-black">{simWidth}px</span>
            </div>
            <input
              type="range"
              min="375"
              max="2560"
              step="25"
              value={simWidth}
              onChange={(e) => setSimWidth(parseInt(e.target.value))}
              className="w-full accent-black cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono text-neutral-600 mb-1.5">
              <span>SENSITIVITY COEFFICIENT</span>
              <span className="font-semibold text-black">{simSensitivity.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="2.0"
              step="0.05"
              value={simSensitivity}
              onChange={(e) => setSimSensitivity(parseFloat(e.target.value))}
              className="w-full accent-black cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Module Selector Tabs */}
      <div className="flex flex-wrap gap-2.5 mb-6">
        {MODULES.map((mod) => (
          <button
            key={mod.id}
            onClick={() => setActiveModuleId(mod.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono transition-all duration-200 cursor-pointer ${
              activeModuleId === mod.id
                ? 'bg-black text-white shadow-xs'
                : 'bg-white/90 text-neutral-700 border border-neutral-200 hover:border-black'
            }`}
          >
            {mod.name}
          </button>
        ))}
      </div>

      {/* Active Module Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Spec Sheet */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-md border border-neutral-200 shadow-xs space-y-6">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 uppercase font-semibold">
              {currentModule.badge}
            </span>
            <h2 className="text-2xl font-medium tracking-tight text-black mt-2">
              {currentModule.name}
            </h2>
            <div className="text-xs font-mono text-neutral-400 mt-1">
              Version: {currentModule.version} · MIT Licensed
            </div>
            <p className="text-sm text-neutral-600 leading-relaxed mt-3">
              {currentModule.description}
            </p>
          </div>

          {/* Quick Install */}
          <div>
            <span className="text-xs font-mono uppercase text-neutral-500 block mb-1.5">
              PACKAGE INSTALLATION
            </span>
            <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-900 text-neutral-200 font-mono text-xs">
              <span className="truncate mr-2">{currentModule.installCmd}</span>
              <button
                type="button"
                onClick={() => handleCopyCmd(currentModule.installCmd)}
                className="shrink-0 px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-[11px] text-white transition-colors cursor-pointer"
              >
                {copiedCmd === currentModule.installCmd ? '✓ Copied' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Performance Benchmarks */}
          <div className="pt-4 border-t border-neutral-100">
            <span className="text-xs font-mono uppercase text-neutral-500 block mb-3">
              BENCHMARK RUNTIMES
            </span>
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 bg-neutral-50 rounded-xl">
                <span className="text-neutral-400 block text-[10px]">SEEK LATENCY</span>
                <span className="font-semibold text-black">{currentModule.specs.latency}</span>
              </div>
              <div className="p-3 bg-neutral-50 rounded-xl">
                <span className="text-neutral-400 block text-[10px]">THROUGHPUT</span>
                <span className="font-semibold text-black">{currentModule.specs.throughput}</span>
              </div>
              <div className="p-3 bg-neutral-50 rounded-xl">
                <span className="text-neutral-400 block text-[10px]">HEAP FOOTPRINT</span>
                <span className="font-semibold text-black">{currentModule.specs.memory}</span>
              </div>
              <div className="p-3 bg-neutral-50 rounded-xl">
                <span className="text-neutral-400 block text-[10px]">TARGET PLATFORM</span>
                <span className="font-semibold text-black">{currentModule.specs.target}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Code Snippet */}
        <div className="lg:col-span-7 rounded-3xl bg-neutral-950 border border-neutral-800 p-6 sm:p-8 text-neutral-200 font-mono text-xs shadow-xl relative">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="text-neutral-400 ml-2 text-[11px]">
                {currentModule.id}.ts
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleCopyCmd(currentModule.codeSnippet)}
              className="text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer px-2 py-1 rounded bg-neutral-900 border border-neutral-700"
            >
              {copiedCmd === currentModule.codeSnippet ? '✓ Code Copied' : 'Copy Code'}
            </button>
          </div>
          <pre className="overflow-x-auto leading-relaxed text-[12px] text-neutral-300">
            <code>{currentModule.codeSnippet}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
