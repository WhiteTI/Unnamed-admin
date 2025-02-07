import {createRootRouteWithContext, Outlet} from "@tanstack/react-router";
import {TanStackRouterDevtools} from "@tanstack/router-devtools";
import type { IAuthContext } from "@/components/auth.tsx";

interface IRouterContext {
    auth: IAuthContext;
}

export const Route = createRootRouteWithContext<IRouterContext>()({
    component: () => (
        <>
            <Outlet />
            <TanStackRouterDevtools />
        </>
    ),
})