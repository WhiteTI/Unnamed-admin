import {createRootRouteWithContext, Outlet} from "@tanstack/react-router";
import {TanStackRouterDevtools} from "@tanstack/router-devtools";
import type { IAuthContext } from "@/models/auth.ts";
import type { QueryClient } from "@tanstack/react-query";
import {getStoredToken} from "@/components/auth.tsx";

interface IRouterContext {
    auth: IAuthContext,
    queryClient: QueryClient,
}

export const Route = createRootRouteWithContext<IRouterContext>()({
    beforeLoad: async ({context}) => {
        if (getStoredToken())
            await context.auth.checkAuth()
    },
    component: () => (
        <>
            <Outlet />
            <TanStackRouterDevtools />
        </>
    )
})