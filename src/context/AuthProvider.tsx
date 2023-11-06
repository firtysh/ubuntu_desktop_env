import { FC, ReactNode, createContext, useState } from 'react';

type User = string;
type AuthProviderProp = {
  children: ReactNode;
};
type AuthContextType = {
  username: User | null;
  setUsername: (param: User | null) => void;
};

export const authContext = createContext({} as AuthContextType);
const AuthProvider: FC<AuthProviderProp> = ({ children }) => {
  const [user, setUser] = useState<User | null>(localStorage.getItem('user'));
  const setUsername = (param: User | null) => {
    if (param) localStorage.setItem('user', param);
    setUser(param);
  };

  return <authContext.Provider value={{ username: user, setUsername }}>{children}</authContext.Provider>;
};

export default AuthProvider;
