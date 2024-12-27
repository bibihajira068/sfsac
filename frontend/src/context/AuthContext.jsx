import React, { createContext, useState, useContext } from 'react';

// Create the context
const UserContext = createContext();

// Provide the context to the app
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Login function to set user data
  const login = (userData) => {
    setUser(userData); // Save user data in context
    localStorage.setItem('user', JSON.stringify(userData)); // Persist user in local storage
  };

  // Logout function to clear user data
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Clear user from local storage
  };

  // Rehydrate user from local storage on app load
  React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to use the UserContext
export const useUser = () => useContext(UserContext);














// import React, { createContext, useState, useContext } from 'react';

// // Create UserContext
// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   const login = (userData) => setUser(userData);  
//   const logout = () => setUser(null);

//   return (
//     <UserContext.Provider value={{ user, login, logout }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => useContext(UserContext);