import { createFileRoute } from '@tanstack/react-router'
import CreateCharacterForm from "@/components/forms/genshin/create-character-form.tsx";


export const Route = createFileRoute(
    '/(app)/_auth/dashboard/$game/$characters_/new',
)({
    component: RouteComponent,
})

function RouteComponent() {
    const {game} = Route.useParams()

    return (
        <div className='max-w-3xl mx-auto'>
            <CreateCharacterForm/>
        </div>
    )
}
