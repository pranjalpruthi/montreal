import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/legal/terms')({
    component: Terms,
})

function Terms() {
    return (
        <div className="p-2">
            <h1 className="text-2xl font-bold">Terms of Service</h1>
        </div>
    )
}
