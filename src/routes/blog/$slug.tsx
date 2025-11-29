import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/blog/$slug')({
    component: BlogPost,
})

function BlogPost() {
    const { slug } = Route.useParams()
    return (
        <div className="p-2">
            <h1 className="text-2xl font-bold">Post: {slug}</h1>
        </div>
    )
}
