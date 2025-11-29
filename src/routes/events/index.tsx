import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/events/')({
    component: EventsIndex,
})

function EventsIndex() {
    return (
        <div className="p-2">
            <h1 className="text-2xl font-bold">Upcoming Events</h1>
            <p>Join us for our upcoming events.</p>
        </div>
    )
}
