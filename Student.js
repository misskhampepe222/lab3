import React, { useState } from 'react';

const Student = ({ onLogout, setCurrentView, user }) => {
  const [activeTab, setActiveTab] = useState('monitoring');
  const [challenge, setChallenge] = useState('');
  const [rating, setRating] = useState('');
  const [lecturerName, setLecturerName] = useState('');
  const [courseName, setCourseName] = useState('');
  const [selectedYear, setSelectedYear] = useState('certificate');
  const [selectedSemester, setSelectedSemester] = useState('semester1');
  const [currentWeek, setCurrentWeek] = useState(1);
  const [selectedProgram, setSelectedProgram] = useState('IT');

  const handleSubmitChallenge = (e) => {
    e.preventDefault();
    alert('Challenge submitted to Principal Lecturer!');
    setChallenge('');
  };

  const handleSubmitRating = (e) => {
    e.preventDefault();
    alert(`Rating submitted for ${lecturerName} - ${courseName}\nRating: ${rating}`);
    setRating('');
    setLecturerName('');
    setCourseName('');
  };

  const ratingOptions = [
    { value: 'excellent', label: 'Excellent'},
    { value: 'good', label: 'Good'},
    { value: 'average', label: 'Average' },
    { value: 'poor', label: 'Poor'},
  ];

  // Programs structure: Certificate -> Diploma -> Degree
  const programsStructure = {
    IT: {
      certificate: {
        semester1: [
          'Introduction to IT',
          'Computer Fundamentals',
          'Basic Programming',
          'Communication Skills',
          'Mathematics for IT'
        ],
        semester2: [
          'Web Development Basics',
          'Database Fundamentals',
          'Networking Essentials',
          'Office Applications',
          'IT Project Management'
        ]
      },
      diploma: {
        year1: {
          semester1: [
            'Programming Principles',
            'Web Technologies',
            'Database Systems',
            'Computer Hardware',
            'Business Communication'
          ],
          semester2: [
            'Object-Oriented Programming',
            'Network Administration',
            'System Analysis',
            'Web Application Development',
            'Professional Ethics'
          ]
        },
        year2: {
          semester1: [
            'Advanced Programming',
            'Database Management',
            'Network Security',
            'Mobile Development',
            'Project Management'
          ],
          semester2: [
            'Software Engineering',
            'Cloud Computing',
            'Cyber Security Fundamentals',
            'IT Infrastructure',
            'Industrial Attachment'
          ]
        },
        year3: {
          semester1: [
            'Enterprise Systems Development',
            'Advanced Network Security',
            'Cloud Infrastructure',
            'IT Project Leadership',
            'Emerging Technologies'
          ],
          semester2: [
            'Advanced Software Engineering',
            'Data Center Management',
            'IT Governance & Compliance',
            'Strategic IT Planning',
            'Capstone Project'
          ]
        }
      },
      degree: {
        year1: {
          semester1: [
            'Advanced Programming Concepts',
            'Data Structures & Algorithms',
            'Web Application Architecture',
            'Database Design & Implementation',
            'Discrete Mathematics'
          ],
          semester2: [
            'Object-Oriented Analysis & Design',
            'Network Programming',
            'Software Development Methodologies',
            'Human-Computer Interaction',
            'Statistics for Computing'
          ]
        },
        year2: {
          semester1: [
            'Advanced Database Systems',
            'Mobile Application Development',
            'Network Security',
            'Artificial Intelligence Fundamentals',
            'Research Methods'
          ],
          semester2: [
            'Enterprise Systems Development',
            'Cloud Computing Architecture',
            'Cyber Security Management',
            'Data Analytics',
            'Professional Practice'
          ]
        },
        year3: {
          semester1: [
            'Advanced Software Engineering',
            'Big Data Technologies',
            'Internet of Things',
            'Project Management',
            'Elective Course I'
          ],
          semester2: [
            'Machine Learning Applications',
            'Cloud Native Development',
            'Cyber Security Advanced',
            'IT Strategy & Innovation',
            'Elective Course II'
          ]
        },
        year4: {
          semester1: [
            'Advanced AI Systems',
            'Blockchain Technology',
            'Digital Transformation',
            'Research Project I',
            'Professional Elective'
          ],
          semester2: [
            'Capstone Project',
            'Industry Placement',
            'Emerging Technologies',
            'Research Project II',
            'Leadership in IT'
          ]
        }
      }
    },
    BIT: {
      certificate: {
        semester1: [
          'Business IT Fundamentals',
          'Computer Applications',
          'Business Communication',
          'Accounting Basics',
          'Mathematics for Business'
        ],
        semester2: [
          'Database Management',
          'E-Commerce Fundamentals',
          'Business Software',
          'Marketing Principles',
          'Financial Literacy'
        ]
      },
      diploma: {
        year1: {
          semester1: [
            'Business Information Systems',
            'Programming for Business',
            'Database Design',
            'Business Mathematics',
            'Communication Skills'
          ],
          semester2: [
            'Web Technologies for Business',
            'Network Fundamentals',
            'System Analysis & Design',
            'Business Statistics',
            'Professional Development'
          ]
        },
        year2: {
          semester1: [
            'Enterprise Systems',
            'Business Intelligence',
            'Database Administration',
            'Project Management',
            'Business Law'
          ],
          semester2: [
            'E-Business Strategies',
            'Data Analytics for Business',
            'IT Service Management',
            'Strategic Management',
            'Industrial Attachment'
          ]
        },
        year3: {
          semester1: [
            'Advanced Business Analytics',
            'Digital Marketing Technologies',
            'Enterprise Architecture',
            'Business Process Management',
            'Innovation Management'
          ],
          semester2: [
            'Strategic IT Management',
            'Business Intelligence Systems',
            'Digital Transformation',
            'Capstone Project',
            'Professional Practice'
          ]
        }
      },
      degree: {
        year1: {
          semester1: [
            'Business Information Technology',
            'Programming Fundamentals',
            'Database Systems',
            'Business Mathematics',
            'Academic Writing'
          ],
          semester2: [
            'Web Application Development',
            'Network Infrastructure',
            'System Analysis & Design',
            'Business Statistics',
            'Professional Communication'
          ]
        },
        year2: {
          semester1: [
            'Enterprise Architecture',
            'Business Intelligence Systems',
            'Database Management',
            'Project Management',
            'Business Law & Ethics'
          ],
          semester2: [
            'E-Business Solutions',
            'Data Analytics',
            'IT Governance',
            'Strategic Management',
            'Research Methodology'
          ]
        },
        year3: {
          semester1: [
            'Advanced Business Systems',
            'Cloud Computing for Business',
            'Cyber Security Management',
            'Innovation & Entrepreneurship',
            'Elective Course I'
          ],
          semester2: [
            'Digital Business Transformation',
            'Advanced Data Analytics',
            'IT Service Management',
            'Business Process Reengineering',
            'Elective Course II'
          ]
        },
        year4: {
          semester1: [
            'Strategic IT Leadership',
            'Advanced Enterprise Systems',
            'Business Research Methods',
            'Digital Innovation',
            'Professional Elective'
          ],
          semester2: [
            'Capstone Project',
            'Industry Internship',
            'Strategic Business Technology',
            'Research Project',
            'Leadership in Digital Business'
          ]
        }
      }
    },
    SoftwareEngineering: {
      certificate: {
        semester1: [
          'Programming Fundamentals',
          'Computer Systems',
          'Software Basics',
          'Problem Solving',
          'Technical Communication'
        ],
        semester2: [
          'Web Development',
          'Database Concepts',
          'Software Design',
          'Algorithms & Logic',
          'Project Documentation'
        ]
      },
      diploma: {
        year1: {
          semester1: [
            'Object-Oriented Programming',
            'Data Structures',
            'Web Technologies',
            'Software Requirements',
            'Technical Writing'
          ],
          semester2: [
            'Software Design Patterns',
            'Database Systems',
            'Mobile Development',
            'Software Testing',
            'Team Collaboration'
          ]
        },
        year2: {
          semester1: [
            'Advanced Programming',
            'Software Architecture',
            'Web Application Development',
            'Quality Assurance',
            'Project Management'
          ],
          semester2: [
            'Enterprise Development',
            'Software Security',
            'Cloud Applications',
            'Agile Methodologies',
            'Industrial Placement'
          ]
        },
        year3: {
          semester1: [
            'Advanced Software Architecture',
            'DevOps Practices',
            'Microservices Development',
            'Software Quality Management',
            'Software Metrics'
          ],
          semester2: [
            'Enterprise Software Systems',
            'Software Security Engineering',
            'Cloud Native Development',
            'Capstone Project',
            'Professional Ethics'
          ]
        }
      },
      degree: {
        year1: {
          semester1: [
            'Advanced Programming Concepts',
            'Data Structures & Algorithms',
            'Software Engineering Principles',
            'Discrete Mathematics',
            'Technical Communication'
          ],
          semester2: [
            'Object-Oriented Analysis & Design',
            'Database Management Systems',
            'Web Application Architecture',
            'Software Requirements Engineering',
            'Statistics for Engineers'
          ]
        },
        year2: {
          semester1: [
            'Software Architecture & Design',
            'Mobile Application Development',
            'Software Quality Assurance',
            'Human-Computer Interaction',
            'Research Methods'
          ],
          semester2: [
            'Enterprise Software Development',
            'Software Security Engineering',
            'Cloud Computing',
            'Software Project Management',
            'Professional Practice'
          ]
        },
        year3: {
          semester1: [
            'Advanced Software Engineering',
            'Big Data Systems',
            'Software Verification & Validation',
            'Software Maintenance',
            'Elective Course I'
          ],
          semester2: [
            'Distributed Systems',
            'AI in Software Engineering',
            'Software Testing Automation',
            'Software Evolution',
            'Elective Course II'
          ]
        },
        year4: {
          semester1: [
            'Software Engineering Management',
            'Advanced Software Architecture',
            'Research Project I',
            'Software Product Line Engineering',
            'Professional Elective'
          ],
          semester2: [
            'Capstone Project',
            'Industry Internship',
            'Emerging Software Technologies',
            'Research Project II',
            'Software Engineering Leadership'
          ]
        }
      }
    }
  };

  // Generate timetable data based on program, level, year, semester, and week
  const generateTimetableData = (program, level, year, semester, week) => {
    let baseCourses = [];
    
    if (level === 'certificate') {
      baseCourses = programsStructure[program]?.certificate?.[semester] || [];
    } else if (level === 'diploma') {
      baseCourses = programsStructure[program]?.diploma?.[year]?.[semester] || [];
    } else if (level === 'degree') {
      const degreeYearMap = {
        'degree1': 'year1',
        'degree2': 'year2', 
        'degree3': 'year3',
        'degree4': 'year4'
      };
      const mappedYear = degreeYearMap[year] || year;
      baseCourses = programsStructure[program]?.degree?.[mappedYear]?.[semester] || [];
    }

    if (!baseCourses || baseCourses.length === 0) {
      return [];
    }

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const timeSlots = ['08:00 - 10:00', '10:30 - 12:30', '14:00 - 16:00'];
    
    const lecturers = [
      'Dr. Smith', 'Prof. Johnson', 'Dr. Brown', 'Prof. Davis', 'Dr. Wilson',
      'Prof. Taylor', 'Dr. Anderson', 'Prof. Martinez', 'Dr. Thomas', 'Prof. Garcia'
    ];
    
    const rooms = ['Lab 101', 'Room 201', 'Lab 102', 'Room 301', 'Lab 103', 'Room 202', 'Lab 104', 'Room 302', 'Lab 105', 'Room 203'];

    const timetable = [];
    
    days.forEach(day => {
      timeSlots.forEach(timeSlot => {
        const courseIndex = (day.charCodeAt(0) + timeSlot.length + week) % baseCourses.length;
        const lecturerIndex = (day.length + timeSlot.length + week) % lecturers.length;
        const roomIndex = (day.charCodeAt(0) + timeSlot.length + week) % rooms.length;
        
        timetable.push({
          day,
          time: timeSlot,
          course: baseCourses[courseIndex],
          lecturer: lecturers[lecturerIndex],
          room: rooms[roomIndex],
          week: week,
          program: program,
          level: level
        });
      });
    });

    return timetable;
  };

  const weeks = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = ['08:00 - 10:00', '10:30 - 12:30', '14:00 - 16:00'];

  const getCurrentCourses = () => {
    if (selectedYear === 'certificate') {
      return programsStructure[selectedProgram]?.certificate?.[selectedSemester] || [];
    } else if (selectedYear.includes('year')) {
      if (selectedYear === 'year1' || selectedYear === 'year2' || selectedYear === 'year3') {
        return programsStructure[selectedProgram]?.diploma?.[selectedYear]?.[selectedSemester] || [];
      } else {
        const degreeYearMap = {
          'degree1': 'year1',
          'degree2': 'year2', 
          'degree3': 'year3',
          'degree4': 'year4'
        };
        const mappedYear = degreeYearMap[selectedYear] || selectedYear;
        return programsStructure[selectedProgram]?.degree?.[mappedYear]?.[selectedSemester] || [];
      }
    }
    return [];
  };

  const currentCourses = getCurrentCourses();
  
  const getLevel = () => {
    if (selectedYear === 'certificate') return 'certificate';
    if (selectedYear === 'year1' || selectedYear === 'year2' || selectedYear === 'year3') return 'diploma';
    return 'degree';
  };

  const currentTimetable = generateTimetableData(
    selectedProgram, 
    getLevel(),
    selectedYear, 
    selectedSemester, 
    currentWeek
  );

  const getAvailableYears = () => {
    if (selectedProgram === 'IT' || selectedProgram === 'BIT' || selectedProgram === 'SoftwareEngineering') {
      return [
        { value: 'certificate', label: 'Certificate' },
        { value: 'year1', label: 'Diploma Year 1' },
        { value: 'year2', label: 'Diploma Year 2' },
        { value: 'year3', label: 'Diploma Year 3' },
        { value: 'degree1', label: 'Degree Year 1' },
        { value: 'degree2', label: 'Degree Year 2' },
        { value: 'degree3', label: 'Degree Year 3' },
        { value: 'degree4', label: 'Degree Year 4' }
      ];
    }
    return [];
  };

  return (
    <div className="student-portal">
      {/* Top Navigation Bar */}
      <div className="top-nav">
        <div className="nav-header">
          <h2>Student Portal - {user?.name}</h2>
          <div className="user-info">
            <div className="student-details">
              <span>ID: {user?.id}</span>
              <span>Program: {selectedProgram}</span>
              <span>Level: {selectedYear === 'certificate' ? 'Certificate' : 
                        selectedYear.includes('degree') ? 'Degree' : 'Diploma'}</span>
              <span>Semester: {selectedSemester.replace('semester', 'Semester ')}</span>
            </div>
          </div>
        </div>
        <nav className="top-nav-menu">
          {['monitoring', 'ratings', 'challenges'].map(tab => (
            <button
              key={tab}
              className={`nav-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
          <button className="logout-btn" onClick={onLogout}>Logout</button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-body">
          {activeTab === 'monitoring' && (
            <div>
              <div className="section-header">
                <h2>Academic Monitoring</h2>
                <p>View your timetable and academic schedule</p>
              </div>

              <div className="timetable-controls">
                <div className="control-group">
                  <label>Program:</label>
                  <select 
                    value={selectedProgram} 
                    onChange={(e) => setSelectedProgram(e.target.value)}
                    className="form-control"
                  >
                    <option value="IT">Information Technology (IT)</option>
                    <option value="BIT">Business Information Technology (BIT)</option>
                    <option value="SoftwareEngineering">Software Engineering</option>
                  </select>
                </div>
                
                <div className="control-group">
                  <label>Academic Level:</label>
                  <select 
                    value={selectedYear} 
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="form-control"
                  >
                    {getAvailableYears().map(year => (
                      <option key={year.value} value={year.value}>{year.label}</option>
                    ))}
                  </select>
                </div>
                
                <div className="control-group">
                  <label>Semester:</label>
                  <select 
                    value={selectedSemester} 
                    onChange={(e) => setSelectedSemester(e.target.value)}
                    className="form-control"
                  >
                    <option value="semester1">Semester 1</option>
                    <option value="semester2">Semester 2</option>
                  </select>
                </div>
                
                <div className="control-group">
                  <label>Week:</label>
                  <select 
                    value={currentWeek} 
                    onChange={(e) => setCurrentWeek(parseInt(e.target.value))}
                    className="form-control"
                  >
                    {weeks.map(week => (
                      <option key={week} value={week}>Week {week}</option>
                    ))}
                  </select>
                </div>
              </div>

              <h3>Timetable - Week {currentWeek}</h3>
              <div className="timetable-container">
                <div className="timetable">
                  <div className="timetable-header">
                    <div className="time-slot">Time</div>
                    {days.map(day => (
                      <div key={day} className="day-header">{day}</div>
                    ))}
                  </div>
                  <div className="timetable-body">
                    {timeSlots.map(timeSlot => (
                      <div key={timeSlot} className="time-row">
                        <div className="time-label">{timeSlot}</div>
                        {days.map(day => {
                          const classInfo = currentTimetable.find(
                            item => item.day === day && item.time === timeSlot
                          );
                          return (
                            <div key={`${day}-${timeSlot}`} className="class-slot">
                              {classInfo ? (
                                <div className="class-info">
                                  <div className="course-name">{classInfo.course}</div>
                                  <div className="lecturer">{classInfo.lecturer}</div>
                                  <div className="room">{classInfo.room}</div>
                                </div>
                              ) : (
                                <div className="no-class">No Class</div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ratings' && (
            <div className="rating-page">
              <div className="section-header">
                <h2>Rate Your Lecturer</h2>
                <p>Provide feedback on your lecturers and courses</p>
              </div>
              <form onSubmit={handleSubmitRating} className="rating-form">
                <div className="form-group">
                  <label>Lecturer's Name:</label>
                  <input
                    type="text"
                    className="form-control large-input"
                    value={lecturerName}
                    onChange={(e) => setLecturerName(e.target.value)}
                    placeholder="Enter lecturer's name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Course/Module Name:</label>
                  <input
                    type="text"
                    className="form-control large-input"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    placeholder="Enter course or module name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Rate the lectures here!</label>
                  <div className="rating-options">
                    {ratingOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        className={`rating-option ${rating === option.value ? 'active' : ''}`}
                        onClick={() => setRating(option.value)}
                        style={{ '--option-color': option.color }}
                      >
                        <span className="rating-icon"></span>
                        <span className="rating-label">{option.label}</span>
                      </button>
                    ))}
                  </div>
                  <div className="rating-value">
                    {rating && `Selected: ${ratingOptions.find(opt => opt.value === rating)?.label}`}
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  className="submit-btn large-btn" 
                  disabled={!rating || !lecturerName || !courseName}
                >
                  Submit Rating
                </button>
              </form>
            </div>
          )}

          {activeTab === 'challenges' && (
            <div className="challenge-page">
              <div className="section-header">
                <h2>Report Challenges</h2>
                <p>Report any academic challenges you're facing</p>
              </div>
              <form onSubmit={handleSubmitChallenge} className="challenge-form">
                <div className="form-group">
                  <label>Describe your challenge:</label>
                  <textarea 
                    className="form-control large-textarea"
                    value={challenge}
                    onChange={(e) => setChallenge(e.target.value)}
                    placeholder="Describe any challenges you're facing with the module or lecturer..."
                    required
                    rows="8"
                  />
                </div>
                <button type="submit" className="submit-btn large-btn">Submit Challenge</button>
              </form>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .student-portal {
          min-height: 100vh;
          background-color: #f5f6fa;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        /* Top Navigation Styles */
        .top-nav {
          background: white;
          border-bottom: 1px solid #e2e8f0;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .nav-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          border-bottom: 1px solid #e2e8f0;
        }

        .nav-header h2 {
          margin: 0;
          color: #1a202c;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .student-details {
          display: flex;
          gap: 1.5rem;
          font-size: 0.875rem;
          color: #718096;
        }

        .student-details span {
          padding: 0.25rem 0.75rem;
          background: #f7fafc;
          border-radius: 6px;
          border: 1px solid #e2e8f0;
        }

        .top-nav-menu {
          display: flex;
          padding: 0 2rem;
          background: #f7fafc;
          border-bottom: 1px solid #e2e8f0;
        }

        .nav-btn {
          padding: 1rem 1.5rem;
          background: none;
          border: none;
          color: #4a5568;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.95rem;
          border-bottom: 3px solid transparent;
          white-space: nowrap;
        }

        .nav-btn:hover {
          background: #edf2f7;
          color: #2d3748;
        }

        .nav-btn.active {
          background: #667eea;
          color: white;
          border-bottom-color: #10b981;
        }

        .logout-btn {
          margin-left: auto;
          padding: 1rem 1.5rem;
          background: #e53e3e;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: background 0.3s ease;
          margin: 0.5rem;
        }

        .logout-btn:hover {
          background: #c53030;
        }

        /* Main Content Styles */
        .main-content {
          flex: 1;
        }

        .content-body {
          padding: 2rem;
          overflow-y: auto;
        }

        .section-header {
          margin-bottom: 2rem;
        }

        .section-header h2 {
          margin: 0 0 0.5rem 0;
          color: #1a202c;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .section-header p {
          color: #718096;
          margin: 0;
        }

        .timetable-controls {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin: 2rem 0;
          padding: 1.5rem;
          background: white;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .control-group {
          display: flex;
          flex-direction: column;
        }

        .control-group label {
          margin-bottom: 0.5rem;
          color: #4a5568;
          font-weight: 600;
          font-size: 0.875rem;
        }

        .form-control {
          padding: 0.75rem;
          border: 1px solid #cbd5e0;
          border-radius: 8px;
          font-size: 0.875rem;
          transition: border-color 0.3s ease;
        }

        .form-control:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .large-input {
          padding: 1rem;
          font-size: 1rem;
        }

        .large-textarea {
          padding: 1rem;
          font-size: 1rem;
          min-height: 200px;
          resize: vertical;
        }

        .timetable-container {
          overflow-x: auto;
          margin-top: 1.5rem;
        }

        .timetable {
          display: grid;
          grid-template-columns: 120px repeat(5, 1fr);
          gap: 1px;
          background: #e9ecef;
          border-radius: 10px;
          overflow: hidden;
          min-width: 800px;
        }

        .timetable-header {
          display: contents;
        }

        .time-slot, .day-header {
          background: #2c3e50;
          color: white;
          padding: 1rem;
          text-align: center;
          font-weight: 600;
        }

        .timetable-body {
          display: contents;
        }

        .time-row {
          display: contents;
        }

        .time-label {
          background: #34495e;
          color: white;
          padding: 1rem;
          text-align: center;
          font-weight: 600;
        }

        .class-slot {
          background: white;
          padding: 0.75rem;
          min-height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .class-info {
          text-align: center;
          width: 100%;
        }

        .course-name {
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 0.25rem;
          font-size: 0.9em;
        }

        .lecturer, .room {
          font-size: 0.8em;
          color: #7f8c8d;
          margin-bottom: 0.125rem;
        }

        .no-class {
          color: #bdc3c7;
          font-style: italic;
        }

        .rating-page, .challenge-page {
          max-width: 800px;
          margin: 0 auto;
        }

        .rating-form, .challenge-form {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          border: 1px solid #e2e8f0;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #2d3748;
          font-size: 0.875rem;
        }

        .rating-options {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 1rem;
          margin-top: 0.75rem;
        }

        .rating-option {
          padding: 1.5rem 1rem;
          border: 2px solid #e2e8f0;
          background: white;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }

        .rating-option:hover {
          border-color: #667eea;
          transform: translateY(-2px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .rating-option.active {
          border-color: #667eea;
          background: #edf2f7;
          transform: translateY(-1px);
        }

        .rating-icon {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #667eea;
        }

        .rating-label {
          font-weight: 600;
          color: #2d3748;
        }

        .rating-value {
          margin-top: 1rem;
          font-weight: 600;
          color: #2d3748;
          text-align: center;
          padding: 0.75rem;
          background: #f0fff4;
          border-radius: 6px;
          border: 1px solid #c6f6d5;
        }

        .submit-btn {
          background: #667eea;
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 8px;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s;
          width: 100%;
          font-weight: 600;
        }

        .large-btn {
          padding: 1.25rem 2rem;
          font-size: 1.1rem;
        }

        .submit-btn:hover:not(:disabled) {
          background: #5a6fd8;
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .content-body {
            padding: 1rem;
          }
          
          .nav-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          
          .student-details {
            flex-direction: column;
            gap: 0.5rem;
            width: 100%;
          }
          
          .student-details span {
            width: 100%;
            text-align: center;
          }
          
          .top-nav-menu {
            flex-wrap: wrap;
            padding: 0 1rem;
          }
          
          .nav-btn {
            padding: 0.75rem 1rem;
            font-size: 0.875rem;
          }
          
          .timetable-controls {
            grid-template-columns: 1fr;
          }
          
          .rating-options {
            grid-template-columns: 1fr;
          }
          
          .rating-form, .challenge-form {
            padding: 1.5rem;
          }
          
          .large-btn {
            padding: 1rem 1.5rem;
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          .top-nav-menu {
            flex-direction: column;
          }
          
          .logout-btn {
            margin-left: 0;
            margin-top: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Student;