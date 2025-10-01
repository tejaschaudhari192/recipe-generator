'use client'

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"
import { apiClient, signIn } from "@/lib/api"

export default function SignIn() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSignIn = async () => {
        const data = await signIn(email, password)
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <h1 className="text-2xl font-bold text-center">Sign In</h1>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
                <Button className="w-full" onClick={handleSignIn}>
                    Sign In
                </Button>
            </CardFooter>
        </Card>
    )
}
