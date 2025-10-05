import React, { useState } from 'react';

const PrincipalLecturer = ({ onLogout, setCurrentView }) => {
  const [activeTab, setActiveTab] = useState('monitoring');
  
  // State for each tab's form data
  const [monitoringData, setMonitoringData] = useState({
    observation: '',
    recommendations: ''
  });
  
  const [reportsData, setReportsData] = useState({
    reportType: '',
    findings: '',
    recommendations: ''
  });
  
  const [feedbackData, setFeedbackData] = useState({
    lecturerName: '',
    course: '',
    feedback: '',
    rating: ''
  });
  
  const [groupReportsData, setGroupReportsData] = useState({
    reportGroupName: '',
    selectedReports: [],
    summary: '',
    priority: 'medium'
  });
  
  const [coursesData, setCoursesData] = useState({
    courseTitle: '',
    description: '',
    objectives: '',
    requirements: ''
  });

  // State for storing generated reports
  const [generatedReports, setGeneratedReports] = useState([]);
  const [groupedReports, setGroupedReports] = useState([]);

  // Sample reports data for grouping
  const availableReports = [
    { id: 1, type: 'attendance', title: 'Weekly Attendance Report', date: '2024-01-15', status: 'completed' },
    { id: 2, type: 'performance', title: 'Student Performance Analysis', date: '2024-01-14', status: 'completed' },
    { id: 3, type: 'lecturer', title: 'Lecturer Evaluation Report', date: '2024-01-13', status: 'completed' },
    { id: 4, type: 'course', title: 'Course Completion Report', date: '2024-01-12', status: 'completed' },
    { id: 5, type: 'facility', title: 'Facility Usage Report', date: '2024-01-11', status: 'completed' },
    { id: 6, type: 'assessment', title: 'Assessment Results Summary', date: '2024-01-10', status: 'completed' }
  ];

  const handleSubmit = (tabName, data) => {
    alert(`${tabName.charAt(0).toUpperCase() + tabName.slice(1)} submitted successfully!\n\nData: ${JSON.stringify(data, null, 2)}`);
    // Reset form after submission
    switch(tabName) {
      case 'monitoring':
        setMonitoringData({ observation: '', recommendations: '' });
        break;
      case 'reports':
        setReportsData({ reportType: '', findings: '', recommendations: '' });
        // Add to generated reports
        const newReport = {
          id: Date.now(),
          type: data.reportType,
          title: `${data.reportType.charAt(0).toUpperCase() + data.reportType.slice(1)} Report`,
          date: new Date().toLocaleDateString(),
          status: 'generated',
          data: data
        };
        setGeneratedReports(prev => [newReport, ...prev]);
        break;
      case 'feedback':
        setFeedbackData({ lecturerName: '', course: '', feedback: '', rating: '' });
        break;
      case 'groupReports':
        setGroupReportsData({ 
          reportGroupName: '', 
          selectedReports: [], 
          summary: '', 
          priority: 'medium' 
        });
        break;
      case 'courses':
        setCoursesData({ courseTitle: '', description: '', objectives: '', requirements: '' });
        break;
      default:
        break;
    }
  };

  // Handle report selection for grouping
  const handleReportSelection = (reportId) => {
    setGroupReportsData(prev => {
      const isSelected = prev.selectedReports.includes(reportId);
      return {
        ...prev,
        selectedReports: isSelected 
          ? prev.selectedReports.filter(id => id !== reportId)
          : [...prev.selectedReports, reportId]
      };
    });
  };

  // Handle group reports submission
  const handleGroupReportsSubmit = (e) => {
    e.preventDefault();
    
    if (groupReportsData.selectedReports.length === 0) {
      alert('Please select at least one report to group.');
      return;
    }

    if (!groupReportsData.reportGroupName.trim()) {
      alert('Please provide a name for the report group.');
      return;
    }

    const selectedReportDetails = availableReports.filter(report => 
      groupReportsData.selectedReports.includes(report.id)
    );

    const newGroupedReport = {
      id: Date.now(),
      name: groupReportsData.reportGroupName,
      reports: selectedReportDetails,
      summary: groupReportsData.summary,
      priority: groupReportsData.priority,
      date: new Date().toLocaleDateString(),
      status: 'grouped',
      sentToProgramLeader: false
    };

    setGroupedReports(prev => [newGroupedReport, ...prev]);
    
    alert(`Reports grouped successfully!\n\nGroup Name: ${groupReportsData.reportGroupName}\nNumber of Reports: ${selectedReportDetails.length}\n\nReports have been prepared for sending to Program Leader.`);
    
    // Reset form
    setGroupReportsData({ 
      reportGroupName: '', 
      selectedReports: [], 
      summary: '', 
      priority: 'medium' 
    });
  };

  // Send grouped reports to Program Leader
  const sendToProgramLeader = (groupId) => {
    setGroupedReports(prev => 
      prev.map(group => 
        group.id === groupId 
          ? { ...group, sentToProgramLeader: true, sentDate: new Date().toLocaleDateString() }
          : group
      )
    );
    
    const group = groupedReports.find(g => g.id === groupId);
    alert(`Report group "${group.name}" has been sent to the Program Leader successfully!\n\nNumber of reports: ${group.reports.length}\nPriority: ${group.priority}`);
  };

  // Delete a grouped report
  const deleteGroupedReport = (groupId) => {
    setGroupedReports(prev => prev.filter(group => group.id !== groupId));
    alert('Report group deleted successfully!');
  };

  return (
    <div className="principal-lecturer-portal">
      {/* Top Navigation Bar */}
      <div className="top-nav">
        <div className="nav-header">
          <h2>Principal Lecturer Portal</h2>
          <div className="user-info">
            <span>Welcome, Principal Lecturer</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
        </div>
        <nav className="top-nav-menu">
          {['monitoring', 'reports', 'feedback', 'groupReports', 'courses'].map(tab => (
            <button
              key={tab}
              className={`nav-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/([A-Z])/g, ' $1')}
            </button>
          ))}
          <button className="logout-btn" onClick={onLogout}>Logout</button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-body">
          <div className="section-header">
            <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace(/([A-Z])/g, ' $1')}</h1>
            <p>Manage academic oversight and reporting functions</p>
          </div>
          
          {activeTab === 'monitoring' && (
            <div className="tab-content">
              <div className="form-container">
                <h3>Lecture Monitoring & Observation</h3>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit('monitoring', monitoringData); }}>
                  <div className="form-group">
                    <label>Class Observation Notes:</label>
                    <textarea 
                      className="form-control large-textarea"
                      value={monitoringData.observation}
                      onChange={(e) => setMonitoringData({...monitoringData, observation: e.target.value})}
                      placeholder="Record your observations about the lecture, teaching methods, student engagement, etc."
                      rows="6"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Recommendations & Feedback:</label>
                    <textarea 
                      className="form-control large-textarea"
                      value={monitoringData.recommendations}
                      onChange={(e) => setMonitoringData({...monitoringData, recommendations: e.target.value})}
                      placeholder="Provide recommendations for improvement and positive feedback"
                      rows="4"
                      required
                    />
                  </div>
                  
                  <button type="submit" className="submit-btn">
                    Submit Monitoring Report
                  </button>
                </form>
              </div>
            </div>
          )}
          
          {activeTab === 'reports' && (
            <div className="tab-content">
              <div className="form-container">
                <h3>Academic Reports & Analysis</h3>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit('reports', reportsData); }}>
                  <div className="form-group">
                    <label>Report Type:</label>
                    <select 
                      className="form-control"
                      value={reportsData.reportType}
                      onChange={(e) => setReportsData({...reportsData, reportType: e.target.value})}
                      required
                    >
                      <option value="">Select Report Type</option>
                      <option value="attendance">Attendance Report</option>
                      <option value="performance">Performance Report</option>
                      <option value="lecturer">Lecturer Evaluation</option>
                      <option value="course">Course Analysis</option>
                      <option value="facility">Facility Usage</option>
                      <option value="assessment">Assessment Results</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Key Findings & Analysis:</label>
                    <textarea 
                      className="form-control large-textarea"
                      value={reportsData.findings}
                      onChange={(e) => setReportsData({...reportsData, findings: e.target.value})}
                      placeholder="Detail your findings, data analysis, and observations"
                      rows="6"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Recommendations & Action Plan:</label>
                    <textarea 
                      className="form-control large-textarea"
                      value={reportsData.recommendations}
                      onChange={(e) => setReportsData({...reportsData, recommendations: e.target.value})}
                      placeholder="Provide strategic recommendations and action items"
                      rows="4"
                      required
                    />
                  </div>
                  
                  <button type="submit" className="submit-btn">
                    Generate Report
                  </button>
                </form>

                {/* Generated Reports List */}
                {generatedReports.length > 0 && (
                  <div className="generated-reports-section">
                    <h4>Recently Generated Reports</h4>
                    <div className="reports-grid">
                      {generatedReports.slice(0, 3).map(report => (
                        <div key={report.id} className="report-card">
                          <div className="report-header">
                            <strong>{report.title}</strong>
                            <span className={`status-badge ${report.status}`}>
                              {report.status}
                            </span>
                          </div>
                          <div className="report-details">
                            <p><strong>Type:</strong> {report.type}</p>
                            <p><strong>Date:</strong> {report.date}</p>
                            <p><strong>Findings:</strong> {report.data.findings.substring(0, 100)}...</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'feedback' && (
            <div className="tab-content">
              <div className="form-container">
                <h3>Lecturer Performance Feedback</h3>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit('feedback', feedbackData); }}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Lecturer Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={feedbackData.lecturerName}
                        onChange={(e) => setFeedbackData({...feedbackData, lecturerName: e.target.value})}
                        placeholder="Enter lecturer's name"
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Course/Module:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={feedbackData.course}
                        onChange={(e) => setFeedbackData({...feedbackData, course: e.target.value})}
                        placeholder="Enter course name"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>Performance Rating:</label>
                    <select 
                      className="form-control"
                      value={feedbackData.rating}
                      onChange={(e) => setFeedbackData({...feedbackData, rating: e.target.value})}
                      required
                    >
                      <option value="">Select Rating</option>
                      <option value="excellent">Excellent</option>
                      <option value="good">Good</option>
                      <option value="satisfactory">Satisfactory</option>
                      <option value="needs-improvement">Needs Improvement</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Detailed Feedback:</label>
                    <textarea 
                      className="form-control large-textarea"
                      value={feedbackData.feedback}
                      onChange={(e) => setFeedbackData({...feedbackData, feedback: e.target.value})}
                      placeholder="Provide detailed feedback on teaching methods, communication, student engagement, etc."
                      rows="6"
                      required
                    />
                  </div>
                  
                  <button type="submit" className="submit-btn">
                    Submit Feedback
                  </button>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'groupReports' && (
            <div className="tab-content">
              <div className="form-container">
                <h3>Group Reports & Send to Program Leader</h3>
                
                {/* Group Reports Form */}
                <form onSubmit={handleGroupReportsSubmit}>
                  <div className="form-group">
                    <label>Report Group Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={groupReportsData.reportGroupName}
                      onChange={(e) => setGroupReportsData({...groupReportsData, reportGroupName: e.target.value})}
                      placeholder="Enter a descriptive name for this report group"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Select Reports to Group:</label>
                    <div className="reports-selection-grid">
                      {availableReports.map(report => (
                        <div key={report.id} className="report-selection-item">
                          <label className="checkbox-label">
                            <input
                              type="checkbox"
                              checked={groupReportsData.selectedReports.includes(report.id)}
                              onChange={() => handleReportSelection(report.id)}
                              className="checkbox-input"
                            />
                            <span className="checkmark"></span>
                            <div className="report-info">
                              <strong>{report.title}</strong>
                              <span className="report-date">{report.date}</span>
                              <span className={`report-status ${report.status}`}>
                                {report.status}
                              </span>
                            </div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Priority Level:</label>
                    <select 
                      className="form-control"
                      value={groupReportsData.priority}
                      onChange={(e) => setGroupReportsData({...groupReportsData, priority: e.target.value})}
                    >
                      <option value="low">Low Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="high">High Priority</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Executive Summary:</label>
                    <textarea 
                      className="form-control large-textarea"
                      value={groupReportsData.summary}
                      onChange={(e) => setGroupReportsData({...groupReportsData, summary: e.target.value})}
                      placeholder="Provide an overall summary and key insights from the grouped reports..."
                      rows="4"
                    />
                  </div>
                  
                  <button type="submit" className="submit-btn">
                    Create Report Group
                  </button>
                </form>

                {/* Grouped Reports List */}
                {groupedReports.length > 0 && (
                  <div className="grouped-reports-section">
                    <h4>Grouped Reports Ready for Program Leader</h4>
                    <div className="grouped-reports-list">
                      {groupedReports.map(group => (
                        <div key={group.id} className="grouped-report-card">
                          <div className="group-header">
                            <div className="group-info">
                              <h5>{group.name}</h5>
                              <div className="group-meta">
                                <span className={`priority-badge ${group.priority}`}>
                                  {group.priority} priority
                                </span>
                                <span className="report-count">
                                  {group.reports.length} reports
                                </span>
                                <span className="group-date">
                                  Created: {group.date}
                                </span>
                              </div>
                            </div>
                            <div className="group-actions">
                              {!group.sentToProgramLeader ? (
                                <button 
                                  className="send-btn"
                                  onClick={() => sendToProgramLeader(group.id)}
                                >
                                  Send to Program Leader
                                </button>
                              ) : (
                                <span className="sent-badge">
                                  ✓ Sent on {group.sentDate}
                                </span>
                              )}
                              <button 
                                className="delete-btn"
                                onClick={() => deleteGroupedReport(group.id)}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                          
                          {group.summary && (
                            <div className="group-summary">
                              <strong>Summary:</strong> {group.summary}
                            </div>
                          )}
                          
                          <div className="included-reports">
                            <strong>Included Reports:</strong>
                            <div className="reports-list">
                              {group.reports.map(report => (
                                <div key={report.id} className="included-report">
                                  {report.title} ({report.date})
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'courses' && (
            <div className="tab-content">
              <div className="form-container">
                <h3>Course Development & Management</h3>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit('courses', coursesData); }}>
                  <div className="form-group">
                    <label>Course Title:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={coursesData.courseTitle}
                      onChange={(e) => setCoursesData({...coursesData, courseTitle: e.target.value})}
                      placeholder="Enter course title"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Course Description:</label>
                    <textarea 
                      className="form-control large-textarea"
                      value={coursesData.description}
                      onChange={(e) => setCoursesData({...coursesData, description: e.target.value})}
                      placeholder="Provide detailed course description and overview"
                      rows="4"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Learning Objectives:</label>
                    <textarea 
                      className="form-control large-textarea"
                      value={coursesData.objectives}
                      onChange={(e) => setCoursesData({...coursesData, objectives: e.target.value})}
                      placeholder="List the learning objectives and outcomes"
                      rows="4"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Requirements & Prerequisites:</label>
                    <textarea 
                      className="form-control large-textarea"
                      value={coursesData.requirements}
                      onChange={(e) => setCoursesData({...coursesData, requirements: e.target.value})}
                      placeholder="Specify course requirements and prerequisites"
                      rows="3"
                      required
                    />
                  </div>
                  
                  <button type="submit" className="submit-btn">
                    Submit Course Proposal
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .principal-lecturer-portal {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8f9fa 0%, #ecf0f1 100%);
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
          background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
          color: white;
        }

        .nav-header h2 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 700;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .user-info {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          font-size: 0.875rem;
          opacity: 0.9;
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
          font-weight: 500;
        }

        .nav-btn:hover {
          background: #edf2f7;
          color: #2d3748;
        }

        .nav-btn.active {
          background: #3498db;
          color: white;
          border-bottom-color: #f39c12;
        }

        .logout-btn {
          margin-left: auto;
          padding: 1rem 1.5rem;
          background: #e74c3c;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: background 0.3s ease;
          margin: 0.5rem;
          box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3);
        }

        .logout-btn:hover {
          background: #c0392b;
          transform: translateY(-1px);
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
          text-align: center;
        }

        .section-header h1 {
          margin: 0 0 0.5rem 0;
          color: #2c3e50;
          font-size: 2.2rem;
          font-weight: 700;
          background: linear-gradient(135deg, #2c3e50, #3498db, #2c3e50);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .section-header p {
          color: #718096;
          margin: 0;
          font-size: 1.1rem;
        }

        .tab-content {
          animation: fadeInUp 0.5s ease-out;
        }

        .form-container {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 25px rgba(0, 0, 0, 0.1);
          border: 1px solid #e2e8f0;
          margin-top: 1.5rem;
        }

        .form-container h3 {
          color: #2c3e50;
          margin-bottom: 1.5rem;
          font-size: 1.5rem;
          font-weight: 600;
          border-bottom: 2px solid #3498db;
          padding-bottom: 0.5rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1rem;
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

        .form-control {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s;
          background: white;
          font-family: inherit;
        }

        .form-control:focus {
          outline: none;
          border-color: #3498db;
          box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
        }

        .large-textarea {
          min-height: 120px;
          resize: vertical;
          line-height: 1.5;
        }

        .submit-btn {
          background: linear-gradient(135deg, #27ae60, #2ecc71);
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
          margin-top: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          box-shadow: 0 4px 15px rgba(39, 174, 96, 0.3);
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(39, 174, 96, 0.4);
          background: linear-gradient(135deg, #2ecc71, #27ae60);
        }

        /* Reports Selection Grid */
        .reports-selection-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1rem;
          margin-top: 0.5rem;
        }

        .report-selection-item {
          background: #f8f9fa;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          padding: 1rem;
          transition: all 0.3s ease;
        }

        .report-selection-item:hover {
          border-color: #3498db;
          background: #f1f8ff;
        }

        .checkbox-label {
          display: flex;
          align-items: flex-start;
          cursor: pointer;
          width: 100%;
        }

        .checkbox-input {
          display: none;
        }

        .checkmark {
          width: 20px;
          height: 20px;
          border: 2px solid #bdc3c7;
          border-radius: 4px;
          margin-right: 12px;
          margin-top: 2px;
          position: relative;
          transition: all 0.3s ease;
        }

        .checkbox-input:checked + .checkmark {
          background: #3498db;
          border-color: #3498db;
        }

        .checkbox-input:checked + .checkmark::after {
          content: '✓';
          position: absolute;
          color: white;
          font-size: 14px;
          font-weight: bold;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .report-info {
          flex: 1;
        }

        .report-info strong {
          display: block;
          margin-bottom: 0.25rem;
          color: #2c3e50;
        }

        .report-date, .report-status {
          font-size: 0.85em;
          color: #718096;
          margin-right: 0.5rem;
        }

        .report-status.completed {
          color: #27ae60;
          font-weight: 600;
        }

        /* Generated Reports Section */
        .generated-reports-section {
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 2px solid #e2e8f0;
        }

        .reports-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1rem;
          margin-top: 1rem;
        }

        .report-card {
          background: #f8f9fa;
          padding: 1rem;
          border-radius: 8px;
          border-left: 4px solid #3498db;
        }

        .report-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .status-badge {
          padding: 0.25rem 0.5rem;
          border-radius: 12px;
          font-size: 0.75em;
          font-weight: 600;
        }

        .status-badge.generated {
          background: #d4edda;
          color: #155724;
        }

        .report-details p {
          margin: 0.25rem 0;
          font-size: 0.9em;
          color: #5d6d7e;
        }

        /* Grouped Reports Section */
        .grouped-reports-section {
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 2px solid #e2e8f0;
        }

        .grouped-reports-list {
          display: grid;
          gap: 1rem;
          margin-top: 1rem;
        }

        .grouped-report-card {
          background: #f8f9fa;
          padding: 1.5rem;
          border-radius: 8px;
          border: 2px solid #e2e8f0;
        }

        .group-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .group-info h5 {
          margin: 0 0 0.5rem 0;
          color: #2c3e50;
          font-size: 1.2em;
        }

        .group-meta {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .priority-badge {
          padding: 0.25rem 0.5rem;
          border-radius: 12px;
          font-size: 0.75em;
          font-weight: 600;
        }

        .priority-badge.low { background: #d4edda; color: #155724; }
        .priority-badge.medium { background: #fff3cd; color: #856404; }
        .priority-badge.high { background: #f8d7da; color: #721c24; }
        .priority-badge.urgent { background: #721c24; color: white; }

        .report-count, .group-date {
          font-size: 0.85em;
          color: #718096;
        }

        .group-actions {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .send-btn {
          background: #3498db;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.9em;
          transition: background 0.3s;
        }

        .send-btn:hover {
          background: #2980b9;
        }

        .sent-badge {
          background: #27ae60;
          color: white;
          padding: 0.5rem 0.75rem;
          border-radius: 4px;
          font-size: 0.85em;
          font-weight: 600;
        }

        .delete-btn {
          background: #e74c3c;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.9em;
          transition: background 0.3s;
        }

        .delete-btn:hover {
          background: #c0392b;
        }

        .group-summary {
          background: white;
          padding: 1rem;
          border-radius: 6px;
          margin-bottom: 1rem;
          border-left: 3px solid #3498db;
        }

        .included-reports {
          margin-top: 1rem;
        }

        .reports-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 0.5rem;
          margin-top: 0.5rem;
        }

        .included-report {
          background: white;
          padding: 0.5rem 0.75rem;
          border-radius: 4px;
          font-size: 0.85em;
          border: 1px solid #e2e8f0;
        }

        /* Animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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
          
          .user-info {
            align-items: flex-start;
          }
          
          .top-nav-menu {
            flex-wrap: wrap;
            padding: 0 1rem;
          }
          
          .nav-btn {
            padding: 0.75rem 1rem;
            font-size: 0.875rem;
          }
          
          .section-header h1 {
            font-size: 1.8rem;
          }
          
          .form-container {
            padding: 1.5rem;
          }
          
          .form-row {
            grid-template-columns: 1fr;
          }
          
          .reports-selection-grid {
            grid-template-columns: 1fr;
          }
          
          .group-header {
            flex-direction: column;
            gap: 1rem;
          }
          
          .group-actions {
            width: 100%;
            justify-content: flex-start;
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
          
          .section-header h1 {
            font-size: 1.5rem;
          }
          
          .section-header p {
            font-size: 1rem;
          }
          
          .reports-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default PrincipalLecturer;