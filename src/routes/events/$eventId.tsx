import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/events/$eventId')({
    component: EventDetail,
})

function EventDetail() {
    const { eventId } = Route.useParams()
    return (
        <div className="p-2">
            <h1 className="text-2xl font-bold">Event Detail: {eventId}</h1>
        </div>
    )
}
