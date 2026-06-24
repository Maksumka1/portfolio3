import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Cable, FlaskConical, Truck, Wrench } from 'lucide-react';

const pillars = [
  {
    icon: Cable,
    title: 'Кабель-менеджмент як мистецтво',
    desc: 'Кожен кабель прокладено вручну, зафіксовано та прихований. Ваш ПК виглядає як студійна збірка, а не "аматорський монтаж".',
    color: '#2D5BFF',
    stat: '100%',
    statLabel: 'збірок',
  },
  {
    icon: FlaskConical,
    title: '24-годинний стрес-тест',
    desc: 'Furmark + Cinebench + MemTest86 одночасно. Якщо система витримує — вона надійна. Ви отримуєте звіт по температурах.',
    color: '#00e5ff',
    stat: '24h',
    statLabel: 'тестування',
  },
  {
    icon: Truck,
    title: 'Доставка особисто в руки',
    desc: 'По Івано-Франківську привозимо самі — без служб доставки, без ризику пошкодження. Безкоштовно.',
    color: '#10b981',
    stat: '0 ₴',
    statLabel: 'доставка',
  },
  {
    icon: Wrench,
    title: 'Професійне підключення',
    desc: 'Приїдемо, встановимо, запустимо Windows, налаштуємо ігри та драйвери. Підемо лише коли все ідеально.',
    color: '#f59e0b',
    stat: '+1 год',
    statLabel: 'сервіс',
  },
];

function NeonLine({ color, delay }) {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
      className="absolute bottom-0 left-0 right-0 h-[1px] origin-left"
      style={{ background: `linear-gradient(90deg, ${color}, ${color}88, transparent)` }}
    />
  );
}

function PillarCard({ pillar, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-2xl p-6 overflow-hidden group"
      style={{
        background: 'linear-gradient(145deg, hsl(0 0% 6%), hsl(0 0% 4%))',
        border: `1px solid ${pillar.color}25`,
      }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at 30% 30%, ${pillar.color}12, transparent 70%)` }}
      />

      {/* Neon corner accent */}
      <div
        className="absolute top-0 right-0 w-20 h-20 pointer-events-none"
        style={{
          background: `radial-gradient(circle at top right, ${pillar.color}20, transparent 70%)`,
        }}
      />

      {/* Neon bottom line */}
      <NeonLine color={pillar.color} delay={0.4 + index * 0.1} />

      {/* Stat badge */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: `${pillar.color}15`, border: `1px solid ${pillar.color}30` }}
        >
          <pillar.icon className="w-5 h-5" style={{ color: pillar.color }} strokeWidth={1.5} />
        </div>
        <div className="text-right">
          <div className="font-display text-2xl font-extrabold" style={{ color: pillar.color }}>
            {pillar.stat}
          </div>
          <div className="tech-mono text-[10px] text-muted-foreground">{pillar.statLabel}</div>
        </div>
      </div>

      <h3 className="font-display font-bold text-base text-foreground mb-2">{pillar.title}</h3>
      <p className="text-xs text-muted-foreground leading-relaxed">{pillar.desc}</p>

      {/* Scanning line animation */}
      <motion.div
        animate={{ y: ['0%', '100%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear', delay: index * 0.5 }}
        className="absolute left-0 right-0 h-12 pointer-events-none opacity-5"
        style={{ background: `linear-gradient(transparent, ${pillar.color}, transparent)` }}
      />
    </motion.div>
  );
}

export default function TrustSection() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(45,91,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(45,91,255,1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="tech-mono text-[11px] tracking-[0.35em] text-primary"
          >
            ЛОКАЛЬНИЙ ПРЕМІУМ
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 font-display text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-foreground"
          >
            Чому саме{' '}
            <span className="text-gradient">STRATUM</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-4 h-[2px] w-20 bg-primary mx-auto origin-center"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-4 text-sm text-muted-foreground max-w-md mx-auto"
          >
            Ми не просто збираємо комп'ютери — ми надаємо сервіс, якого не знайдеш в жодному онлайн-магазині.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((p, i) => <PillarCard key={i} pillar={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}