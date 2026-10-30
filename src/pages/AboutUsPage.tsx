import React, { useState } from 'react';
import { Mail, MessageCircle } from 'lucide-react'; 

import awsImg from '../../members photos/Aws gharaibeh.webp';
import noorImg from '../../members photos/noor ibrrahim.jpeg';
import ahmadImg from '../../members photos/Ahamd Radhwan.webp';
import ansamImg from '../../members photos/ansam tayeh.webp';
import anasImg from '../../members photos/Anas majdi.webp';
import mohammadImg from '../../members photos/Mohammad abuelyan.webp';
import abdalrhmanImg from '../../members photos/Abdalrhman Abdorabbeh.webp';
import abdullahImg from '../../members photos/Abdullah bsaiso.webp';
import adnanImg from '../../members photos/Adnan abusamaha.webp';
import bahaaImg from '../../members photos/Bahaa Alsaeed.webp';

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
    website: "",
    image: awsImg
  },
  {
    id: 2,
    name: "Noor Ibrahim",
    role: "Chairwoman",
    major: "Mechatronics Engineering ∙ 4th Year",
    description: "A fourth-year Mechatronics Engineering student with a strong foundation in C++ programming and currently expanding her skills in Python. Passionate about robotics and automation. Actively involved in scientific volunteering and educational activities in schools . An IEEE member and former member of Gloob Jordan, an astronomy-focused team, combining technical interests with a passion for science, innovation, and community engagement.",
    linkedin: "",
    github: "",
    instagram: "",
    website: "",
    image: noorImg
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
    website: "",
    image: ahmadImg 
  },
  { 
    id: 4, 
    name: "Ansam Tayeh", 
    role: "Vice-Chairwoman", 
    major: "Mechatronics Engineering ∙ 4th Year", 
    description: "A strong academic background in electronics, circuit analysis, and control systems. Skilled in C++ programming and passionate about developing efficient, hardware-software integrated solutions.", 
    linkedin: "https://www.linkedin.com/in/ansam-tayeh-bb60903b0?utm_source=share_via&utm_content=profile&utm_medium=member_ios", 
    github: "",
    instagram: "",
    website: "",
    image: ansamImg 
  },
  { 
    id: 5, 
    name: "Anas Majdi", 
    role: "Head of Media", 
    major: "Mechatronics Engineering ∙ 3rd Year", 
    description: "Head of ATHAR’s Media Team and the creative mastermind behind this digital platform. Anas is a Mechatronics engineering student with strong C++ skills, aspiring to dive deep into Embedded Systems. He is also a passionate tutor for engineering subjects, perfectly blending his love for technical logic with digital content management.", 
    linkedin: "https://www.linkedin.com/in/anas-majdi-80863a384/", 
    github: "https://github.com/AnasMajdi",
    instagram: "",
    website: "",
    image: anasImg 
  },
  { 
    id: 6, 
    name: "Mohammad AbuElyan", 
    role: "Academic Leader", 
    major: "Mechatronics Engineering ∙ 4th Year", 
    description: "Ranked first in his academic cohort, he is the architect and visionary behind his own academic website, MAE Academy. Specializing in control systems, dynamic modeling, and industrial automation, he seamlessly bridges the gap between rigorous mathematical theory and intuitive web simulations. Driven by educational impact, he actively empowers thousands of engineering students through his custom-built digital platform, authored laboratory manuals, and visual computing.", 
    linkedin: "https://www.linkedin.com/in/mohammad-abuelyan-368ab8384/", 
    github: "",
    instagram: "https://www.instagram.com/mae.academy/",
    website: "https://maeacademy.org/about",
    image: mohammadImg 
  },
  { 
    id: 7, 
    name: "Abdalrhman Abdorabeh", 
    role: "Technical Leader", 
    major: "Mechatronics Engineering ∙ 4th Year", 
    description: "A passionate mechatronics engineer and driving force in our technical office, specializing in editing, motion graphics, and 3D modeling. He has a passion for learning robotics, embedded systems, and more, but his greatest focus is Linux. He always keeps looking forward and continuously expands his technical horizons.", 
    linkedin: "https://www.linkedin.com/in/abdalrhman-abdorabbeh-b3b170368/", 
    github: "https://github.com/abdoman-A4",
    instagram: "",
    website: "",
    image: abdalrhmanImg 
  },
  { 
    id: 8, 
    name: "Abdullah Bsaiso", 
    role: "Mechanical Technical Leader", 
    major: "Mechatronics Engineering ∙ 3rd Year", 
    description: "The mastermind behind our website, digital media specialist (motion graphics & photo manipulation), and CSWA-certified SolidWorks modeler. Proficient in C++ and expanding into embedded systems and machine learning to integrate mechanical design with smart tech.", 
    linkedin: "https://www.linkedin.com/in/abdullah-bsaiso-a56023321/", 
    github: "https://github.com/Abooubaker",
    instagram: "",
    website: "",
    image: abdullahImg 
  },
  { 
    id: 9, 
    name: "Adnan Abu Samaha", 
    role: "Electrical & Electronics Technical Lead | PR Team Leader", 
    major: "Mechatronics Engineering ∙ 3rd Year", 
    description: "He served as the head of the club's Public Relations team and as the technical lead for electrical and electronics solutions. His responsibilities included drafting the club's bylaws, establishing its administrative and organizational structure, and coordinating administrative board meetings. Additionally, he organized internal workshops and training courses and represented various teams in competitions such as the Maze Robot and Line-Following Robot challenges. Adnan possesses expertise in electrical power, control systems, electronics, and the design of electrical drive circuits and automated control systems; he has also conducted numerous training courses in the fields of electrical and electronic engineering.", 
    linkedin: "https://www.linkedin.com/in/eng-adnan-abu-samaha25/", 
    github: "", 
    instagram: "", 
    website: "",
    image: adnanImg 
  },
  { 
    id: 10, 
    name: "Bahaa Alsaeed", 
    role: "Software Technical Leader", 
    major: "Mechatronics Engineering ∙ 3rd Year", 
    description: "The software backbone of our team, specializing in C++ and Python, with a strong foundation in electronics and experience with MATLAB and Simulink. Currently expanding his expertise in STM32 embedded systems, bridging the gap between software, hardware, and intelligent robotics. As the Software Technical Leader, he leads the development and integration of our team’s software systems.", 
    linkedin: "https://www.linkedin.com/in/bahaa-alsaeed-abb301369/", 
    github: "https://github.com/bahaa0alsaeed", 
    instagram: "", 
    website: "",
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
          <strong className="font-medium text-black">ATHAR</strong> is a specialized engineering team dedicated entirely to the technical advancement of Mechatronics. We bridge the gap between heavy industrial hardware and intelligent software to build robust, autonomous, and highly efficient physical systems.
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
                    <img src={member.image} alt={member.name} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover object-top" />
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
                        {member.website && (
                          <a 
                            href={member.website} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-black border border-neutral-300 hover:border-black rounded-full px-5 py-2.5 transition-colors uppercase tracking-widest bg-neutral-50"
                          >
                            Website ↗
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

      {/* ═══════════════ CONTACT US SECTION ═══════════════ */}
      <div className="mt-32 mb-10 border-t border-neutral-200/80 pt-20">
        <div className="text-center mb-16">
          <div className="text-sm md:text-base font-bold font-mono tracking-widest text-neutral-500 uppercase mb-3">
            GET IN TOUCH
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-black uppercase">
            Contact Us
          </h2>
          <p className="text-neutral-500 mt-4 max-w-lg mx-auto text-sm md:text-base font-medium leading-relaxed">
            Have a question, a project idea, or want to collaborate? Reach out to our leadership directly. We're always open to new opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          
          {/* Email Card */}
          <a 
            href="mailto:atherteamm@gmail.com" 
            className="flex flex-col items-center justify-center p-8 bg-white border border-neutral-200 rounded-[2rem] hover:border-black hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="w-16 h-16 bg-neutral-50 text-neutral-600 flex items-center justify-center rounded-2xl mb-6 group-hover:bg-black group-hover:text-white transition-colors duration-300 shadow-sm">
              <Mail size={28} strokeWidth={1.5} />
            </div>
            <h4 className="font-bold text-lg text-black uppercase tracking-tight mb-2">Team Email</h4>
            <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">General Inquiries</div>
            <span className="text-sm font-mono font-bold text-neutral-500 group-hover:text-black transition-colors">
              Drop us a message ↗
            </span>
          </a>

          {/* Chair Card */}
          <a 
            href="https://wa.me/962795977852" 
            target="_blank" 
            rel="noreferrer"
            className="flex flex-col items-center justify-center p-8 bg-white border border-neutral-200 rounded-[2rem] hover:border-black hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="w-16 h-16 bg-neutral-50 text-neutral-600 flex items-center justify-center rounded-2xl mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300 shadow-sm">
              <MessageCircle size={28} strokeWidth={1.5} />
            </div>
            <h4 className="font-bold text-lg text-black uppercase tracking-tight mb-2">Aws Gharaibeh</h4>
            <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Team Chair</div>
            <span className="text-sm font-mono font-bold text-neutral-500 group-hover:text-black transition-colors">
              Chat on WhatsApp ↗
            </span>
          </a>

          {/* Vice Chair Card */}
          <a 
            href="https://wa.me/962787001254" 
            target="_blank" 
            rel="noreferrer"
            className="flex flex-col items-center justify-center p-8 bg-white border border-neutral-200 rounded-[2rem] hover:border-black hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="w-16 h-16 bg-neutral-50 text-neutral-600 flex items-center justify-center rounded-2xl mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300 shadow-sm">
              <MessageCircle size={28} strokeWidth={1.5} />
            </div>
            <h4 className="font-bold text-lg text-black uppercase tracking-tight mb-2">Ahmad Radwan</h4>
            <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Vice-Chair</div>
            <span className="text-sm font-mono font-bold text-neutral-500 group-hover:text-black transition-colors">
              Chat on WhatsApp ↗
            </span>
          </a>

        </div>
      </div>
      
    </div>
  );
};
