import React, { useState, useEffect } from 'react';
import { X, Wand2, User, Mail, Phone, Linkedin, Github, GraduationCap, Briefcase, Code, Trophy, FileText, Undo, Check, Edit3, XCircle } from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  jobId: string;
  stage: string;
  matchPercentage?: number;
  status: string;
  avatar?: string;
  skills: string[];
  fitmentScore: number;
  fitmentSummary: string;
  profileImage: string;
  statusColor: string;
}

interface ResumeEnhancerProps {
  candidate?: Candidate;
  onSave?: (candidateId: string, newScore: number, enhancedResume?: any) => void;
  onClose: () => void;
}

interface Enhancement {
  id: string;
  section: string;
  type: 'add' | 'modify' | 'improve';
  original?: string;
  enhanced: string;
  reason: string;
  applied: boolean;
}

const ResumeEnhancer: React.FC<ResumeEnhancerProps> = ({ candidate, onSave, onClose }) => {
  const [originalResume, setOriginalResume] = useState<any>(null);
  const [enhancedResume, setEnhancedResume] = useState<any>(null);
  const [enhancements, setEnhancements] = useState<Enhancement[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  // Get resume data for the candidate
  const getResumeData = () => {
    const candidateResumes: { [key: string]: any } = {
      '1': {
        name: "Janhavi Sharma",
        email: "janhavi.sharma@email.com",
        contact: "+91 9876543210",
        linkedin: "linkedin.com/in/janhavisharma",
        github: "",
        education: "Bachelor of Computer Science, Pune University (2021-2025)",
        summary: "Computer Science student with experience in web development and programming.",
        experience: [
          "Developed a Blood Bank Management System using Java and MySQL",
          "Created responsive web interfaces using HTML, CSS, and JavaScript"
        ],
        skills: ["Java", "React", "SQL"],
        projects: [
          "Blood Bank Management System - Java application with database integration",
          "E-commerce Website - Frontend development with responsive design"
        ],
        achievements: [
          "Dean's List for 2 consecutive semesters",
          "Winner of College Technical Fest 2023"
        ]
      },
      '2': {
        name: "Aarya Ranpise",
        email: "aarya123r@email.com",
        contact: "+91 9856543211",
        linkedin: "linkedin.com/in/ranpiseaarya",
        github: "github.com/aarya",
        education: "Bachelor of Technology, MIT WPU (2021-2025)",
        summary: "Computer Science student with experience in web development and programming.",
        experience: [
          "Built web applications using Python and Django framework",
          "Created responsive web interfaces using HTML, CSS, and JavaScript"
        ],
        skills: ["Python", "Django", "HTML", "CSS"],
        projects: [
          "Library Management System - Python Django application",
          "Personal Portfolio Website - Frontend development with responsive design"
        ],
        achievements: [
          "Certificate of Merit in Academics for 2 years",
          "IBM - Java certification course"
        ]
      },
      '3': {
        name: "Priya Patel",
        email: "priya.patel@email.com",
        contact: "+91 9876543211",
        linkedin: "linkedin.com/in/priyapatel",
        github: "github.com/priyapatel",
        education: "Bachelor of Information Technology, Mumbai University (2021-2025)",
        summary: "Computer Science student with experience in web development and programming.",
        experience: [
          "Built web applications using Python and Django framework",
          "Created responsive web interfaces using HTML, CSS, and JavaScript"
        ],
        skills: ["Python", "Django", "HTML", "CSS"],
        projects: [
          "Library Management System - Python Django application",
          "Personal Portfolio Website - Frontend development with responsive design"
        ],
        achievements: [
          "Certificate of Honour in Academics for 2 years",
          "IBM - Python certification course"
        ]
      },
      '4': {
        name: "Rahul Singh",
        email: "rahul.singh@email.com",
        contact: "+91 9876543212",
        linkedin: "linkedin.com/in/rahulsingh",
        github: "",
        education: "Bachelor of Computer Applications, Delhi University (2021-2025)",
        summary: "Computer Science student with experience in web development and programming.",
        experience: [
          "Developed REST APIs using Node.js and Express",
          "Created responsive web interfaces using HTML, CSS, and JavaScript"
        ],
        skills: ["JavaScript", "Node.js", "MongoDB"],
        projects: [
          "Chat Application - Real-time messaging using Node.js and Socket.io",
          "E-commerce Website - Full-stack development with responsive design"
        ],
        achievements: [
          "Best Project Award in Web Development course",
          "Merit at Academic Program - NIT Goa 2024"
        ]
      },
      '5': {
        name: "Anita Desai",
        email: "anita.desai@gmail.com",
        contact: "+91 9876543213",
        linkedin: "linkedin.com/in/anitadesai",
        github: "github.com/anitadesai",
        education: "Bachelor of Computer Science, Bangalore University (2021-2025)",
        summary: "Computer Science student with experience in web development and programming.",
        experience: [
          "Built interactive user interfaces using React and JavaScript",
          "Created responsive web designs using HTML, CSS, and modern frameworks"
        ],
        skills: ["React", "JavaScript", "CSS", "HTML"],
        projects: [
          "Weather App - React application with API integration",
          "Portfolio Website - Frontend development with modern design"
        ],
        achievements: [
          "Outstanding Student in Frontend Development",
          "Udemy - React certification course"
        ]
      },
      '6': {
        name: "Vikram Kumar",
        email: "@vikram12345@gmail.com",
        contact: "+91 9876543212",
        linkedin: "linkedin.com/in/vikramks",
        github: "",
        education: "Bachelor of Computer Applications, Delhi University (2022-2026)",
        summary: "Computer Science student with experience in web development and software development.",
        experience: [
          "Developed REST APIs using Node.js and Express",
          "Created responsive web interfaces using HTML, CSS, and JavaScript"
        ],
        skills: ["JavaScript", "Node.js", "MongoDB"],
        projects: [
          "Chat Application - Real-time messaging using Node.js and Socket.io",
          "E-commerce Website - Full-stack development with responsive design"
        ],
        achievements: [
          "Best Project Award in Web Development Hackwithme - 2024",
          "Coursera - JavaScript certification"
        ]
      }
    };

    return candidateResumes[candidate?.id || '1'] || candidateResumes['1'];
  };

  useEffect(() => {
    const resumeData = getResumeData();
    setOriginalResume(resumeData);
    setEnhancedResume({ ...resumeData });
  }, [candidate]);

  const generateEnhancements = () => {
    setIsGenerating(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const mockEnhancements: Enhancement[] = [
        {
          id: '1',
          section: 'github',
          type: 'add',
          enhanced: 'github.com/janhavi-dev',
          reason: 'Adding GitHub profile to showcase coding projects and contributions',
          applied: false
        },
        {
          id: '2',
          section: 'summary',
          type: 'improve',
          original: originalResume?.summary,
          enhanced: 'Passionate Computer Science student specializing in full-stack web development with hands-on experience in Java, React, and SQL. Proven track record of building scalable applications and delivering user-centric solutions.',
          reason: 'Enhanced to highlight specific technologies and demonstrate impact',
          applied: false
        },
        {
          id: '3',
          section: 'skills',
          type: 'add',
          enhanced: 'Git',
          reason: 'Adding version control skill essential for software development roles',
          applied: false
        },
        {
          id: '4',
          section: 'experience',
          type: 'improve',
          original: 'Developed a Blood Bank Management System using Java and MySQL',
          enhanced: 'Architected and developed a comprehensive Blood Bank Management System using Java and MySQL, serving 500+ daily users with 99.9% uptime and reducing manual processing time by 60%',
          reason: 'Added quantifiable metrics and impact to demonstrate value',
          applied: false
        }
      ];

      setEnhancements(mockEnhancements);
      setIsGenerating(false);
      setHasGenerated(true);
    }, 2000);
  };

  const acceptEnhancement = (enhancementId: string) => {
    const enhancement = enhancements.find(e => e.id === enhancementId);
    if (!enhancement) return;

    const updatedEnhanced = { ...enhancedResume };
    
    switch (enhancement.section) {
      case 'github':
        updatedEnhanced.github = enhancement.enhanced;
        break;
      case 'summary':
        updatedEnhanced.summary = enhancement.enhanced;
        break;
      case 'skills':
        if (enhancement.type === 'add') {
          updatedEnhanced.skills = [...updatedEnhanced.skills, enhancement.enhanced];
        }
        break;
      case 'experience':
        if (enhancement.type === 'improve' && enhancement.original) {
          const index = updatedEnhanced.experience.findIndex((exp: string) => exp === enhancement.original);
          if (index !== -1) {
            updatedEnhanced.experience[index] = enhancement.enhanced;
          }
        }
        break;
    }

    setEnhancedResume(updatedEnhanced);
    setEnhancements(prev => prev.map(e => 
      e.id === enhancementId ? { ...e, applied: true } : e
    ));
  };

  const rejectEnhancement = (enhancementId: string) => {
    setEnhancements(prev => prev.filter(e => e.id !== enhancementId));
  };

  const editEnhancement = (enhancementId: string, newValue: string) => {
    setEnhancements(prev => prev.map(e => 
      e.id === enhancementId ? { ...e, enhanced: newValue } : e
    ));
  };

  const undoAllEnhancements = () => {
    setEnhancedResume({ ...originalResume });
    setEnhancements(prev => prev.map(e => ({ ...e, applied: false })));
  };

  const calculateFitmentScore = () => {
    const baseScore = candidate?.fitmentScore || 65;
    const appliedEnhancements = enhancements.filter(e => e.applied).length;
    return Math.min(95, baseScore + (appliedEnhancements * 5));
  };

  const handleSave = () => {
    const newScore = calculateFitmentScore();
    if (onSave && candidate) {
      onSave(candidate.id, newScore, enhancedResume);
    }
    onClose();
  };

  const renderEnhancementInline = (sectionName: string) => {
    const sectionEnhancements = enhancements.filter(e => e.section === sectionName && !e.applied);
    
    if (sectionEnhancements.length === 0) return null;

    return (
      <div className="mt-3 space-y-2">
        {sectionEnhancements.map(enhancement => (
          <div key={enhancement.id} className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="text-sm font-medium text-blue-900 mb-1">
                  {enhancement.type === 'add' ? 'Suggested Addition:' : 'Suggested Improvement:'}
                </div>
                <div className="text-sm text-blue-800 bg-white p-2 rounded border">
                  {enhancement.enhanced}
                </div>
                <div className="text-xs text-blue-600 mt-1 italic">
                  {enhancement.reason}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => acceptEnhancement(enhancement.id)}
                className="flex items-center space-x-1 bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors"
              >
                <Check className="w-3 h-3" />
                <span>Accept</span>
              </button>
              <button
                onClick={() => rejectEnhancement(enhancement.id)}
                className="flex items-center space-x-1 bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700 transition-colors"
              >
                <XCircle className="w-3 h-3" />
                <span>Reject</span>
              </button>
              <button
                onClick={() => {
                  const newValue = prompt('Edit enhancement:', enhancement.enhanced);
                  if (newValue) editEnhancement(enhancement.id, newValue);
                }}
                className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors"
              >
                <Edit3 className="w-3 h-3" />
                <span>Edit</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (!originalResume || !enhancedResume) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6">
          <div className="text-center">Loading resume data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-100 p-2 rounded-lg">
              <Wand2 className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Resume Enhancer</h1>
              <p className="text-gray-600">AI-powered resume optimization for better job fitment</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm text-gray-600">Current Fitment Score</div>
              <div className="text-2xl font-bold text-purple-600">{calculateFitmentScore()}%</div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {!hasGenerated ? (
                <button
                  onClick={generateEnhancements}
                  disabled={isGenerating}
                  className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 shadow-sm disabled:opacity-50"
                >
                  <Wand2 className="w-4 h-4" />
                  <span>{isGenerating ? 'Generating Enhancements...' : 'Generate AI Enhancements'}</span>
                </button>
              ) : (
                <div className="flex items-center space-x-2 text-green-600">
                  <Check className="w-5 h-5" />
                  <span className="font-medium">Enhancements Generated</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={undoAllEnhancements}
                className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Undo className="w-4 h-4" />
                <span>Undo All</span>
              </button>
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 bg-gradient-to-r from-orange-400 to-pink-500 text-white px-6 py-2 rounded-lg hover:from-orange-500 hover:to-pink-600 transition-all duration-200 shadow-sm"
              >
                <span>Save Enhanced Resume</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dual Resume Layout */}
        <div className="grid grid-cols-2 gap-6 p-6">
          {/* Original Resume */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Original Resume</span>
            </h2>
            
            <div className="space-y-6">
              {/* Contact Information */}
              <div className="text-center pb-4 border-b border-gray-200">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{originalResume.name}</h1>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Mail className="w-4 h-4" />
                    <span>{originalResume.email}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Phone className="w-4 h-4" />
                    <span>{originalResume.contact}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Linkedin className="w-4 h-4" />
                    <span>{originalResume.linkedin}</span>
                  </div>
                  {originalResume.github && (
                    <div className="flex items-center space-x-1">
                      <Github className="w-4 h-4" />
                      <span>{originalResume.github}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Education */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <GraduationCap className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-bold text-gray-900">Education</h3>
                </div>
                <p className="text-gray-700">{originalResume.education}</p>
              </div>

              {/* Summary */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <User className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-bold text-gray-900">Summary</h3>
                </div>
                <p className="text-gray-700">{originalResume.summary}</p>
              </div>

              {/* Experience */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-bold text-gray-900">Experience</h3>
                </div>
                <div className="space-y-2">
                  {originalResume.experience.map((exp: string, index: number) => (
                    <p key={index} className="text-gray-700">• {exp}</p>
                  ))}
                </div>
              </div>

              {/* Projects */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-bold text-gray-900">Projects</h3>
                </div>
                <div className="space-y-2">
                  {originalResume.projects.map((project: string, index: number) => (
                    <p key={index} className="text-gray-700">• {project}</p>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <Code className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-bold text-gray-900">Skills</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {originalResume.skills.map((skill: string, index: number) => (
                    <span key={index} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <Trophy className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-bold text-gray-900">Achievements</h3>
                </div>
                <div className="space-y-2">
                  {originalResume.achievements.map((achievement: string, index: number) => (
                    <p key={index} className="text-gray-700">• {achievement}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Resume */}
          <div className="bg-white rounded-lg p-6 border border-blue-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
              <Wand2 className="w-5 h-5 text-purple-600" />
              <span>Enhanced Resume</span>
            </h2>
            
            <div className="space-y-6">
              {/* Contact Information */}
              <div className="text-center pb-4 border-b border-gray-200">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{enhancedResume.name}</h1>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Mail className="w-4 h-4" />
                    <span>{enhancedResume.email}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Phone className="w-4 h-4" />
                    <span>{enhancedResume.contact}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Linkedin className="w-4 h-4" />
                    <span>{enhancedResume.linkedin}</span>
                  </div>
                  {enhancedResume.github && (
                    <div className="flex items-center space-x-1">
                      <Github className="w-4 h-4" />
                      <span>{enhancedResume.github}</span>
                    </div>
                  )}
                </div>
                {renderEnhancementInline('github')}
              </div>

              {/* Education */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <GraduationCap className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-bold text-gray-900">Education</h3>
                </div>
                <p className="text-gray-700">{enhancedResume.education}</p>
                {renderEnhancementInline('education')}
              </div>

              {/* Summary */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <User className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-bold text-gray-900">Summary</h3>
                </div>
                <p className="text-gray-700">{enhancedResume.summary}</p>
                {renderEnhancementInline('summary')}
              </div>

              {/* Experience */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-bold text-gray-900">Experience</h3>
                </div>
                <div className="space-y-2">
                  {enhancedResume.experience.map((exp: string, index: number) => (
                    <p key={index} className="text-gray-700">• {exp}</p>
                  ))}
                </div>
                {renderEnhancementInline('experience')}
              </div>

              {/* Projects */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-bold text-gray-900">Projects</h3>
                </div>
                <div className="space-y-2">
                  {enhancedResume.projects.map((project: string, index: number) => (
                    <p key={index} className="text-gray-700">• {project}</p>
                  ))}
                </div>
                {renderEnhancementInline('projects')}
              </div>

              {/* Skills */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <Code className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-bold text-gray-900">Skills</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {enhancedResume.skills.map((skill: string, index: number) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
                {renderEnhancementInline('skills')}
              </div>

              {/* Achievements */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <Trophy className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-bold text-gray-900">Achievements</h3>
                </div>
                <div className="space-y-2">
                  {enhancedResume.achievements.map((achievement: string, index: number) => (
                    <p key={index} className="text-gray-700">• {achievement}</p>
                  ))}
                </div>
                {renderEnhancementInline('achievements')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeEnhancer;