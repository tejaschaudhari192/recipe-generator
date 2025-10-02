'use client'

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { signUp } from "@/lib/api"

export default function SignUpPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSignUp = async () => {
        const data = await signUp(email, password)
        console.warn(data)
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <h1 className="text-2xl font-bold text-center">Create an Account</h1>
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
                <Button className="w-full" onClick={handleSignUp}>
                    Sign Up
                </Button>
            </CardFooter>
        </Card>
    )
}
