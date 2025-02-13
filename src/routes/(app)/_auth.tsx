import {createFileRoute, Outlet, redirect} from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/_auth')({
    beforeLoad: async ({ location, context }) => {
        if (!context.auth.isAuth) {
            throw redirect({
                to: '/login',
                search: {
                    redirect: location.href,
                },
            })
        }
    },
    component: AuthLayout,
})

function AuthLayout() {
    return (
        <Outlet/>
    )
}
