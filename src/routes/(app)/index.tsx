import {createFileRoute, redirect} from '@tanstack/react-router'
import { Button } from '@/components/ui/button.jsx'

export const Route = createFileRoute('/(app)/')({
    component: Index,
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
})

function Index() {
    return (
        <div className="p-2">
            <h3>Welcome Home! Hi :)</h3>
            <Button>Click</Button>
        </div>
    )
}
