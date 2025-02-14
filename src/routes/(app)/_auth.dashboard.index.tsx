import { createFileRoute } from '@tanstack/react-router'
import sushang from '@/assets/img/sushang.jpg'

export const Route = createFileRoute('/(app)/_auth/dashboard/')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div className='flex flex-col gap-4 items-center justify-center antialiased'>
            <div className='w-96 text-center text-2xl font-medium text-pretty'>
                <span>Тут могло быть что-то важное и интересное, но я не придумал :), по этому тут Сушан</span>
            </div>
            <img src={sushang} alt="Best character" className='h-[40rem]'/>

        </div>
    )
}
