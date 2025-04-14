import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext.jsx';
import { FaFileMedical, FaPills, FaRobot } from 'react-icons/fa';
import { motion } from 'framer-motion';
import axios from 'axios';
import './chatbot.css';

const Dashboard = () => {
  const { user, isLoading, token } = useContext(UserContext);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    dob: null,
    reportsCount: 0,
    scansCount: 0,
    queriesCount: 0,
    activities: [],
    healthRecords: [], // Initialized as empty array
  });
  const [error, setError] = useState('');
  const [hasFetched, setHasFetched] = useState(false); // New state to track fetch completion

  // Calculate age from dob
  const calculateAge = (dob) => {
    if (!dob) return null;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  useEffect(() => {
    // Only redirect to '/' if not loading and user is explicitly null after fetch attempt
    if (!isLoading && !user && hasFetched) {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('email');
      localStorage.removeItem('token');
      navigate('/');
    }
  }, [user, isLoading, navigate, hasFetched]);

  useEffect(() => {
    if (user && token && !hasFetched) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUserData({
            name: response.data.name || 'User',
            dob: response.data.dob || null,
            reportsCount: response.data.reportsCount || 0,
            scansCount: response.data.scansCount || 0,
            queriesCount: response.data.queriesCount || 0,
            activities: response.data.activities || [],
            healthRecords: response.data.healthRecords || [], // Ensure healthRecords is set
          });
          setHasFetched(true); // Mark fetch as complete
        } catch (err) {
          console.error('Error fetching user data:', err);
          setError(
            err.response?.status === 401 || err.response?.status === 403
              ? 'Please log in again.'
              : 'Failed to load dashboard data.'
          );
          if (err.response?.status === 401 || err.response?.status === 403) {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('email');
            localStorage.removeItem('token');
            setHasFetched(true); // Allow redirect
          }
        }
      };
      fetchData();
    }
  }, [user, token, hasFetched]);

  if (isLoading || !hasFetched) {
    return <div className="text-center p-6 text-ayurBrown">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background p-4 sm:p-8 max-w-7xl mx-auto">
      {/* Profile Card and Health Stats Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-md p-6"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-primary">{userData.name}</h1>
          {userData.dob && (
            <p className="text-xl sm:text-2xl font-normal text-ayurBrown mt-1">
              Age: {calculateAge(userData.dob)}
            </p>
          )}
          <p className="text-ayurBrown mt-2">Explore your health insights below.</p>
        </motion.div>

        {/* Health Stats Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-md p-6"
        >
          <h2 className="text-xl font-semibold text-primary mb-4">Your Health Stats</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm text-ayurBrown">Lab Reports</p>
              <p className="text-2xl font-bold text-accent">{userData.reportsCount}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-ayurBrown">Medicine Scans</p>
              <p className="text-2xl font-bold text-accent">{userData.scansCount}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-ayurBrown">AI Queries</p>
              <p className="text-2xl font-bold text-accent">{userData.queriesCount}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-red-100 text-red-600 p-4 rounded-xl mb-6"
        >
          {error}
        </motion.div>
      )}

      {/* Quick Action */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-2xl shadow-md p-6 mb-8"
      >
        <h2 className="text-xl font-semibold text-primary mb-4">Quick Action</h2>
        <p className="text-ayurBrown mb-4">Get started with a new report.</p>
        <button
          onClick={() => navigate('/labreport')}
          className="bg-primary text-white px-6 py-2 rounded-xl hover:bg-accent transition"
        >
          Upload Report
        </button>
      </motion.div>

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          onClick={() => navigate('/labreport')}
          className="cursor-pointer bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition flex items-start"
        >
          <FaFileMedical className="text-3xl mr-4 text-primary" />
          <div>
            <h2 className="text-xl font-semibold text-primary">Lab Report Summary</h2>
            <p className="text-ayurBrown">Upload or scan reports for AI summaries.</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          onClick={() => navigate('/medicine')}
          className="cursor-pointer bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition flex items-start"
        >
          <FaPills className="text-3xl mr-4 text-softGreen" />
          <div>
            <h2 className="text-xl font-semibold text-primary">Medicine Analyzer</h2>
            <p className="text-ayurBrown">Scan medicine strips for insights.</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          onClick={() => navigate('/chatbot')}
          className="cursor-pointer bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition flex items-start"
        >
          <FaRobot className="text-3xl mr-4 text-accent" />
          <div>
            <h2 className="text-xl font-semibold text-primary">Chat with AI</h2>
            <p className="text-ayurBrown">Ask health-related questions.</p>
          </div>
        </motion.div>
      </div>

      {/* Past Activities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-white rounded-2xl shadow-md p-6"
      >
        <h2 className="text-xl font-semibold text-primary mb-4">Past Activities</h2>
        {userData.activities.length === 0 ? (
          <p className="text-ayurBrown">No records yet. Upload a report or ask a query to begin!</p>
        ) : (
          <div className="space-y-4">
            {userData.activities.map((activity, idx) => (
              <div key={idx} className="flex items-start border-l-4 border-primary pl-4 py-2">
                <div>
                  <p className="text-ayurBrown font-medium">{activity.action}</p>
                  <p className="text-sm text-ayurBrown">
                    {new Date(activity.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;