import AuthLayout from '@/layout/AuthLayout';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import { createBrowserRouter } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import Books from '@/pages/Books';
import AddBook from '@/pages/AddBook';
import Dashboard from '@/layout/Dashboard';
const router = createBrowserRouter([
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
