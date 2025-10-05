import React, { useState } from 'react';

const ProgramLeader = ({ onLogout, setCurrentView }) => {
  const [activeTab, setActiveTab] = useState('monitoring');
  const [selectedProgram, setSelectedProgram] = useState('IT');
  const [selectedYear, setSelectedYear] = useState('certificate');
  const [selectedSemester, setSelectedSemester] = useState('semester1');
  const [currentWeek, setCurrentWeek] = useState(1);
  
  // Course assignment state
  const [programName, setProgramName] = useState('IT');
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [lecturerName, setLecturerName] = useState('');
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [selectedTime, setSelectedTime] = useState('08:00 - 10:00');

  // State to store assigned courses
  const [assignedCourses, setAssignedCourses] = useState([]);

  // State for compile reports
  const [reportType, setReportType] = useState('attendance');
  const [selectedReportProgram, setSelectedReportProgram] = useState('IT');
  const [selectedReportPeriod, setSelectedReportPeriod] = useState('weekly');
  const [generatedReports, setGeneratedReports] = useState([]);

  // Feedback/Principal Reports State
  const [principalReports, setPrincipalReports] = useState([
    {
      id: 1,
      title: 'Program Performance Review - Q1 2024',
      priority: 'high',
      from: 'Principal Office',
      date: '2024-01-20',
      dueDate: '2024-01-27',
      subject: 'IT Program Performance Analysis - Semester 1 2024',
      keyConcerns: [
        'Attendance rate dropped by 8% compared to previous semester',
        'Student performance in advanced programming courses below expectations',
        'Industry feedback suggests need for updated curriculum in web technologies'
      ],
      actionRequired: 'Please provide detailed response addressing these concerns and proposed improvement plan.',
      response: '',
      status: 'pending',
      responseDate: ''
    },
    {
      id: 2,
      title: 'Resource Allocation Review',
      priority: 'medium',
      from: 'Academic Committee',
      date: '2024-01-18',
      dueDate: '2024-02-01',
      subject: 'IT Department Resource Utilization and Requirements',
      keyPoints: [
        'Review current laboratory equipment utilization rates',
        'Assess software licensing needs for next academic year',
        'Provide justification for additional teaching staff requests'
      ],
      actionRequired: 'Submit detailed resource assessment and requirements proposal.',
      response: '',
      status: 'pending',
      responseDate: ''
    },
    {
      id: 3,
      title: 'Industry Partnership Proposal',
      priority: 'high',
      from: 'Industry Relations Office',
      date: '2024-01-15',
      dueDate: '2024-01-25',
      subject: 'New Industry Partnership Opportunities for IT Program',
      opportunities: [
        'TechCorp Inc. offering internship placements for 20 students',
        'SoftSolutions Ltd. proposing joint curriculum development',
        'DataSystems Co. interested in research collaboration'
      ],
      actionRequired: 'Evaluate opportunities and provide recommendations for partnership prioritization.',
      response: '',
      status: 'pending',
      responseDate: ''
    }
  ]);

  const [responseHistory, setResponseHistory] = useState([
    {
      id: 101,
      title: 'Curriculum Update Proposal',
      originalReport: 'Academic Committee - Curriculum Review 2024',
      response: 'Proposed updated curriculum includes new courses in AI and Cloud Computing. Recommended implementation timeline: Semester 2 2024.',
      submittedDate: '2024-01-10',
      responseTime: '3 days',
      status: 'submitted'
    },
    {
      id: 102,
      title: 'Staff Development Plan',
      originalReport: 'HR Department - Professional Development Requirements',
      response: 'Submitted comprehensive staff development plan focusing on emerging technologies training and teaching methodology workshops.',
      submittedDate: '2024-01-05',
      status: 'approved',
      modifications: 'Approved with modifications'
    }
  ]);

  const [draftResponses, setDraftResponses] = useState({});

  // Programs structure
  const programsStructure = {
    IT: {
      certificate: {
        semester1: ['Introduction to IT', 'Computer Fundamentals', 'Basic Programming', 'Communication Skills', 'Mathematics for IT'],
        semester2: ['Web Development Basics', 'Database Fundamentals', 'Networking Essentials', 'Office Applications', 'IT Project Management']
      },
      diploma: {
        year1: {
          semester1: ['Programming Principles', 'Web Technologies', 'Database Systems', 'Computer Hardware', 'Business Communication'],
          semester2: ['Object-Oriented Programming', 'Network Administration', 'System Analysis', 'Web Application Development', 'Professional Ethics']
        },
        year2: {
          semester1: ['Advanced Programming', 'Database Management', 'Network Security', 'Mobile Development', 'Project Management'],
          semester2: ['Software Engineering', 'Cloud Computing', 'Cyber Security Fundamentals', 'IT Infrastructure', 'Industrial Attachment']
        },
        year3: {
          semester1: ['Enterprise Systems Development', 'Advanced Network Security', 'Cloud Infrastructure', 'IT Project Leadership', 'Emerging Technologies'],
          semester2: ['Advanced Software Engineering', 'Data Center Management', 'IT Governance & Compliance', 'Strategic IT Planning', 'Capstone Project']
        }
      },
      degree: {
        year1: {
          semester1: ['Advanced Programming Concepts', 'Data Structures & Algorithms', 'Web Application Architecture', 'Database Design & Implementation', 'Discrete Mathematics'],
          semester2: ['Object-Oriented Analysis & Design', 'Network Programming', 'Software Development Methodologies', 'Human-Computer Interaction', 'Statistics for Computing']
        },
        year2: {
          semester1: ['Advanced Database Systems', 'Mobile Application Development', 'Network Security', 'Artificial Intelligence Fundamentals', 'Research Methods'],
          semester2: ['Enterprise Systems Development', 'Cloud Computing Architecture', 'Cyber Security Management', 'Data Analytics', 'Professional Practice']
        },
        year3: {
          semester1: ['Advanced Software Engineering', 'Big Data Technologies', 'Internet of Things', 'Project Management', 'Elective Course I'],
          semester2: ['Machine Learning Applications', 'Cloud Native Development', 'Cyber Security Advanced', 'IT Strategy & Innovation', 'Elective Course II']
        },
        year4: {
          semester1: ['Advanced AI Systems', 'Blockchain Technology', 'Digital Transformation', 'Research Project I', 'Professional Elective'],
          semester2: ['Capstone Project', 'Industry Placement', 'Emerging Technologies', 'Research Project II', 'Leadership in IT']
        }
      }
    },
    BIT: {
      certificate: {
        semester1: ['Business IT Fundamentals', 'Computer Applications', 'Business Communication', 'Accounting Basics', 'Mathematics for Business'],
        semester2: ['Database Management', 'E-Commerce Fundamentals', 'Business Software', 'Marketing Principles', 'Financial Literacy']
      },
      diploma: {
        year1: {
          semester1: ['Business Information Systems', 'Programming for Business', 'Database Design', 'Business Mathematics', 'Communication Skills'],
          semester2: ['Web Technologies for Business', 'Network Fundamentals', 'System Analysis & Design', 'Business Statistics', 'Professional Development']
        },
        year2: {
          semester1: ['Enterprise Systems', 'Business Intelligence', 'Database Administration', 'Project Management', 'Business Law'],
          semester2: ['E-Business Strategies', 'Data Analytics for Business', 'IT Service Management', 'Strategic Management', 'Industrial Attachment']
        },
        year3: {
          semester1: ['Advanced Business Analytics', 'Digital Marketing Technologies', 'Enterprise Architecture', 'Business Process Management', 'Innovation Management'],
          semester2: ['Strategic IT Management', 'Business Intelligence Systems', 'Digital Transformation', 'Capstone Project', 'Professional Practice']
        }
      },
      degree: {
        year1: {
          semester1: ['Business Information Technology', 'Programming Fundamentals', 'Database Systems', 'Business Mathematics', 'Academic Writing'],
          semester2: ['Web Application Development', 'Network Infrastructure', 'System Analysis & Design', 'Business Statistics', 'Professional Communication']
        },
        year2: {
          semester1: ['Enterprise Architecture', 'Business Intelligence Systems', 'Database Management', 'Project Management', 'Business Law & Ethics'],
          semester2: ['E-Business Solutions', 'Data Analytics', 'IT Governance', 'Strategic Management', 'Research Methodology']
        },
        year3: {
          semester1: ['Advanced Business Systems', 'Cloud Computing for Business', 'Cyber Security Management', 'Innovation & Entrepreneurship', 'Elective Course I'],
          semester2: ['Digital Business Transformation', 'Advanced Data Analytics', 'IT Service Management', 'Business Process Reengineering', 'Elective Course II']
        },
        year4: {
          semester1: ['Strategic IT Leadership', 'Advanced Enterprise Systems', 'Business Research Methods', 'Digital Innovation', 'Professional Elective'],
          semester2: ['Capstone Project', 'Industry Internship', 'Strategic Business Technology', 'Research Project', 'Leadership in Digital Business']
        }
      }
    }
  };

  // Get all courses for assignment form
  const getAllCoursesForProgram = (program) => {
    const allCourses = [];
    if (programsStructure[program]?.certificate) {
      Object.values(programsStructure[program].certificate).forEach(semesterCourses => {
        allCourses.push(...semesterCourses);
      });
    }
    if (programsStructure[program]?.diploma) {
      Object.values(programsStructure[program].diploma).forEach(year => {
        Object.values(year).forEach(semesterCourses => {
          allCourses.push(...semesterCourses);
        });
      });
    }
    if (programsStructure[program]?.degree) {
      Object.values(programsStructure[program].degree).forEach(year => {
        Object.values(year).forEach(semesterCourses => {
          allCourses.push(...semesterCourses);
        });
      });
    }
    return [...new Set(allCourses)];
  };

  const allCourses = getAllCoursesForProgram(programName);

  // Lecturers list
  const lecturers = [
    'Mr. Molao', 'Mr.Makheka', 'Mr. Thokoane', 'Mr. Matjele', 'Mr. Mofolo',
    'Mrs. Ebisoh', 'Ms. Mmapalesa', 'Mrs. Mathe', 'Mrs. Mmamokete', 'Mr. Bilah'
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = ['08:00 - 10:00', '10:30 - 12:30', '14:00 - 16:00'];
  const weeks = Array.from({ length: 12 }, (_, i) => i + 1);

  // Course assignment handler
  const handleAssignCourse = (e) => {
    e.preventDefault();
    if (programName && courseName && courseCode && lecturerName && selectedDay && selectedTime) {
      const newAssignment = {
        id: Date.now(),
        program: programName,
        course: courseName,
        code: courseCode,
        lecturer: lecturerName,
        day: selectedDay,
        time: selectedTime,
        week: currentWeek,
        semester: selectedSemester,
        year: selectedYear
      };
      
      setAssignedCourses(prev => [...prev, newAssignment]);
      setCourseName('');
      setCourseCode('');
      setLecturerName('');
      
      alert(`Course assigned successfully!\n\nProgram: ${programName}\nCourse: ${courseName}\nLecturer: ${lecturerName}\nTime: ${selectedDay} ${selectedTime}`);
    } else {
      alert('Please fill in all fields to assign a course.');
    }
  };

  // Generate course code
  const generateCourseCode = (program, course) => {
    const programCode = program.substring(0, 3).toUpperCase();
    const courseCode = course.split(' ').map(word => word[0]).join('').toUpperCase();
    return `${programCode}-${courseCode}-${Math.floor(Math.random() * 1000)}`;
  };

  const handleCourseNameChange = (e) => {
    const course = e.target.value;
    setCourseName(course);
    if (course && programName) {
      setCourseCode(generateCourseCode(programName, course));
    }
  };

  // Remove assigned course
  const handleRemoveAssignment = (assignmentId) => {
    setAssignedCourses(prev => prev.filter(assignment => assignment.id !== assignmentId));
  };

  // Generate timetable data
  const generateTimetableData = () => {
    const timetable = [];
    days.forEach(day => {
      timeSlots.forEach(timeSlot => {
        const assignedCourse = assignedCourses.find(
          assignment => 
            assignment.day === day && 
            assignment.time === timeSlot &&
            assignment.week === currentWeek &&
            assignment.program === selectedProgram
        );

        if (assignedCourse) {
          timetable.push({
            day,
            time: timeSlot,
            course: assignedCourse.course,
            lecturer: assignedCourse.lecturer,
            room: 'Assigned',
            week: currentWeek,
            program: selectedProgram,
            isAssigned: true,
            id: assignedCourse.id
          });
        } else {
          timetable.push({
            day,
            time: timeSlot,
            course: 'No Class',
            lecturer: '',
            room: '',
            week: currentWeek,
            program: selectedProgram,
            isAssigned: false
          });
        }
      });
    });
    return timetable;
  };

  const currentTimetable = generateTimetableData();

  const getAvailableYears = () => {
    if (selectedProgram === 'IT' || selectedProgram === 'BIT') {
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

  // Report compilation
  const handleCompileReport = () => {
    const reportId = Date.now();
    
    const generateDetailedData = () => {
      const baseData = {
        program: selectedReportProgram,
        period: selectedReportPeriod,
        compiledDate: new Date().toLocaleDateString(),
        summary: `Comprehensive ${reportType} analysis for ${selectedReportProgram} program`,
        keyMetrics: {},
        detailedAnalysis: [],
        recommendations: []
      };

      switch(reportType) {
        case 'attendance':
          baseData.keyMetrics = {
            overallAttendance: '87%',
            averageDailyAttendance: '85%',
            bestPerformingCourse: 'Web Development Basics',
            lowestAttendanceCourse: 'Database Fundamentals',
            totalStudents: 145
          };
          baseData.detailedAnalysis = [
            'Attendance rates improved by 5% this period',
            'Morning sessions show higher attendance',
            'Practical courses maintain 92% average attendance'
          ];
          baseData.recommendations = [
            'Implement attendance monitoring system',
            'Provide incentives for consistent attendance'
          ];
          break;

        case 'performance':
          baseData.keyMetrics = {
            averageGrade: 'B+',
            passRate: '94%',
            distinctionRate: '18%',
            improvementRate: '+12%',
            topPerformer: 'Student ID: S12345'
          };
          baseData.detailedAnalysis = [
            'Overall performance shows significant improvement',
            'Theoretical knowledge application needs enhancement',
            'Group projects demonstrate excellent collaborative skills'
          ];
          baseData.recommendations = [
            'Implement additional tutoring for struggling students',
            'Enhance practical application components'
          ];
          break;

        case 'course':
          baseData.keyMetrics = {
            completionRate: '89%',
            averageSatisfaction: '4.2/5.0',
            resourceUtilization: '76%',
            assignmentSubmission: '92%'
          };
          baseData.detailedAnalysis = [
            'Course materials are well-received by students',
            'Practical components show highest engagement rates',
            'Assessment methods effectively measure learning outcomes'
          ];
          baseData.recommendations = [
            'Update course materials with latest industry trends',
            'Increase interactive learning components'
          ];
          break;

        case 'lecturer':
          baseData.keyMetrics = {
            averageRating: '4.5/5.0',
            studentSatisfaction: '92%',
            courseCompletion: '95%',
            feedbackResponse: '88%'
          };
          baseData.detailedAnalysis = [
            'Lecturers demonstrate strong subject matter expertise',
            'Teaching methodologies effectively engage students',
            'Communication skills rated highly by students'
          ];
          baseData.recommendations = [
            'Provide professional development opportunities',
            'Implement peer review system'
          ];
          break;

        case 'program':
          baseData.keyMetrics = {
            overallProgress: '87%',
            studentRetention: '91%',
            employmentRate: '78%',
            industrySatisfaction: '4.4/5.0'
          };
          baseData.detailedAnalysis = [
            'Program meets industry standards and requirements',
            'Student satisfaction rates continue to improve',
            'Graduate employment rates show positive trend'
          ];
          baseData.recommendations = [
            'Continue industry partnership development',
            'Enhance career preparation components'
          ];
          break;

        default:
          break;
      }

      return baseData;
    };

    const detailedData = generateDetailedData();
    
    const newReport = {
      id: reportId,
      type: reportType,
      program: selectedReportProgram,
      period: selectedReportPeriod,
      date: new Date().toLocaleDateString(),
      status: 'Compiled',
      data: detailedData
    };
    
    setGeneratedReports(prev => [newReport, ...prev]);
    alert(`Report compiled successfully!\n\nType: ${reportType}\nProgram: ${selectedReportProgram}\nPeriod: ${selectedReportPeriod}`);
  };

  // Download Excel report
  const downloadExcelReport = (report) => {
    const data = report.data;
    const excelContent = `
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta name=ProgId content=Excel.Sheet>
<meta name=Generator content="Microsoft Excel 11">
<style>
td {padding:5px; border:1px solid #ccc;}
th {padding:8px; border:1px solid #ccc; background:#f0f0f0; font-weight:bold;}
</style>
</head>
<body>
<table>
  <tr><th colspan="2" style="background:#3498db; color:white; font-size:16px;">${report.type.toUpperCase()} REPORT</th></tr>
  <tr><td colspan="2"><strong>Program:</strong> ${report.program} | <strong>Period:</strong> ${report.period}</td></tr>
  <tr><td colspan="2"><strong>Summary:</strong> ${data.summary}</td></tr>
  
  <tr><th colspan="2" style="background:#2c3e50; color:white;">KEY METRICS</th></tr>
  ${Object.entries(data.keyMetrics).map(([key, value]) => 
    `<tr><td><strong>${key.replace(/([A-Z])/g, ' $1').toUpperCase()}</strong></td><td>${value}</td></tr>`
  ).join('')}
  
  <tr><th colspan="2" style="background:#2c3e50; color:white;">DETAILED ANALYSIS</th></tr>
  ${data.detailedAnalysis.map((analysis, index) => 
    `<tr><td>${index + 1}.</td><td>${analysis}</td></tr>`
  ).join('')}
  
  <tr><th colspan="2" style="background:#2c3e50; color:white;">RECOMMENDATIONS</th></tr>
  ${data.recommendations.map((recommendation, index) => 
    `<tr><td>${index + 1}.</td><td>${recommendation}</td></tr>`
  ).join('')}
</table>
</body>
</html>`;

    const blob = new Blob([excelContent], { type: 'application/vnd.ms-excel' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${report.type}_${report.program}_${report.date.replace(/\//g, '-')}.xls`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    alert(`Excel report downloaded: ${link.download}`);
  };

  // Download all reports
  const downloadAllReports = () => {
    if (generatedReports.length === 0) {
      alert('No reports available to download.');
      return;
    }

    const combinedContent = generatedReports.map((report, index) => `
      <div style="margin-bottom: 30px;">
        <h3>Report ${index + 1}: ${report.type} - ${report.program}</h3>
        <p><strong>Date:</strong> ${report.date} | <strong>Period:</strong> ${report.period}</p>
        <p><strong>Summary:</strong> ${report.data.summary}</p>
      </div>
    `).join('');

    const fullContent = `
<html>
<head>
<title>All Program Reports</title>
</head>
<body>
<h1>COMPREHENSIVE PROGRAM REPORTS</h1>
<p>Generated on: ${new Date().toLocaleDateString()}</p>
${combinedContent}
</body>
</html>`;

    const blob = new Blob([fullContent], { type: 'application/vnd.ms-excel' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `All_Reports_${new Date().toLocaleDateString().replace(/\//g, '-')}.xls`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    alert(`All ${generatedReports.length} reports downloaded successfully!`);
  };

  // Feedback/Principal Reports Functions
  const handleResponseChange = (reportId, response) => {
    setPrincipalReports(prev => 
      prev.map(report => 
        report.id === reportId ? { ...report, response } : report
      )
    );
  };

  const handleSubmitResponse = (reportId) => {
    const report = principalReports.find(r => r.id === reportId);
    if (!report || !report.response.trim()) {
      alert('Please write a response before submitting.');
      return;
    }

    const newHistoryItem = {
      id: Date.now(),
      title: report.title,
      originalReport: `${report.from} - ${report.subject}`,
      response: report.response,
      submittedDate: new Date().toISOString().split('T')[0],
      status: 'submitted'
    };

    setResponseHistory(prev => [newHistoryItem, ...prev]);
    
    setPrincipalReports(prev => 
      prev.map(r => 
        r.id === reportId 
          ? { ...r, status: 'submitted', responseDate: new Date().toISOString().split('T')[0] }
          : r
      )
    );

    alert('Response submitted successfully to the Principal!');
  };

  const handleSaveDraft = (reportId) => {
    const report = principalReports.find(r => r.id === reportId);
    if (report && report.response.trim()) {
      setDraftResponses(prev => ({
        ...prev,
        [reportId]: report.response
      }));
      alert('Draft saved successfully!');
    } else {
      alert('Please write a response before saving as draft.');
    }
  };

  const handleRequestExtension = (reportId) => {
    const report = principalReports.find(r => r.id === reportId);
    if (report) {
      alert(`Extension requested for: ${report.title}\n\nThe Principal will be notified of your request.`);
    }
  };

  const handleRequestMeeting = (reportId) => {
    const report = principalReports.find(r => r.id === reportId);
    if (report) {
      alert(`Meeting requested regarding: ${report.title}\n\nThe Principal's office will contact you to schedule a meeting.`);
    }
  };

  // Calculate response statistics
  const responseStats = {
    averageResponseTime: '2.3 days',
    responseRate: `${Math.round((responseHistory.length / (responseHistory.length + principalReports.filter(r => r.status === 'pending').length)) * 100)}%`,
    approvalRate: '87%',
    pendingResponses: principalReports.filter(r => r.status === 'pending').length
  };

  return (
    <div className="program-leader">
      {/* Top Navigation Bar */}
      <div className="top-nav">
        <div className="nav-brand">
          <h2>Program Leader Dashboard</h2>
        </div>
        <div className="nav-menu">
          {['monitoring', 'assignCourses', 'compileReports', 'feedback'].map(tab => (
            <button
              key={tab}
              className={`nav-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </button>
          ))}
        </div>
        <div className="nav-actions">
          <button className="logout-btn" onClick={onLogout}>Logout</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-body">
          {/* Monitoring Dashboard */}
          {activeTab === 'monitoring' && (
            <div className="dashboard">
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>Program Overview</h3>
                  <div className="stat-content">
                    <p>Active Programs: <strong>3</strong></p>
                    <p>Total Courses: <strong>{allCourses.length}</strong></p>
                    <p>Assigned Courses: <strong>{assignedCourses.length}</strong></p>
                    <p>Available Lecturers: <strong>{lecturers.length}</strong></p>
                  </div>
                </div>
                <div className="stat-card">
                  <h3>Recent Activity</h3>
                  <div className="stat-content">
                    <p>• Course assignments: <strong>5</strong></p>
                    <p>• Reports compiled: <strong>{generatedReports.length}</strong></p>
                    <p>• Feedback received: <strong>12</strong></p>
                    <p>• System: <strong className="status-active">Operational</strong></p>
                  </div>
                </div>
                <div className="stat-card">
                  <h3>Quick Actions</h3>
                  <div className="action-buttons">
                    <button onClick={() => setActiveTab('assignCourses')}>Assign Course</button>
                    <button onClick={() => setActiveTab('compileReports')}>Compile Reports</button>
                    <button onClick={() => setActiveTab('feedback')}>View Feedback</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Course Assignment */}
          {activeTab === 'assignCourses' && (
            <div className="assignment-section">
              <div className="section-header">
                <h2>Course Assignment</h2>
                <p>Assign courses to lecturers and manage timetables</p>
              </div>

              <div className="assignment-form-card">
                <h3>Assign New Course</h3>
                <form onSubmit={handleAssignCourse} className="form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Program Name</label>
                      <select value={programName} onChange={(e) => setProgramName(e.target.value)} required>
                        <option value="IT">Information Technology (IT)</option>
                        <option value="BIT">Business Information Technology (BIT)</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Course Name</label>
                      <select value={courseName} onChange={handleCourseNameChange} required>
                        <option value="">Select a course</option>
                        {allCourses.map((course, index) => (
                          <option key={index} value={course}>{course}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Course Code</label>
                      <input type="text" value={courseCode} readOnly placeholder="Auto-generated" />
                    </div>
                    <div className="form-group">
                      <label>Lecturer Name</label>
                      <select value={lecturerName} onChange={(e) => setLecturerName(e.target.value)} required>
                        <option value="">Select a lecturer</option>
                        {lecturers.map((lecturer, index) => (
                          <option key={index} value={lecturer}>{lecturer}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Day</label>
                      <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)} required>
                        {days.map(day => (
                          <option key={day} value={day}>{day}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Time Slot</label>
                      <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} required>
                        {timeSlots.map(time => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button type="submit" className="submit-btn primary">Assign Course</button>
                </form>
              </div>

              {/* Timetable Controls */}
              <div className="timetable-controls">
                <div className="control-group">
                  <label>Program</label>
                  <select value={selectedProgram} onChange={(e) => setSelectedProgram(e.target.value)}>
                    <option value="IT">IT</option>
                    <option value="BIT">BIT</option>
                  </select>
                </div>
                <div className="control-group">
                  <label>Level</label>
                  <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                    {getAvailableYears().map(year => (
                      <option key={year.value} value={year.value}>{year.label}</option>
                    ))}
                  </select>
                </div>
                <div className="control-group">
                  <label>Semester</label>
                  <select value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)}>
                    <option value="semester1">Semester 1</option>
                    <option value="semester2">Semester 2</option>
                  </select>
                </div>
                <div className="control-group">
                  <label>Week</label>
                  <select value={currentWeek} onChange={(e) => setCurrentWeek(parseInt(e.target.value))}>
                    {weeks.map(week => (
                      <option key={week} value={week}>Week {week}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Timetable */}
              <div className="timetable-section">
                <h3>Timetable - Week {currentWeek}</h3>
                <div className="timetable">
                  <div className="timetable-header">
                    <div className="time-header">Time</div>
                    {days.map(day => (
                      <div key={day} className="day-header">{day}</div>
                    ))}
                  </div>
                  <div className="timetable-body">
                    {timeSlots.map(timeSlot => (
                      <div key={timeSlot} className="time-row">
                        <div className="time-slot">{timeSlot}</div>
                        {days.map(day => {
                          const classInfo = currentTimetable.find(item => item.day === day && item.time === timeSlot);
                          return (
                            <div key={`${day}-${timeSlot}`} className={`class-cell ${classInfo?.isAssigned ? 'assigned' : 'empty'}`}>
                              {classInfo?.isAssigned ? (
                                <div className="class-info">
                                  <div className="course-name">{classInfo.course}</div>
                                  <div className="lecturer-name">{classInfo.lecturer}</div>
                                  <button 
                                    className="remove-btn"
                                    onClick={() => handleRemoveAssignment(classInfo.id)}
                                    title="Remove assignment"
                                  >
                                    ×
                                  </button>
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

              {/* Recent Assignments */}
              {assignedCourses.length > 0 && (
                <div className="recent-assignments">
                  <h3>Recent Assignments</h3>
                  <div className="assignments-grid">
                    {assignedCourses.slice(-5).reverse().map(assignment => (
                      <div key={assignment.id} className="assignment-card">
                        <div className="assignment-details">
                          <strong>{assignment.course}</strong>
                          <div>Code: {assignment.code}</div>
                          <div>Lecturer: {assignment.lecturer}</div>
                          <div>Time: {assignment.day} {assignment.time}</div>
                        </div>
                        <button 
                          className="remove-btn small"
                          onClick={() => handleRemoveAssignment(assignment.id)}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Compile Reports */}
          {activeTab === 'compileReports' && (
            <div className="reports-section">
              <div className="section-header">
                <h2>Compile Reports</h2>
                <p>Generate and download comprehensive program reports</p>
              </div>

              <div className="report-controls-card">
                <h3>Compile New Report</h3>
                <div className="form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Report Type</label>
                      <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
                        <option value="attendance">Attendance Report</option>
                        <option value="performance">Performance Report</option>
                        <option value="course">Course Report</option>
                        <option value="lecturer">Lecturer Report</option>
                        <option value="program">Program Report</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Program</label>
                      <select value={selectedReportProgram} onChange={(e) => setSelectedReportProgram(e.target.value)}>
                        <option value="IT">IT</option>
                        <option value="BIT">BIT</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Reporting Period</label>
                      <select value={selectedReportPeriod} onChange={(e) => setSelectedReportPeriod(e.target.value)}>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="semester">Semester</option>
                        <option value="annual">Annual</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Action</label>
                      <button type="button" className="submit-btn primary" onClick={handleCompileReport}>
                        Compile Report
                      </button>
                    </div>
                  </div>
                </div>

                {generatedReports.length > 0 && (
                  <div className="bulk-download">
                    <button className="submit-btn secondary" onClick={downloadAllReports}>
                      Download All Reports ({generatedReports.length})
                    </button>
                  </div>
                )}
              </div>

              {generatedReports.length > 0 && (
                <div className="generated-reports">
                  <h3>Generated Reports</h3>
                  <div className="reports-grid">
                    {generatedReports.map(report => (
                      <div key={report.id} className="report-card">
                        <div className="report-header">
                          <h4>{report.type} Report</h4>
                          <span className="status-badge">{report.status}</span>
                        </div>
                        <div className="report-details">
                          <p><strong>Program:</strong> {report.program}</p>
                          <p><strong>Period:</strong> {report.period}</p>
                          <p><strong>Date:</strong> {report.date}</p>
                          <p><strong>Summary:</strong> {report.data.summary}</p>
                        </div>
                        <div className="report-actions">
                          <button className="download-btn" onClick={() => downloadExcelReport(report)}>
                            Download Excel
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Feedback - Updated to respond to principal leader reports */}
          {activeTab === 'feedback' && (
            <div className="feedback-section">
              <div className="section-header">
                <h2>Principal Reports & Responses</h2>
                <p>Review principal reports and submit your responses</p>
              </div>

              {/* Principal Reports Section */}
              <div className="principal-reports">
                <h3>Principal Reports Requiring Response</h3>
                <div className="reports-list">
                  {principalReports.filter(report => report.status === 'pending').map(report => (
                    <div key={report.id} className="report-item">
                      <div className="report-header">
                        <div className="report-title">
                          <h4>{report.title}</h4>
                          <span className={`priority ${report.priority}`}>
                            {report.priority} Priority
                          </span>
                        </div>
                        <div className="report-meta">
                          <span>From: {report.from}</span>
                          <span>Date: {report.date}</span>
                          <span>Due: {report.dueDate}</span>
                        </div>
                      </div>
                      <div className="report-content">
                        <p><strong>Subject:</strong> {report.subject}</p>
                        <p><strong>Key {report.keyConcerns ? 'Concerns' : report.keyPoints ? 'Points' : 'Opportunities'}:</strong></p>
                        <ul>
                          {(report.keyConcerns || report.keyPoints || report.opportunities).map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                        <p><strong>Action Required:</strong> {report.actionRequired}</p>
                      </div>
                      <div className="response-section">
                        <h5>Your Response:</h5>
                        <textarea 
                          className="response-input"
                          placeholder="Type your response here..."
                          rows="4"
                          value={report.response}
                          onChange={(e) => handleResponseChange(report.id, e.target.value)}
                        />
                        <div className="response-actions">
                          <button 
                            className="submit-btn primary" 
                            onClick={() => handleSubmitResponse(report.id)}
                          >
                            Submit Response
                          </button>
                          {report.priority === 'high' && (
                            <button 
                              className="submit-btn secondary" 
                              onClick={() => handleRequestExtension(report.id)}
                            >
                              Request Extension
                            </button>
                          )}
                          {report.title.includes('Industry Partnership') && (
                            <button 
                              className="submit-btn secondary" 
                              onClick={() => handleRequestMeeting(report.id)}
                            >
                              Request Meeting
                            </button>
                          )}
                          <button 
                            className="submit-btn outline" 
                            onClick={() => handleSaveDraft(report.id)}
                          >
                            Save Draft
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Response History */}
              <div className="response-history">
                <h3>Recent Responses</h3>
                <div className="history-list">
                  {responseHistory.map(history => (
                    <div key={history.id} className="history-item">
                      <div className="history-header">
                        <strong>{history.title}</strong>
                        <span className={`status ${history.status}`}>
                          {history.status}
                        </span>
                      </div>
                      <div className="history-details">
                        <p><strong>Original Report:</strong> {history.originalReport}</p>
                        <p><strong>Your Response:</strong> "{history.response}"</p>
                        <div className="history-meta">
                          <span>Submitted: {history.submittedDate}</span>
                          <span>{history.responseTime ? `Response Time: ${history.responseTime}` : `Status: ${history.modifications || 'Pending review'}`}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Response Statistics */}
              <div className="response-stats">
                <h3>Response Performance</h3>
                <div className="stats-grid">
                  <div className="stat-card">
                    <h4>Average Response Time</h4>
                    <div className="stat-value">{responseStats.averageResponseTime}</div>
                    <div className="stat-trend positive">-0.5 days from last month</div>
                  </div>
                  <div className="stat-card">
                    <h4>Response Rate</h4>
                    <div className="stat-value">{responseStats.responseRate}</div>
                    <div className="stat-trend positive">+4% improvement</div>
                  </div>
                  <div className="stat-card">
                    <h4>Approval Rate</h4>
                    <div className="stat-value">{responseStats.approvalRate}</div>
                    <div className="stat-trend neutral">No change</div>
                  </div>
                  <div className="stat-card">
                    <h4>Pending Responses</h4>
                    <div className="stat-value">{responseStats.pendingResponses}</div>
                    <div className="stat-trend negative">+1 from last week</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .program-leader {
          min-height: 100vh;
          background: #f8fafc;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        /* Top Navigation Styles */
        .top-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 1rem 2rem;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .nav-brand h2 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .nav-menu {
          display: flex;
          gap: 0.5rem;
        }

        .nav-btn {
          padding: 0.75rem 1.5rem;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          color: rgba(255,255,255,0.9);
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
          font-size: 0.95rem;
        }

        .nav-btn:hover {
          background: rgba(255,255,255,0.2);
          color: white;
        }

        .nav-btn.active {
          background: rgba(255,255,255,0.25);
          color: white;
          border-color: rgba(255,255,255,0.3);
        }

        .nav-actions .logout-btn {
          padding: 0.75rem 1.5rem;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          color: white;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .nav-actions .logout-btn:hover {
          background: rgba(255,255,255,0.2);
        }

        /* Main Content Styles */
        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .content-body {
          flex: 1;
          padding: 2rem;
          overflow-y: auto;
        }

        /* Common Card Styles */
        .stat-card, .assignment-form-card, .report-controls-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          border: 1px solid #e2e8f0;
        }

        .stat-card h3, .assignment-form-card h3, .report-controls-card h3 {
          margin: 0 0 1rem 0;
          color: #2d3748;
          font-size: 1.25rem;
          font-weight: 600;
        }

        /* Dashboard Styles */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-content p {
          margin: 0.5rem 0;
          color: #4a5568;
        }

        .status-active {
          color: #10b981;
          font-weight: 600;
        }

        .action-buttons {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .action-buttons button {
          padding: 0.75rem;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: background 0.3s ease;
        }

        .action-buttons button:hover {
          background: #5a6fd8;
        }

        /* Form Styles */
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

        .form {
          width: 100%;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          margin-bottom: 0.5rem;
          color: #4a5568;
          font-weight: 600;
          font-size: 0.875rem;
        }

        .form-group select, .form-group input {
          padding: 0.75rem;
          border: 1px solid #cbd5e0;
          border-radius: 8px;
          font-size: 0.875rem;
          transition: border-color 0.3s ease;
        }

        .form-group select:focus, .form-group input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .submit-btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .submit-btn.primary {
          background: #667eea;
          color: white;
        }

        .submit-btn.primary:hover {
          background: #5a6fd8;
        }

        .submit-btn.secondary {
          background: #10b981;
          color: white;
        }

        .submit-btn.secondary:hover {
          background: #0da271;
        }

        /* Timetable Styles */
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

        .timetable-section {
          margin: 2rem 0;
        }

        .timetable {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .timetable-header {
          display: grid;
          grid-template-columns: 120px repeat(5, 1fr);
          background: #2d3748;
          color: white;
        }

        .time-header, .day-header {
          padding: 1rem;
          text-align: center;
          font-weight: 600;
        }

        .timetable-body {
          display: flex;
          flex-direction: column;
        }

        .time-row {
          display: grid;
          grid-template-columns: 120px repeat(5, 1fr);
          border-bottom: 1px solid #e2e8f0;
        }

        .time-row:last-child {
          border-bottom: none;
        }

        .time-slot {
          padding: 1rem;
          background: #f7fafc;
          text-align: center;
          font-weight: 600;
          border-right: 1px solid #e2e8f0;
        }

        .class-cell {
          padding: 0.75rem;
          border-right: 1px solid #e2e8f0;
          min-height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .class-cell:last-child {
          border-right: none;
        }

        .class-cell.assigned {
          background: #f0fff4;
          border-left: 4px solid #10b981;
        }

        .class-cell.empty {
          background: #f7fafc;
          color: #a0aec0;
        }

        .class-info {
          text-align: center;
          width: 100%;
          position: relative;
        }

        .course-name {
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 0.25rem;
        }

        .lecturer-name {
          font-size: 0.875rem;
          color: #718096;
        }

        .remove-btn {
          position: absolute;
          top: -8px;
          right: -8px;
          background: #e53e3e;
          color: white;
          border: none;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .remove-btn.small {
          position: static;
          margin-top: 0.5rem;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          width: auto;
          height: auto;
          font-size: 0.75rem;
        }

        .no-class {
          color: #a0aec0;
          font-style: italic;
        }

        /* Assignments Grid */
        .recent-assignments {
          margin-top: 2rem;
        }

        .assignments-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1rem;
        }

        .assignment-card {
          background: white;
          padding: 1rem;
          border-radius: 8px;
          border-left: 4px solid #667eea;
          display: flex;
          justify-content: space-between;
          align-items: start;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .assignment-details strong {
          display: block;
          margin-bottom: 0.5rem;
          color: #2d3748;
        }

        .assignment-details div {
          font-size: 0.875rem;
          color: #718096;
          margin-bottom: 0.25rem;
        }

        /* Reports Section */
        .bulk-download {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #e2e8f0;
        }

        .reports-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 1.5rem;
        }

        .report-card {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          border: 1px solid #e2e8f0;
        }

        .report-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .report-header h4 {
          margin: 0;
          color: #2d3748;
          font-size: 1.125rem;
        }

        .status-badge {
          background: #10b981;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .report-details p {
          margin: 0.5rem 0;
          color: #4a5568;
          font-size: 0.875rem;
        }

        .report-actions {
          margin-top: 1rem;
        }

        .download-btn {
          padding: 0.5rem 1rem;
          background: #10b981;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.875rem;
          transition: background 0.3s ease;
        }

        .download-btn:hover {
          background: #0da271;
        }

        /* Updated Feedback Section - Principal Reports & Responses */
        .principal-reports {
          margin-bottom: 2rem;
        }

        .reports-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .report-item {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          border-left: 4px solid #667eea;
        }

        .report-header {
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #e2e8f0;
        }

        .report-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .report-title h4 {
          margin: 0;
          color: #2d3748;
        }

        .priority {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
        }

        .priority.high {
          background: #fed7d7;
          color: #c53030;
        }

        .priority.medium {
          background: #feebc8;
          color: #d69e2e;
        }

        .priority.low {
          background: #c6f6d5;
          color: #38a169;
        }

        .report-meta {
          display: flex;
          gap: 1rem;
          font-size: 0.875rem;
          color: #718096;
        }

        .report-content {
          margin-bottom: 1.5rem;
        }

        .report-content p {
          margin: 0.5rem 0;
          color: #4a5568;
        }

        .report-content ul {
          margin: 0.5rem 0;
          padding-left: 1.5rem;
          color: #4a5568;
        }

        .report-content li {
          margin: 0.25rem 0;
        }

        .response-section {
          background: #f7fafc;
          padding: 1rem;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
        }

        .response-section h5 {
          margin: 0 0 0.75rem 0;
          color: #2d3748;
        }

        .response-input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #cbd5e0;
          border-radius: 6px;
          font-family: inherit;
          font-size: 0.875rem;
          resize: vertical;
          margin-bottom: 1rem;
        }

        .response-input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .response-actions {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .submit-btn.outline {
          background: white;
          color: #667eea;
          border: 1px solid #667eea;
        }

        .submit-btn.outline:hover {
          background: #f7fafc;
        }

        /* Response History */
        .response-history {
          margin-bottom: 2rem;
        }

        .history-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .history-item {
          background: white;
          padding: 1.25rem;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
        }

        .history-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }

        .history-header strong {
          color: #2d3748;
          font-size: 1.125rem;
        }

        .status {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .status.submitted {
          background: #e6fffa;
          color: #234e52;
        }

        .status.approved {
          background: #f0fff4;
          color: #22543d;
        }

        .status.pending {
          background: #feebc8;
          color: #744210;
        }

        .history-details p {
          margin: 0.5rem 0;
          color: #4a5568;
          font-size: 0.875rem;
        }

        .history-meta {
          display: flex;
          justify-content: space-between;
          margin-top: 0.75rem;
          font-size: 0.75rem;
          color: #718096;
        }

        /* Response Statistics */
        .response-stats .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .response-stats .stat-card {
          text-align: center;
          padding: 1.5rem 1rem;
        }

        .response-stats .stat-value {
          font-size: 2rem;
          font-weight: 700;
          color: #667eea;
          margin: 0.5rem 0;
        }

        .response-stats .stat-trend {
          font-size: 0.875rem;
          font-weight: 600;
        }

        .stat-trend.positive {
          color: #38a169;
        }

        .stat-trend.negative {
          color: #e53e3e;
        }

        .stat-trend.neutral {
          color: #d69e2e;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .top-nav {
            flex-direction: column;
            gap: 1rem;
            padding: 1rem;
          }
          
          .nav-menu {
            order: 2;
            width: 100%;
            justify-content: center;
          }
          
          .nav-brand {
            order: 1;
          }
          
          .nav-actions {
            order: 3;
          }
        }

        @media (max-width: 768px) {
          .content-body {
            padding: 1rem;
          }
          
          .form-row {
            grid-template-columns: 1fr;
          }
          
          .timetable-header,
          .time-row {
            grid-template-columns: 80px repeat(5, 1fr);
          }
          
          .time-slot {
            padding: 0.5rem;
            font-size: 0.875rem;
          }
          
          .stats-grid {
            grid-template-columns: 1fr;
          }

          .nav-menu {
            flex-wrap: wrap;
          }
          
          .nav-btn {
            padding: 0.5rem 1rem;
            font-size: 0.875rem;
          }

          .report-meta {
            flex-direction: column;
            gap: 0.25rem;
          }
          
          .report-title {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
          
          .response-actions {
            flex-direction: column;
          }
          
          .history-meta {
            flex-direction: column;
            gap: 0.25rem;
          }
          
          .response-stats .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 480px) {
          .response-stats .stats-grid {
            grid-template-columns: 1fr;
          }
          
          .top-nav {
            padding: 0.75rem;
          }
          
          .nav-brand h2 {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ProgramLeader;