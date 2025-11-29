import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/sign-in')({
    component: SignIn,
})

function SignIn() {
    return (
        <div className="p-2">
            <h1 className="text-2xl font-bold">Sign In</h1>
        </div>
    )
}
