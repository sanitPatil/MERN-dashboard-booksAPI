import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../http/api';
import { useMutation } from '@tanstack/react-query';
import { useRef } from 'react';
import { LoaderCircle } from 'lucide-react';
import { useTokenStore } from '@/store/Store';
function LoginPage() {
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const pRef = useRef<HTMLInputElement>(null);
  const { setToken } = useTokenStore((state) => state);
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      if (res.status === 200) {
        alert('successfully  login');
        setToken(res.data.accessToken);
        navigate('/home/dashboard');
      } else {
        setError(res.message);
      }
    },
  });
  const handleSubmit = () => {
    const email = emailRef?.current?.value;
    const password = pRef?.current?.value;
    if (!email || !password) {
      setError('all fields required!');
    }
    setError('');

    mutation.mutate({ email, password });
  };
  return (
    <section className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
          {/* {mutation.isPending && (
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          )} */}
          {mutation.isError && (
            <span className="text-red-700 text-center">
              {mutation.error.message}
            </span>
          )}
          {error && <span className="text-red-700 text-center">{error}</span>}
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              className={error ? `border border-red-700 ` : ''}
              ref={emailRef}
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              onChange={() => setError('')}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              className={error ? `border border-red-700 ` : ''}
              ref={pRef}
              id="password"
              type="password"
              required
            />
          </div>
          <div className="mt-4 text-center text-sm">
            Don’t have an account?{' '}
            <Link
              to={'/register'}
              className="underline text-blue-700 font-bold"
            >
              Sign Up here
            </Link>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit} className="w-full">
            {mutation.isPending ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              'Sign in'
            )}
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}

export default LoginPage;
