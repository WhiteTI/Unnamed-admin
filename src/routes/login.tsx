import { createFileRoute, redirect } from '@tanstack/react-router'
import { Input } from '@/components/ui/input.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Card, CardContent, CardHeader } from '@/components/ui/card.tsx'
import { Label } from '@/components/ui/label.tsx'
import { useAuth } from '@/components/auth/auth.tsx'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'

interface ILoginForm {
    login: string
    password: string
}

export const Route = createFileRoute('/login')({
    validateSearch: z.object({
        redirect: z.string().optional().catch(''),
    }),
    beforeLoad: ({ context, search }) => {
        if (context.auth.isAuth) {
            throw redirect({ to: search.redirect || '/' })
        }
    },
    component: Login,
})

function Login() {
    const { handleSubmit, control } = useForm<ILoginForm>({
        defaultValues: {
            login: '',
            password: '',
        },
    })

    const auth = useAuth()
    const search = Route.useSearch()
    const navigate = Route.useNavigate()

    const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
        await auth.login(data.login, data.password)
        await navigate({ to: search.redirect || '/' })
    }

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <Card>
                    <CardHeader>
                        <CardHeader className="text-2xl font-semibold">Login</CardHeader>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="login" className="font-semibold">
                                        Username
                                    </Label>
                                    <Controller
                                        name="login"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                id="login"
                                                type="text"
                                                placeholder="Username"
                                                required
                                            />
                                        )}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password" className="font-semibold">
                                        Password
                                    </Label>
                                    <Controller
                                        name="password"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                id="password"
                                                type="password"
                                                placeholder="Password"
                                                required
                                            />
                                        )}
                                    />
                                </div>

                                <Button type="submit" className="w-full font-semibold">
                                    Login 😺
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
