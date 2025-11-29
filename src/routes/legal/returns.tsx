import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/legal/returns')({
    component: Returns,
})

function Returns() {
    return (
        <div className="p-2">
            <h1 className="text-2xl font-bold">Returns Policy</h1>
        </div>
    )
}
