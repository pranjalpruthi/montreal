import { Navbar } from './Navbar'
import { Footer } from './Footer'

export function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            <div className="flex min-h-screen flex-col w-full">
                <main className="flex-1 w-full">
                    {children}
                </main>
                <Footer />
            </div>
        </>
    )
}
