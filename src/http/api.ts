import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URI,
  headers: {
    'Content-Type': 'application/json',
  },
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

export { login, register };
