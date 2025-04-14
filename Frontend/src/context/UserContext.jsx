import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const fetchUser = async () => {
    if (!token) {
      setUser(null);
      setIsLoading(false);
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('email');
      localStorage.removeItem('token');
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUser({
          name: data.name || '',
          email: data.email || '',
          dob: data.dob || '',
          reportsCount: data.reportsCount || 0,
          scansCount: data.scansCount || 0,
          queriesCount: data.queriesCount || 0,
        });
      } else {
        setUser(null);
        setToken('');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('email');
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
      setUser(null);
      setToken('');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('email');
      localStorage.removeItem('token');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [token]);

  return (
    <UserContext.Provider value={{ user, setUser, fetchUser, token, setToken, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};