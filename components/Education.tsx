import React from 'react';
import { GraduationCap, Calendar, MapPin, BookOpen, Code } from 'lucide-react';

const Education: React.FC = () => {
  const education = [
    {
      degree: "Bachelor of Science in Computer Science",
      school: "Hamdard University",
      location: "Islamabad, Pakistan",
      year: "2019 - 2023",
      courses: [
        "Cyber & Information Security",
        "Network Security",
        "Artificial Intelligence",
        "Machine Learning",
        "Mobile App Development",
        "Software Engineering",
      ],
      fyp: {
        title: "IoT Intrusion Detection Systems",
        description: "Built an IoT security system using ESP32, sensors, and ESP32-CAM with real-time alerts via a Flutter Firebase app."
      }
    },
  ];

  return (
    <section id="education" className="py-20 transition-colors duration-300 scroll-mt-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white font-sans">
          Academic <span className="text-cyber-green-dark dark:text-cyber-green">Background</span>
        </h2>

        <div className="max-w-4xl mx-auto">
          {education.map((edu, index) => (
            <div 
              key={index} 
              className="bg-white/50 dark:bg-cyber-gray/40 backdrop-blur-md p-8 rounded-2xl border border-gray-200 dark:border-white/5 shadow-lg hover:shadow-xl hover:shadow-cyber-green-dark/10 dark:hover:shadow-cyber-green/20 transition-all duration-300 group hover:-translate-y-2 hover:border-cyber-green-dark/30 dark:hover:border-cyber-green/30 hover:scale-[1.02]"
            >
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-16 h-16 bg-cyber-green/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-cyber-green/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <GraduationCap size={32} className="text-cyber-green-dark dark:text-cyber-green group-hover:scale-110 transition-transform duration-300" />
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row justify-between md:items-center mb-2">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-cyber-green-dark dark:group-hover:text-cyber-green transition-colors font-sans">
                      {edu.degree}
                    </h3>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 dark:bg-black/30 text-gray-600 dark:text-cyber-blue text-sm font-medium mt-2 md:mt-0 font-mono group-hover:bg-cyber-green-dark/10 dark:group-hover:bg-cyber-green/10 transition-colors">
                      <Calendar size={14} />
                      {edu.year}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-600 dark:text-cyber-muted mb-6 font-medium font-mono">
                    <span>{edu.school}</span>
                    <span className="w-1.5 h-1.5 bg-cyber-green-dark dark:bg-cyber-green rounded-full group-hover:scale-150 transition-transform duration-300"></span>
                    <span className="flex items-center gap-1 text-sm font-normal opacity-80">
                      <MapPin size={14} /> {edu.location}
                    </span>
                  </div>
                  
                  {/* Courses Section */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen size={18} className="text-cyber-green-dark dark:text-cyber-green" />
                      <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide font-mono">Key Courses</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                      {edu.courses.map((course, courseIndex) => (
                        <div 
                          key={courseIndex}
                          className="flex items-start gap-3 text-gray-600 dark:text-gray-400 group/item hover:text-cyber-green-dark dark:hover:text-cyber-green transition-colors duration-200"
                          style={{ animationDelay: `${courseIndex * 50}ms` }}
                        >
                          <span className="text-cyber-green-dark dark:text-cyber-green mt-1.5 group-hover/item:scale-125 transition-transform duration-200">▸</span>
                          <span className="font-mono text-sm">{course}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Final Year Project Section */}
                  <div className="pt-4 border-t border-gray-200 dark:border-white/5">
                    <div className="flex items-center gap-2 mb-3">
                      <Code size={18} className="text-cyber-blue-dark dark:text-cyber-blue" />
                      <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide font-mono">Final Year Project</h4>
                    </div>
                    <a 
                      href="https://github.com/0xRafuSec/Multi-Sensor-Intrusion-Detection-IOT" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block bg-black/5 dark:bg-white/5 rounded-lg p-4 border-l-4 border-cyber-blue-dark dark:border-cyber-blue group-hover:border-cyber-green-dark dark:group-hover:border-cyber-green transition-colors hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"
                    >
                      <h5 className="font-bold text-gray-900 dark:text-white mb-1 font-mono group-hover:text-cyber-green-dark dark:group-hover:text-cyber-green transition-colors hover-glitch">
                        {edu.fyp.title}
                      </h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400 font-mono leading-relaxed">
                        {edu.fyp.description}
                      </p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;