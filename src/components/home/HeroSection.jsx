import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, Shield, Zap, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PC3D from './PC3D';

const features = [
  { icon: Zap, label: 'ПОТУЖНІСТЬ', value: 'RTX 50 Series' },
  { icon: Cpu, label: 'ПРОЦЕСОРИ', value: 'Intel & AMD' },
  { icon: Shield, label: 'ГАРАНТІЯ', value: '3 роки' },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background/20 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40 z-10" />

      {/* 3D PC — right side */}
      <div className="absolute inset-y-0 right-0 w-full md:w-[60%] z-0">
        <Suspense fallback={<div className="w-full h-full bg-transparent" />}>
          <PC3D />
        </Suspense>
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-[1440px] mx-auto px-6 w-full py-32">
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="tech-mono text-primary tracking-[0.35em] text-[11px]">
              IVANO-FRANKIVSK • КОМП'ЮТЕРНИЙ МАГАЗИН
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-display text-6xl md:text-7xl lg:text-[88px] font-extrabold uppercase leading-[0.88] tracking-tight"
          >
            <span className="text-foreground block">СИЛА</span>
            <span className="text-gradient block mt-1">ВСЕРЕДИНІ</span>
          </motion.h1>

          {/* Animated underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 h-[3px] w-32 origin-left"
            style={{ background: 'linear-gradient(90deg, #2D5BFF, #00e5ff, #2D5BFF)' }}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6 text-sm text-muted-foreground max-w-sm leading-relaxed"
          >
            Преміальні ігрові ПК та робочі станції зі збіркою вручну.
            Кожна система — це 24 год стрес-тесту та 3 роки гарантії.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link to="/catalog">
              <Button size="lg" className="h-13 px-8 font-display tracking-wider text-sm glow-blue group relative overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  КАТАЛОГ ЗБІРОК
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: 'linear-gradient(135deg, #2D5BFF, #6B8FFF)' }}
                />
              </Button>
            </Link>
            <Link to="/configurator">
              <Button size="lg" variant="outline" className="h-13 px-8 font-display tracking-wider text-sm border-primary/30 hover:border-primary/60 hover:bg-primary/5 transition-all duration-300">
                КОНФІГУРАТОР ПК
              </Button>
            </Link>
          </motion.div>

          {/* Feature badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="mt-12 flex flex-wrap gap-3"
          >
            {features.map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1 + i * 0.1 }}
                className="glass-panel rounded-lg px-4 py-2.5 flex items-center gap-3 hover:border-primary/30 transition-colors"
              >
                <feat.icon className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
                <div>
                  <span className="tech-mono text-[10px] text-muted-foreground block">{feat.label}</span>
                  <span className="text-xs font-medium text-foreground">{feat.value}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="tech-mono text-[10px] text-muted-foreground/50 tracking-widest">SCROLL</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-4 h-4 text-muted-foreground/40" />
        </motion.div>
      </motion.div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent z-20" />
    </section>
  );
}