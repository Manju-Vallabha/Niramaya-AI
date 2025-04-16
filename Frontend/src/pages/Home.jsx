import React, { useContext, useCallback, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext.jsx';
import { FaFileMedical, FaPills, FaRobot, FaGlobe, FaLinkedin } from 'react-icons/fa';
import { motion } from 'framer-motion';
import axios from 'axios';
import './home.css';

const Home = () => {
  const { user, isLoading } = useContext(UserContext);
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [isPaused, setIsPaused] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('Server is taking too long to respond.');
  const [popupTitle, setPopupTitle] = useState('Connection Issue');
  const languageSectionRef = useRef(null);

  const languages = ['English', 'Hindi', 'Telugu', 'Tamil'];
  const translations = {
    English: 'Health is Wealth.',
    Hindi: 'स्वास्थ्य ही धन है।',
    Telugu: 'ఆరోగ్యమే సంపద.',
    Tamil: 'ஆரோக்கியமே செல்வம்.',
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const cardClickVariants = {
    rest: { scale: 1, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' },
    hover: {
      scale: 1.03,
      boxShadow: '0 0 5px 2px #2C7A7B',
      transition: { duration: 0.3 },
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.2 },
    },
  };

  const linkedinVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.1, transition: { duration: 0.2 } },
    tap: { scale: 1.2, transition: { duration: 0.2 } },
  };

  // Auto-cycle languages
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setSelectedLanguage((prev) => {
        const currentIndex = languages.indexOf(prev);
        const nextIndex = (currentIndex + 1) % languages.length;
        return languages[nextIndex];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, languages]);

  useEffect(() => {
    let popupTimer;
    let timeoutTimer;

    const sendWakeupRequest = async () => {
      // Set a timeout to show popup if request takes longer than 10 seconds
      timeoutTimer = setTimeout(() => {
        setShowPopup(true);
        setPopupTitle('Connection Issue');
        setPopupMessage('Server is taking too long to respond.');
      }, 10000);

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/wakeup`,
          { source: 'home-page' },
          { timeout: 15000 }
        );

        const data = response.data;
        if (!data.success) {
          setShowPopup(true);
          setPopupTitle('Server Error');
          setPopupMessage(data.message || 'Server responded with an error.');
          popupTimer = setTimeout(() => {
            setShowPopup(false);
          }, 5000);
        }
      } catch (error) {
        setShowPopup(true);
        setPopupTitle('Connection Issue');
        setPopupMessage(
          error.code === 'ECONNABORTED'
            ? 'Server is taking too long to respond.'
            : error.response?.data?.message || 'Failed to connect to the server.'
        );
        popupTimer = setTimeout(() => {
          setShowPopup(false);
        }, 5000);
      } finally {
        clearTimeout(timeoutTimer);
      }
    };

    sendWakeupRequest();

    return () => {
      if (popupTimer) clearTimeout(popupTimer);
      if (timeoutTimer) clearTimeout(timeoutTimer);
    };
  }, []);

  const handleFeatureClick = useCallback(
    (path) => {
      navigate(user ? path : '/Register');
    },
    [user, navigate]
  );

  const handleLanguageSelect = (lang) => {
    setSelectedLanguage(lang);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 10000);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const team = [
    { name: 'Manju Vallabha Pavalla', role: 'AI Intern', photo: '/person_1.jpeg', linkedin: 'https://www.linkedin.com/in/manju-vallabha-pavalla/' },
    { name: 'Sirikonda Laxmi Sagar', role: 'AI Intern', photo: '/person_2.jpeg', linkedin: 'https://www.linkedin.com/in/sagar-sirikonda/' },
    { name: 'Venkata Harish Kumar Kasibhotla', role: 'Engineering Manager - DevOps', photo: '/person_3.jpeg', linkedin: 'https://www.linkedin.com/in/venkata-harish-kumar-kasibhotla/' },
    { name: 'Bhumika Patel', role: 'Senior Business Operations Analyst', photo: '/person_4.jpeg', linkedin: 'https://www.linkedin.com/in/bhumika-patel-1021/' },
  ];

  const techStack = [
    { name: 'React', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/react.svg', desc: 'Dynamic UI' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/javascript.svg', desc: 'Core logic' },
    { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/postgresql.svg', desc: 'Reliable DB' },
    { name: 'Vercel', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/vercel.svg', desc: 'Seamless deploy' },
    { name: 'Render', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/render.svg', desc: 'Scalable hosting' },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background" role="status" aria-live="polite">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary"></div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-sans">
      {showPopup && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="alert"
          aria-live="assertive"
        >
          <div className="bg-primary rounded-lg shadow-xl p-6 w-full max-w-xs sm:max-w-sm relative">
            <div className="flex justify-center mb-4">
              <img
                src="/symbol-logo.png"
                alt="Niramaya AI Logo"
                className="w-16 h-16 rounded-full object-cover"
                style={{ backgroundColor: '#2C7A7B' }}
              />
            </div>
            <h3 className="text-lg font-semibold text-white text-center mb-2" style={{ color: '#FFFFFF' }}>
              {popupTitle}
            </h3>
            <p className="text-white text-center mb-4">{popupMessage}</p>
            <button
              onClick={closePopup}
              className="bg-white text-primary py-2 px-4 rounded-full font-semibold hover:bg-teal-600 transition duration-300 w-full"
              aria-label="Close popup"
            >
              Got it
            </button>
          </div>
        </motion.div>
      )}

      <motion.section
        className="bg-primary text-white py-16 px-4 sm:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        role="banner"
      >
        <div className="max-w-5xl mx-auto text-center">
          <img
            src="/symbol-logo.png"
            alt="Niramaya AI Logo"
            className="mx-auto mb-6 w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover"
            style={{ backgroundColor: '#2C7A7B' }}
          />
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight font-inter text-white">
            Welcome to Niramaya AI
          </h1>
          <h2 className="text-xl sm:text-2xl mb-4 font-semibold text-white font-inter">
            Health Meets AI
          </h2>
          <p className="text-base sm:text-lg mb-6 max-w-2xl mx-auto text-white font-light font-inter">
            Revolutionizing healthcare through smart diagnostics. Upload reports, analyze medicines, and receive instant, AI-powered medical insights.
          </p>
          <motion.button
            onClick={() => navigate('/Register')}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-primary font-semibold py-2 px-4 rounded-full shadow-lg transition duration-300 font-inter text-sm min-w-[120px] sm:min-w-[150px]"
            aria-label="Try Niramaya AI Now"
          >
            Try Niramaya AI
          </motion.button>
        </div>
      </motion.section>

      <motion.section
        className="py-16 px-4 sm:px-8 max-w-7xl mx-auto bg-background"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        aria-labelledby="features-heading"
      >
        <h2 id="features-heading" className="text-3xl sm:text-4xl font-bold text-primary text-center mb-10">
          Why Niramaya AI?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
          {[
            {
              icon: <FaFileMedical className="text-4xl text-primary" />,
              title: 'Lab Report Summary',
              desc: 'Instant AI summaries to demystify your health reports.',
              path: '/labreport',
            },
            {
              icon: <FaPills className="text-4xl text-primary" />,
              title: 'Medicine Analyzer',
              desc: 'Understand medications with personalized insights.',
              path: '/medicine',
            },
            {
              icon: <FaRobot className="text-4xl text-primary" />,
              title: 'AI Health Chatbot',
              desc: 'Get reliable answers to health queries anytime.',
              path: '/chatbot',
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={cardClickVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center cursor-pointer border border-gray-100"
              onClick={() => handleFeatureClick(feature.path)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleFeatureClick(feature.path)}
              aria-label={`Explore ${feature.title}`}
            >
              {feature.icon}
              <h3 className="text-lg sm:text-xl font-semibold text-primary mt-4 text-center">{feature.title}</h3>
              <p className="text-gray-600 mt-2 text-sm sm:text-base text-center">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        ref={languageSectionRef}
        className="py-16 px-4 sm:px-8 max-w-5xl mx-auto bg-background"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        aria-labelledby="accessibility-heading"
      >
        <h2 id="accessibility-heading" className="text-3xl sm:text-4xl font-bold text-primary text-center mb-8">
          Experience Health in Your Language
        </h2>
        <p className="text-gray-600 text-base sm:text-lg text-center mb-8 max-w-2xl mx-auto">
          Select a language to see how Niramaya AI delivers health insights for everyone.
        </p>
        <div className="flex flex-row justify-center gap-2 mb-8 overflow-x-auto">
          {languages.map((lang) => (
            <motion.button
              key={lang}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-2 py-1 rounded-full text-xs sm:text-base 
                ${selectedLanguage === lang
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-primary hover:bg-gray-300'
                } 
                ${languages.length > 3 ? 'flex-1 max-w-[70px] sm:max-w-[100px]' : 'min-w-fit max-w-[80px] sm:max-w-[100px]'}`}
              onMouseEnter={() => handleLanguageSelect(lang)}
              onClick={() => handleLanguageSelect(lang)}
              aria-label={`Preview ${lang} language`}
            >
              {lang}
            </motion.button>
          ))}
        </div>
        <motion.p
          key={selectedLanguage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-gray-600 text-base sm:text-lg text-center max-w-md mx-auto"
        >
          {translations[selectedLanguage]}
        </motion.p>
        <div className="text-center mt-8">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="bg-primary text-white font-semibold py-2 px-4 rounded-full shadow-lg text-sm min-w-[120px] sm:min-w-[150px]"
            onClick={() => handleFeatureClick('/Register')}
            aria-label="Try Chatbot in Your Language"
          >
            Try Niramaya AI
          </motion.button>
        </div>
      </motion.section>

      <div className="bg-secondary py-12 px-4 sm:px-8">
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
    {/* Section: Powered by Meta Llama */}
    <motion.section
      className="bg-primary flex-1 py-8 px-4 rounded-lg shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      aria-labelledby="meta-llama-heading"
    >
      <div className="flex flex-col items-center text-center gap-4">
        <img
          src="/meta-llama.png"
          alt="Meta AI Logo"
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-gray-200 shadow-md"
          style={{ backgroundColor: '#2C7A7B' }}
          onError={(e) => (e.target.src = 'https://via.placeholder.com/128')}
        />
        <div>
          <h2 id="meta-llama-heading" className="text-xl sm:text-2xl font-bold text-white mb-3">
            Powered by Meta Llama
          </h2>
          <p className="text-white text-sm sm:text-base mb-4">
            Powered by the advanced <strong>Meta Llama 3.3 70B</strong> language model, Niramaya AI delivers highly accurate and efficient medical insights. Our system intelligently extracts and processes text from medical images using state-of-the-art OCR techniques.
          </p>
          <motion.a
            href="https://www.meta.ai/"
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.95 }}
            className="bg-white text-primary font-semibold py-2 px-4 rounded-full shadow-lg transition duration-300 inline-block text-sm min-w-[120px]"
            aria-label="Visit Meta Llama Website"
          >
            Visit Meta Llama
          </motion.a>
        </div>
      </div>
    </motion.section>

    {/* Section: Powered by Llama-OCR */}
    <motion.section
      className="bg-white flex-1 py-8 px-4 rounded-lg shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      aria-labelledby="llama-ocr-heading"
    >
      <div className="flex flex-col items-center text-center gap-4">
        <img
          src="/llama-ocr.png"
          alt="Llama-OCR Logo"
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-gray-200 shadow-md"
          style={{ backgroundColor: '#2C7A7B' }}
          onError={(e) => (e.target.src = 'https://via.placeholder.com/128')}
        />
        <div>
          <h2 id="llama-ocr-heading" className="text-xl sm:text-2xl font-bold text-primary mb-3">
            Powered by Llama-OCR
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mb-4">
            Llama-OCR, an open-source npm library powered by Together.ai’s Llama 3.2 Vision model, extracts text from medical images with high precision for personalized health insights.
          </p>
          <motion.a
            href="https://llamaocr.com"
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.95 }}
            className="bg-primary text-white font-semibold py-2 px-4 rounded-full shadow-lg transition duration-300 inline-block text-sm min-w-[120px]"
            aria-label="Visit Llama-OCR Website"
          >
            Visit Llama-OCR
          </motion.a>
        </div>
      </div>
    </motion.section>

    {/* Section: Powered by Together.ai */}
    <motion.section
      className="bg-primary flex-1 py-8 px-4 rounded-lg shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      aria-labelledby="together-ai-heading"
    >
      <div className="flex flex-col items-center text-center gap-4">
        <img
          src="/together-ai.png"
          alt="Together.ai Logo"
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-gray-200 shadow-md"
          style={{ backgroundColor: '#2C7A7B' }}
          onError={(e) => (e.target.src = 'https://via.placeholder.com/128')}
        />
        <div>
          <h2 id="together-ai-heading" className="text-xl sm:text-2xl font-bold text-white mb-3">
            Powered by Together.ai
          </h2>
          <p className="text-white text-sm sm:text-base mb-4">
            Together.ai hosts Llama-OCR and Meta Llama 3.3 70B, powering Niramaya AI’s image processing and medical insights with low-latency, scalable infrastructure.
          </p>
          <motion.a
            href="https://together.ai"
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.95 }}
            className="bg-white text-primary font-semibold py-2 px-4 rounded-full shadow-lg transition duration-300 inline-block text-sm min-w-[120px]"
            aria-label="Visit Together.ai Website"
          >
            Visit Together.ai
          </motion.a>
        </div>
      </div>
    </motion.section>
  </div>
