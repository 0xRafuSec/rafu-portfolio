import React from 'react';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

const Education: React.FC = () => {
  const education = [
    {
      degree: "Bachelor of Science in Computer Science",
      school: "University of Wah",
      location: "Wah Cantt, Pakistan",
      year: "2019 - 2023",
      description: "Focused on Information Security, Network Security, and Software Engineering. Completed final year project on IoT Intrusion Detection Systems."
    },
  ];

  return (
    <section id="education" className="py-20 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
          Academic <span className="text-cyber-green">Background</span>
        </h2>

        <div className="max-w-4xl mx-auto">
          {education.map((edu, index) => (
            <div key={index} className="bg-white/50 dark:bg-cyber-gray/40 backdrop-blur-md p-8 rounded-2xl border border-gray-200 dark:border-white/5 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 hover:border-cyber-green/30">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-16 h-16 bg-cyber-green/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-cyber-green/20 transition-colors">
                  <GraduationCap size={32} className="text-cyber-green" />
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row justify-between md:items-center mb-2">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-cyber-green transition-colors">
                      {edu.degree}
                    </h3>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 dark:bg-black/30 text-gray-600 dark:text-cyber-blue text-sm font-medium mt-2 md:mt-0">
                      <Calendar size={14} />
                      {edu.year}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-600 dark:text-cyber-muted mb-4 font-medium">
                    <span>{edu.school}</span>
                    <span className="w-1.5 h-1.5 bg-cyber-green rounded-full"></span>
                    <span className="flex items-center gap-1 text-sm font-normal opacity-80">
                      <MapPin size={14} /> {edu.location}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {edu.description}
                  </p>
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