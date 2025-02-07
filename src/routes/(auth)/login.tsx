import {createFileRoute} from '@tanstack/react-router'
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import {Label} from "@/components/ui/label.tsx";
import {useState} from "react";
import {useAuth} from "@/components/auth.tsx";

export const Route = createFileRoute('/(auth)/login')({
    component: Login,
})

function Login() {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const auth = useAuth()

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <Card>
                    <CardHeader>
                        <CardHeader className='text-2xl font-semibold'>Login</CardHeader>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="flex flex-col gap-6">
                                <div className='grid gap-2'>
                                    <Label htmlFor='login' className='font-semibold' >Username</Label>
                                    <Input
                                        id='login'
                                        type='text'
                                        placeholder='Username'
                                        value={login}
                                        onChange={(e) => setLogin(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className='grid gap-2'>
                                    <Label htmlFor='password' className='font-semibold' >Password</Label>
                                    <Input
                                        id='password'
                                        type='password'
                                        placeholder='Password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <Button type='submit' className='w-full font-semibold'>Login</Button>
                            </div>

                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
