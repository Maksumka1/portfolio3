import React from 'react';
import { motion } from 'framer-motion';

export default function SectionTitle({ title, subtitle, align = 'left' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`mb-10 ${align === 'center' ? 'text-center' : ''}`}
    >
      <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight uppercase text-foreground">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-sm text-muted-foreground max-w-lg">
          {subtitle}
        </p>
      )}
      <div className={`mt-4 w-16 h-[2px] bg-primary ${align === 'center' ? 'mx-auto' : ''}`} />
    </motion.div>
  );
}