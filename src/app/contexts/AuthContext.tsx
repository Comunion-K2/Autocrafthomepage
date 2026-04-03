import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { User, AuthState } from "../types/user";

interface AuthContextType extends AuthState {
  login: (user: User) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    isLoading: true,
  });

  // 从 localStorage 恢复登录状态
  useEffect(() => {
    const savedUser = localStorage.getItem("autocraft_user");
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setAuthState({
          isAuthenticated: true,
          user,
          isLoading: false,
        });
      } catch (error) {
        localStorage.removeItem("autocraft_user");
        setAuthState({ isAuthenticated: false, user: null, isLoading: false });
      }
    } else {
      setAuthState({ isAuthenticated: false, user: null, isLoading: false });
    }
  }, []);

  const login = (user: User) => {
    localStorage.setItem("autocraft_user", JSON.stringify(user));
    setAuthState({
      isAuthenticated: true,
      user,
      isLoading: false,
    });
  };

  const logout = () => {
    localStorage.removeItem("autocraft_user");
    setAuthState({
      isAuthenticated: false,
      user: null,
      isLoading: false,
    });
  };

  const updateUser = (updates: Partial<User>) => {
    if (authState.user) {
      const updatedUser = { ...authState.user, ...updates };
      localStorage.setItem("autocraft_user", JSON.stringify(updatedUser));
      setAuthState({
        ...authState,
        user: updatedUser,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
