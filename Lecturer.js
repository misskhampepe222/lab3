import React, { useState } from 'react';

const Lecturer = ({ onLogout, setCurrentView }) => {
  const [activeTab, setActiveTab] = useState('monitoring');
  const [attendance, setAttendance] = useState('');
  const [location, setLocation] = useState('');
  const [studentPerformance, setStudentPerformance] = useState('');
  const [challenge, setChallenge] = useState('');
  const [report, setReport] = useState({
    title: '',
    content: '',
    priority: 'medium',
    type: 'general'
  });
  const [reportsHistory, setReportsHistory] = useState([]);

  const handleSubmitAttendance = (e) => {
    e.preventDefault();
    alert('Attendance recorded successfully!');
    setAttendance('');
    setLocation('');
  };

  const handleSubmitRating = (e) => {
    e.preventDefault();
    alert('Student performance rating submitted!');
    setStudentPerformance('');
  };

  const handleSubmitChallenge = (e) => {
    e.preventDefault();
    alert('Challenge submitted!');
    setChallenge('');
  };

  const handleSubmitReport = (e) => {
    e.preventDefault();
    const newReport = {
      ...report,
      id: Date.now(),
      date: new Date().toLocaleString(),
      status: 'sent'
    };
    
    setReportsHistory(prev => [newReport, ...prev]);
    alert('Report sent to Principal Lecturer successfully!');
    setReport({
      title: '',
      content: '',
      priority: 'medium',
      type: 'general'
    });
  };

  const handleReportChange = (field, value) => {
    setReport(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const deleteReport = (reportId) => {
    setReportsHistory(prev => prev.filter(report => report.id !== reportId));
  };

  return (
    <div className="lecturer-portal">
      {/* Top Navigation Bar */}
      <div className="top-nav">
        <div className="nav-header">
          <h2>Lecturer Portal</h2>
          <div className="user-info">
            <span>Welcome, Lecturer</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
        </div>
        <nav className="top-nav-menu">
          {['monitoring', 'ratings', 'challenges', 'reports'].map(tab => (
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
            <div className="tab-content">
              <div className="section-header">
                <h2>Student Monitoring</h2>
                <p>Record student attendance and class information</p>
              </div>
              <form onSubmit={handleSubmitAttendance} className="lecturer-form">
                <div className="form-group">
                  <label>Student Attendance:</label>
                  <input 
                    type="text"
                    className="form-control"
                    value={attendance}
                    onChange={(e) => setAttendance(e.target.value)}
                    placeholder="Enter attendance details"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Class Location:</label>
                  <input 
                    type="text"
                    className="form-control"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter class location"
                    required
                  />
                </div>
                <button type="submit" className="submit-btn">Record Attendance</button>
              </form>
            </div>
          )}

          {activeTab === 'ratings' && (
            <div className="tab-content">
              <div className="section-header">
                <h2>Student Performance Ratings</h2>
                <p>Evaluate and submit student performance feedback</p>
              </div>
              <form onSubmit={handleSubmitRating} className="lecturer-form">
                <div className="form-group">
                  <label>Student Performance Evaluation:</label>
                  <textarea 
                    className="form-control text-area"
                    value={studentPerformance}
                    onChange={(e) => setStudentPerformance(e.target.value)}
                    placeholder="Evaluate student performance..."
                    required
                    rows="6"
                  />
                </div>
                <button type="submit" className="submit-btn">Submit Rating</button>
              </form>
            </div>
          )}

          {activeTab === 'challenges' && (
            <div className="tab-content">
              <div className="section-header">
                <h2>Report Challenges</h2>
                <p>Report any teaching challenges or issues</p>
              </div>
              <form onSubmit={handleSubmitChallenge} className="lecturer-form">
                <div className="form-group">
                  <label>Describe challenges faced:</label>
                  <textarea 
                    className="form-control text-area"
                    value={challenge}
                    onChange={(e) => setChallenge(e.target.value)}
                    placeholder="Describe challenges faced in teaching..."
                    required
                    rows="6"
                  />
                </div>
                <button type="submit" className="submit-btn">Submit Challenge</button>
              </form>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="tab-content">
              <div className="section-header">
                <h2>Reports to Principal Lecturer</h2>
                <p>Send comprehensive reports and updates to the Principal Lecturer</p>
              </div>
              
              {/* Report Form */}
              <div className="report-form-section">
                <h3>Create New Report</h3>
                <form onSubmit={handleSubmitReport} className="lecturer-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Report Title:</label>
                      <input 
                        type="text"
                        className="form-control"
                        value={report.title}
                        onChange={(e) => handleReportChange('title', e.target.value)}
                        placeholder="Enter report title"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Report Type:</label>
                      <select 
                        className="form-control"
                        value={report.type}
                        onChange={(e) => handleReportChange('type', e.target.value)}
                        required
                      >
                        <option value="general">General Update</option>
                        <option value="academic">Academic Report</option>
                        <option value="student">Student Issues</option>
                        <option value="resource">Resource Request</option>
                        <option value="incident">Incident Report</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>Priority Level:</label>
                    <div className="priority-buttons">
                      {['low', 'medium', 'high', 'urgent'].map(priority => (
                        <button
                          key={priority}
                          type="button"
                          className={`priority-btn ${report.priority === priority ? 'active' : ''} ${priority}`}
                          onClick={() => handleReportChange('priority', priority)}
                        >
                          {priority.charAt(0).toUpperCase() + priority.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Report Content:</label>
                    <textarea 
                      className="form-control text-area"
                      value={report.content}
                      onChange={(e) => handleReportChange('content', e.target.value)}
                      placeholder="Provide detailed information for the Principal Lecturer..."
                      required
                      rows="8"
                    />
                  </div>
                  
                  <button type="submit" className="submit-btn report-submit">
                    Send to Principal Lecturer
                  </button>
                </form>
              </div>

              {/* Reports History */}
              {reportsHistory.length > 0 && (
                <div className="reports-history">
                  <h3>Sent Reports History</h3>
                  <div className="reports-list">
                    {reportsHistory.map(reportItem => (
                      <div key={reportItem.id} className="report-card">
                        <div className="report-header">
                          <div className="report-title-section">
                            <h4>{reportItem.title}</h4>
                            <span className={`priority-badge ${reportItem.priority}`}>
                              {reportItem.priority}
                            </span>
                            <span className="report-type">{reportItem.type}</span>
                          </div>
                          <div className="report-meta">
                            <span className="report-date">{reportItem.date}</span>
                            <span className={`status ${reportItem.status}`}>{reportItem.status}</span>
                            <button 
                              className="delete-btn"
                              onClick={() => deleteReport(reportItem.id)}
                              title="Delete report"
                            >
                              ×
                            </button>
                          </div>
                        </div>
                        <div className="report-content">
                          <p>{reportItem.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .lecturer-portal {
          min-height: 100vh;
          background-color: #f8f9fa;
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
          background: linear-gradient(135deg, #8e44ad 0%, #3498db 100%);
          color: white;
        }

        .nav-header h2 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 700;
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
        }

        .logout-btn:hover {
          background: #c0392b;
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

        .section-header h2 {
          margin: 0 0 0.5rem 0;
          color: #2c3e50;
          font-size: 1.8rem;
          font-weight: 700;
          background: linear-gradient(135deg, #8e44ad, #3498db);
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
          max-width: 800px;
          margin: 0 auto;
          animation: fadeInUp 0.5s ease-out;
        }

        .lecturer-form {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
          border: 1px solid #e2e8f0;
        }

        /* Form Styles */
        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
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
          transition: all 0.3s ease;
          box-sizing: border-box;
          font-family: inherit;
          background: #fafbfc;
        }

        .form-control:focus {
          outline: none;
          border-color: #3498db;
          box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
          background: white;
        }

        .text-area {
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
          text-transform: uppercase;
          letter-spacing: 0.5px;
          box-shadow: 0 4px 15px rgba(39, 174, 96, 0.3);
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(39, 174, 96, 0.4);
        }

        .submit-btn:active {
          transform: translateY(0);
        }

        /* Report-specific styles */
        .report-form-section {
          margin-bottom: 3rem;
        }

        .report-form-section h3 {
          color: #2c3e50;
          margin-bottom: 1.5rem;
          font-size: 1.4rem;
          border-bottom: 2px solid #3498db;
          padding-bottom: 0.5rem;
        }

        .priority-buttons {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .priority-btn {
          padding: 0.5rem 1rem;
          border: 2px solid #e2e8f0;
          border-radius: 6px;
          background: white;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
          text-transform: capitalize;
        }

        .priority-btn:hover {
          border-color: #3498db;
        }

        .priority-btn.active {
          color: white;
          border-color: transparent;
        }

        .priority-btn.low.active { background: #27ae60; }
        .priority-btn.medium.active { background: #f39c12; }
        .priority-btn.high.active { background: #e74c3c; }
        .priority-btn.urgent.active { background: #c0392b; }

        .report-submit {
          background: linear-gradient(135deg, #9b59b6, #8e44ad);
          box-shadow: 0 4px 15px rgba(155, 89, 182, 0.3);
        }

        .report-submit:hover {
          box-shadow: 0 6px 20px rgba(155, 89, 182, 0.4);
        }

        /* Reports History */
        .reports-history {
          margin-top: 3rem;
        }

        .reports-history h3 {
          color: #2c3e50;
          margin-bottom: 1.5rem;
          font-size: 1.4rem;
          border-bottom: 2px solid #f39c12;
          padding-bottom: 0.5rem;
        }

        .reports-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .report-card {
          background: white;
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          border-left: 4px solid #3498db;
          transition: transform 0.2s ease;
        }

        .report-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .report-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .report-title-section {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .report-title-section h4 {
          margin: 0;
          color: #2c3e50;
          font-size: 1.1rem;
        }

        .priority-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          color: white;
        }

        .priority-badge.low { background: #27ae60; }
        .priority-badge.medium { background: #f39c12; }
        .priority-badge.high { background: #e74c3c; }
        .priority-badge.urgent { background: #c0392b; }

        .report-type {
          padding: 0.25rem 0.75rem;
          background: #edf2f7;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 500;
          color: #4a5568;
          text-transform: capitalize;
        }

        .report-meta {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .report-date {
          color: #718096;
          font-size: 0.875rem;
        }

        .status {
          padding: 0.25rem 0.75rem;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
        }

        .status.sent {
          background: #d4edda;
          color: #155724;
        }

        .delete-btn {
          background: #e74c3c;
          color: white;
          border: none;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          transition: background 0.3s ease;
        }

        .delete-btn:hover {
          background: #c0392b;
        }

        .report-content {
          color: #4a5568;
          line-height: 1.6;
        }

        .report-content p {
          margin: 0;
        }

        /* Tab-specific styling */
        .tab-content:nth-child(1) .form-group {
          border-left: 4px solid #3498db;
          padding-left: 1rem;
        }

        .tab-content:nth-child(2) .form-group {
          border-left: 4px solid #f39c12;
          padding-left: 1rem;
        }

        .tab-content:nth-child(2) .submit-btn {
          background: linear-gradient(135deg, #f39c12, #f1c40f);
          box-shadow: 0 4px 15px rgba(243, 156, 18, 0.3);
        }

        .tab-content:nth-child(2) .submit-btn:hover {
          box-shadow: 0 6px 20px rgba(243, 156, 18, 0.4);
        }

        .tab-content:nth-child(3) .form-group {
          border-left: 4px solid #e74c3c;
          padding-left: 1rem;
        }

        .tab-content:nth-child(3) .submit-btn {
          background: linear-gradient(135deg, #e74c3c, #c0392b);
          box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3);
        }

        .tab-content:nth-child(3) .submit-btn:hover {
          box-shadow: 0 6px 20px rgba(231, 76, 60, 0.4);
        }

        /* Input placeholder styling */
        .form-control::placeholder {
          color: #a0aec0;
          font-style: italic;
        }

        /* Focus states for accessibility */
        .logout-btn:focus,
        .nav-btn:focus,
        .form-control:focus,
        .submit-btn:focus,
        .priority-btn:focus {
          outline: 2px solid #3498db;
          outline-offset: 2px;
        }

        /* Loading state for buttons */
        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
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
          
          .section-header h2 {
            font-size: 1.5rem;
          }
          
          .lecturer-form {
            padding: 1.5rem;
          }
          
          .form-group {
            margin-bottom: 1rem;
          }
          
          .form-row {
            grid-template-columns: 1fr;
          }
          
          .report-header {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .report-meta {
            justify-content: space-between;
            width: 100%;
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
          
          .section-header h2 {
            font-size: 1.3rem;
          }
          
          .section-header p {
            font-size: 1rem;
          }
          
          .priority-buttons {
            flex-direction: column;
          }
          
          .priority-btn {
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};

export default Lecturer;