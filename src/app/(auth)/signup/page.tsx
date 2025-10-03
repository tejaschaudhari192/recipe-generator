'use client';

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { signUp } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircleIcon, CheckCircle2, Loader2 } from "lucide-react";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async () => {
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const response = await signUp(email, password);

      if (response.error) {
        setError(response.error);
      } else {
        setSuccess("Account created successfully! Redirecting to Sign In...");
        setTimeout(() => router.push('/signin'), 2000);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <h1 className="text-2xl font-bold text-center">Create an Account</h1>
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
          <Alert variant={"default"} className="mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            <div>
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{success}</AlertDescription>
            </div>
          </Alert>
        )}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button
          className="w-full flex items-center justify-center gap-2"
          onClick={handleSignUp}
          disabled={loading}
        >
          {loading && <Loader2 className="animate-spin h-5 w-5" />}
          {loading ? "Creating account..." : "Sign Up"}
        </Button>
      </CardFooter>
    </Card>
  );
}
