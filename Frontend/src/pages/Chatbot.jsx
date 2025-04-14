import { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext.jsx';
import { FiSend, FiUser } from 'react-icons/fi';
import { FaStethoscope } from 'react-icons/fa';
import symbolLogo from '/symbol-logo.png';
import { motion } from 'framer-motion';
import './chatbot.css';

function Chatbot() {
  const { user, isLoading, token } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  const [aiTyping, setAiTyping] = useState(false);
  const chatEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('email');
      localStorage.removeItem('token');
      navigate('/');
    }
  }, [user, isLoading, navigate]);

  const handleSend = async () => {
    if (!userInput.trim() || !user || !token || aiTyping) return;

    setHasStarted(true);
    const newMessage = { sender: 'user', text: userInput };
    setMessages((prev) => [...prev, newMessage]);
    setUserInput('');
    setAiTyping(true);

    setMessages((prev) => [...prev, { sender: 'thinking', text: 'Thinking...' }]);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/chatbot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ input: newMessage.text }),
      });

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('email');
        localStorage.removeItem('token');
        navigate('/');
        throw new Error('Please log in again');
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      simulateAiResponse(data.reply || '⚠️ Sorry, I could not understand that.');
    } catch (error) {
      console.error('[❌ Chat error]:', error);
      simulateAiResponse(
        error.message === 'No token provided' || error.message === 'Invalid token'
          ? 'Please log in to continue.'
          : 'Server error. Try again later.'
      );
    }
  };

  const simulateAiResponse = (reply) => {
    let index = 0;
    setAiTyping(true);

    const interval = setInterval(() => {
      index++;
      setMessages((prev) => [
        ...prev.filter((m) => m.sender !== 'thinking' && m.sender !== 'typing'),
        { sender: 'typing', text: reply.slice(0, index) },
      ]);

      if (index >= reply.length) {
        clearInterval(interval);
        setAiTyping(false);
        setMessages((prev) => [
          ...prev.filter((m) => m.sender !== 'typing' && m.sender !== 'thinking'),
          { sender: 'ai', text: reply },
        ]);
      }
    }, 20);
  };

  const handleNewChat = async () => {
    if (!user || !token) return;
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/clear-chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('email');
        localStorage.removeItem('token');
        navigate('/');
        return;
      }
      if (!response.ok) {
        throw new Error('Failed to clear chat');
      }
    } catch (err) {
      console.error('[❌ Clear chat error]:', err);
    }
    setMessages([]);
    setUserInput('');
    setHasStarted(false);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (user && token) {
      handleNewChat();
    }
  }, [user, token]);

  if (isLoading) {
    return <div className="text-center p-6">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 40, damping: 20, duration: 0.6 }}
      className="min-h-screen bg-background font-sans text-ayurBrown flex flex-col"
    >
      {!hasStarted ? (
        <div className="flex flex-1 items-center justify-center">
          <div className="flex flex-col items-center space-y-4 w-full max-w-xl px-4">
            <div className="w-32 h-32">
              <img
                src={symbolLogo}
                alt="Logo"
                className="w-full h-full rounded-full object-cover shadow-xl"
              />
            </div>
            <h1 className="text-3xl font-bold text-primary mb-2">Niramaya Chatbot</h1>
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Type your question..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                disabled={aiTyping}
                className="w-full border border-primary bg-white text-ayurBrown rounded-xl px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
              />
              <button
                onClick={handleSend}
                disabled={aiTyping}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-accent text-white p-2 rounded-full hover:bg-primary transition disabled:opacity-50"
              >
                <FiSend />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex-1 px-4 py-6 space-y-4 overflow-y-auto">
            {messages.map((msg, idx) => {
              const isUser = msg.sender === 'user';
              const isTyping = msg.sender === 'typing';
              const isThinking = msg.sender === 'thinking';
              return (
                <div
                  key={idx}
                  className={`max-w-2xl mx-auto flex ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex items-start space-x-2">
                    {!isUser && !isThinking && (
                      <div className="bg-primary text-white rounded-full p-2">
                        <FaStethoscope size={20} />
                      </div>
                    )}
                    <div
                      className={`${isUser ? 'bg-[#FFEEDB]' : ''} text-ayurBrown p-3 rounded-2xl`}
                    >
                      <p className={isTyping || isThinking ? 'blinking-text' : ''}>{msg.text}</p>
                    </div>
                    {isUser && (
                      <div className="bg-primary text-white rounded-full p-1">
                        <FiUser size={22} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            <div ref={chatEndRef} />
          </div>
          <motion.div
            className="w-full px-4 pb-2 flex justify-center gap-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 50, damping: 30, duration: 0.5 }}
          >
            <button
              onClick={handleNewChat}
              disabled={aiTyping}
              className="bg-primary text-white rounded-full px-4 py-2 shadow hover:bg-accent transition disabled:opacity-50"
            >
              New Chat
            </button>
            <button
              onClick={() => {
                navigate('/dashboard');
                handleNewChat();
              }}
              disabled={aiTyping}
              className="bg-primary text-white rounded-full px-4 py-2 shadow hover:bg-accent transition disabled:opacity-50"
            >
              Dashboard
            </button>
          </motion.div>
          <motion.div
            className="w-full px-4 pb-10"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 50, damping: 30, duration: 0.5 }}
          >
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Type your question..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                disabled={aiTyping}
                className="w-full border border-primary bg-white text-ayurBrown rounded-xl px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
              />
              <button
                onClick={handleSend}
                disabled={aiTyping}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-accent text-white p-2 rounded-full hover:bg-primary transition disabled:opacity-50"
              >
                <FiSend />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </motion.div>
  );
}

export default Chatbot;