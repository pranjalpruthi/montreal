import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
    component: About,
})

function About() {
    return (
        <div className="p-2">
            <h1 className="text-2xl font-bold">About Us</h1>
            <p>Learn more about our temple and mission.</p>
        </div>
    )
}
