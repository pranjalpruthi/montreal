import { useState } from 'react'
import { motion } from 'motion/react'
import { Download, Quote, ExternalLink, Mail, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import spTeachingImg from '@/assets/sp-teaching.png'
import bg108Pdf from '@/assets/books/108BG.pdf'

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

export function SlokaSection() {
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
                    
                    {/* Image Column */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative max-w-sm mx-auto md:mr-auto"
                    >
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/50 group">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                            <img 
                                src={spTeachingImg} 
                                alt="Srila Prabhupada Teaching" 
                                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                        {/* Decorative quote badge overlapping image */}
                        <div className="absolute -bottom-6 -right-6 md:-left-6 md:right-auto bg-card border border-border p-4 rounded-xl shadow-xl max-w-xs hidden md:block z-20">
                            <p className="text-xs font-medium text-muted-foreground italic">
                                "Books are the basis."
                            </p>
                        </div>
                    </motion.div>

                    {/* Content Column */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div>
                            <Badge variant="outline" className="mb-4 border-primary/20 text-primary bg-primary/5">
                                Free Resource
                            </Badge>
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
                                108 Important Bhagavad-gītā Ślokas
                            </h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Hare Kṛṣṇa — we prepared a handy PDF of <span className="font-semibold text-foreground">108 essential Bhagavad-gītā verses</span> to help you read, memorize, and realize Kṛṣṇa’s instructions.
                            </p>
                        </div>

                        <blockquote className="border-l-4 border-amber-500 bg-amber-500/10 p-6 rounded-r-xl italic relative">
                            <Quote className="absolute top-4 right-4 h-8 w-8 text-amber-500/20 rotate-180" />
                            <p className="text-lg text-amber-900 dark:text-amber-100 mb-2 font-serif">
                                "If you simply read one verse of Bhagavad-gītā every day, your life will be perfect."
                            </p>
                            <footer className="text-sm font-medium text-amber-800/80 dark:text-amber-200/80 not-italic">
                                — Śrīla Prabhupāda, Morning Walk, Los Angeles, Dec 17, 1973
                            </footer>
                        </blockquote>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button 
                                onClick={() => setIsPreviewOpen(true)}
                                size="lg" 
                                variant="secondary"
                                className="rounded-full shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
                            >
                                <BookOpen className="mr-2 h-5 w-5" />
                                Preview
                            </Button>
                            <Button asChild size="lg" className="rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-1">
                                <a href={bg108Pdf} download="108-Important-bg-Slokas.pdf">
                                    <Download className="mr-2 h-5 w-5" />
                                    Download PDF
                                </a>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="rounded-full">
                                <a href="mailto:admin@iskm.ca">
                                    <Mail className="mr-2 h-5 w-5" />
                                    Join Gītā Circle
                                </a>
                            </Button>
                        </div>

                        <Card className="bg-muted/30 border-none shadow-none">
                            <CardContent className="pt-6 space-y-4">
                                <div>
                                    <h4 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                                        <ExternalLink className="h-4 w-4 text-primary" />
                                        How to use
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                        Read daily, memorize one verse a week, and practice in your morning japa or evening class.
                                    </p>
                                </div>
                                <div className="border-t border-border/50 pt-4">
                                    <h4 className="font-semibold text-foreground mb-1 text-sm">Need help?</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Join our weekly Gītā circle at the temple or email us at <a href="mailto:admin@iskm.ca" className="text-primary hover:underline">admin@iskm.ca</a>
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                </div>
            </div>
            
            <Sheet open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
                <SheetContent side="bottom" className="h-[90vh] w-full max-w-full p-0 sm:max-w-full">
                    <SheetHeader className="p-4 border-b flex-shrink-0">
                        <SheetTitle>Book Preview: 108 Important Gītā Ślokas</SheetTitle>
                    </SheetHeader>
                    <div className="flex-grow relative overflow-auto h-full">
                        <PDFPreview src={bg108Pdf} />
                    </div>
                </SheetContent>
            </Sheet>
        </section>
    )
}
