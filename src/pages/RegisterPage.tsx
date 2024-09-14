import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { register } from '@/http/api';
import { useMutation } from '@tanstack/react-query';
import { LoaderCircle } from 'lucide-react';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
function RegisterPage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  //
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const pRef = useRef<HTMLInputElement>(null);
  // mutation
  const mutation = useMutation({
    mutationFn: register,
    onSuccess: (res) => {
      if (res.status === 201) {
        alert('successfully register...');
        navigate('/login');
      } else {
        setError(res.message);
      }
    },
  });

  const handleSubmit = () => {
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = pRef.current?.value;

    if (!name || !email || !password) {
      setError('all fields are required!!!');
    }

    setError('');
    mutation.mutate({ name, email, password });
  };
  return (
    <section className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
          {error && <span className={`text-red-700`}>{error}</span>}
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label>Name</Label>
                <Input
                  className={error ? `border border-red-700` : ``}
                  ref={nameRef}
                  id="Name"
                  placeholder="your full name"
                  required
                  onClick={() => setError('')}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                className={error ? `border border-red-700` : ``}
                ref={emailRef}
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                onClick={() => setError('')}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                className={error ? `border border-red-700` : ``}
                ref={pRef}
                id="password"
                type="password"
                required
                onClick={() => setError('')}
              />
            </div>
            <Button onClick={handleSubmit} type="submit" className="w-full">
              {mutation.isPending ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                'Create an account'
              )}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link to={'/login'} className="underline text-blue-700 font-bold">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export default RegisterPage;
