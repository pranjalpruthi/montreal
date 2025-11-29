import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/sign-up')({
    component: SignUp,
})

function SignUp() {
    return (
        <div className="p-2">
            <h1 className="text-2xl font-bold">Sign Up</h1>
        </div>
    )
}
