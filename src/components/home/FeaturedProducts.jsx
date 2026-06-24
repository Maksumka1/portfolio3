import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, ShoppingCart, Star, Crown, Flame, Zap, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cartStore';
import { toast } from 'sonner';
import FPSWidget from './FPSWidget';

const TIERS = [
  {
    label: 'БАЗОВА',
    badge: null,
    accentColor: '#6b7280',
    glowColor: 'rgba(107,114,128,0.15)',
    borderColor: 'rgba(107,114,128,0.3)',
    icon: Zap,
    product: {
      name: 'STRATUM Entry RTX 4060 Ti',
      price: 42000,
      purpose: 'gaming',
      short_desc: 'Бюджетна ігрова збірка для 1080p',
      specs: { cpu: 'Intel Core i5-14600K', gpu: 'NVIDIA RTX 4060 Ti 8GB', ram: '16 GB DDR5', storage: '1TB NVMe SSD' },
      rating: 4.6,
    }
  },
  {
    label: 'ПОПУЛЯРНА',
    badge: 'ХІТ ПРОДАЖІВ',
    accentColor: '#2D5BFF',
    glowColor: 'rgba(45,91,255,0.25)',
    borderColor: 'rgba(45,91,255,0.6)',
    icon: Crown,
    popular: true,
    product: {
      name: 'STRATUM Vortex RTX 4070 Super',
      price: 62000,
      purpose: 'gaming',
      short_desc: 'Оптимальна ігрова збірка для 1440p',
      specs: { cpu: 'AMD Ryzen 7 7800X3D', gpu: 'NVIDIA RTX 4070 Super 12GB', ram: '32 GB DDR5', storage: '1TB NVMe SSD' },
      rating: 4.9,
    }
  },
  {
    label: 'ПРЕМІУМ',
    badge: null,
    accentColor: '#f59e0b',
    glowColor: 'rgba(245,158,11,0.15)',
    borderColor: 'rgba(245,158,11,0.3)',
    icon: Flame,
    product: {
      name: 'STRATUM Phantom RTX 5080',
      price: 95000,
      purpose: 'gaming',
      short_desc: 'Флагман для 4K на RTX 5080',
      specs: { cpu: 'Intel Core i9-14900K', gpu: 'NVIDIA RTX 5080 16GB', ram: '64 GB DDR5', storage: '2TB NVMe SSD' },
      rating: 5,
    }
  },
  {
    label: 'ULTIMATE',
    badge: null,
    accentColor: '#ec4899',
    glowColor: 'rgba(236,72,153,0.15)',
    borderColor: 'rgba(236,72,153,0.3)',
    icon: TrendingUp,
    product: {
      name: 'STRATUM Apex RTX 5090',
      price: 165000,
      purpose: 'gaming',
      short_desc: 'Без компромісів. Лише максимум.',
      specs: { cpu: 'Intel Core i9-14900K', gpu: 'NVIDIA RTX 5090 24GB', ram: '128 GB DDR5', storage: '4TB NVMe SSD' },
      rating: 5,
    }
  },
];

