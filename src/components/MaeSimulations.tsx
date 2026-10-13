import React, { useState } from 'react';
import { ExternalLink, Settings, Zap, Code, Terminal, Activity, Server, Binary, Wind, Calculator } from 'lucide-react';
import { MatrixSimulatorModal } from './MatrixSimulatorModal';

const simulationsData = [
  // أداة أثر (بتفتح Modal)
  {
    title: "Athar Matrix Studio",
    description: "Step-by-step linear algebra solver: Vectors, Subspaces, Gauss-Jordan & Cramer.",
    icon: <Calculator size={32} strokeWidth={1.5} />,
    isModal: true,
    provider: "athar"
  },
  // محاكيات MAE Academy (روابط خارجية)
  {
    title: "Control Systems",
    description: "Tune feedback, stability, and transient response inside a visible control loop.",
    icon: <Settings size={32} strokeWidth={1.5} />,
    link: "https://maeacademy.org/simulations/control-systems",
    provider: "mae"
  },
  {
    title: "Electrical Circuits",
    description: "Probe current, voltage, and signal behavior across an interactive circuit bench.",
    icon: <Zap size={32} strokeWidth={1.5} />,
    link: "https://maeacademy.org/simulations/circuit-lab",
    provider: "mae"
  },
  {
    title: "Code Studio",
    description: "Interactive Multi-Language Simulation & Trace Studio (MASM 8086, Python, C++, C).",
    icon: <Code size={32} strokeWidth={1.5} />,
    link: "https://maeacademy.org/simulations/code",
    provider: "mae"
  },
  {
    title: "Arduino Studio",
    description: "Embedded Systems & Microcontrollers: write Arduino C++ and watch live serial monitor.",
    icon: <Terminal size={32} strokeWidth={1.5} />,
    link: "https://maeacademy.org/simulators/arduino-studio",
    provider: "mae"
  },
  {
    title: "Power Electronics",
    description: "Test switching topologies, conversion stages, and power flow decisions.",
    icon: <Activity size={32} strokeWidth={1.5} />,
    link: "https://maeacademy.org/simulations/power-electronics",
    provider: "mae"
  },
  {
    title: "PLC Logic",
    description: "Build ladder logic and observe industrial control sequences in motion.",
    icon: <Server size={32} strokeWidth={1.5} />,
    link: "https://maeacademy.org/simulations/plc",
    provider: "mae"
  },
  {
    title: "Signals and Systems",
    description: "Transform, filter, and interpret signals across time and frequency domains.",
    icon: <Activity size={32} strokeWidth={1.5} />,
    link: "https://maeacademy.org/simulations/signals-and-systems",
    provider: "mae"
  },
  {
    title: "Digital Logic Design",
    description: "Compose gates, truth states, and logic paths into working digital systems.",
    icon: <Binary size={32} strokeWidth={1.5} />,
    link: "https://maeacademy.org/simulations/digital-logic-design",
    provider: "mae"
  },
  {
    title: "Pneumatics & Hydraulics",
    description: "Interactive electro-pneumatic circuit simulation with animated components.",
    icon: <Wind size={32} strokeWidth={1.5} />,
    link: "https://maeacademy.org/simulations/pneumatics-and-hydraulics",
    provider: "mae"
  }
];

export function MaeSimulations() {
  const [isMatrixModalOpen, setIsMatrixModalOpen] = useState(false);

  return (
    <div className="mt-32 pt-20 border-t border-black/10">
      
      {/* عنوان القسم */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-500 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-black rounded-full animate-pulse"></span>
            Athar & MAE Academy
          </h2>
          <h3 className="text-4xl sm:text-5xl font-black tracking-tighter uppercase text-black">
            Practical Simulations
          </h3>
        </div>
        <p className="text-sm font-medium text-neutral-500 max-w-sm md:text-right leading-relaxed">
          Applied laboratories and exclusive tools for control, computation, mathematics, and engineering systems.
        </p>
      </div>

      {/* شبكة البطاقات (ثيم موحد للكل) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
        {simulationsData.map((sim, index) => {
          
          // مكون الشريط الجانبي (Badge) لتحديد المصدر
          const ProviderBadge = () => (
            <div className="absolute top-0 right-0 z-10">
              {sim.provider === 'athar' ? (
                <div className="bg-black text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-bl-xl rounded-tr-[28px] shadow-sm">
                  Made by Athar
                </div>
              ) : (
                <div className="bg-neutral-100 text-neutral-500 text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-bl-xl rounded-tr-[28px] border-b border-l border-neutral-200">
                  MAE Academy
                </div>
              )}
            </div>
          );

          // إذا كان المحاكي داخلي (أداة أثر بتفتح كـ Modal)
          if (sim.isModal) {
            return (
              <button 
                key={`sim-${index}`}
                onClick={() => setIsMatrixModalOpen(true)}
                className="relative group flex flex-col bg-white border border-neutral-200 rounded-[30px] p-6 hover:shadow-2xl hover:border-black/20 transition-all duration-300 outline-none text-left"
              >
                <ProviderBadge />
                <div className="w-16 h-16 rounded-2xl bg-neutral-50 flex items-center justify-center text-black mb-6 group-hover:scale-110 group-hover:bg-black group-hover:text-white transition-all duration-300">
                  {sim.icon}
                </div>
                <h4 className="text-xl font-bold text-black mb-3 tracking-tight">{sim.title}</h4>
                <p className="text-sm text-neutral-500 mb-8 flex-1 leading-relaxed">
                  {sim.description}
                </p>
                <div className="inline-flex items-center justify-center gap-2 w-full py-4 bg-neutral-50 border border-neutral-100 text-black font-bold text-xs uppercase tracking-widest rounded-xl group-hover:bg-black group-hover:text-white transition-colors mt-auto">
                  Launch Studio
                </div>
              </button>
            );
          }

          // المحاكيات الخارجية العادية (روابط خارجية لـ MAE)
          return (
            <a 
              key={`sim-${index}`}
              href={sim.link}
              className="relative group flex flex-col bg-white border border-neutral-200 rounded-[30px] p-6 hover:shadow-2xl hover:border-black/20 transition-all duration-300 outline-none"
            >
              <ProviderBadge />
              <div className="w-16 h-16 rounded-2xl bg-neutral-50 flex items-center justify-center text-black mb-6 group-hover:scale-110 transition-transform duration-300">
                {sim.icon}
              </div>
              <h4 className="text-xl font-bold text-black mb-3 tracking-tight">{sim.title}</h4>
              <p className="text-sm text-neutral-500 mb-8 flex-1 leading-relaxed">
                {sim.description}
              </p>
              <div className="inline-flex items-center justify-center gap-2 w-full py-4 bg-neutral-50 border border-neutral-100 text-black font-bold text-xs uppercase tracking-widest rounded-xl group-hover:bg-black group-hover:text-white transition-colors mt-auto">
                Explore <ExternalLink size={14} />
              </div>
            </a>
          );
        })}
      </div>
      
      {/* استدعاء نافذة المحاكي */}
      {isMatrixModalOpen && (
        <MatrixSimulatorModal onClose={() => setIsMatrixModalOpen(false)} />
      )}

    </div>
  );
}
