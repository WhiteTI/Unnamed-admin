import {createFileRoute, redirect} from '@tanstack/react-router'
import { Button } from '@/components/ui/button.jsx'
import {useAuth} from "@/components/auth.tsx";

export const Route = createFileRoute('/(app)/')({
    beforeLoad: async ({location, context}) => {
        if (!context.auth.isAuth) {
            throw redirect({
                to: '/login',
                search: {
                    redirect: location.href
                }
            })
        }
    },
    component: Index,
})

function Index() {
    const auth = useAuth()

    return (
        <div className="p-2">
            <h3>Welcome Home! Hi {auth.user?.login} :)</h3>
            <Button>Click</Button>
        </div>
    )
}
