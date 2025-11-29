import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/centers/$centerId')({
    component: CenterDetail,
})

function CenterDetail() {
    const { centerId } = Route.useParams()
    return (
        <div className="p-2">
            <h1 className="text-2xl font-bold">Center: {centerId}</h1>
        </div>
    )
}