</div>

      <motion.section
        className="py-16 px-4 sm:px-8 max-w-7xl mx-auto bg-background"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        aria-labelledby="tech-stack-heading"
      >
        <h2 id="tech-stack-heading" className="text-3xl sm:text-4xl font-bold text-primary text-center mb-10">
          Built with Cutting-Edge Tech
        </h2>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto text-sm sm:text-base">
          Our robust stack ensures scalability, performance, and seamless user experiences.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {techStack.map((tech, index) => (
            <motion.div
              key={index}
              variants={cardClickVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className="bg-white rounded-xl shadow-md p-4 sm:p-6 text-center flex flex-col items-center"
            >
              <img
                src={tech.icon}
                alt={`${tech.name} icon`}
                className="w-10 h-10 sm:w-12 sm:h-12 mb-4 object-contain"
                onError={(e) => (e.target.src = 'https://via.placeholder.com/48')}
              />
              <h3 className="text-base sm:text-lg font-semibold text-primary">{tech.name}</h3>
              <p className="text-xs sm:text-sm text-gray-500">{tech.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="bg-white py-16 px-4 sm:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        aria-labelledby="health-impact-heading"
      >
        <div className="max-w-5xl mx-auto text-center">
          <h2 id="health-impact-heading" className="text-3xl sm:text-4xl font-bold text-primary mb-6">
            Revolutionizing Healthcare
          </h2>
          <p className="text-gray-600 text-base sm:text-lg mb-8">
            Niramaya AI empowers patients and providers by simplifying health data. We’ve reduced lab report analysis time by 80%, improved medication adherence for thousands, and bridged health literacy gaps across diverse communities.
          </p>
        </div>
      </motion.section>

      <motion.section
        className="py-16 px-4 sm:px-8 max-w-7xl mx-auto bg-background"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        aria-labelledby="team-heading"
      >
        <h2 id="team-heading" className="text-3xl sm:text-4xl font-bold text-primary text-center mb-4">
          Meet The AI-nfluencers
        </h2>
        <p className="text-gray-600 text-base sm:text-lg text-center mb-10 max-w-3xl mx-auto">
          United by a mission to democratize healthcare<br />
          our team blends AI expertise with a passion for impact.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 justify-center flex-wrap">
          {team.map((member, index) => (
            <motion.div
              key={index}
              variants={cardClickVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className="bg-white rounded-xl shadow-lg p-4 sm:p-6 text-center flex flex-col items-center min-h-fit"
            >
              <img
                src={member.photo}
                alt={`Portrait of ${member.name}`}
                className="w-24 h-24 sm:w-24 sm:h-24 rounded-full mx-auto mb-4 object-cover border-2 border-primary"
                loading="lazy"
              />
              <h3 className="text-sm sm:text-lg font-verdana text-primary"><strong>{member.name}</strong></h3>
              <p className="text-gray-600 text-xs sm:text-base mt-2">{member.role}</p>
              <motion.a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                variants={linkedinVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                className="inline-block mt-2"
                aria-label={`Visit ${member.name}'s LinkedIn profile`}
              >
                <FaLinkedin className="text-xl sm:text-2xl text-primary" />
              </motion.a>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <footer className="bg-primary text-white py-8 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm mb-2">Niramaya AI. Health Meets AI.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
