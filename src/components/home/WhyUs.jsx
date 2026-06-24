import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Shield, Headphones, Award } from 'lucide-react';

const perks = [
  { icon: Truck, title: 'Безкоштовна доставка', desc: 'По Івано-Франківську — 0 ₴. По Україні — від 99 ₴.' },
  { icon: Shield, title: 'Гарантія 3 роки', desc: 'Повне сервісне обслуговування на всі збірки та комплектуючі.' },
  { icon: Headphones, title: 'Підтримка 24/7', desc: 'Наша команда завжди на зв\'язку для технічних консультацій.' },
  { icon: Award, title: 'Перевірена якість', desc: 'Тільки оригінальні комплектуючі від офіційних дистриб\'юторів.' },
];

export default function WhyUs() {
  return (
    <section className="py-20 px-6 border-t border-border/50">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {perks.map((perk, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-4"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <perk.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground">{perk.title}</h4>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{perk.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}