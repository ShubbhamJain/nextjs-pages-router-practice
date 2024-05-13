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
