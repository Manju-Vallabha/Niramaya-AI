import React, { useState, useEffect, useContext, useRef } from 'react';
import { FaStethoscope, FaFileUpload } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import axios from 'axios';
import { UserContext } from '../context/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import logo from '/symbol-logo.png';
import './chatbot.css';

function LabReport() {
  const { user, isLoading, token } = useContext(UserContext);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [language, setLanguage] = useState('');
  const [step, setStep] = useState('start');
  const [aiSummary, setAiSummary] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [animationComplete, setAnimationComplete] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);
  const [error, setError] = useState('');

  const resultRef = useRef(null); // 🔥 Scroll target

  useEffect(() => {
    if (!isLoading && !user) {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('email');
      localStorage.removeItem('token');
      navigate('/');
    }
  }, [user, isLoading, navigate]);

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
      if (!validTypes.includes(uploadedFile.type)) {
        setError('Please upload a digital PDF or a scanned image (JPEG/PNG).');
        setStep('error');
        return;
      }
      setFile(uploadedFile);
      setFileName(uploadedFile.name);
      setStep('uploaded');
      setError('');
    }
  };


  const handleLanguageSelect = (lang) => setLanguage(lang);

  const languageMap = {
    English: 'English',
    हिंदी: 'Hindi',
    తెలుగు: 'Telugu',
    தமிழ்: 'Tamil',
  };

  const handleAnalyze = () => {
    if (!file || !language) return;
    setStep('warning');
  };

  const proceedToAnalyze = async () => {
    setStep('analyzing');
    setError('');
    const formData = new FormData();
    formData.append('file', file);
    formData.append('language', language);
  
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/labreport`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('proceedToAnalyze - Backend response:', response.data);
      const llmResponse = response.data.llmResponse || '';
      console.log('proceedToAnalyze - llmResponse:', llmResponse);
      setAiSummary(llmResponse.trim());
      console.log('proceedToAnalyze - aiSummary set:', llmResponse.trim());
      setStep('done');
    } catch (err) {
      console.error('proceedToAnalyze - Error:', err);
      setStep('error');
      setError(
        err.response?.status === 401 || err.response?.status === 403
          ? 'Please log in again.'
          : err.response?.data?.message || 'Failed to analyze the document. Please try again.'
      );
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('email');
        localStorage.removeItem('token');
        navigate('/');
      }
    }
  };
  
  const startTypingEffect = (text) => {
    if (!text || typeof text !== 'string') {
      console.error("Invalid text for typing effect:", text);
      setIsTyping(false);
      setTypingComplete(true);
      return;
    }
  
    let index = 0; // Start from second character now
    setIsTyping(true);
    setTypingText(text[0] || ''); // Immediately show the first character
  
    const typingInterval = setInterval(() => {
      setTypingText((prev) => prev + (text[index] || ''));
      index++;
      if (index === text.length) {
        clearInterval(typingInterval);
        setIsTyping(false);
        setTypingComplete(true);
      }
    }, 30);
  };
  

  const uploadNewDocument = () => {
    setStep('start');
    setFile(null);
    setFileName('');
    setAiSummary('');
    setTypingText('');
    setLanguage('');
    setAnimationComplete(false);
    setTypingComplete(false);
    setError('');
  };

  const handleCloseError = () => {
    setStep('start');
    setError('');
  };

  // 🔁 Trigger typing after animation
  useEffect(() => {
      if (step === 'done' && !animationComplete && aiSummary) {
        console.log('useEffect - Starting typing effect with aiSummary:', aiSummary);
        setTimeout(() => {
          setAnimationComplete(true);
          startTypingEffect(aiSummary);
        }, 1000);
      }
    }, [step, animationComplete, aiSummary]);

  // 🔁 Scroll to result when animation completes
  useEffect(() => {
    if (step === 'done' && animationComplete && isTyping && resultRef.current) {
      const element = resultRef.current;
      const elementRect = element.getBoundingClientRect();
      const offset = 48; // Approx. height of two lines (e.g., 2 * 24px)
      const scrollPosition = window.scrollY + elementRect.bottom - window.innerHeight + offset;

      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth',
      });
    }
  }, [typingText, step, animationComplete, isTyping]);

  if (isLoading) return <div className="text-center p-6">Loading...</div>;
  if (!user) return null;

  return (
    <div className="bg-background flex flex-col items-center justify-center px-4 py-10 min-h-[calc(100vh-4rem)]">
      {step === 'start' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="mb-6"
              >
                <img
                  src={logo}
                  alt="Logo"
                  className="rounded-full w-28 h-28 object-cover border-4 border-primary shadow-2xl"
                />
              </motion.div>
            )}
      
      {step === 'start' && (
        
        <h2 className="text-2xl font-semibold text-primary mb-6 text-center">
          Upload Lab Report
        </h2>
      )}

      {step === 'start' && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-md p-8 w-full max-w-2xl flex flex-col gap-6 items-center"
        >
          <label
            htmlFor="file"
            className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-6 rounded-xl hover:border-primary transition w-full"
          >
            <FaFileUpload className="text-primary mb-2" size={32} />
            <span className="text-gray-700 font-medium text-center">
              Click to upload PDF or scanned image
            </span>
            <input
              id="file"
              type="file"
              accept="application/pdf,image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          <p className="text-sm text-gray-600 mt-4 text-center">
            Please upload a digital copy or a scanned image of your lab report.
          </p>
        </motion.div>
      )}

      {step === 'uploaded' && file && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-md p-8 w-full max-w-2xl mt-6"
        >
          <p className="text-green-600 font-medium text-sm text-center">
            ✅ Your document has been uploaded successfully.
          </p>
          <p className="text-sm text-gray-600 text-center mt-2">
            <strong>File Name:</strong> {fileName}
          </p>

          {error && (
            <p className="text-red-600 font-medium text-sm text-center mt-4">
              ❌ {error}
            </p>
          )}

          <div className="text-center w-full mt-6">
            <p className="text-primary font-medium mb-2">Choose your preferred language:</p>
            <div className="flex flex-wrap gap-4 justify-center">
            

{Object.entries(languageMap).map(([label, value]) => (
  <button
    key={value}
    onClick={() => handleLanguageSelect(value)} // send backend-friendly value
    className={`px-4 py-2 rounded-xl border ${
      language === value
        ? 'bg-primary text-white'
        : 'bg-white text-primary border-primary'
    }`}
  >
    {label} {/* Show user-friendly name */}
  </button>
))}

            </div>
          </div>

          <div className="flex justify-center mt-4">
            <button
              onClick={handleAnalyze}
              className="bg-primary text-white px-6 py-2 rounded-xl hover:bg-opacity-90"
              disabled={!file || !language}
            >
              Analyze the Document
            </button>
          </div>
        </motion.div>
      )}

      {step === 'error' && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full text-center"
          >
            <h3 className="text-lg font-semibold text-red-600 mb-2">⚠️ Invalid Upload</h3>
            <p className="text-gray-700 mb-4 text-sm">
              {error ||
                'The uploaded file is not detectable. Please upload a digital PDF or a scanned image (JPEG/PNG).'}
            </p>
            <button
              onClick={handleCloseError}
              className="bg-primary text-white px-6 py-2 rounded-xl hover:bg-opacity-90"
            >
              Try Again
            </button>
          </motion.div>
        </div>
      )}

      {/* Warning Popup */}
      {step === 'warning' && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full text-center"
          >
            <h3 className="text-lg font-semibold text-yellow-600 mb-2">⚠️ Confirm Analysis</h3>
            <p className="text-gray-700 mb-4 text-sm">
              Once you proceed, the image will be sent to our AI for analysis based on your language selection. Do you wish to continue?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setStep('uploaded')}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-xl hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={proceedToAnalyze}
                className="bg-primary text-white px-6 py-2 rounded-xl hover:bg-opacity-90"
              >
                Yes, Analyze
              </button>
            </div>
          </motion.div>
        </div>
      )}
      
      {step === 'analyzing' && (
        <div className="w-48 h-48 mt-8">
          <DotLottieReact
            src="https://lottie.host/742f443e-16b6-4ddd-95af-f01f8a5255cd/ZjJzXycMib.lottie"
            loop
            autoplay
            style={{ width: '100%', height: '100%' }}
          />
          <p className="text-accent mt-2 font-medium text-center">
            Analyzing your report with AI...
          </p>
        </div>
      )}

      {step === 'done' && animationComplete && (
        <motion.div
          ref={resultRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-start pt-4 px-4 max-w-2xl w-full"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-primary p-3 sm:p-4 md:p-5 rounded-full shadow-lg">
              <FaStethoscope className="text-white text-xl sm:text-2xl md:text-3xl" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-primary">Niramaya AI</h3>
          </div>

          <p className="text-sm sm:text-base text-accent mb-4">
            Your report analysis is complete.
          </p>

          <div className="text-base sm:text-base font-mono text-ayurBrown w-full">
            {isTyping ? (
              <p className="whitespace-pre-line blinking-text">{typingText}</p>
            ) : (
              <p className="whitespace-pre-line">{aiSummary}</p>
            )}
          </div>

          {typingComplete && (
            <div className="flex justify-start mt-6">
              <button
                onClick={uploadNewDocument}
                className="bg-softGreen text-white px-6 py-2 rounded-xl hover:bg-opacity-90"
              >
                Upload New Document
              </button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}

export default LabReport;
