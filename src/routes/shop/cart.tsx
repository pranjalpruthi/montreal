import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/shop/cart')({
  component: Cart,
})

function Cart() {
  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold">Your Cart</h1>
    </div>
  )
}