function TierCard({ tier, index }) {
  const { addItem } = useCart();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const handleAdd = (e) => {
    e.stopPropagation();
    addItem({ id: `tier-${index}`, ...tier.product });
    toast.success(`${tier.product.name} додано в кошик`);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: tier.popular ? 1.04 : 1 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="relative flex flex-col rounded-2xl overflow-hidden"
      style={{
        background: `linear-gradient(145deg, hsl(0 0% 7%), hsl(0 0% 5%))`,
        border: `1px solid ${tier.borderColor}`,
        boxShadow: tier.popular
          ? `0 0 40px -5px ${tier.glowColor}, 0 0 80px -15px ${tier.glowColor}`
          : `0 0 20px -8px ${tier.glowColor}`,
      }}
    >
      {/* Popular banner */}
      {tier.badge && (
        <div
          className="absolute top-0 left-0 right-0 z-20 py-1.5 text-center text-[10px] font-bold tracking-[0.3em]"
          style={{ background: tier.accentColor, color: '#fff' }}
        >
          ★ {tier.badge} ★
        </div>
      )}

      {/* Tier label */}
      <div className={`px-5 ${tier.badge ? 'pt-10' : 'pt-5'} pb-3 flex items-center justify-between`}>
        <span
          className="tech-mono text-[10px] font-bold tracking-[0.2em]"
          style={{ color: tier.accentColor }}
        >
          {tier.label}
        </span>
        <tier.icon className="w-4 h-4" style={{ color: tier.accentColor }} />
      </div>

      {/* Animated glow orb */}
      <div
        className="absolute right-0 top-0 w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: tier.accentColor }}
      />

      {/* Image placeholder with animated gradient */}
      <div className="mx-5 rounded-xl aspect-video relative overflow-hidden" style={{ background: 'hsl(0 0% 9%)' }}>
        <motion.div
          animate={{ x: ['0%', '100%', '0%'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 opacity-10"
          style={{ background: `linear-gradient(90deg, transparent, ${tier.accentColor}, transparent)` }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <tier.icon className="w-12 h-12 opacity-10" style={{ color: tier.accentColor }} />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display font-bold text-base text-foreground leading-snug">{tier.product.name}</h3>
        <p className="text-xs text-muted-foreground mt-1 mb-3">{tier.product.short_desc}</p>

        {/* Specs */}
        <div className="space-y-1.5 mb-4">
          {[
            ['CPU', tier.product.specs.cpu],
            ['GPU', tier.product.specs.gpu],
            ['RAM', tier.product.specs.ram],
            ['SSD', tier.product.specs.storage],
          ].map(([k, v]) => (
            <div key={k} className="flex gap-2 text-[11px]">
              <span className="tech-mono w-8 flex-shrink-0" style={{ color: tier.accentColor }}>{k}</span>
              <span className="text-muted-foreground">{v}</span>
            </div>
          ))}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-3 h-3 ${i < Math.round(tier.product.rating) ? 'fill-current' : 'opacity-20'}`} style={{ color: tier.accentColor }} />
          ))}
          <span className="tech-mono text-[10px] text-muted-foreground ml-1">{tier.product.rating}/5</span>
        </div>

        {/* FPS Widget */}
        <div className="mb-4">
          <FPSWidget tierKey={['base','popular','premium','ultimate'][index]} />
        </div>

        <div className="mt-auto">
          {/* Price */}
          <div className="mb-3">
            <span className="font-display text-2xl font-extrabold" style={{ color: tier.popular ? tier.accentColor : 'hsl(var(--foreground))' }}>
              {tier.product.price.toLocaleString('uk-UA')} ₴
            </span>
          </div>

          <button
            onClick={handleAdd}
            className="w-full h-10 rounded-lg flex items-center justify-center gap-2 text-xs font-display font-bold tracking-wider transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{
              background: tier.popular
                ? `linear-gradient(135deg, ${tier.accentColor}, #6B8FFF)`
                : `rgba(255,255,255,0.05)`,
              border: tier.popular ? 'none' : `1px solid ${tier.borderColor}`,
              color: tier.popular ? '#fff' : tier.accentColor,
            }}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            {tier.popular ? 'КУПИТИ ЗАРАЗ' : 'В КОШИК'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedProducts() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-5 bg-primary" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full blur-[100px] opacity-5 bg-accent" />
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="tech-mono text-primary text-[11px] tracking-[0.3em]"
            >
              РЕКОМЕНДОВАНІ ЗБІРКИ
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-2 font-display text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-foreground"
            >
              Топ збірки
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '4rem' }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="mt-3 h-[2px] bg-primary"
            />
          </div>
          <Link to="/catalog" className="hidden md:block">
            <Button variant="ghost" className="text-xs tracking-wider text-muted-foreground hover:text-primary group">
              ВСІ ЗБІРКИ
              <ArrowRight className="ml-2 w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TIERS.map((tier, i) => (
            <TierCard key={i} tier={tier} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}