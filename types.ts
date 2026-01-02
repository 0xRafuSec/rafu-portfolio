
export interface Skill {
  name: string;
  level: number;
  label: string; // e.g., "Expert", "Advanced"
}

export interface SkillCategory {
  id: string;
  label: string;
  skills: Skill[];
}

export interface Project {
  id: number;
  title: string;
  description: string;
  category: 'security' | 'forensics' | 'development' | 'all';
  tags: string[];
  links: {
    github?: string;
    demo?: string;
  };
}

export interface TimelineItem {
  id: number;
  title: string;
  company: string;
  date: string;
  location: string;
  points: string[];
}

export interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'success';
  content: string;
}
