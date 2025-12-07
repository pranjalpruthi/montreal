import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ExternalLink, Heart, Users, Video } from 'lucide-react'
import { PrabhupadaQuotes } from '@/components/homepage/PrabhupadaQuotes'
import { motion } from 'motion/react'

const resources = [
  { title: 'YouTube (FR)', desc: 'Lectures & Kirtans', icon: Video, url: 'https://www.youtube.com/@iskmfrancais', color: 'text-red-500', bg: 'bg-red-500/10' },
  { title: 'ISKM Kids', desc: 'Content for children', icon: Users, url: 'https://www.youtube.com/@iskmkids', color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { title: 'Patreon', desc: 'Support the mission', icon: Heart, url: 'http://patreon.com/cw/Nitai', color: 'text-pink-500', bg: 'bg-pink-500/10' },
  { title: 'Book Shop', desc: "Srila Prabhupāda's books", icon: ExternalLink, url: 'https://www.vinted.fr/member/79720087-haribol108', color: 'text-amber-500', bg: 'bg-amber-500/10' },
]

export function DigitalResources() {
  return (
    <section className="py-24 bg-muted/30 dark:bg-muted/10 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Prabhupada Quotes */}
          <div className="flex flex-col justify-center h-full order-2 lg:order-1">
             <PrabhupadaQuotes />
          </div>

          {/* Right Column: Digital Resources */}
          <div className="space-y-8 order-1 lg:order-2">
            <div className="space-y-2 lg:text-right">
              <motion.h2 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold tracking-tight text-foreground"
              >
                Digital Resources
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-muted-foreground text-lg"
              >
                Connect with us online and access spiritual content.
              </motion.p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {resources.map((resource, i) => (
                <motion.a 
                  key={i} 
                  href={resource.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group block h-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded-xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * i }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card className="h-full border-muted/50 hover:border-accent/50 hover:shadow-lg transition-all duration-300 dark:bg-card/50 backdrop-blur-sm overflow-hidden relative">
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${resource.bg}`} />
                    <CardHeader>
                      <div className={`mb-4 inline-flex p-3 rounded-xl ${resource.bg} ${resource.color} transition-colors group-hover:scale-110 duration-300`}>
                        <resource.icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-lg group-hover:text-accent transition-colors">{resource.title}</CardTitle>
                      <CardDescription>{resource.desc}</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
