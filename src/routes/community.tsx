import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { ArrowRight, MapPin, Users } from 'lucide-react'
import { Feed } from '@/components/community/Feed'

export const Route = createFileRoute('/community')({
  component: Community,
})

function Community() {
  return (
    <>
      <Feed />
      
      {/* Community Section */}
      <section id="community" className="py-24 bg-[#191970] dark:bg-transparent dark:bg-gradient-to-b dark:from-background dark:via-background/90 dark:to-accent/10 text-white relative overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        {/* Dark Mode Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent dark:from-black/80 pointer-events-none"></div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-white dark:text-foreground">Get Involved</h2>
                <p className="text-white/70 dark:text-muted-foreground text-lg leading-relaxed">
                  There are many ways to serve. Whether you want to volunteer, donate, or simply participate in our programs, your association is valuable to us.
                </p>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-[#FF8C00] dark:text-accent">Seva Opportunities</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {['Kitchen Assistance', 'Temple Cleaning', 'Garland Making', 'Book Distribution'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white/5 dark:bg-white/5 p-3 rounded-lg border border-white/10 dark:border-white/5">
                      <div className="h-2 w-2 rounded-full bg-[#FF8C00] dark:bg-accent"></div>
                      <span className="text-sm text-white/80 dark:text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
                <Button asChild size="lg" className="bg-[#FF8C00] hover:bg-[#FF8C00]/90 dark:bg-accent dark:hover:bg-accent/90 text-white mt-4 border-none shadow-lg shadow-orange-500/20">
                  <a href="mailto:iskm.montreal@gmail.com">Volunteer Now</a>
                </Button>
              </div>
            </div>

            <div className="space-y-8" id="contact">
              <div className="bg-white/5 dark:bg-card/30 backdrop-blur-md rounded-2xl p-8 border border-white/10 dark:border-white/5">
                <h2 className="text-2xl font-bold mb-6 text-white dark:text-foreground">Visit Us</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-[#FF8C00]/20 dark:bg-accent/20 rounded-lg text-[#FF8C00] dark:text-accent">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg text-white dark:text-foreground">ISKM Montreal</p>
                      <p className="text-white/70 dark:text-muted-foreground">4625 Rue Clark</p>
                      <p className="text-white/70 dark:text-muted-foreground">Montréal, QC H2T 2T3, Canada</p>
                      <a
                        href="https://maps.app.goo.gl/4XyetfVhD89Bu47T8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#FF8C00] hover:text-[#FF8C00]/80 dark:text-accent dark:hover:text-accent/80 text-sm mt-2 inline-flex items-center gap-1"
                      >
                        Get Directions <ArrowRight className="h-3 w-3" />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-[#FF8C00]/20 dark:bg-accent/20 rounded-lg text-[#FF8C00] dark:text-accent">
                      <Users className="h-6 w-6" />
                    </div>
                    <a href="mailto:iskm.montreal@gmail.com" className="text-white/80 hover:text-white dark:text-muted-foreground dark:hover:text-foreground transition-colors">
                      iskm.montreal@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-4 top-0 text-6xl text-[#FF8C00]/20 dark:text-accent/20 font-serif">"</div>
                <p className="italic text-lg text-white/80 dark:text-muted-foreground pl-8 relative z-10">
                  Krishna is so kind that even if you take one step toward Him, He takes ten steps toward you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
