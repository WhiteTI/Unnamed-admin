import {createRootRouteWithContext, Outlet} from "@tanstack/react-router";
import {TanStackRouterDevtools} from "@tanstack/router-devtools";
import type { IAuthContext } from "@/components/auth.tsx";
import type { QueryClient } from "@tanstack/react-query";

interface IRouterContext {
    auth: IAuthContext,
    queryClient: QueryClient,
}

export const Route = createRootRouteWithContext<IRouterContext>()({
    component: () => (
        <>
            <Outlet />
            <TanStackRouterDevtools />
        </>
    ),
})