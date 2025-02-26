import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/_auth/dashboard/$game/$sets')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(app)/_auth/dashboard/$game/$sets"!</div>
}
