import React, { useState } from 'react';

import awsImg from '../../members photos/Aws gharaibeh.jpeg';
import yaraImg from '../../members photos/Yara Alabadi.jpeg';
import ahmadImg from '../../members photos/Ahamd Radhwan.jpeg';
import anasImg from '../../members photos/Anas majdi.jpeg';
import mohammadImg from '../../members photos/Mohammad abuelyan.jpeg';
import abdalrhmanImg from '../../members photos/Abdalrhman Abdorabbeh.jpeg';
import abdullahImg from '../../members photos/Abdullah bsaiso.jpeg';
import adnanImg from '../../members photos/Adnan abusamaha.jpeg';
import bahaaImg from '../../members photos/Bahaa Alsaeed.jpeg';

const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Aws Gharaibeh",
    role: "Chair of the Team",
    major: "Mechatronics Engineering ∙ 4th Year",
    description: "A versatile mechatronics engineer bridging the worlds of hardware, embedded intelligence, and mechanical design. Proficient in SolidWorks, 3D printing prototyping, and C++ programming for autonomous robotics and embedded systems. Alongside his technical expertise, he is an accomplished author and content creator, leveraging precision and creative vision to design, build, and document innovative engineering solutions.",
    linkedin: "https://www.linkedin.com/in/aws-gharaibeh-ba1755332?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    github: "",
    instagram: "",
    image: awsImg
  },
  {
    id: 2,
    name: "Yara Alabadi",
    role: "Chairwoman of ATHAR Group",
    major: "Mechatronics Engineering ∙ 4th Year",
    description: "A passionate fourth-year Mechatronics Engineering student and Robotics Instructor at NIRT, combining a strong theoretical foundation with hands-on technical expertise. Skilled in 3D mechanical modeling using SolidWorks, with extensive experience developing embedded and smart systems utilizing Arduino, ESP, and Raspberry Pi. Proficient in analyzing and integrating electrical and control systems, from industrial hardware to autonomous competition robotics. Dedicated to technical mentorship and education, with a proven track record of simplifying complex engineering concepts, coaching competitive teams, and turning innovative engineering ideas into practical, high-performance solutions.",
    linkedin: "https://www.linkedin.com/in/yara-alabadi-7b0895354/",
    github: "",
    instagram: "",
    image: yaraImg
  },
  { 
    id: 3, 
    name: "Ahmad Radwan", 
    role: "Vice-Chairman", 
    major: "Mechatronics Engineering ∙ 3rd Year", 
    description: "Responsible for organizing and managing Athar workshops, contributing to the team’s educational and technical activities. Good proficiency in C++, with a growing interest in embedded systems and a passion for exploring the integration of software with hardware and intelligent technologies.", 
    linkedin: "https://www.linkedin.com/in/ahmad-radwan-a581b1328/", 
    github: "https://github.com/Ahmad06-Radwan",
    instagram: "",
    image: ahmadImg 
  },
  { 
    id: 4, 
    name: "Anas Majdi", 
    role: "Head of Media", 
    major: "Mechatronics Engineering ∙ 3rd Year", 
    description: "The creative visionary leading ATHAR's media presence and a dedicated educator known for simplifying complex subjects like Digital Logic Design and Physics. Proficient in C++ and Python, he engineers intelligent algorithms—from custom PID controllers to computer vision models—integrating them seamlessly into robotics and industrial automation. Serving as the dynamic face and lead presenter of ATHAR's technical workshops.", 
    linkedin: "https://www.linkedin.com/in/anas-majdi-80863a384/", 
    github: "https://github.com/AnasMajdi",
    instagram: "",
    image: anasImg 
  },
  { 
    id: 5, 
    name: "Mohammad AbuElyan", 
    role: "Academic Leader", 
    major: "Mechatronics Engineering ∙ 4th Year", 
    description: "Ranked first in his academic cohort, he is the architect and visionary behind MAE Academy's interactive engineering ecosystem. Specializing in control systems, dynamic modeling, and industrial automation, he seamlessly bridges the gap between rigorous mathematical theory and intuitive web simulations. Driven by educational impact, he actively empowers thousands of engineering students through open-access digital platforms, authored laboratory manuals, and visual computing.", 
    linkedin: "https://www.linkedin.com/in/mohammad-abuelyan-368ab8384/", 
    github: "",
    instagram: "https://www.instagram.com/mae.academy/",
    image: mohammadImg 
  },
  { 
    id: 6, 
    name: "Abdalrhman Abdorabeh", 
    role: "Technical Leader", 
    major: "Mechatronics Engineering ∙ 4th Year", 
    description: "A passionate mechatronics engineer and driving force in our technical office, specializing in editing, motion graphics, and 3D modeling. He has a passion for learning robotics, embedded systems, and more, but his greatest focus is Linux. He always keeps looking forward and continuously expands his technical horizons.", 
    linkedin: "https://www.linkedin.com/in/abdalrhman-abdorabbeh-b3b170368/", 
    github: "https://github.com/abdoman-A4",
    instagram: "",
    image: abdalrhmanImg 
  },
  { 
    id: 7, 
    name: "Abdullah Bsaiso", 
    role: "Mechanical Technical Leader", 
    major: "Mechatronics Engineering ∙ 3rd Year", 
    description: "The mastermind behind our website and a creative force in digital media, specializing in motion graphics and photo manipulation. Proficient in C++ and SolidWorks, he is currently expanding his expertise in embedded systems, bridging the gap between mechanical design and intelligent technology.", 
    linkedin: "https://www.linkedin.com/in/abdullah-bsaiso-a56023321/", 
    github: "https://github.com/Abooubaker",
    instagram: "",
    image: abdullahImg 
  },
  { 
    id: 8, 
    name: "Adnan Jehad Abu Samaha", 
    role: "Electrical & Electronics Technical Lead | PR Team Leader", 
    major: "Mechatronics Engineering ∙ 3rd Year", 
    description: "He served as the head of the club's Public Relations team and as the technical lead for electrical and electronics solutions. His responsibilities included drafting the club's bylaws, establishing its administrative and organizational structure, and coordinating administrative board meetings. Additionally, he organized internal workshops and training courses and represented various teams in competitions such as the Maze Robot and Line-Following Robot challenges. Adnan possesses expertise in electrical power, control systems, electronics, and the design of electrical drive circuits and automated control systems; he has also conducted numerous training courses in the fields of electrical and electronic engineering.", 
    linkedin: "https://www.linkedin.com/in/eng-adnan-abu-samaha25/", 
    github: "", 
    instagram: "", 
    image: adnanImg 
  },
  { 
    id: 9, 
    name: "Bahaa Alsaeed", 
    role: "Software Technical Leader | Treasure", 
    major: "Mechatronics Engineering ∙ 3rd Year", 
    description: "The software backbone of our team, specializing in C++ and Python, with a strong foundation in electronics and experience with MATLAB and Simulink. Currently expanding his expertise in STM32 embedded systems, bridging the gap between software, hardware, and intelligent robotics. As the Software Technical Leader, he leads the development and integration of our team’s software systems.", 
    linkedin: "https://www.linkedin.com/in/bahaa-alsaeed-abb301369/", 
    github: "https://github.com/bahaa0alsaeed", 
    instagram: "", 
    image: bahaaImg 
  }
];

