import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext.jsx';

const Register = () => {
  const { fetchUser, setToken } = useContext(UserContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [healthRecords, setHealthRecords] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const emailFromURL = queryParams.get('email');

  useEffect(() => {
    if (emailFromURL) {
      setEmail(emailFromURL);
    }
  }, [emailFromURL]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !dob || !healthRecords) {
      alert('All fields are required.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, dob, healthRecords }),
      });

      const data = await response.json();

      if (response.status === 201) {
        setShowSuccess(true);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('email', email);
        localStorage.setItem('token', data.token);
        setToken(data.token);
        await fetchUser();
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative">
      {showSuccess && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-primary text-white px-6 py-4 rounded-xl shadow-xl w-full max-w-xs text-center">
            <h3 className="text-lg font-semibold">🎉 You are registered!</h3>
            <p className="text-sm">Redirecting to your dashboard...</p>
          </div>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-ayurBrown font-sans">Register</h2>
        <label className="block text-sm font-medium text-ayurBrown mb-1">Name</label>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full mb-4 p-3 border border-ayurBrown rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <label className="block text-sm font-medium text-ayurBrown mb-1">Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 p-3 border border-ayurBrown rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <label className="block text-sm font-medium text-ayurBrown mb-1">Date of Birth</label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
          className="w-full mb-4 p-3 border border-ayurBrown rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <label className="block text-sm font-medium text-ayurBrown mb-1">Past Health Records</label>
        <textarea
          placeholder="Past Health Records (e.g., Diabetes, Asthma...)"
          value={healthRecords}
          onChange={(e) => setHealthRecords(e.target.value)}
          required
          rows={4}
          className="w-full mb-6 p-3 border border-ayurBrown rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <button
          type="submit"
          className="w-full bg-primary text-white p-3 rounded-xl hover:bg-softGreen transition-all"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default Register;
