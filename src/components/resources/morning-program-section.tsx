
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Download, BookOpen, Sparkles, BookHeart, Sun, Users, Music, QuoteIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Accordion, AccordionItem, AccordionButton, AccordionPanel } from '@/components/animate-ui/headless/accordion'
import { ModernBookCover } from '@/components/cuicui/modern-book-cover'

import { useIsMobile } from '@/hooks/use-mobile'
import morningProgramPdf from '@/assets/books/morning-program.pdf'
import morningProgramCover from '@/assets/extra/morning-program-cover.webp'

const BlockQuote = ({
  quote,
  author,
}: {
  quote: string;
  author: string;
}) => {
  return (
    <blockquote className="rounded-xl border-orange-500/70 border-l-4 bg-orange-500/15 px-4 py-2 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400 my-4">
      <p className="inline italic">
        <QuoteIcon
          aria-hidden="true"
          className="-translate-y-1 mr-1 inline size-3 fill-orange-700 stroke-none"
        />
        {quote}
        <QuoteIcon
          aria-hidden="true"
          className="ml-1 inline size-3 translate-y-1 fill-orange-700 stroke-none"
        />
      </p>
      <p className="mt-1.5 text-end font-semibold text-sm italic tracking-tighter">
        {author}
      </p>
    </blockquote>
  );
};

const PDFPreview = ({ src }: { src: string }) => {
  return (
    <iframe
      src={src}
      style={{ height: '100%', width: '100%', border: 'none' }}
      title="PDF Preview"
      allowFullScreen
    />
  );
};

const whyImportantPoints = [
    {
        title: "1. Purification of the Heart",
        icon: Sparkles,
        quote: "Chanting of Kṛṣṇa’s holy name cleanses all the dust accumulated in the heart.",
        source: "Śikṣāṣṭakam 1",
        desc: "Morning sādhana begins with chanting, which cleanses the mirror of the mind."
    },
    {
        title: "2. Foundation of Spiritual Strength",
        icon: Sun,
        quote: "The morning program is the backbone of spiritual life. If one strictly follows, there is no possibility of falling down.",
        source: "Śrila Prabhupāda, Room Conversation, 1976",
        desc: ""
    },
    {
        title: "3. Association With Pure Devotees",
        icon: Users,
        quote: "The spiritual master delivers the materially afflicted souls by extinguishing the blazing fire of material existence.",
        source: "Śrī Gurvaṣṭaka",
        desc: "This is why we begin every morning by offering obeisances to Śrīla Prabhupāda."
    },
    {
        title: "4. Pleasing Lord Caitanya",
        icon: Music,
        quote: "If you attend maṅgala-ārati every morning, Lord Caitanya will personally shower His mercy.",
        source: "Śrila Prabhupāda Lecture, Hyderabad, 1976",
        desc: "By chanting and worshipping in the early morning, one attracts the mercy of Lord Caitanya."
    },
    {
        title: "5. Best Time for Spiritual Advancement",
        icon: BookHeart,
        quote: "The Brahma-muhūrta, one and a half hours before sunrise, is the best time to advance in spiritual life.",
        source: "Śrila Prabhupāda, BG 6.16–17 Purport",
        desc: "This is why the entire morning program aligns with auspicious early hours."
    }
]

const prayersList = [
    "Śrīla Prabhupāda-praṇāma",
    "Pañca-tattva mantra",
    "Hare Kṛṣṇa Mahā-mantra",
    "Śrī Gurvaṣṭaka",
    "Śrī Nṛsiṁha-prārthanā",
    "Śrī Tulasi-praṇāma & kīrtana",
    "Six Gosvāmīs Prayer",
    "Śrī Śikṣāṣṭakam",
    "Śrī Vaiṣṇava-praṇāma",
    "Śrī Guru-vandanā",
    "Śrī Gaura-ārati",
    "Prayers of glorification"
]

