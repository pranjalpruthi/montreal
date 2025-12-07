import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { BooksShowcase } from '@/components/resources/books-showcase'
import { DigitalResources } from '@/components/resources/digital-resources'
import { SlokaSection } from '@/components/resources/sloka-section'
import { MorningProgramSection } from '@/components/resources/morning-program-section'

export const Route = createFileRoute('/resources/')({
    component: ResourcesIndex,
})

function ResourcesIndex() {
    return (
        <main className="min-h-screen pt-20">
            <div className="relative overflow-hidden border-b bg-muted/40 pb-16 pt-24 md:pt-32">
                 <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5" />
                 <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />
                 <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

                 <div className="container relative mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="mb-6 text-5xl font-extrabold tracking-tight md:text-7xl">
                            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-400">
                                Spiritual Resources
                            </span>
                        </h1>
                        <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl leading-relaxed">
                            Dive deep into Vedic wisdom with our curated collection of books, 
                            daily prayers, and digital content designed to elevate your consciousness.
                        </p>
                    </motion.div>
                 </div>
            </div>

             <SlokaSection />
             
             <MorningProgramSection />

             <BooksShowcase />
             <DigitalResources />
        </main>
    )
}
