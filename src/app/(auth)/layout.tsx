'use client'
import Logo from "@/components/logo"
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react"

export default function Layout({ children }: {
    children: ReactNode
}) {
    const route = usePathname();
    const router = useRouter();
    const isSignup = route === '/signup';

    const handleClick = () => {
        router.push(isSignup ? '/signin' : '/signup');
    };
    console.log(route)
    return <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
        <header className="p-4"><Logo /></header>
        <main className="flex items-center justify-center grow">
            {children}
        </main>
        <footer className="px-16 py-10 text-gray-600">
            <p className="font-medium">
                {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button
                    onClick={handleClick}
                    className="ml-1 text-blue-600 hover:underline focus:outline-none"
                >
                    {isSignup ? 'Sign In' : 'Sign Up'}
                </button>
            </p>
        </footer>
    </div >
}