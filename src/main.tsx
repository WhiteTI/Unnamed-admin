import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createRouter, RouterProvider} from "@tanstack/react-router";
import { routeTree } from './routeTree.gen.ts'
import {AuthProvider, useAuth} from "@/components/auth.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
});

const router = createRouter({
    routeTree,
    context: {
        auth: undefined!,
        queryClient
    },
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0
})

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

function Providers() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <App/>
            </AuthProvider>
        </QueryClientProvider>
    )
}

function App() {
    const auth = useAuth()
    return <RouterProvider router={router} context={{ auth }}/>
}

const rootElement = document.getElementById('root')!

if (!rootElement.innerHTML) {
    const root = createRoot(rootElement)
    root.render(
        <StrictMode>
            <Providers/>
        </StrictMode>,
    )
}
