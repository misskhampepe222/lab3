import React, { useState } from 'react';

const Dashboard = ({ onLogin, onSignup }) => {
  const [activeForm, setActiveForm] = useState('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    role: 'student',
    studentId: '',
    employeeId: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields based on role
    if (!formData.email || !formData.password) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Role-specific validation
    if (formData.role === 'student' && !formData.studentId) {
      alert('Please enter your Student ID');
      return;
    }
    
    if (formData.role !== 'student' && !formData.employeeId) {
      alert('Please enter your Employee ID');
      return;
    }

    onLogin({
      email: formData.email,
      name: formData.fullName || 'User',
      role: formData.role,
      id: formData.role === 'student' ? formData.studentId : formData.employeeId
    });
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    // Validate role-specific fields for signup
    if (formData.role === 'student' && !formData.studentId) {
      alert('Please enter your Student ID');
      return;
    }
    
    if (formData.role !== 'student' && !formData.employeeId) {
      alert('Please enter your Employee ID');
      return;
    }
    
    onSignup(formData);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      role: 'student',
      studentId: '',
      employeeId: ''
    });
    setActiveForm('login');
  };

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        {/* Top Right Auth Buttons */}
        <div className="top-auth-buttons">
          <button 
            className="top-auth-btn top-login-btn"
            onClick={() => setActiveForm('login')}
          >
            Login
          </button>
          <button 
            className="top-auth-btn top-signup-btn"
            onClick={() => setActiveForm('signup')}
          >
            Sign Up
          </button>
        </div>

        <div className="dashboard-header">
          <h1>LUCT Faculty Reporting System</h1>
          <p>Welcome to the Faculty of Information Communication Technology</p>
        </div>

        <div className="auth-container">
          <div className="auth-tabs">
            <button 
              className={`auth-tab ${activeForm === 'login' ? 'active' : ''}`}
              onClick={() => setActiveForm('login')}
            >
              Login
            </button>
            <button 
              className={`auth-tab ${activeForm === 'signup' ? 'active' : ''}`}
              onClick={() => setActiveForm('signup')}
            >
              Sign Up
            </button>
          </div>

          <div className="auth-form">
            {activeForm === 'login' ? (
              <form onSubmit={handleLoginSubmit}>
                <div className="form-group">
                  <label>Email Address:</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Password:</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Select Portal:</label>
                  <select
                    name="role"
                    className="form-control"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="student">Student Portal</option>
                    <option value="lecturer">Lecturer Portal</option>
                    <option value="principalLecturer">Principal Lecturer Portal</option>
                    <option value="programLeader">Program Leader Portal</option>
                  </select>
                </div>

                {/* Student ID field - ONLY shows for Student Portal */}
                {formData.role === 'student' && (
                  <div className="form-group">
                    <label>Student ID:</label>
                    <input
                      type="text"
                      name="studentId"
                      className="form-control"
                      value={formData.studentId}
                      onChange={handleInputChange}
                      required={formData.role === 'student'}
                    />
                  </div>
                )}

                {/* Employee ID field - ONLY shows for Lecturer, Principal Lecturer, Program Leader */}
                {(formData.role === 'lecturer' || formData.role === 'principalLecturer' || formData.role === 'programLeader') && (
                  <div className="form-group">
                    <label>Employee ID:</label>
                    <input
                      type="text"
                      name="employeeId"
                      className="form-control"
                      value={formData.employeeId}
                      onChange={handleInputChange}
                      required={formData.role !== 'student'}
                    />
                  </div>
                )}

                <button type="submit" className="auth-submit-btn">
                  Login to Portal
                </button>
              </form>
            ) : (
              <form onSubmit={handleSignupSubmit}>
                <div className="form-group">
                  <label>Full Name:</label>
                  <input
                    type="text"
                    name="fullName"
                    className="form-control"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email Address:</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Select Role:</label>
                  <select
                    name="role"
                    className="form-control"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="student">Student</option>
                    <option value="lecturer">Lecturer</option>
                    <option value="principalLecturer">Principal Lecturer</option>
                    <option value="programLeader">Program Leader</option>
                  </select>
                </div>

                {/* Student ID field - ONLY shows for Student role */}
                {formData.role === 'student' && (
                  <div className="form-group">
                    <label>Student ID:</label>
                    <input
                      type="text"
                      name="studentId"
                      className="form-control"
                      value={formData.studentId}
                      onChange={handleInputChange}
                      required={formData.role === 'student'}
                    />
                  </div>
                )}

                {/* Employee ID field - ONLY shows for Lecturer, Principal Lecturer, Program Leader roles */}
                {(formData.role === 'lecturer' || formData.role === 'principalLecturer' || formData.role === 'programLeader') && (
                  <div className="form-group">
                    <label>Employee ID:</label>
                    <input
                      type="text"
                      name="employeeId"
                      className="form-control"
                      value={formData.employeeId}
                      onChange={handleInputChange}
                      required={formData.role !== 'student'}
                    />
                  </div>
                )}

                <div className="form-group">
                  <label>Password:</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Confirm Password:</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <button type="submit" className="auth-submit-btn">
                  Create Account
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="dashboard-info">
          <h3>System Features</h3>
          <div className="features-grid">
            <div className="feature-card">
              <h4>Student Portal</h4>
              <p>Monitor timetables, report challenges, view FICT programs</p>
            </div>
            <div className="feature-card">
              <h4>Lecturer Portal</h4>
              <p>Record attendance, submit reports, monitor student behavior</p>
            </div>
            <div className="feature-card">
              <h4>Principal Lecturer</h4>
              <p>View reports, provide feedback, monitor courses</p>
            </div>
            <div className="feature-card">
              <h4>Program Leader</h4>
              <p>Assign courses, view reports, manage programs</p>
            </div>
          </div>
        </div>
      </div>

      {/* CSS remains the same */}
      <style jsx>{`
        .dashboard {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .dashboard-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          position: relative;
        }

        /* ... (rest of your CSS remains exactly the same) ... */
        
        .dashboard-header {
          background: rgba(255, 255, 255, 0.95);
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          margin-bottom: 30px;
          position: relative;
        }

        .dashboard-header h1 {
          color: #2c3e50;
          margin: 0;
          font-size: 2.5em;
          font-weight: 700;
        }

        .dashboard-header p {
          color: #7f8c8d;
          font-size: 1.2em;
          margin: 10px 0 0 0;
        }

        /* Top Right Auth Buttons */
        .top-auth-buttons {
          position: absolute;
          top: 30px;
          right: 30px;
          display: flex;
          gap: 15px;
        }

        .top-auth-btn {
          padding: 12px 25px;
          border: none;
          border-radius: 8px;
          font-size: 1em;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .top-login-btn {
          background: #3498db;
          color: white;
        }

        .top-login-btn:hover {
          background: #2980b9;
          transform: translateY(-2px);
        }

        .top-signup-btn {
          background: #2ecc71;
          color: white;
        }

        .top-signup-btn:hover {
          background: #27ae60;
          transform: translateY(-2px);
        }

        /* Auth Container */
        .auth-container {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          margin-bottom: 30px;
        }

        .auth-tabs {
          display: flex;
          background: #f8f9fa;
          border-bottom: 2px solid #e9ecef;
        }

        .auth-tab {
          flex: 1;
          padding: 20px;
          border: none;
          background: transparent;
          font-size: 1.1em;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #6c757d;
        }

        .auth-tab.active {
          background: white;
          color: #3498db;
          border-bottom: 3px solid #3498db;
        }

        .auth-tab:hover:not(.active) {
          background: #e9ecef;
          color: #495057;
        }

        /* Form Styles */
        .auth-form {
          padding: 40px;
        }

        .form-group {
          margin-bottom: 25px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #2c3e50;
        }

        .form-control {
          width: 100%;
          padding: 12px 15px;
          border: 2px solid #e9ecef;
          border-radius: 8px;
          font-size: 1em;
          transition: border-color 0.3s ease;
          box-sizing: border-box;
        }

        .form-control:focus {
          outline: none;
          border-color: #3498db;
          box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
        }

        .auth-submit-btn {
          width: 100%;
          padding: 15px;
          background: linear-gradient(135deg, #3498db, #2980b9);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1.1em;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .auth-submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
        }

        /* Info Section */
        .dashboard-info {
          background: rgba(255, 255, 255, 0.95);
          padding: 40px;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .dashboard-info h3 {
          color: #2c3e50;
          margin-bottom: 30px;
          font-size: 2em;
          text-align: center;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 25px;
        }

        .feature-card {
          background: #f8f9fa;
          padding: 25px;
          border-radius: 10px;
          text-align: center;
          transition: transform 0.3s ease;
          border-left: 4px solid #3498db;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        }

        .feature-card h4 {
          color: #2c3e50;
          margin-bottom: 15px;
          font-size: 1.3em;
        }

        .feature-card p {
          color: #7f8c8d;
          line-height: 1.6;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .dashboard-container {
            padding: 15px;
          }

          .dashboard-header {
            padding: 20px;
          }

          .dashboard-header h1 {
            font-size: 2em;
          }

          .top-auth-buttons {
            position: static;
            justify-content: center;
            margin-top: 20px;
          }

          .auth-form {
            padding: 25px;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .auth-tabs {
            flex-direction: column;
          }

          .top-auth-buttons {
            flex-direction: column;
          }

          .top-auth-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;