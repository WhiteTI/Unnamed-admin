import {createFileRoute, Link} from '@tanstack/react-router'
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";

export const Route = createFileRoute(
    '/(app)/_auth/dashboard/$game/$characters',
)({
    component: RouteComponent,
})

function RouteComponent() {
    const {game, characters} = Route.useParams()
    const newLink = (
        <Link to='/dashboard/$game/$characters/new' params={{
            game: game,
            characters: characters
        }}>New</Link>
    )

    return <>
        <h1 className='capitalize'>{game} / {characters}</h1>

        <div className='flex gap-x-5'>
            <Button asChild>{newLink}</Button>
            <Input placeholder='Search'/>
        </div>
    </>
}
