import React, { createContext, useState, useContext } from 'react';

type AuthContextType = {
  uData?: any;
  updateUser?: (e:any) => void;
  
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

type AuthProviderProps = {
  children: React.ReactNode; // Accepts children as props
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [uData, setUdata] = useState(null);

  const updateUser = (data:any) => {
      setUdata(data)
      
  };

  

  return (
    <AuthContext.Provider value={{ uData, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
