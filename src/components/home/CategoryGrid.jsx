import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Monitor, Cpu, CircuitBoard, MemoryStick, HardDrive, Wrench } from 'lucide-react';
import SectionTitle from '@/components/shared/SectionTitle';

const categories = [
  { icon: Monitor, label: 'Готові ПК', desc: 'Ігрові та робочі збірки', to: '/catalog', accent: 'from-primary/20 to-primary/5' },
  { icon: Cpu, label: 'Процесори', desc: 'Intel Core & AMD Ryzen', to: '/components?cat=processor', accent: 'from-accent/20 to-accent/5' },
  { icon: CircuitBoard, label: 'Відеокарти', desc: 'GeForce & Radeon', to: '/components?cat=gpu', accent: 'from-primary/20 to-primary/5' },
  { icon: MemoryStick, label: "Оперативна пам'ять", desc: 'DDR4 & DDR5', to: '/components?cat=ram', accent: 'from-accent/20 to-accent/5' },
  { icon: HardDrive, label: 'Накопичувачі', desc: 'SSD & HDD', to: '/components?cat=storage', accent: 'from-primary/20 to-primary/5' },
  { icon: Wrench, label: 'Конфігуратор', desc: 'Збери сам', to: '/configurator', accent: 'from-accent/20 to-accent/5' },
];

export default function CategoryGrid() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-[1440px] mx-auto">
        <SectionTitle title="Категорії" subtitle="Знайдіть саме те, що потрібно для вашої системи." align="center" />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={cat.to}
                className="group block glass-panel rounded-xl p-5 text-center hover:border-primary/20 transition-all duration-300"
              >
                <div className={`w-12 h-12 mx-auto rounded-lg bg-gradient-to-br ${cat.accent} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <cat.icon className="w-5 h-5 text-foreground" strokeWidth={1.5} />
                </div>
                <h3 className="text-sm font-medium text-foreground">{cat.label}</h3>
                <p className="text-[11px] text-muted-foreground mt-1">{cat.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}