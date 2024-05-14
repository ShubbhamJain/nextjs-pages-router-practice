export type Comments = {
  id: number;
  content: string;
  likes: number | null;
};

export type APIResponseType<T> = {
  error: boolean;
  message: string;
  data: T;
};

export type User = {
  id: number;
  email: string;
  userName: string;
  loggedIn: boolean;
};

export type AuthContextType = {
  auth: {
    isLoggedIn: boolean;
    user: User | null;
  };
  setAuth: (value: { isLoggedIn: boolean; user: User | null }) => void;
  logout: () => void;
};
