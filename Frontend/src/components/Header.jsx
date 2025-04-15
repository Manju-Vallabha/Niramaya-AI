import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext.jsx';
import logo from '/symbol-logo.png';

const Header = () => {
  const { fetchUser, setToken, user } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const [showModal, setShowModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loggedInStatus === 'true');

    if (path === '/' && !user && !loggedInStatus) {
      handleLogout();
    }
  }, [path, user]);

  const handleNavigate = (route) => {
    navigate(route);
  };

  const handleLogout = async () => {
    try {
      // Send logout request to the server
      const response = await fetch(`${import.meta.env.VITE_API_URL}/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailInput }),
      });
  
      // Clear local state and storage
      setToken('');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('email');
      localStorage.removeItem('token');
      setIsLoggedIn(false);
  
      // Refresh user data
      await fetchUser();
  
      // Navigate to home if not already there
      if (path !== '/') handleNavigate('/');
    } catch (error) {
      console.error('Logout failed:', error.response?.data?.message || error.message);
      
      // Optionally still clear local data even if server request fails
      setToken('');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('email');
      localStorage.removeItem('token');
      setIsLoggedIn(false);
  
      // Navigate to home
      if (path !== '/') handleNavigate('/');
    }
  };

  const handleLoginClick = () => setShowModal(true);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!emailInput) {
      setError('Email is required');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailInput }),
      });

      const data = await response.json();

      if (response.status === 404) {
        setShowModal(false);
        setShowRegisterModal(true);
        setTimeout(() => {
          setShowRegisterModal(false);
          navigate(`/Register?email=${encodeURIComponent(emailInput)}`);
        }, 2000);
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || 'Login failed.');
      }

      if (data.exists) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('email', emailInput);
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setIsLoggedIn(true);
        setShowModal(false);
        await fetchUser();
        handleNavigate('/dashboard');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setEmailInput('');
    }
  };

  // Responsive button styles
  const buttonStyle = 'bg-white text-primary font-semibold rounded-full shadow-lg transition duration-300 font-inter text-xs py-1.5 px-3 min-w-[100px] sm:text-base sm:py-2.5 sm:px-6 sm:min-w-[150px]';

  const renderButtons = () => {
    if (path === '/') {
      return isLoggedIn ? (
        <button onClick={handleLogout} className={buttonStyle}>Logout</button>
      ) : (
        <button onClick={handleLoginClick} className={buttonStyle}>Login</button>
      );
    }
    if (path === '/Register') {
      return <button onClick={() => handleNavigate('/')} className={buttonStyle}>Home</button>;
    }
    if (path === '/Login') {
      return <button onClick={() => handleNavigate('/')} className={buttonStyle}>Home</button>;
    }
    if (path === '/dashboard') {
      return <button onClick={handleLogout} className={buttonStyle}>Logout</button>;
    }
    if (path === '/chatbot') {
      return <button onClick={handleLogout} className={buttonStyle}>Logout</button>;
    }
    if (path === '/labreport' || path === '/medicine') {
      return (
        <>
          <button onClick={() => handleNavigate('/dashboard')} className={buttonStyle}>Dashboard</button>
          <button onClick={handleLogout} className={buttonStyle}>Logout</button>
        </>
      );
    }
    return null;
  };

  return (
    <>
      <header className={`bg-primary text-white px-4 py-4 ${path === '/' ? '' : 'rounded-b-2xl'} z-50 relative`}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavigate('/')}>
            <img src={logo} alt="Niramaya Logo" className="w-10 h-10 md:w-14 md:h-14 object-cover rounded-full" />
            <div className="flex flex-col">
              <h1 className="text-xl md:text-3xl font-bold tracking-wide">Niramaya AI</h1>
              <span className="text-xs md:text-sm text-gray-200 font-light">Health Meets AI</span>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {renderButtons()}
          </div>
        </div>
      </header>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex flex-col items-center">
              <img
                src={logo}
                alt="Niramaya Logo"
                className="w-16 h-16 object-cover rounded-full mb-4"
              />
              <h2 className="text-xl font-semibold text-primary mb-4 text-center">Enter your Gmail</h2>
            </div>
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="you@gmail.com"
                required
                className="w-full border border-primary px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              />
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <div className="flex justify-center gap-2">
  <button
    type="button"
    onClick={() => setShowModal(false)}
    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
  >
    Cancel
  </button>
  <button
    type="submit"
    disabled={loading}
    className="px-4 py-2 bg-primary text-white rounded hover:bg-softGreen"
  >
    {loading ? 'Checking...' : 'Continue'}
  </button>
</div>
            </form>
          </div>
        </div>
      )}

      {showRegisterModal && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-ayurBrown text-white px-6 py-4 rounded-xl shadow-xl w-full max-w-xs text-center">
            <img
              src={logo}
              alt="Niramaya Logo"
              className="w-12 h-12 object-cover rounded-full mx-auto mb-3"
            />
            <h3 className="text-lg font-semibold">📝 You need to register!</h3>
            <p className="text-sm">Redirecting to register page...</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
