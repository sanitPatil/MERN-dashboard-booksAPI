import AuthLayout from '@/layout/AuthLayout';
import Dashboard from '@/layout/Dashboard';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    children: [
      {
        path: '/home/dashboard',
        element: (
          <AuthLayout>
            <Dashboard />,
          </AuthLayout>
        ),
      },
    ],
    // children: [
    //   {
    //     path: "/login",
    //     element: <LoginPage />,
    //   },
    //   {
    //     path: "/register",
    //     element: <RegisterPage />,
    //   },
    // ],
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