export function MorningProgramSection() {
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const isMobile = useIsMobile();
    
    // Book details constants
    const bookTitle = "Morning Program Prayers";
    const bookSubtitle = "Daily Sādhana Guide";
    const bookDesc = "The morning program is the heart of spiritual practice in all temples. By hearing, chanting, worshipping and praying early in the morning, the mind becomes purified, intelligence becomes steady, and devotion awakens naturally.";


    return (
        <section className="py-24 relative overflow-hidden bg-muted/20">
             {/* Background decorative elements */}
             <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
                <div className="text-center mb-16">
                     <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                     >
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
                             Morning Program Prayers
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Daily Morning Sādhana to Begin the Day with Śrīla Prabhupāda
                        </p>
                     </motion.div>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    
                    {/* Left Column: Book Showcase Style */}
                    <div className="flex flex-col items-center lg:block">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="w-full max-w-md mx-auto"
                        >
                            <div className="flex flex-col items-center lg:items-start mb-6">
                                <div className="flex justify-center lg:justify-start mb-6">
                                    <ModernBookCover 
                                        size={isMobile ? "md" : "lg"} 
                                        color="orange" 
                                        className="shadow-xl hover:shadow-orange-400/30 transition-shadow duration-300"
                                    >
                                        <img
                                            src={morningProgramCover}
                                            alt="Morning Program Cover"
                                            className="w-full h-full object-cover"
                                        />
                                    </ModernBookCover>
                                </div>
                                
                                <div className="flex flex-wrap gap-4 justify-center lg:justify-start w-full">
                                    <Button 
                                        onClick={() => setIsPreviewOpen(true)}
                                        size="lg" 
                                        className="rounded-full shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
                                    >
                                        <BookOpen className="mr-2 h-5 w-5" />
                                        Preview
                                    </Button>
                                    
                                    <Button 
                                        asChild
                                        variant="outline"
                                        size="lg" 
                                        className="rounded-full shadow-sm hover:shadow-md transition-all hover:-translate-y-1 border-primary/20"
                                    >
                                        <a href={morningProgramPdf} download="Morning-Program-Prayers.pdf">
                                            <Download className="mr-2 h-5 w-5" />
                                            Download
                                        </a>
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-4 text-center lg:text-left">
                                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                                    <Badge variant="outline" className="text-xs px-2 py-0.5 border-orange-500/70 text-orange-600 dark:text-orange-400 dark:border-orange-500/50">
                                        Free PDF
                                    </Badge>
                                    <Badge variant="outline" className="text-xs px-2 py-0.5 border-orange-500/70 text-orange-600 dark:text-orange-400 dark:border-orange-500/50">
                                        Daily Prayers
                                    </Badge>
                                </div>

                                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
                                    {bookTitle}
                                </h3>
                                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                                    {bookSubtitle}
                                </p>
                                <p className="text-base text-muted-foreground leading-relaxed pt-1">
                                    {bookDesc}
                                </p>

                                <BlockQuote 
                                    quote="Rise early in the morning, chant Hare Kṛṣṇa, and your life will be successful."
                                    author="— Śrila Prabhupāda, Morning Walk, 1973"
                                />


                                
                                <div className="pt-6">
                                    <h4 className="text-sm font-semibold mb-3 text-left">Contains:</h4>
                                    <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                                        {prayersList.map((prayer, i) => (
                                            <Badge 
                                                key={i} 
                                                variant="secondary" 
                                                className="text-[10px] py-0.5 px-2 bg-muted/50 text-muted-foreground hover:text-foreground"
                                            >
                                                {prayer}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Why Important (Accordion/Cards) */}
                    <div className="space-y-6">
                         <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                         >
                            <h3 className="text-2xl font-bold mb-6">Why the Morning Program Is Important</h3>
                            <p className="text-muted-foreground mb-8">
                                Insights from Śrīla Prabhupāda and our Ācāryas on the significance of early morning sādhana.
                            </p>

                            <Accordion className="w-full space-y-4">
                                {whyImportantPoints.map((point, index) => (
                                    <AccordionItem 
                                        key={index} 
                                        defaultOpen={index === 0}
                                        className="border border-border/50 rounded-xl bg-card px-4 shadow-sm border-b-border/50"
                                    >
                                        <AccordionButton className="hover:no-underline py-4">
                                            <div className="flex items-center gap-3 text-left">
                                                <div className="p-2 rounded-full bg-primary/10 text-primary shrink-0">
                                                    <point.icon className="h-4 w-4" />
                                                </div>
                                                <span className="font-semibold text-base">{point.title.replace(/^\d+\.\s/, '')}</span>
                                            </div>
                                        </AccordionButton>
                                        <AccordionPanel className="pb-4 pt-1 px-1 text-muted-foreground">
                                            {point.desc && <p className="mb-3">{point.desc}</p>}
                                            <div className="bg-muted/50 p-3 rounded-lg text-sm italic border-l-2 border-primary/50 text-foreground/80">
                                                "{point.quote}"
                                                <div className="mt-1 text-xs text-muted-foreground font-medium not-italic">— {point.source}</div>
                                            </div>
                                        </AccordionPanel>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </motion.div>
                    </div>

                </div>
            </div>

            <Sheet open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
                <SheetContent side="bottom" className="h-[90vh] w-full max-w-full p-0 sm:max-w-full">
                    <SheetHeader className="p-4 border-b flex-shrink-0">
                        <SheetTitle>Book Preview: Morning Program Prayers</SheetTitle>
                    </SheetHeader>
                    <div className="flex-grow relative overflow-auto h-full">
                        <PDFPreview src={morningProgramPdf} />
                    </div>
                </SheetContent>
            </Sheet>
        </section>
    )
}
