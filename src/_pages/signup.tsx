'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { signUp } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircleIcon, CheckCircle2, Loader2 } from 'lucide-react';

export default function SignUp() {
  const [name, setName] = useState(''); // Name state
  const [email, setEmail] = useState(''); // Email state
  const [password, setPassword] = useState(''); // Password state
  const [error, setError] = useState(''); // Error state
  const [success, setSuccess] = useState(''); // Success state
  const [loading, setLoading] = useState(false); // Loading state
  const router = useRouter();

  const handleSignUp = async () => {
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await signUp(name, email, password); // Call to sign-up API

      if (response.error) {
        setError(response.error); // Handle error
      } else {
        setSuccess('Account created successfully! Redirecting to Sign In...');
        setTimeout(() => router.push('/signin'), 2000); // Redirect after 2 seconds
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create an Account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive" className="mb-4 flex items-center gap-2">
            <AlertCircleIcon className="h-5 w-5" />
            <div>
              <AlertTitle>Error Creating User</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </div>
          </Alert>
        )}
        {success && (
          <Alert variant={'default'} className="mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            <div>
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{success}</AlertDescription>
            </div>
          </Alert>
        )}
        <FieldGroup className="-space-y-2">
          <Field>
            <FieldLabel htmlFor="name">Full Name</FieldLabel>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
            <Input
              id="confirm-password"
              type="password"
              disabled={loading}
              required
            />
            <FieldDescription>Please confirm your password.</FieldDescription>
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button
          className="w-full flex items-center justify-center gap-2"
          onClick={handleSignUp}
          disabled={loading}
        >
          {loading && <Loader2 className="animate-spin h-5 w-5" />}
          {loading ? 'Creating account...' : 'Sign Up'}
        </Button>

        {/* <Button variant="outline" type="button" disabled={loading}>
          Sign up with Google
        </Button> */}
      </CardFooter>
    </Card>
  );
}
