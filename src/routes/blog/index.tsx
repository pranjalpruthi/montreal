import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/blog/')({
    component: BlogIndex,
})

function BlogIndex() {
    return (
        <div className="p-2">
            <h1 className="text-2xl font-bold">Blog</h1>
            <p>Read our latest articles.</p>
        </div>
    )
}
