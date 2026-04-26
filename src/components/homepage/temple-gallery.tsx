"use client";

import { motion } from 'motion/react';
import { Card } from '@/components/ui/card';

const images = [
  { src: '/temple-inout/1.jpg', alt: 'Temple View 1' },
  { src: '/temple-inout/2.jpg', alt: 'Temple View 2' },
  { src: '/temple-inout/3.jpg', alt: 'Temple View 3' },
  { src: '/temple-inout/4.jpg', alt: 'Temple View 4' },
];

export function TempleGallery() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container px-4 md:px-8 mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Our Temple
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
              A spiritual oasis in the heart of Montreal. Take a glimpse inside our vibrant temple where we cultivate devotion and community.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
            >
              <Card className="overflow-hidden border-border/50 shadow-lg group relative aspect-[4/3] rounded-2xl">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