export const AboutUsPage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === TEAM_MEMBERS.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? TEAM_MEMBERS.length - 1 : prevIndex - 1));
  };

  return (
    <div className="relative z-1 min-h-screen pt-24 sm:pt-28 pb-20 px-5 sm:px-8 md:px-12 max-w-6xl mx-auto">
      
      {/* القسم العلوي */}
      <div className="mb-12 sm:mb-16">
        <div className="text-base md:text-lg font-bold font-mono tracking-widest text-neutral-500 uppercase mb-3">
          ATHAR TEAM
        </div>
        <h1 
          className="text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-black mb-6 max-w-4xl leading-tight"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          We engineer the future of smart mechatronic systems.
        </h1>
        <p className="text-lg sm:text-xl text-neutral-700 max-w-3xl font-light leading-relaxed">
          Founded at <strong className="font-medium text-black">Al-Balqa Applied University (Faculty of Engineering Technology)</strong>, ATHAR is a specialized engineering team dedicated entirely to the technical advancement of Mechatronics. We bridge the gap between heavy industrial hardware and intelligent software to build robust, autonomous, and highly efficient physical systems.
        </p>
      </div>

      {/* قسم الدومينات الثلاثة */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="p-7 rounded-3xl bg-white/95 backdrop-blur-md border border-neutral-200/80 shadow-xs">
          <div className="text-xs font-mono tracking-wider text-neutral-400 mb-2">DOMAIN 01</div>
          <h3 className="text-xl font-medium tracking-tight text-black mb-3">Industrial Automation</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Designing robust control systems for the modern industry. We specialize in classic control panels, PLCs, and SCADA architectures to optimize and secure heavy industrial processes.
          </p>
        </div>
        <div className="p-7 rounded-3xl bg-white/95 backdrop-blur-md border border-neutral-200/80 shadow-xs">
          <div className="text-xs font-mono tracking-wider text-neutral-400 mb-2">DOMAIN 02</div>
          <h3 className="text-xl font-medium tracking-tight text-black mb-3">Robotics</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Building intelligent, dynamic machines. From autonomous navigation algorithms to complex kinematics, we bring hardware to life using advanced control theory and computer vision.
          </p>
        </div>
        <div className="p-7 rounded-3xl bg-white/95 backdrop-blur-md border border-neutral-200/80 shadow-xs">
          <div className="text-xs font-mono tracking-wider text-neutral-400 mb-2">DOMAIN 03</div>
          <h3 className="text-xl font-medium tracking-tight text-black mb-3">Embedded Systems</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Developing the brain inside the machine. We write precise, low-level firmware in C++ and Python for microcontrollers, ensuring seamless real-time communication between sensors and actuators.
          </p>
        </div>
      </div>

      {/* قسم الأعضاء */}
      <div className="mt-24 mb-16">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-200">
          <span className="text-sm md:text-base font-bold font-mono tracking-widest text-neutral-500 uppercase">
            MEET OUR MEMBERS
          </span>
          <div className="flex gap-3">
            <button onClick={prevSlide} className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-200 hover:bg-neutral-100 transition-colors text-neutral-600">
              ←
            </button>
            <button onClick={nextSlide} className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-200 hover:bg-neutral-100 transition-colors text-neutral-600">
              →
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-white border border-neutral-200/80 shadow-sm">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {TEAM_MEMBERS.map((member, idx) => (
              <div key={member.id} className="w-full flex-shrink-0 flex flex-col md:flex-row min-h-[450px]">
                
                <div className="md:w-2/5 bg-neutral-50 border-b md:border-b-0 md:border-r border-neutral-200/80 flex items-center justify-center relative overflow-hidden min-h-[300px] md:min-h-full">
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="absolute inset-0 w-full h-full object-cover object-top" />
                  ) : (
                    <span className="text-xs font-mono text-neutral-400 tracking-widest text-center z-10">
                      [ IMAGE PLACEHOLDER <br/> MEMBER {idx + 1} ]
                    </span>
                  )}
                </div>

                <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                  {member.name ? (
                    <>
                      <h3 className="text-3xl md:text-4xl font-bold text-black mb-1 tracking-tight">{member.name}</h3>
                      <div className="text-sm md:text-base font-mono text-neutral-500 mb-2">{member.role}</div>
                      <div className="text-xs text-neutral-400 uppercase tracking-widest mb-6">{member.major}</div>
                      
                      <p className="text-sm md:text-base text-neutral-600 leading-relaxed mb-8">
                        {member.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-3">
                        {member.linkedin && (
                          <a 
                            href={member.linkedin} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-black border border-neutral-300 hover:border-black rounded-full px-5 py-2.5 transition-colors uppercase tracking-widest"
                          >
                            LinkedIn ↗
                          </a>
                        )}
                        {member.github && (
                          <a 
                            href={member.github} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-black border border-neutral-300 hover:border-black rounded-full px-5 py-2.5 transition-colors uppercase tracking-widest"
                          >
                            GitHub ↗
                          </a>
                        )}
                        {member.instagram && (
                          <a 
                            href={member.instagram} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-black border border-neutral-300 hover:border-black rounded-full px-5 py-2.5 transition-colors uppercase tracking-widest"
                          >
                            Instagram ↗
                          </a>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="text-xs font-mono text-neutral-400 tracking-widest mb-6">
                        [ WAITING FOR DATA ]
                      </span>
                      <div className="h-8 bg-neutral-100 rounded w-1/3 mb-2"></div>
                      <div className="h-4 bg-neutral-100 rounded w-1/4 mb-8"></div>
                      <div className="h-3 bg-neutral-100 rounded w-full mb-3"></div>
                      <div className="h-3 bg-neutral-100 rounded w-full mb-3"></div>
                      <div className="h-3 bg-neutral-100 rounded w-5/6 mb-8"></div>
                    </>
                  )}
                </div>

              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center gap-2 mt-8">
          {TEAM_MEMBERS.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === idx ? 'bg-black w-6' : 'bg-neutral-300'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </div>
  );
};
