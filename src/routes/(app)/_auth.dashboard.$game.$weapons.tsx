import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/_auth/dashboard/$game/$weapons')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(app)/_auth/dashboard/$game/$weapons"!</div>
}
