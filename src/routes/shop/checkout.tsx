import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/shop/checkout')({
    component: Checkout,
})

function Checkout() {
    return (
        <div className="p-2">
            <h1 className="text-2xl font-bold">Checkout</h1>
        </div>
    )
}
