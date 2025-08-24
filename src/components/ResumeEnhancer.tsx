import React, { useState } from 'react';
import { ArrowLeft, Brain, TrendingUp, CheckCircle, AlertCircle, Send, X, Wand2, Check, Edit3, SkipForward, Undo, Save } from 'lucide-react';

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
  onClose: () => void;
  onSave?: (candidateId: string, newScore: number) => void;
}

interface Enhancement {
  id: string;
  section: 'summary' | 'experience' | 'skills' | 'projects';
  type: 'add' | 'improve' | 'rewrite';
  original: string;
  enhanced: string;
  reason: string;
  accepted: boolean;
  skipped: boolean;
  edited: boolean;
  editedContent?: string;
}

const ResumeEnhancer: React.FC<ResumeEnhancerProps> = ({ candidate, onClose, onSave }) => {
  const [activeSection, setActiveSection] = useState<'quick' | 'verification'>('quick');
  const [fitmentScore, setFitmentScore] = useState(candidate?.fitmentScore || 75);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Load saved enhancements on component mount
  React.useEffect(() => {
    if (candidate) {
      const savedData = localStorage.getItem(`resume_enhancements_${candidate.id}`);
      if (savedData) {
        try {
          const { enhancements: savedEnhancements, fitmentScore: savedScore } = JSON.parse(savedData);
          setEnhancements(savedEnhancements);
          setFitmentScore(savedScore);
        } catch (error) {
          console.error('Error loading saved enhancements:', error);
        }
      }
    }
  }, [candidate]);

  // Mock original resume data with personalized content
  const getOriginalResume = () => {
    if (!candidate) {
      return {
        name: "John Doe",
        email: "john.doe@email.com",
        contact: "+91 9876543210",
        linkedin: "linkedin.com/in/johndoe",
        github: "github.com/johndoe",
        education: "Bachelor of Computer Science, ABC University (2020-2024)",
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
          "Dean's List for 3 consecutive semesters",
          "Winner of College Hackathon 2023"
        ]
      };
    }

    const candidateResumes: { [key: string]: any } = {
      '1': { // Janhavi Sharma - missing Git
        name: "Janhavi Sharma",
        email: "janhavi.sharma@email.com",
        contact: "+91 9876543210",
        linkedin: "linkedin.com/in/janhavisharma",
        github: "", // Missing GitHub for enhancement
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
      '3': { // Priya Patel - missing React, has GitHub
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
          "Top 10% in class for 2 years",
          "Completed Python certification course"
        ]
      },
      '4': { // Rahul Singh - missing SQL, no GitHub
        name: "Rahul Singh",
        email: "rahul.singh@email.com",
        contact: "+91 9876543212",
        linkedin: "linkedin.com/in/rahulsingh",
        github: "", // Missing GitHub for enhancement
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
          "Completed JavaScript certification"
        ]
      },
      '5': { // Anita Desai - missing backend, has GitHub
        name: "Anita Desai",
        email: "anita.desai@email.com",
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
          "Completed React certification course"
        ]
      }
    };

    return candidateResumes[candidate.id] || candidateResumes['1'];
  };

  const originalResume = getOriginalResume();

  // AI-generated enhancements based on candidate's gaps
  const getEnhancements = (): Enhancement[] => {
    if (!candidate) return [];

    const candidateEnhancements: { [key: string]: Enhancement[] } = {
      '1': [ // Janhavi Sharma - missing Git
        {
          id: 'summary-1',
          section: 'summary',
          type: 'improve',
          original: "Computer Science student with experience in web development and programming.",
          enhanced: "Computer Science student with experience in web development, programming, and collaborative software development using version control systems.",
          reason: "Added mention of collaborative development to highlight teamwork skills",
          accepted: false,
          skipped: false,
          edited: false
        },
        {
          id: 'skills-1',
          section: 'skills',
          type: 'add',
          original: "Java, React, SQL",
          enhanced: "Java, React, SQL, Git, GitHub",
          reason: "Added version control skills that are essential for collaborative development",
          accepted: false,
          skipped: false,
          edited: false
        },
        {
          id: 'projects-1',
          section: 'projects',
          type: 'improve',
          original: "Blood Bank Management System - Java application with database integration",
          enhanced: "Blood Bank Management System - Java application with database integration, managed using Git version control with collaborative development practices",
          reason: "Highlighted version control usage in project management",
          accepted: false,
          skipped: false,
          edited: false
        },
        {
          id: 'github-1',
          section: 'experience',
          type: 'add',
          original: "",
          enhanced: "github.com/janhavisharma",
          reason: "Adding GitHub profile link to showcase code repositories and contributions",
          accepted: false,
          skipped: false,
          edited: false
        }
      ],
      '3': [ // Priya Patel - missing React
        {
          id: 'summary-2',
          section: 'summary',
          type: 'improve',
          original: "Computer Science student with experience in web development and programming.",
          enhanced: "Computer Science student with full-stack web development experience, specializing in both backend Python development and modern frontend frameworks.",
          reason: "Emphasized full-stack capabilities to show versatility",
          accepted: false,
          skipped: false,
          edited: false
        },
        {
          id: 'skills-2',
          section: 'skills',
          type: 'add',
          original: "Python, Django, HTML, CSS",
          enhanced: "Python, Django, HTML, CSS, JavaScript, React, REST APIs",
          reason: "Added frontend framework skills and API integration experience",
          accepted: false,
          skipped: false,
          edited: false
        },
        {
          id: 'experience-2',
          section: 'experience',
          type: 'add',
          original: "Created responsive web interfaces using HTML, CSS, and JavaScript",
          enhanced: "Created responsive web interfaces using HTML, CSS, and JavaScript, with experience in React component development and API integration",
          reason: "Added React experience to show modern frontend development skills",
          accepted: false,
          skipped: false,
          edited: false
        }
      ],
      '4': [ // Rahul Singh - missing SQL
        {
          id: 'summary-3',
          section: 'summary',
          type: 'improve',
          original: "Computer Science student with experience in web development and programming.",
          enhanced: "Computer Science student with full-stack development experience, proficient in both NoSQL and relational database management.",
          reason: "Highlighted database expertise to show comprehensive backend skills",
          accepted: false,
          skipped: false,
          edited: false
        },
        {
          id: 'skills-3',
          section: 'skills',
          type: 'add',
          original: "JavaScript, Node.js, MongoDB",
          enhanced: "JavaScript, Node.js, MongoDB, SQL, MySQL, Database Design",
          reason: "Added SQL database skills essential for enterprise applications",
          accepted: false,
          skipped: false,
          edited: false
        },
        {
          id: 'projects-3',
          section: 'projects',
          type: 'improve',
          original: "E-commerce Website - Full-stack development with responsive design",
          enhanced: "E-commerce Website - Full-stack development with responsive design, featuring both MongoDB for product catalog and SQL database for transaction management",
          reason: "Showcased experience with both database types",
          accepted: false,
          skipped: false,
          edited: false
        },
        {
          id: 'github-3',
          section: 'experience',
          type: 'add',
          original: "",
          enhanced: "github.com/rahulsingh",
          reason: "Adding GitHub profile link to showcase code repositories and contributions",
          accepted: false,
          skipped: false,
          edited: false
        }
      ],
      '5': [ // Anita Desai - missing backend
        {
          id: 'summary-4',
          section: 'summary',
          type: 'improve',
          original: "Computer Science student with experience in web development and programming.",
          enhanced: "Computer Science student with full-stack web development experience, combining strong frontend skills with backend API development.",
          reason: "Emphasized full-stack capabilities including backend development",
          accepted: false,
          skipped: false,
          edited: false
        },
        {
          id: 'skills-4',
          section: 'skills',
          type: 'add',
          original: "React, JavaScript, CSS, HTML",
          enhanced: "React, JavaScript, CSS, HTML, Node.js, Express.js, REST APIs, Database Integration",
          reason: "Added backend development skills to complement frontend expertise",
          accepted: false,
          skipped: false,
          edited: false
        },
        {
          id: 'experience-4',
          section: 'experience',
          type: 'add',
          original: "Created responsive web designs using HTML, CSS, and modern frameworks",
          enhanced: "Created responsive web designs using HTML, CSS, and modern frameworks, with backend API development using Node.js and database integration",
          reason: "Added backend development experience to show full-stack capabilities",
          accepted: false,
          skipped: false,
          edited: false
        }
      ]
    };

    return candidateEnhancements[candidate.id] || candidateEnhancements['1'];
  };

  const [enhancements, setEnhancements] = useState<Enhancement[]>(getEnhancements());

  const handleEnhancementAction = (enhancementId: string, action: 'accept' | 'skip' | 'edit' | 'undo') => {
    setEnhancements(prev => prev.map(enhancement => {
      if (enhancement.id === enhancementId) {
        if (action === 'accept') {
          setFitmentScore(current => Math.min(current + 3, 95));
          setHasUnsavedChanges(true);
          return { ...enhancement, accepted: true, skipped: false, edited: false };
        } else if (action === 'skip') {
          setHasUnsavedChanges(true);
          return { ...enhancement, accepted: false, skipped: true, edited: false };
        } else if (action === 'edit') {
          setHasUnsavedChanges(true);
          return { ...enhancement, accepted: false, skipped: false, edited: true, editedContent: enhancement.enhanced };
        } else if (action === 'undo') {
          setFitmentScore(current => Math.max(current - 3, candidate?.fitmentScore || 75));
          setHasUnsavedChanges(true);
          return { ...enhancement, accepted: false, skipped: false, edited: false, editedContent: undefined };
        }
      }
      return enhancement;
    }));
  };

  const handleEditChange = (enhancementId: string, content: string) => {
    setEnhancements(prev => prev.map(enhancement => {
      if (enhancement.id === enhancementId) {
        return { ...enhancement, editedContent: content };
      }
      return enhancement;
    }));
    setHasUnsavedChanges(true);
  };

  const handleUndoSkip = (enhancementId: string) => {
    setEnhancements(prev => prev.map(enhancement => 
      enhancement.id === enhancementId 
        ? { ...enhancement, accepted: false, skipped: false, edited: false }
        : enhancement
    ));
    setHasUnsavedChanges(true);
  };

  const handleSaveEdit = (enhancementId: string) => {
    setEnhancements(prev => prev.map(enhancement => {
      if (enhancement.id === enhancementId) {
        setFitmentScore(current => Math.min(current + 3, 95));
        setHasUnsavedChanges(true);
        return { ...enhancement, accepted: true, edited: true, skipped: false };
      }
      return enhancement;
    }));
  };

  const handleSave = () => {
    if (candidate) {
      // Save enhancements to localStorage for persistence
      const enhancementData = {
        enhancements,
        fitmentScore,
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem(`resume_enhancements_${candidate.id}`, JSON.stringify(enhancementData));
      
      if (onSave) {
        const enhancedResume = getEnhancedResume();
        onSave(candidate.id, fitmentScore, enhancedResume);
      }
    }
    setHasUnsavedChanges(false);
    alert(`Resume enhancements saved for ${candidate?.name || 'candidate'}! Fitment score updated to ${fitmentScore}%`);
  };

  const getEnhancedResume = () => {
    let enhanced = { ...originalResume };
    
    enhancements.forEach(enhancement => {
      const content = enhancement.edited && enhancement.editedContent ? enhancement.editedContent : enhancement.enhanced;
      
      if (enhancement.accepted || enhancement.edited) {
        switch (enhancement.section) {
          case 'summary':
            enhanced.summary = content;
            break;
          case 'skills':
            enhanced.skills = content.split(', ');
            break;
          case 'experience':
            if (enhancement.id.includes('github')) {
              enhanced.github = content;
            } else if (enhancement.type === 'add') {
              enhanced.experience = [...enhanced.experience, content];
            } else {
              enhanced.experience = enhanced.experience.map(exp => 
                exp === enhancement.original ? content : exp
              );
            }
            break;
          case 'projects':
            enhanced.projects = enhanced.projects.map(project => 
              project === enhancement.original ? content : project
            );
            break;
        }
      }
    });
    
    return enhanced;
  };

  const enhancedResume = getEnhancedResume();

  // Get personalized data for skill-gap verification
  const getPersonalizedData = () => {
    if (!candidate) {
      return {
        currentScore: 75,
        potentialScore: 85,
        observation: 'We noticed there is no mention of database knowledge in your resume. Clarifying this can increase your fitment score significantly as the job requires database management skills.',
        questions: [
          "Do you have knowledge or experience with databases (SQL/NoSQL)?",
          "In your project \"Blood Bank Management\", did you work on the database schema or queries?",
          "Which database technologies (e.g., MySQL, MongoDB, PostgreSQL) are you familiar with?",
          "Apart from backend, did you also contribute to performance optimization or database tuning?"
        ]
      };
    }

    const candidateData: { [key: string]: any } = {
      '1': { // Janhavi Sharma
        currentScore: 85,
        potentialScore: 92,
        observation: 'Your resume shows strong Java and React skills, but lacks mention of version control systems like Git. Adding this experience can boost your fitment score as collaborative development is crucial for this role.',
        questions: [
          "Do you have experience with version control systems like Git or SVN?",
          "Have you worked on collaborative projects using GitHub or GitLab?",
          "In your Java projects, did you follow any specific coding standards or practices?",
          "Have you participated in code reviews or pair programming sessions?"
        ]
      },
      '3': { // Priya Patel
        currentScore: 72,
        potentialScore: 83,
        observation: 'Your Python and Django expertise is impressive, but the role requires React frontend skills. Clarifying any React experience or willingness to learn can significantly improve your fitment.',
        questions: [
          "Do you have any experience with React or other JavaScript frameworks?",
          "Have you worked on frontend-backend integration in your Django projects?",
          "Are you familiar with RESTful APIs and how to consume them in frontend applications?",
          "Have you used any state management libraries like Redux or Context API?"
        ]
      },
      '4': { // Rahul Singh
        currentScore: 68,
        potentialScore: 79,
        observation: 'Your JavaScript and Node.js skills are solid, but we notice no mention of SQL databases. Since the role involves database management, clarifying your SQL experience could boost your score.',
        questions: [
          "Do you have experience with SQL databases like MySQL or PostgreSQL?",
          "In your Node.js projects, have you worked with database ORMs like Sequelize or Prisma?",
          "Have you designed database schemas or written complex SQL queries?",
          "Are you familiar with database optimization techniques and indexing?"
        ]
      },
      '5': { // Anita Desai
        currentScore: 63,
        potentialScore: 76,
        observation: 'Your frontend skills with React and JavaScript are excellent, but the role requires full-stack capabilities. Any backend experience you have could significantly improve your fitment score.',
        questions: [
          "Do you have any backend development experience with Node.js, Python, or Java?",
          "Have you worked with APIs - either consuming them or creating RESTful services?",
          "Are you familiar with databases and how to connect them to frontend applications?",
          "Have you deployed full-stack applications or worked with cloud services?"
        ]
      }
    };

    return candidateData[candidate.id] || candidateData['1'];
  };

  const { currentScore, potentialScore, observation, questions } = getPersonalizedData();

  const handleAnswerChange = (questionIndex: number, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    onClose();
  };

  const displayCurrentScore = (() => {
    const savedEnhancements = localStorage.getItem(`resume_enhancements_${candidate?.id}`);
    if (savedEnhancements) {
      try {
        const { fitmentScore: savedScore } = JSON.parse(savedEnhancements);
        return savedScore;
      } catch (error) {
        return currentScore;
      }
    }
    return currentScore;
  })();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-500" />
            </button>
            <div className="flex items-center space-x-2">
              <Wand2 className="w-6 h-6 text-purple-600" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Resume Enhancer</h1>
                <p className="text-gray-600">
                  AI-powered suggestions to improve candidate–JD fitment
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {hasUnsavedChanges && (
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveSection('quick')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeSection === 'quick'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Quick Enhancement
            </button>
            <button
              onClick={() => setActiveSection('verification')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeSection === 'verification'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Skill-gap Verification
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeSection === 'quick' ? (
            /* Quick Enhancement Section */
            <div className="space-y-6">
              {/* Candidate Info */}
              {candidate && (
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                        <img 
                          src={candidate.profileImage} 
                          alt={candidate.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
                        <p className="text-sm text-gray-600">Intern Software Developer Application</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-600">{fitmentScore}%</div>
                      <div className="text-sm text-gray-600">Current Fitment</div>
                      <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${fitmentScore}%` }}
                        ></div>
                      </div>
                      {fitmentScore > candidate.fitmentScore && (
                        <p className="text-sm font-medium text-green-600 mt-1">
                          +{fitmentScore - candidate.fitmentScore}% improvement
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Resume Comparison */}
              <div className="grid grid-cols-2 gap-6">
                {/* Original Resume */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Original Resume</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Contact Information</h4>
                      <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded space-y-1">
                        <p><strong>Name:</strong> {originalResume.name}</p>
                        <p><strong>Email:</strong> {originalResume.email}</p>
                        <p><strong>Contact:</strong> {originalResume.contact}</p>
                        <p><strong>LinkedIn:</strong> {originalResume.linkedin}</p>
                        {originalResume.github && <p><strong>GitHub:</strong> {originalResume.github}</p>}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Education</h4>
                      <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{originalResume.education}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Summary</h4>
                      <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{originalResume.summary}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Experience</h4>
                      <div className="space-y-2">
                        {originalResume.experience.map((exp, index) => (
                          <p key={index} className="text-sm text-gray-600 bg-gray-50 p-3 rounded">• {exp}</p>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {originalResume.skills.map((skill, index) => (
                          <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Projects</h4>
                      <div className="space-y-2">
                        {originalResume.projects.map((project, index) => (
                          <p key={index} className="text-sm text-gray-600 bg-gray-50 p-3 rounded">• {project}</p>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Achievements</h4>
                      <div className="space-y-2">
                        {originalResume.achievements.map((achievement, index) => (
                          <p key={index} className="text-sm text-gray-600 bg-gray-50 p-3 rounded">• {achievement}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Resume */}
                <div className="bg-white rounded-lg border border-green-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Enhanced Resume</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Contact Information</h4>
                      <div className="text-sm text-gray-600 bg-green-50 p-3 rounded border border-green-200 space-y-1">
                        <p><strong>Name:</strong> {enhancedResume.name}</p>
                        <p><strong>Email:</strong> {enhancedResume.email}</p>
                        <p><strong>Contact:</strong> {enhancedResume.contact}</p>
                        <p><strong>LinkedIn:</strong> {enhancedResume.linkedin}</p>
                        <p><strong>GitHub:</strong> {enhancedResume.github || 'Not provided'}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Education</h4>
                      <p className="text-sm text-gray-600 bg-green-50 p-3 rounded border border-green-200">{enhancedResume.education}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Summary</h4>
                      <p className="text-sm text-gray-600 bg-green-50 p-3 rounded border border-green-200">{enhancedResume.summary}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Experience</h4>
                      <div className="space-y-2">
                        {enhancedResume.experience.map((exp, index) => (
                          <p key={index} className="text-sm text-gray-600 bg-green-50 p-3 rounded border border-green-200">• {exp}</p>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {enhancedResume.skills.map((skill, index) => (
                          <span key={index} className={`px-2 py-1 rounded text-sm ${
                            originalResume.skills.includes(skill) 
                              ? 'bg-gray-100 text-gray-700' 
                              : 'bg-green-100 text-green-700 border border-green-300'
                          }`}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Projects</h4>
                      <div className="space-y-2">
                        {enhancedResume.projects.map((project, index) => (
                          <p key={index} className="text-sm text-gray-600 bg-green-50 p-3 rounded border border-green-200">• {project}</p>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Achievements</h4>
                      <div className="space-y-2">
                        {enhancedResume.achievements.map((achievement, index) => (
                          <p key={index} className="text-sm text-gray-600 bg-green-50 p-3 rounded border border-green-200">• {achievement}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Suggestions */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Suggestions</h3>
                
                <div className="space-y-4">
                  {enhancements.map((enhancement) => (
                    <div key={enhancement.id} className={`border rounded-lg p-4 ${
                      enhancement.accepted ? 'border-green-300 bg-green-50' : 
                      enhancement.skipped ? 'border-gray-300 bg-gray-50' : 
                      enhancement.edited ? 'border-blue-300 bg-blue-50' : 'border-orange-300 bg-orange-50'
                    }`}>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 capitalize">
                            {enhancement.section === 'experience' && enhancement.id.includes('github') ? 'GitHub Profile' : enhancement.section} Enhancement
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">{enhancement.reason}</p>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          {!enhancement.accepted && !enhancement.skipped && !enhancement.edited && (
                            <>
                              <button
                                onClick={() => handleEnhancementAction(enhancement.id, 'accept')}
                                className="flex items-center space-x-1 bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                              >
                                <Check className="w-3 h-3" />
                                <span>Accept</span>
                              </button>
                              <button
                                onClick={() => handleEnhancementAction(enhancement.id, 'skip')}
                                className="flex items-center space-x-1 bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 transition-colors"
                              >
                                <SkipForward className="w-3 h-3" />
                                <span>Skip</span>
                              </button>
                              <button
                                onClick={() => handleEnhancementAction(enhancement.id, 'edit')}
                                className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                              >
                                <Edit3 className="w-3 h-3" />
                                <span>Edit</span>
                              </button>
                            </>
                          )}
                          {(enhancement.accepted || enhancement.edited) && (
                            <button
                              onClick={() => handleEnhancementAction(enhancement.id, 'undo')}
                              className="flex items-center space-x-1 bg-orange-600 text-white px-3 py-1 rounded text-sm hover:bg-orange-700 transition-colors"
                            >
                              <Undo className="w-3 h-3" />
                              <span>Undo</span>
                            </button>
                          )}
                          {enhancement.accepted && (
                            <span className="flex items-center space-x-1 text-green-600 text-sm font-medium">
                              <CheckCircle className="w-4 h-4" />
                              <span>Applied</span>
                            </span>
                          )}
                          {enhancement.skipped && (
                            <button
                              onClick={() => handleUndoSkip(enhancement.id)}
                              className="text-orange-600 hover:text-orange-700 font-medium underline"
                            >
                              Undo Skip
                            </button>
                          )}
                          {enhancement.edited && (
                            <span className="flex items-center space-x-1 text-blue-600 text-sm font-medium">
                              <Edit3 className="w-4 h-4" />
                              <span>Edited</span>
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mt-3">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Original:</p>
                          <p className="text-sm text-gray-700 bg-white p-2 rounded border">
                            {enhancement.original || 'Not provided'}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Enhanced:</p>
                          {enhancement.edited ? (
                            <textarea
                              value={enhancement.editedContent || enhancement.enhanced}
                              onChange={(e) => handleEditChange(enhancement.id, e.target.value)}
                              className="w-full text-sm text-gray-700 bg-blue-100 p-2 rounded border border-blue-200 resize-none"
                              rows={3}
                            />
                          ) : enhancement.accepted ? (
                            <p className="text-sm text-gray-700 bg-green-100 p-2 rounded border border-green-200">
                              {enhancement.enhanced}
                            </p>
                          ) : (
                            <p className="text-sm text-gray-700 bg-green-100 p-2 rounded border border-green-200">
                              {enhancement.enhanced}
                            </p>
                          )}
                          {enhancement.edited && !enhancement.accepted && (
                            <button
                              onClick={() => handleSaveEdit(enhancement.id)}
                              className="mt-2 flex items-center space-x-1 bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                            >
                              <Save className="w-3 h-3" />
                              <span>Save Edit</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Skill-gap Verification Section */
            <div className="space-y-6">
              {/* Candidate Info */}
              {candidate && (
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                      <img 
                        src={candidate.profileImage} 
                        alt={candidate.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
                      <p className="text-sm text-gray-600">Intern Software Developer Application</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm font-medium text-purple-600">
                          Current Skills: {(() => {
                            // Get enhanced skills if available
                            const savedEnhancements = localStorage.getItem(`resume_enhancements_${candidate.id}`);
                            if (savedEnhancements) {
                              try {
                                const enhancementData = JSON.parse(savedEnhancements);
                                const enhancedResume = getEnhancedResume();
                                return enhancedResume.skills.join(', ');
                              } catch (error) {
                                return candidate.skills.join(', ');
                              }
                            }
                            return candidate.skills.join(', ');
                          })()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Fitment Score Card */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Fitment Score Analysis</h2>
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">
                      {displayCurrentScore}%
                    </div>
                    <div className="text-sm text-gray-600">Current Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">
                      {potentialScore}%
                    </div>
                    <div className="text-sm text-gray-600">Potential Score</div>
                  </div>
                </div>

                {/* Progress Bar Visualization */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>
                      {(() => {
                        const savedEnhancements = localStorage.getItem(`resume_enhancements_${candidate?.id}`);
                        return savedEnhancements ? 'Enhanced Fitment' : 'Current Fitment';
                      })()}
                    </span>
                    <span>
                      {(() => {
                        const savedEnhancements = localStorage.getItem(`resume_enhancements_${candidate?.id}`);
                        if (savedEnhancements) {
                          try {
                            const { fitmentScore: savedScore } = JSON.parse(savedEnhancements);
                            return `${savedScore}%`;
                          } catch (error) {
                            return `${currentScore}%`;
                          }
                        }
                        return `${currentScore}%`;
                      })()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-purple-500 h-3 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${(() => {
                          const savedEnhancements = localStorage.getItem(`resume_enhancements_${candidate?.id}`);
                          if (savedEnhancements) {
                            try {
                              const { fitmentScore: savedScore } = JSON.parse(savedEnhancements);
                              return savedScore;
                            } catch (error) {
                              return currentScore;
                            }
                          }
                          return currentScore;
                        })()}%` 
                      }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between text-sm text-gray-600 mt-4">
                    <span>Potential Fitment</span>
                    <span>{potentialScore}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-green-500 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${potentialScore}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-blue-800">
                      Your resume fitment score can increase with a few clarifications.
                    </p>
                  </div>
                </div>
              </div>

              {/* AI Observations Section */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Brain className="w-6 h-6 text-purple-600" />
                  <h2 className="text-lg font-semibold text-gray-900">AI Observations</h2>
                </div>
                
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">
                      {observation}
                    </p>
                  </div>
                </div>
              </div>

              {/* Questions Section */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Clarifying Questions</h2>
                <p className="text-gray-600 mb-6">Please answer these questions to help us better understand your experience:</p>
                
                <div className="space-y-6">
                  {questions.map((question, index) => (
                    <div key={index} className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        {index + 1}. {question}
                      </label>
                      <textarea
                        value={answers[index] || ''}
                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                        placeholder="Please provide your answer here..."
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Section */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <button
                  onClick={onClose}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Skip for Now
                </button>
                
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || Object.keys(answers).length === 0}
                  className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-lg hover:from-orange-500 hover:to-pink-600 transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Answers</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeEnhancer;