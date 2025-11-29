import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ExternalLink, Heart, Users, Video } from 'lucide-react'

export function Resources() {
  return (
    <section id="resources" className="py-24 bg-muted/30 dark:bg-muted/10">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Digital Resources</h2>
            <p className="text-muted-foreground text-lg">Connect with us online and access spiritual content.</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'YouTube (FR)', desc: 'Lectures & Kirtans', icon: Video, url: 'https://www.youtube.com/@iskmfrancais' },
            { title: 'ISKM Kids', desc: 'Content for children', icon: Users, url: 'https://www.youtube.com/@iskmkids' },
            { title: 'Patreon', desc: 'Support the mission', icon: Heart, url: 'http://patreon.com/cw/Nitai' },
            { title: 'Book Shop', desc: "Srila Prabhupāda's books", icon: ExternalLink, url: 'https://www.vinted.fr/member/79720087-haribol108' },
          ].map((resource, i) => (
            <a key={i} href={resource.url} target="_blank" rel="noopener noreferrer" className="group block h-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded-lg">
              <Card className="h-full hover:border-accent/50 hover:shadow-md transition-all duration-300 dark:bg-card/80">
                <CardHeader>
                  <div className="mb-4 inline-flex p-3 rounded-lg bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                    <resource.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg group-hover:text-accent transition-colors">{resource.title}</CardTitle>
                  <CardDescription>{resource.desc}</CardDescription>
                </CardHeader>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
