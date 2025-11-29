import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Clock, Heart, MapPin, Users, Video, ArrowRight, ExternalLink } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <>
      {/* Skip to main content link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg"
      >
        Skip to main content
      </a>

      {/* HERO SECTION */}
      <section id="main-content" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background">
        {/* Abstract Background Pattern */}
        <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-20" />

        <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-7xl">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="inline-flex items-center rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-sm text-accent mb-4">
              <span className="flex h-2 w-2 rounded-full bg-accent mr-2"></span>
              Welcome to Your Spiritual Home
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-tight">
              International <br className="hidden md:block" />
              <span className="text-primary">Sri Krishna Mandir</span> Montreal
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Dedicated to the teachings of His Divine Grace <br className="hidden md:block" />
              <span className="font-semibold text-foreground">A.C. Bhaktivedanta Swami Prabhupāda</span>
            </p>

            <div className="p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-accent/10 shadow-sm max-w-xl mx-auto">
              <p className="text-lg md:text-xl italic text-foreground/80 font-serif">
                "Chant Hare Krishna and your life will be sublime."
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-8">
              <Button asChild size="lg" className="h-12 px-8 text-base bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-105">
                <a href="https://maps.app.goo.gl/dRyY7aa3nnvndq5t6" target="_blank" rel="noopener noreferrer">
                  Visit Temple
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base border-accent/20 hover:bg-accent/5 hover:text-accent">
                <a href="#programs">Join a Program</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-24 bg-muted/30 relative">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                  Preserving the Original Teachings
                </h2>
                <div className="h-1 w-20 bg-accent rounded-full"></div>
              </div>

              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  At ISKM Montreal, we are dedicated to strictly following the instructions and mood of our Founder-Ācārya, <span className="font-semibold text-foreground">Srila Prabhupāda</span>.
                </p>
                <p>
                  Our mission is to propagate the spiritual science of Bhakti Yoga as presented in the Bhagavad-gītā and Śrīmad-Bhāgavatam. Under the guidance of <span className="font-semibold text-foreground">HG Nimai Nitai Prabhu</span>, we strive to create a community based on love, service, and spiritual education.
                </p>
              </div>

              <div className="flex gap-4">
                <div className="flex-1 p-6 bg-background rounded-xl border border-border shadow-sm">
                  <h3 className="font-bold text-foreground mb-2">Authentic</h3>
                  <p className="text-sm text-muted-foreground">Strict adherence to the parampara system.</p>
                </div>
                <div className="flex-1 p-6 bg-background rounded-xl border border-border shadow-sm">
                  <h3 className="font-bold text-foreground mb-2">Welcoming</h3>
                  <p className="text-sm text-muted-foreground">A spiritual home for everyone.</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-accent/10 rounded-3xl transform rotate-3 opacity-50"></div>
              <div className="relative aspect-square bg-muted rounded-2xl overflow-hidden shadow-2xl border-8 border-background flex items-center justify-center bg-gradient-to-br from-accent/5 to-accent/10">
                <div className="text-center p-8">
                  <Users className="h-16 w-16 text-accent/40 mx-auto mb-4" />
                  <span className="text-muted-foreground font-medium">Temple Deities / Community Image</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMS & SCHEDULE */}
      <section id="programs" className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Programs & Schedule</h2>
            <p className="text-lg text-muted-foreground">
              Join us for daily worship, weekly classes, and joyful festivals. Everyone is welcome!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Daily Schedule */}
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="bg-muted/50 rounded-t-xl pb-8">
                <div className="h-12 w-12 bg-accent/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent transition-colors duration-300">
                  <Clock className="h-6 w-6 text-accent group-hover:text-white transition-colors duration-300" />
                </div>
                <CardTitle className="text-xl">Daily Worship</CardTitle>
                <CardDescription>Morning & Evening Programs</CardDescription>
              </CardHeader>
              <CardContent className="bg-muted/50 rounded-b-xl">
                <ul className="space-y-4">
                  {[
                    { time: '4:30 AM', event: 'Mangala Arati' },
                    { time: '7:15 AM', event: 'Guru Puja' },
                    { time: '7:45 AM', event: 'Bhagavatam Class' },
                    { time: '6:30 PM', event: 'Gaura Arati' },
                    { time: '7:00 PM', event: 'Bhagavad-gita Class' },
                  ].map((item, i) => (
                    <li key={i} className="flex justify-between items-center text-sm border-b border-dashed border-border last:border-0 pb-3 last:pb-0">
                      <span className="font-medium text-foreground">{item.event}</span>
                      <span className="text-muted-foreground bg-background px-2 py-1 rounded text-xs">{item.time}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Weekly Programs */}
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-accent"></div>
              <CardHeader className="bg-accent/5 rounded-t-xl pb-8">
                <div className="h-12 w-12 bg-accent/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent transition-colors duration-300">
                  <Users className="h-6 w-6 text-accent group-hover:text-white transition-colors duration-300" />
                </div>
                <CardTitle className="text-xl">Weekly Programs</CardTitle>
                <CardDescription>Community Gatherings</CardDescription>
              </CardHeader>
              <CardContent className="bg-accent/5 rounded-b-xl space-y-6">
                <div className="bg-background p-4 rounded-lg shadow-sm border border-accent/10">
                  <h4 className="font-bold text-foreground mb-1 flex items-center gap-2">
                    Sunday Feast <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full">Weekly</span>
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">Every Sunday at 5:00 PM</p>
                  <p className="text-sm text-foreground">Kirtan, spiritual discourse, and a free vegetarian feast for everyone.</p>
                </div>
                <div className="bg-background p-4 rounded-lg shadow-sm border border-accent/10">
                  <h4 className="font-bold text-foreground mb-1">Friday Harinam</h4>
                  <p className="text-sm text-foreground">Join us for outdoor chanting in the city streets.</p>
                </div>
              </CardContent>
            </Card>

            {/* Festivals */}
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="bg-muted/50 rounded-t-xl pb-8">
                <div className="h-12 w-12 bg-accent/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent transition-colors duration-300">
                  <Calendar className="h-6 w-6 text-accent group-hover:text-white transition-colors duration-300" />
                </div>
                <CardTitle className="text-xl">Major Festivals</CardTitle>
                <CardDescription>Celebrations throughout the year</CardDescription>
              </CardHeader>
              <CardContent className="bg-muted/50 rounded-b-xl">
                <ul className="space-y-3">
                  {['Janmashtami', 'Gaura Purnima', 'Govardhan Puja', 'Ratha Yatra', 'Rama Navami'].map((festival, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent"></div>
                      {festival}
                    </li>
                  ))}
                </ul>
                {/* Future: Add calendar link when available */}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* DIGITAL RESOURCES */}
      <section id="resources" className="py-24 bg-muted/30">
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
                <Card className="h-full hover:border-accent/50 hover:shadow-md transition-all duration-300">
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

      {/* COMMUNITY & CONTACT */}
      <section id="community" className="py-24 bg-[#191970] text-white relative overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-white">Get Involved</h2>
                <p className="text-white/70 text-lg leading-relaxed">
                  There are many ways to serve. Whether you want to volunteer, donate, or simply participate in our programs, your association is valuable to us.
                </p>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-[#FF8C00]">Seva Opportunities</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {['Kitchen Assistance', 'Temple Cleaning', 'Garland Making', 'Book Distribution'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                      <div className="h-2 w-2 rounded-full bg-[#FF8C00]"></div>
                      <span className="text-sm text-white/80">{item}</span>
                    </div>
                  ))}
                </div>
                <Button asChild size="lg" className="bg-[#FF8C00] hover:bg-[#FF8C00]/90 text-white mt-4 border-none">
                  <a href="mailto:iskm.montreal@gmail.com">Volunteer Now</a>
                </Button>
              </div>
            </div>

            <div className="space-y-8" id="contact">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                <h2 className="text-2xl font-bold mb-6">Visit Us</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-[#FF8C00]/20 rounded-lg text-[#FF8C00]">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">ISKM Montreal</p>
                      <p className="text-white/70">123 Temple Street (Placeholder)</p>
                      <p className="text-white/70">Montreal, QC, Canada</p>
                      <a
                        href="https://maps.app.goo.gl/dRyY7aa3nnvndq5t6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#FF8C00] hover:text-[#FF8C00]/80 text-sm mt-2 inline-flex items-center gap-1"
                      >
                        Get Directions <ArrowRight className="h-3 w-3" />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-[#FF8C00]/20 rounded-lg text-[#FF8C00]">
                      <Users className="h-6 w-6" />
                    </div>
                    <a href="mailto:iskm.montreal@gmail.com" className="text-white/80 hover:text-white transition-colors">
                      iskm.montreal@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-4 top-0 text-6xl text-[#FF8C00]/20 font-serif">"</div>
                <p className="italic text-lg text-white/80 pl-8 relative z-10">
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
