import deitiesImage from '../../assets/Deities.png'

export function About() {
  return (
    <section id="about" className="py-24 bg-muted/30 dark:bg-muted/10 relative">
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
              <div className="flex-1 p-6 bg-background dark:bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-foreground mb-2">Authentic</h3>
                <p className="text-sm text-muted-foreground">Strict adherence to the parampara system.</p>
              </div>
              <div className="flex-1 p-6 bg-background dark:bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-foreground mb-2">Welcoming</h3>
                <p className="text-sm text-muted-foreground">A spiritual home for everyone.</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-accent/10 rounded-3xl transform rotate-3 opacity-50 blur-sm"></div>
            <div className="relative aspect-square bg-muted rounded-2xl overflow-hidden shadow-2xl border-8 border-background dark:border-card group">
              <img 
                src={deitiesImage} 
                alt="Sri Sri Nitai Gaurasundara Deities" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="text-white p-6 font-medium">Sri Sri Nitai Gaurasundara</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
