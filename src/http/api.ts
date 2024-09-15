import { useTokenStore } from '@/store/Store';
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URI,
  headers: {
    'Content-Type': 'application/json',
  },
});

// interceptor
api.interceptors.request.use((config) => {
  const token = useTokenStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// login
const login = async (data: { email: string; password: string }) => {
  return api
    .post('/api/v1/users/login', data)
    .catch((error) => error.response.data);
};

// register
const register = async (data: {
  name: string;
  email: string;
  password: string;
}) =>
  api
    .post('/api/v1/users/register', data)
    .catch((error) => error.response.data);

// get all books
const getAllBooks = async () =>
  api.get(`/api/v1/books//get-all-books`).catch((error) => error.response.data);

//
// create books

//
const addBook = async (data: FormData) =>
  api.post('/api/v1/books/create-book', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

const deleteBook = async (bookId: string) =>
  api.delete(`api/v1/books/delete-book/${bookId}`).catch((err) => err);

export { login, register, getAllBooks, addBook, deleteBook };
