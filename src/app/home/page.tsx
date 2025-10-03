'use client'
import { Button } from '@/components/ui/button'
import { SessionProvider, signIn, signOut, useSession } from 'next-auth/react'
const page = () => {
    return (
        <SessionProvider>
            <Home />
        </SessionProvider>
    )
}


export const Home = () => {
    const { data: session, status } = useSession();
    return (
        <div>{status}
            {status == "authenticated" ? 
            <>
                <Button onClick={() => signOut()}>Logout
                </Button>
            </> :
            <>
                <Button onClick={() => signIn()}>SignIn
                </Button>
            </>
            }
        </div>
    )
}


export default page