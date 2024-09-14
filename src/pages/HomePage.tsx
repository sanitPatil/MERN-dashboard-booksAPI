import Dashboard from '@/layout/Dashboard';
import { Link, Outlet } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <Link to={'/home/dashboard'}>
        {' '}
        <div>click to see dashboard</div>{' '}
      </Link>
      <Link to={'/login'}>
        {' '}
        <div>click to see Login</div>
      </Link>
      <Link to={'/register'}>
        {' '}
        <div>click to see register</div>
      </Link>

      <Outlet />
    </div>
  );
}

export default HomePage;
