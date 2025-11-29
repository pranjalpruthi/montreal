import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/centers/')({
    component: CentersIndex,
})

function CentersIndex() {
    return (
        <div className="p-2">
            <h1 className="text-2xl font-bold">Our Centers</h1>
            <p>Find a center near you.</p>
        </div>
    )
}
