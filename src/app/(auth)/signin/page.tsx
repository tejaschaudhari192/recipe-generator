import { SignIn } from '@/_pages/signin';

interface SignInPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function SignInPage({ searchParams }: SignInPageProps) {
  const callbackUrl =
    typeof searchParams.callbackUrl === 'string'
      ? searchParams.callbackUrl
      : '/';

  return <SignIn callbackUrl={callbackUrl} />;
}
