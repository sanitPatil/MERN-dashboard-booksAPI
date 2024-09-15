import AuthLayout from '@/layout/AuthLayout';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import Books from '@/pages/Books';
import AddBook from '@/pages/AddBook';
import Dashboard from '@/layout/Dashboard';
import UpdateBook from '@/pages/UpdateBook';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard/home" />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    children: [
      {
        path: '/dashboard/home',
        element: (
          <AuthLayout>
            <HomePage />
          </AuthLayout>
        ),
      },
      {
        path: '/dashboard/edit',
        element: (
          <AuthLayout>
            <UpdateBook />
          </AuthLayout>
        ),
      },
      {
        path: '/dashboard/books',
        element: (
          <AuthLayout>
            <Books />
          </AuthLayout>
        ),
      },
      {
        path: '/dashboard/add-book',
        element: (
          <AuthLayout>
            <AddBook />
          </AuthLayout>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
]);
export default router;
