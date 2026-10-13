// src/components/MaeSimulations.tsx
import React, { useState } from 'react';
import { ExternalLink, Settings, Zap, Code, Terminal, Activity, Server, Binary, Wind, Calculator, Sparkles } from 'lucide-react';
import { MatrixSimulatorModal } from './MatrixSimulatorModal';

// 1. أدوات فريق أثر الحصرية (Athar Originals)
const atharToolsData = [
  {
    title: "Athar Matrix Studio",
    description: "Step-by-step linear algebra solver: Vectors, Subspaces, Gauss-Jordan & Cramer.",
    icon: <Calculator size={32} strokeWidth={1.5} />,
    isModal: true
  }
  // بتقدر مستقبلاً تضيف أي أداة بتبرمجها هون ورح تطلع بقسم أثر الحصري
];

// 2. محاكيات MAE Academy
const maeSimulationsData = [
  {
    title: "Control Systems",
    description: "Tune feedback, stability, and transient response inside a visible control loop.",
    icon: <Settings size={32} strokeWidth={1.5} />,
    link: "https://maeacademy.org/simulations/control-systems" 
  },
  {
    title: "Electrical Circuits",
    description: "Probe current, voltage, and signal behavior across an interactive circuit bench.",
    icon: <Zap size={32} strokeWidth={1.5} />,
    link: "https://maeacademy.org/simulations/circuit-lab"
  },
  {
    title: "Code Studio",
    description: "Interactive Multi-Language Simulation & Trace Studio (MASM 8086, Python, C++, C).",
    icon: <Code size={32} strokeWidth={1.5} />,
    link: "https://maeacademy.org/simulations/code"
  },
  {
    title: "Arduino Studio",
    description: "Embedded Systems & Microcontrollers: write Arduino C++ and watch live serial monitor.",
    icon: <Terminal size={32} strokeWidth={1.5} />,
    link: "https://maeacademy.org/simulators/arduino-studio"
  },
  {
    title: "Power Electronics",
    description: "Test switching topologies, conversion stages, and power flow decisions.",
    icon: <Activity size={32} strokeWidth={1.5} />,
    link: "https://maeacademy.org/simulations/power-electronics"
  },
  {
    title: "PLC Logic",
    description: "Build ladder logic and observe industrial control sequences in motion.",
    icon: <Server size={32} strokeWidth={1.5} />,
    link: "https://maeacademy.org/simulations/plc"
  },
  {
    title: "Signals and Systems",
    description: "Transform, filter, and interpret signals across time and frequency domains.",
    icon: <Activity size={32} strokeWidth={1.5} />,
    link: "https://maeacademy.org/simulations/signals-and-systems"
  },
  {
    title: "Digital Logic Design",
    description: "Compose gates, truth states, and logic paths into working digital systems.",
    icon: <Binary size={32} strokeWidth={1.5} />,
    link: "https://maeacademy.org/simulations/digital-logic-design"
  },
  {
    title: "Pneumatics & Hydraulics",
    description: "Interactive electro-pneumatic circuit simulation with animated components.",
    icon: <Wind size={32} strokeWidth={1.5} />,
    link: "https://maeacademy.org/simulations/pneumatics-and-hydraulics"
  }
];

export function MaeSimulations() {
  const [isMatrixModalOpen, setIsMatrixModalOpen] = useState(false);

  return (
    <div className="mt-32 pt-20 border-t border-black/10">
      
      {/* =========================================
          SECTION 1: ATHAR ORIGINALS (أدوات أثر)
          ========================================= */}
      <div className="mb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-blue-600 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
              Athar Originals
            </h2>
            <h3 className="text-4xl sm:text-5xl font-black tracking-tighter uppercase text-black flex items-center gap-3">
              Exclusive Tools <Sparkles className="text-blue-500" size={36} />
            </h3>
          </div>
          <p className="text-sm font-medium text-neutral-500 max-w-sm md:text-right leading-relaxed">
            In-house tools and software developed exclusively by the Athar team to empower our students.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
          {atharToolsData.map((tool, index) => (
            <button 
              key={`athar-${index}`}
              onClick={() => tool.isModal && setIsMatrixModalOpen(true)}
              className="group flex flex-col bg-gradient-to-b from-white to-blue-50/30 border-2 border-blue-600 rounded-[30px] p-6 hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.3)] hover:-translate-y-1 transition-all duration-300 outline-none text-left relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-bl-xl rounded-tr-[28px]">
                Made by Athar
              </div>
              <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-md">
                {tool.icon}
              </div>
              <h4 className="text-xl font-bold text-black mb-3 tracking-tight">{tool.title}</h4>
              <p className="text-sm text-neutral-600 mb-8 flex-1 leading-relaxed">
                {tool.description}
              </p>
              <div className="inline-flex items-center justify-center gap-2 w-full py-4 bg-blue-600 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-colors mt-auto shadow-lg">
                Launch Studio
              </div>
            </button>
          ))}
        </div>
      </div>


      {/* =========================================
          SECTION 2: MAE ACADEMY SIMULATIONS
          ========================================= */}
      <div className="pt-16 border-t border-dashed border-neutral-300">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-500 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-black rounded-full"></span>
              Powered by MAE Academy
            </h2>
            <h3 className="text-3xl sm:text-4xl font-black tracking-tighter uppercase text-black">
              Engineering Simulations
            </h3>
          </div>
          <p className="text-sm font-medium text-neutral-500 max-w-sm md:text-right leading-relaxed">
            Applied laboratories for control, electronics, computation, and connected engineering systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
          {maeSimulationsData.map((sim, index) => (
            <a 
              key={`mae-${index}`}
              href={sim.link}
              className="group flex flex-col bg-white border border-neutral-200 rounded-[30px] p-6 hover:shadow-2xl hover:border-black/20 transition-all duration-300 outline-none"
            >
              <div className="w-16 h-16 rounded-2xl bg-neutral-50 flex items-center justify-center text-black mb-6 group-hover:scale-110 transition-transform duration-300">
                {sim.icon}
              </div>
              <h4 className="text-lg font-bold text-black mb-3 tracking-tight">{sim.title}</h4>
              <p className="text-sm text-neutral-500 mb-8 flex-1 leading-relaxed">
                {sim.description}
              </p>
              <div className="inline-flex items-center justify-center gap-2 w-full py-4 bg-neutral-50 border border-neutral-100 text-black font-bold text-xs uppercase tracking-widest rounded-xl group-hover:bg-black group-hover:text-white transition-colors mt-auto">
                Explore <ExternalLink size={14} />
              </div>
            </a>
          ))}
        </div>
      </div>
      
      {/* Modal / Popup for Matrix Studio */}
      {isMatrixModalOpen && (
        <MatrixSimulatorModal onClose={() => setIsMatrixModalOpen(false)} />
      )}

    </div>
  );
}
