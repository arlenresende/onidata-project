import React from 'react';
import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from 'react';

type LoginContextData = {
  IsLogged: () => boolean;
  onSuccess: (res: any) => void;
  onFailure: (res: any) => void;
  onLogoutSuccess: () => void;
};
export const LoginContext = createContext({} as LoginContextData);

type LoginContextProviderProps = {
  children: ReactNode;
};

export function LoginContextProvider({ children }: LoginContextProviderProps) {
  const [isLogged, setIsLogged] = useState(false);

  const token = '';

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setIsLogged(true);
    }
  }, [token]);

  function IsLogged() {
    return isLogged;
  }

  const onSuccess = async () => {
    setIsLogged(true);
    localStorage.setItem('token', 'aa0ffa9-b896-4b82-bb89-b33fc6731d82');
  };

  const onLogoutSuccess = async () => {
    setIsLogged(false);
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const onFailure = () => {
    setIsLogged(false);
  };

  return (
    <LoginContext.Provider
      value={{
        IsLogged,
        onSuccess,
        onFailure,
        onLogoutSuccess,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}

export const useLogin = () => {
  return useContext(LoginContext);
};
