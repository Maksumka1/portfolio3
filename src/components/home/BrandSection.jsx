import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { MapPin, Calendar, Users, Award, Cpu, Wrench } from 'lucide-react';

const stats = [
  { value: '5+', label: 'Років досвіду', icon: Calendar },
  { value: '1200+', label: 'Зібраних ПК', icon: Cpu },
  { value: '98%', label: 'Задоволених клієнтів', icon: Users },
  { value: '3', label: 'Роки гарантії', icon: Award },
];

const timeline = [
  { year: '2019', text: 'Відкриття першої майстерні в Івано-Франківську' },
  { year: '2021', text: 'Запуск онлайн-магазину та розширення асортименту' },
  { year: '2023', text: 'Сертифікований партнер Intel та NVIDIA' },
  { year: '2025', text: 'STRATUM — магазин №1 в регіоні' },
];

export default function BrandSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-24 px-6 relative overflow-hidden border-t border-border/30">
      {/* Animated background grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: brand story */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <span className="tech-mono text-primary text-[11px] tracking-[0.3em]">ПРО НАС</span>
              <h2 className="mt-3 font-display text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-foreground leading-[0.95]">
                МИ — <span className="text-gradient">STRATUM</span>
              </h2>
              <div className="mt-4 w-16 h-[2px] bg-primary" />

              <p className="mt-6 text-sm text-muted-foreground leading-relaxed max-w-md">
                STRATUM — це команда інженерів та ентузіастів, яка з 2019 року збирає преміальні комп'ютери в Івано-Франківську. Ми не просто продаємо залізо — ми створюємо машини, які відповідають вашим цілям.
              </p>

              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span>вул. Незалежності, 15, <strong className="text-foreground">Івано-Франківськ</strong></span>
              </div>

              {/* Timeline */}
              <div className="mt-8 space-y-4">
                {timeline.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 w-12 tech-mono text-[11px] text-primary pt-0.5">{item.year}</div>
                    <div className="flex-1 flex items-start gap-3">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      <p className="text-xs text-muted-foreground">{item.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: stats */}
          <div>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="glass-panel rounded-2xl p-6 relative overflow-hidden group hover:border-primary/30 transition-colors"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <stat.icon className="w-5 h-5 text-primary mb-3" strokeWidth={1.5} />
                  <div className="font-display text-4xl font-extrabold text-gradient">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Map placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="mt-4 glass-panel rounded-2xl p-5 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Івано-Франківськ</p>
                <p className="text-xs text-muted-foreground">вул. Незалежності, 15 • Пн–Сб: 10:00 – 20:00</p>
                <p className="tech-mono text-[11px] text-primary mt-1">+380 (99) 123-45-67</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}