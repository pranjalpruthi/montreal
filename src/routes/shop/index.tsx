import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/shop/')({
    component: ShopIndex,
})

function ShopIndex() {
    return (
        <div className="p-2">
            <h1 className="text-2xl font-bold">Temple Shop</h1>
            <p>Browse our collection.</p>
        </div>
    )
}
