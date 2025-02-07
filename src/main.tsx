import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createRouter, RouterProvider} from "@tanstack/react-router";
import { routeTree } from './routeTree.gen.ts'
import {AuthProvider, useAuth} from "@/components/auth.tsx";

const router = createRouter({
    routeTree,
    context: {
        auth: undefined!
    }
})

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

function InnerApp() {
    const auth = useAuth()
    return <RouterProvider router={router} context={{ auth }}/>
}

function App() {
    return (
        <AuthProvider>
            <InnerApp/>
        </AuthProvider>
    )
}

const rootElement = document.getElementById('root')!

if (!rootElement.innerHTML) {
    const root = createRoot(rootElement)
    root.render(
        <StrictMode>
            <App/>
        </StrictMode>,
    )
}
