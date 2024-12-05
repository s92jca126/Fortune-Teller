import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user'); // Check if user is already logged in
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // If so, set user data
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData)); // Store user in localStorage
    setUser(userData); // Update user state
  };

  const logout = () => {
    localStorage.removeItem('user'); // Remove user from localStorage
    setUser(null); // Reset user state
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
