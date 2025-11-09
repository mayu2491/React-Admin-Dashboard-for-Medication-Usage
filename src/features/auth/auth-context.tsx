import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode
} from 'react';
import { useNavigate } from 'react-router-dom';
import { mockUsers } from '../../mocks/users';

type UserRole = 'admin' | 'clinician' | 'viewer';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = 'medication-usage-dashboard.auth';

type PersistedAuth = {
  token: string;
  user: AuthUser;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const persisted = localStorage.getItem(STORAGE_KEY);
    if (persisted) {
      try {
        const parsed = JSON.parse(persisted) as PersistedAuth;
        setToken(parsed.token);
        setUser(parsed.user);
      } catch (error) {
        console.error('Failed to parse persisted auth', error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
          throw new Error('Invalid credentials');
        }

        const data = (await response.json()) as { token: string; user: AuthUser };
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        navigate('/overview');
      } catch (error) {
        const fallbackUser = mockUsers.find(
          (candidate) => candidate.email === email && candidate.password === password
        );
        if (fallbackUser) {
          const fallbackToken = btoa(`${fallbackUser.id}:fallback`);
          const authData = {
            token: fallbackToken,
            user: {
              id: fallbackUser.id,
              name: fallbackUser.name,
              email: fallbackUser.email,
              role: fallbackUser.role
            }
          };
          setToken(authData.token);
          setUser(authData.user);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(authData));
          navigate('/overview');
        } else {
          throw error instanceof Error ? error : new Error('Unable to authenticate');
        }
      } finally {
        setIsLoading(false);
      }
    },
    [navigate]
  );

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    navigate('/login');
  }, [navigate]);

  const value = useMemo(
    () => ({
      user,
      token,
      isLoading,
      login,
      logout
    }),
    [user, token, isLoading, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
