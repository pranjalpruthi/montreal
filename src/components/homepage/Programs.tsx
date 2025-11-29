import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Clock, Users } from 'lucide-react'

export function Programs() {
  return (
    <section id="programs" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative elements - Enhanced for Dark Mode */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/10 blur-[120px] rounded-full pointer-events-none dark:bg-primary/20" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-accent/10 blur-[120px] rounded-full pointer-events-none dark:bg-accent/20" />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-[0.03] dark:opacity-[0.05]" />

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground drop-shadow-sm">Programs & Schedule</h2>
          <p className="text-lg text-muted-foreground">
            Join us for daily worship, weekly classes, and joyful festivals. Everyone is welcome!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Daily Schedule */}
          <Card className="border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 group dark:bg-card/40 dark:backdrop-blur-md dark:border-white/10 hover:-translate-y-1">
            <CardHeader className="bg-muted/50 dark:bg-white/5 rounded-t-xl pb-8 border-b border-border/50 dark:border-white/5">
              <div className="h-12 w-12 bg-accent/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent transition-colors duration-300 shadow-inner">
                <Clock className="h-6 w-6 text-accent group-hover:text-white transition-colors duration-300" />
              </div>
              <CardTitle className="text-xl">Daily Worship</CardTitle>
              <CardDescription>Morning & Evening Programs</CardDescription>
            </CardHeader>
            <CardContent className="bg-muted/30 dark:bg-transparent rounded-b-xl pt-6">
              <ul className="space-y-4">
                {[
                  { time: '4:30 AM', event: 'Mangala Arati' },
                  { time: '7:15 AM', event: 'Guru Puja' },
                  { time: '7:45 AM', event: 'Bhagavatam Class' },
                  { time: '6:30 PM', event: 'Gaura Arati' },
                  { time: '7:00 PM', event: 'Bhagavad-gita Class' },
                ].map((item, i) => (
                  <li key={i} className="flex justify-between items-center text-sm border-b border-dashed border-border/50 dark:border-white/10 last:border-0 pb-3 last:pb-0 group/item hover:bg-accent/5 dark:hover:bg-white/5 p-2 rounded-lg transition-colors">
                    <span className="font-medium text-foreground group-hover/item:text-accent transition-colors">{item.event}</span>
                    <span className="text-muted-foreground bg-background dark:bg-white/10 px-2 py-1 rounded text-xs font-mono">{item.time}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Weekly Programs - Featured Card */}
          <Card className="border-accent/50 shadow-xl hover:shadow-2xl transition-all duration-300 group relative overflow-hidden dark:bg-card/60 dark:backdrop-blur-md dark:border-accent/30 scale-105 z-10">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-accent to-primary"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent opacity-50 pointer-events-none"></div>
            
            <CardHeader className="bg-accent/5 dark:bg-accent/10 rounded-t-xl pb-8 border-b border-accent/10">
              <div className="h-14 w-14 bg-accent/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent transition-colors duration-300 shadow-lg shadow-accent/20">
                <Users className="h-7 w-7 text-accent group-hover:text-white transition-colors duration-300" />
              </div>
              <CardTitle className="text-2xl text-accent dark:text-accent-foreground">Weekly Programs</CardTitle>
              <CardDescription className="text-foreground/80">Community Gatherings</CardDescription>
            </CardHeader>
            <CardContent className="bg-accent/5 dark:bg-transparent rounded-b-xl space-y-6 pt-6">
              <div className="bg-background dark:bg-black/40 p-5 rounded-xl shadow-sm border border-accent/10 hover:border-accent/30 transition-colors group/card">
                <h4 className="font-bold text-foreground mb-2 flex items-center gap-2 text-lg">
                  Sunday Feast <span className="text-[10px] uppercase tracking-wider font-bold bg-accent text-white px-2 py-0.5 rounded-full shadow-sm">Weekly</span>
                </h4>
                <p className="text-sm text-accent font-medium mb-2 flex items-center gap-1">
                  <Clock className="h-3 w-3" /> Every Sunday at 5:00 PM
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">Kirtan, spiritual discourse, and a free vegetarian feast for everyone.</p>
              </div>
              <div className="bg-background dark:bg-black/40 p-5 rounded-xl shadow-sm border border-accent/10 hover:border-accent/30 transition-colors">
                <h4 className="font-bold text-foreground mb-2 text-lg">Friday Harinam</h4>
                <p className="text-sm text-foreground/80">Join us for outdoor chanting in the city streets.</p>
              </div>
            </CardContent>
          </Card>

          {/* Festivals */}
          <Card className="border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 group dark:bg-card/40 dark:backdrop-blur-md dark:border-white/10 hover:-translate-y-1">
            <CardHeader className="bg-muted/50 dark:bg-white/5 rounded-t-xl pb-8 border-b border-border/50 dark:border-white/5">
              <div className="h-12 w-12 bg-accent/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent transition-colors duration-300 shadow-inner">
                <Calendar className="h-6 w-6 text-accent group-hover:text-white transition-colors duration-300" />
              </div>
              <CardTitle className="text-xl">Major Festivals</CardTitle>
              <CardDescription>Celebrations throughout the year</CardDescription>
            </CardHeader>
            <CardContent className="bg-muted/30 dark:bg-transparent rounded-b-xl pt-6">
              <ul className="space-y-4">
                {['Janmashtami', 'Gaura Purnima', 'Govardhan Puja', 'Ratha Yatra', 'Rama Navami'].map((festival, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground group/item hover:text-foreground transition-colors p-2 rounded-lg hover:bg-accent/5 dark:hover:bg-white/5">
                    <div className="h-2 w-2 rounded-full bg-accent/50 group-hover/item:bg-accent transition-colors shadow-sm"></div>
                    {festival}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
