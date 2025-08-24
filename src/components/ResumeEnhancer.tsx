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

    // Generate personalized enhancements based on candidate's specific resume
    const generatePersonalizedEnhancements = (resume: any, candidateId: string): Enhancement[] => {
      const enhancements: Enhancement[] = [];
      let enhancementId = 1;

      // Personalized enhancements based on candidate ID and resume content
      switch (candidateId) {
        case '1': // Janhavi Sharma - missing GitHub, has Java/React/SQL
          enhancements.push({
            id: String(enhancementId++),
            section: 'github',
            type: 'add',
            enhanced: 'github.com/janhavi-dev',
            reason: 'Adding GitHub profile to showcase your Blood Bank Management System and E-commerce projects',
            status: 'pending'
          });
          enhancements.push({
            id: String(enhancementId++),
            section: 'summary',
            type: 'improve',
            original: resume.summary,
            enhanced: 'Computer Science student with proven expertise in Java backend development and React frontend, demonstrated through successful Blood Bank Management System serving real users. Strong foundation in SQL database design and responsive web development.',
            reason: 'Highlighting your specific technical stack (Java, React, SQL) and real project impact',
            status: 'pending'
          });
          enhancements.push({
            id: String(enhancementId++),
            section: 'skills',
            type: 'add',
            enhanced: 'Git',
            reason: 'Essential version control skill missing from your current skillset',
            status: 'pending'
          });
          enhancements.push({
            id: String(enhancementId++),
            section: 'experience',
            type: 'improve',
            original: 'Developed a Blood Bank Management System using Java and MySQL',
            enhanced: 'Architected and developed a comprehensive Blood Bank Management System using Java and MySQL, implementing secure user authentication, inventory tracking, and donor management features with responsive UI design',
            reason: 'Adding technical depth and specific features to showcase your Java and database skills',
            status: 'pending'
          });
          break;

        case '2': // Aarya Ranpise - has Python/Django, missing React
          enhancements.push({
            id: String(enhancementId++),
            section: 'summary',
            type: 'improve',
            original: resume.summary,
            enhanced: 'Computer Science student specializing in Python web development with Django framework expertise. Experienced in building scalable web applications with strong frontend integration skills using HTML, CSS, and JavaScript.',
            reason: 'Emphasizing your Python/Django specialization and web development focus',
            status: 'pending'
          });
          enhancements.push({
            id: String(enhancementId++),
            section: 'skills',
            type: 'add',
            enhanced: 'React',
            reason: 'Adding React to complement your strong backend skills for full-stack development',
            status: 'pending'
          });
          enhancements.push({
            id: String(enhancementId++),
            section: 'experience',
            type: 'improve',
            original: 'Built web applications using Python and Django framework',
            enhanced: 'Developed robust web applications using Python and Django framework, implementing RESTful APIs, user authentication systems, and database optimization for improved performance',
            reason: 'Adding technical specifics about your Django development experience',
            status: 'pending'
          });
          break;

        case '3': // Priya Patel - has Python/Django, missing React
          enhancements.push({
            id: String(enhancementId++),
            section: 'summary',
            type: 'improve',
            original: resume.summary,
            enhanced: 'Information Technology student with strong foundation in Python web development and Django framework. Demonstrated ability to create responsive web interfaces and manage complex web application architectures.',
            reason: 'Highlighting your IT background and Python/Django expertise',
            status: 'pending'
          });
          enhancements.push({
            id: String(enhancementId++),
            section: 'skills',
            type: 'add',
            enhanced: 'React',
            reason: 'Adding React framework to enhance your frontend capabilities alongside Python backend',
            status: 'pending'
          });
          enhancements.push({
            id: String(enhancementId++),
            section: 'projects',
            type: 'improve',
            original: 'Library Management System - Python Django application',
            enhanced: 'Library Management System - Full-stack Python Django application with user authentication, book inventory management, search functionality, and automated fine calculation system',
            reason: 'Adding specific features to showcase your Django project complexity',
            status: 'pending'
          });
          break;

        case '4': // Rahul Singh - has Node.js/MongoDB, missing SQL
          enhancements.push({
            id: String(enhancementId++),
            section: 'github',
            type: 'add',
            enhanced: 'github.com/rahul-dev',
            reason: 'Adding GitHub profile to showcase your Node.js and real-time chat application projects',
            status: 'pending'
          });
          enhancements.push({
            id: String(enhancementId++),
            section: 'summary',
            type: 'improve',
            original: resume.summary,
            enhanced: 'Computer Applications student specializing in JavaScript full-stack development with Node.js and MongoDB expertise. Proven experience in building real-time applications and RESTful API development.',
            reason: 'Emphasizing your JavaScript/Node.js specialization and real-time development skills',
            status: 'pending'
          });
          enhancements.push({
            id: String(enhancementId++),
            section: 'skills',
            type: 'add',
            enhanced: 'SQL',
            reason: 'Adding SQL database skills to complement your MongoDB NoSQL experience',
            status: 'pending'
          });
          enhancements.push({
            id: String(enhancementId++),
            section: 'experience',
            type: 'improve',
            original: 'Developed REST APIs using Node.js and Express',
            enhanced: 'Architected and developed scalable REST APIs using Node.js and Express, implementing JWT authentication, data validation, error handling, and MongoDB integration for high-performance web applications',
            reason: 'Adding technical depth about your API development and backend architecture skills',
            status: 'pending'
          });
          break;

        case '5': // Anita Desai - has React/JavaScript, missing backend
          enhancements.push({
            id: String(enhancementId++),
            section: 'summary',
            type: 'improve',
            original: resume.summary,
            enhanced: 'Computer Science student with specialized expertise in React frontend development and modern JavaScript. Strong focus on creating intuitive user interfaces and responsive web applications with excellent design principles.',
            reason: 'Highlighting your React specialization and frontend development focus',
            status: 'pending'
          });
          enhancements.push({
            id: String(enhancementId++),
            section: 'skills',
            type: 'add',
            enhanced: 'Node.js',
            reason: 'Adding Node.js backend skills to complement your strong React frontend expertise',
            status: 'pending'
          });
          enhancements.push({
            id: String(enhancementId++),
            section: 'projects',
            type: 'improve',
            original: 'Weather App - React application with API integration',
            enhanced: 'Weather App - Dynamic React application featuring real-time weather data integration, responsive design, location-based services, and interactive data visualization with modern UI/UX principles',
            reason: 'Adding technical details about your React project features and API integration skills',
            status: 'pending'
          });
          break;

        case '6': // Vikram Kumar - has Node.js/MongoDB, missing SQL
          enhancements.push({
            id: String(enhancementId++),
            section: 'github',
            type: 'add',
            enhanced: 'github.com/vikram-dev',
            reason: 'Adding GitHub profile to showcase your Node.js chat application and e-commerce projects',
            status: 'pending'
          });
          enhancements.push({
            id: String(enhancementId++),
            section: 'summary',
            type: 'improve',
            original: resume.summary,
            enhanced: 'Computer Applications student with strong expertise in JavaScript backend development using Node.js and MongoDB. Demonstrated experience in building real-time applications and full-stack e-commerce solutions.',
            reason: 'Emphasizing your Node.js backend specialization and full-stack development experience',
            status: 'pending'
          });
          enhancements.push({
            id: String(enhancementId++),
            section: 'skills',
            type: 'add',
            enhanced: 'SQL',
            reason: 'Adding SQL database skills to broaden your database expertise beyond MongoDB',
            status: 'pending'
          });
          enhancements.push({
            id: String(enhancementId++),
            section: 'achievements',
            type: 'improve',
            original: 'Best Project Award in Web Development Hackwithme - 2024',
            enhanced: 'Best Project Award in Web Development Hackwithme - 2024 for innovative real-time chat application built with Node.js, Socket.io, and MongoDB',
            reason: 'Adding technical context to your hackathon achievement to showcase specific skills',
            status: 'pending'
          });
          break;

        default:
          // Fallback generic enhancements
          enhancements.push({
            id: String(enhancementId++),
            section: 'summary',
            type: 'improve',
            original: resume.summary,
            enhanced: 'Passionate Computer Science student with hands-on experience in software development and modern web technologies.',
            reason: 'Enhanced professional summary to better highlight technical focus',
            status: 'pending'
          });
      }

      return enhancements;
    };

    const mockEnhancements = generatePersonalizedEnhancements(resumeData, candidate?.id || '1');

    setEnhancements(mockEnhancements);
  }, [candidate]);

  const calculateFitmentScore = () => {
    const baseScore = candidate?.fitmentScore || 65;
    const acceptedEnhancements = enhancements.filter(e => e.status === 'accepted').length;
    return Math.min(95, baseScore + (acceptedEnhancements * 3));
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
          <div className="flex items-center space-x-6">
            <div className="text-right min-w-[200px]">
              <div className="text-sm text-gray-600 mb-1">Current Fitment Score</div>
              <div className="text-2xl font-bold text-purple-600 mb-2">{currentFitmentScore}%</div>
              {/* Progress Bar */}
              <div className="w-48 bg-gray-200 rounded-full h-3 relative overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${currentFitmentScore}%` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse"></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
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