import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/calendar')({
    component: Calendar,
})

function Calendar() {
    return (
        <div className="p-2">
            <h1 className="text-2xl font-bold">Calendar</h1>
            <p>Upcoming events and schedules.</p>
        </div>
    )
}
