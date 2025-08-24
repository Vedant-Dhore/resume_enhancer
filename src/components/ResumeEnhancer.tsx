import React, { useState, useEffect } from 'react';
import { X, Wand2, User, Mail, Phone, Linkedin, Github, GraduationCap, Briefcase, Code, Trophy, FileText, Undo, Check, Edit3, XCircle, Save } from 'lucide-react';

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
  status: 'pending' | 'accepted' | 'rejected';
  isEditing?: boolean;
  editValue?: string;
}

const ResumeEnhancer: React.FC<ResumeEnhancerProps> = ({ candidate, onSave, onClose }) => {
  const [originalResume, setOriginalResume] = useState<any>(null);
  const [enhancedResume, setEnhancedResume] = useState<any>(null);
  const [enhancements, setEnhancements] = useState<Enhancement[]>([]);
  const [currentFitmentScore, setCurrentFitmentScore] = useState(0);

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
    setCurrentFitmentScore(candidate?.fitmentScore || 65);

    // Auto-load enhancements (simulating backend data)
    const mockEnhancements: Enhancement[] = [
      {
        id: '1',
        section: 'github',
        type: 'add',
        enhanced: 'github.com/janhavi-dev',
        reason: 'Adding GitHub profile to showcase coding projects and contributions',
        status: 'pending'
      },
      {
        id: '2',
        section: 'summary',
        type: 'improve',
        original: resumeData?.summary,
        enhanced: 'Passionate Computer Science student specializing in full-stack web development with hands-on experience in Java, React, and SQL. Proven track record of building scalable applications and delivering user-centric solutions.',
        reason: 'Enhanced to highlight specific technologies and demonstrate impact',
        status: 'pending'
      },
      {
        id: '3',
        section: 'skills',
        type: 'add',
        enhanced: 'Git',
        reason: 'Adding version control skill essential for software development roles',
        status: 'pending'
      },
      {
        id: '4',
        section: 'experience',
        type: 'improve',
        original: 'Developed a Blood Bank Management System using Java and MySQL',
        enhanced: 'Architected and developed a comprehensive Blood Bank Management System using Java and MySQL, serving 500+ daily users with 99.9% uptime and reducing manual processing time by 60%',
        reason: 'Added quantifiable metrics and impact to demonstrate value',
        status: 'pending'
      }
    ];

    setEnhancements(mockEnhancements);
  }, [candidate]);

  const calculateFitmentScore = () => {
    const baseScore = candidate?.fitmentScore || 65;
    const acceptedEnhancements = enhancements.filter(e => e.status === 'accepted').length;
    return Math.min(95, baseScore + (acceptedEnhancements * 7));
  };

  const updateFitmentScore = () => {
    const newScore = calculateFitmentScore();
    setCurrentFitmentScore(newScore);
  };

  const acceptEnhancement = (enhancementId: string) => {
    setEnhancements(prev => prev.map(e => 
      e.id === enhancementId ? { ...e, status: 'accepted' as const } : e
    ));
    updateFitmentScore();
  };

  const rejectEnhancement = (enhancementId: string) => {
    setEnhancements(prev => prev.map(e => 
      e.id === enhancementId ? { ...e, status: 'rejected' as const } : e
    ));
  };

  const undoEnhancement = (enhancementId: string) => {
    setEnhancements(prev => prev.map(e => 
      e.id === enhancementId ? { ...e, status: 'pending' as const, isEditing: false } : e
    ));
    updateFitmentScore();
  };

  const startEditing = (enhancementId: string) => {
    const enhancement = enhancements.find(e => e.id === enhancementId);
    if (!enhancement) return;
    
    setEnhancements(prev => prev.map(e => 
      e.id === enhancementId ? { 
        ...e, 
        isEditing: true, 
        editValue: e.enhanced 
      } : e
    ));
  };

  const saveEdit = (enhancementId: string) => {
    setEnhancements(prev => prev.map(e => 
      e.id === enhancementId ? { 
        ...e, 
        enhanced: e.editValue || e.enhanced,
        isEditing: false,
        status: 'pending' as const
      } : e
    ));
  };

  const updateEditValue = (enhancementId: string, value: string) => {
    setEnhancements(prev => prev.map(e => 
      e.id === enhancementId ? { ...e, editValue: value } : e
    ));
  };

  const undoAllEnhancements = () => {
    setEnhancements(prev => prev.map(e => ({ 
      ...e, 
      status: 'pending' as const, 
      isEditing: false 
    })));
    setCurrentFitmentScore(candidate?.fitmentScore || 65);
  };

  const applyAcceptedEnhancements = () => {
    const updatedResume = { ...originalResume };
    
    enhancements.forEach(enhancement => {
      if (enhancement.status === 'accepted') {
        switch (enhancement.section) {
          case 'github':
            updatedResume.github = enhancement.enhanced;
            break;
          case 'summary':
            updatedResume.summary = enhancement.enhanced;
            break;
          case 'skills':
            if (enhancement.type === 'add') {
              updatedResume.skills = [...updatedResume.skills, enhancement.enhanced];
            }
            break;
          case 'experience':
            if (enhancement.type === 'improve' && enhancement.original) {
              const index = updatedResume.experience.findIndex((exp: string) => exp === enhancement.original);
              if (index !== -1) {
                updatedResume.experience[index] = enhancement.enhanced;
              }
            }
            break;
        }
      }
    });

    return updatedResume;
  };

  const handleSave = () => {
    const finalResume = applyAcceptedEnhancements();
    const finalScore = calculateFitmentScore();
    
    if (onSave && candidate) {
      onSave(candidate.id, finalScore, finalResume);
    }
    onClose();
  };

  const renderEnhancementInline = (sectionName: string) => {
    const sectionEnhancements = enhancements.filter(e => e.section === sectionName);
    
    if (sectionEnhancements.length === 0) return null;

    return (
      <div className="mt-4 space-y-3">
        {sectionEnhancements.map(enhancement => {
          const isPending = enhancement.status === 'pending';
          const isAccepted = enhancement.status === 'accepted';
          const isRejected = enhancement.status === 'rejected';
          
          return (
            <div 
              key={enhancement.id} 
              className={`border rounded-lg p-4 ${
                isAccepted ? 'bg-green-50 border-green-200' :
                isRejected ? 'bg-gray-50 border-gray-300' :
                'bg-blue-50 border-blue-200'
              }`}
            >
              <div className="mb-3">
                <div className={`text-sm font-medium mb-2 ${
                  isAccepted ? 'text-green-900' :
                  isRejected ? 'text-gray-600' :
                  'text-blue-900'
                }`}>
                  {enhancement.type === 'add' ? '✨ Suggested Addition:' : '🔧 Suggested Improvement:'}
                  {isAccepted && ' ✅ Accepted'}
                  {isRejected && ' ❌ Rejected'}
                </div>
                
                {enhancement.isEditing ? (
                  <div className="space-y-2">
                    <textarea
                      value={enhancement.editValue || enhancement.enhanced}
                      onChange={(e) => updateEditValue(enhancement.id, e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded text-sm resize-none"
                      rows={3}
                    />
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => saveEdit(enhancement.id)}
                        className="flex items-center space-x-1 bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors"
                      >
                        <Save className="w-3 h-3" />
                        <span>Save Edit</span>
                      </button>
                      <button
                        onClick={() => setEnhancements(prev => prev.map(e => 
                          e.id === enhancement.id ? { ...e, isEditing: false } : e
                        ))}
                        className="text-xs text-gray-600 hover:text-gray-800"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className={`text-sm p-3 rounded border bg-white ${
                    isRejected ? 'line-through text-gray-500' : 'text-gray-800'
                  }`}>
                    {enhancement.enhanced}
                  </div>
                )}
                
                <div className={`text-xs mt-2 italic ${
                  isRejected ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  💡 {enhancement.reason}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {isPending && !enhancement.isEditing && (
                  <>
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
                      onClick={() => startEditing(enhancement.id)}
                      className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                  </>
                )}
                
                {(isAccepted || isRejected) && (
                  <button
                    onClick={() => undoEnhancement(enhancement.id)}
                    className="flex items-center space-x-1 bg-gray-600 text-white px-3 py-1 rounded text-xs hover:bg-gray-700 transition-colors"
                  >
                    <Undo className="w-3 h-3" />
                    <span>Undo</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
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
              <div className="text-2xl font-bold text-purple-600">{currentFitmentScore}%</div>
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
            <div className="flex items-center space-x-2 text-green-600">
              <Check className="w-5 h-5" />
              <span className="font-medium">AI Enhancements Ready</span>
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