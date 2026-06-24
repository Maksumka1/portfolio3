import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ShoppingCart, Truck, Shield, Wrench, CreditCard, Phone, MessageCircle, MapPin, Clock } from 'lucide-react';
import SectionTitle from '@/components/shared/SectionTitle';
import Footer from '@/components/layout/Footer';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const faqSections = [
  {
    icon: ShoppingCart,
    title: 'Як оформити замовлення',
    color: '#2D5BFF',
    items: [
      {
        q: 'Як замовити готову збірку?',
        a: 'Виберіть готову збірку в каталозі, натисніть «В кошик», потім «Оформити замовлення». Наш менеджер зв\'яжеться з вами протягом 30 хвилин для підтвердження.',
      },
      {
        q: 'Як замовити через конфігуратор?',
        a: 'У розділі «Конфігуратор» оберіть комплектуючі крок за кроком — система автоматично перевіряє сумісність. Додайте збірку в кошик і оформте замовлення.',
      },
      {
        q: 'Чи можна замовити по телефону?',
        a: 'Так! Телефонуйте +380 (99) 123-45-67 (пн–сб, 10:00–20:00). Менеджер допоможе підібрати конфігурацію та оформить замовлення.',
      },
      {
        q: 'Чи можна приїхати особисто?',
        a: 'Так, ми знаходимось за адресою: вул. Незалежності, 15, Івано-Франківськ. Можна подивитись на готові системи та отримати консультацію.',
      },
    ],
  },
  {
    icon: CreditCard,
    title: 'Оплата',
    color: '#10b981',
    items: [
      {
        q: 'Які способи оплати доступні?',
        a: 'Готівка, банківська карта, Monobank/PrivatBank (миттєво), оплата частинами (Mono Частини, OschadPay до 12 місяців без переплат).',
      },
      {
        q: 'Чи є розстрочка?',
        a: 'Так! Ми пропонуємо розстрочку на 3, 6 або 12 місяців без переплат через Mono Частини та OschadPay. Мінімальна сума — 5 000 ₴.',
      },
      {
        q: 'Коли потрібно платити?',
        a: 'При самовивозі — оплата на місці. При доставці по місту — оплата при отриманні. При відправці Новою Поштою — передоплата або накладений платіж.',
      },
    ],
  },
  {
    icon: Truck,
    title: 'Доставка',
    color: '#f59e0b',
    items: [
      {
        q: 'Як швидко виконується замовлення?',
        a: 'Готові збірки — 1-2 дні. Кастомні конфігурації — 3-5 робочих днів (складання, тестування, стрес-тест 24 год).',
      },
      {
        q: 'Доставка по Івано-Франківську?',
        a: 'Безкоштовна доставка кур\'єром по місту на наступний день після підтвердження замовлення.',
      },
      {
        q: 'Доставка по Україні?',
        a: 'Нова Пошта — від 99 ₴. Упакуємо в спеціальне захисне пакування. Час — 1-3 дні залежно від міста.',
      },
    ],
  },
  {
    icon: Shield,
    title: 'Гарантія та повернення',
    color: '#8b5cf6',
    items: [
      {
        q: 'Яка гарантія на збірки?',
        a: 'На всі готові та кастомні збірки — 3 роки комплексної гарантії. На комплектуючі окремо — відповідно до гарантії виробника (від 2 до 5 років).',
      },
      {
        q: 'Що входить у гарантійне обслуговування?',
        a: 'Безкоштовний ремонт або заміна несправних компонентів, безкоштовна діагностика, виїзд майстра по Івано-Франківську.',
      },
      {
        q: 'Чи можна повернути товар?',
        a: 'Комплектуючі — протягом 14 днів (якщо не були у використанні). Готові збірки — за умови виявлення заводського браку протягом 14 днів.',
      },
    ],
  },
  {
    icon: Wrench,
    title: 'Технічні питання',
    color: '#ec4899',
    items: [
      {
        q: 'Чи перевіряєте ви збірки перед відправкою?',
        a: 'Так, обов\'язково. Кожен ПК проходить 24-годинний стрес-тест (Cinebench, Furmark, MemTest86), перевірку температур та стабільності системи.',
      },
      {
        q: 'Чи встановлюєте Windows?',
        a: 'Так, ліцензійний Windows 11 Home або Pro встановлюється за замовчуванням. Можна замовити збірку без ОС для економії.',
      },
      {
        q: 'Чи налаштовуєте ПК під конкретні задачі?',
        a: 'Так! Можемо налаштувати ПК для стрімінгу, відеомонтажу, 3D-рендерингу або ігор — встановити потрібне ПЗ і оптимізувати параметри.',
      },
    ],
  },
];

function FAQItem({ q, a, accent }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border/40 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left py-4 flex items-start justify-between gap-4 group"
      >
        <span className={`text-sm font-medium transition-colors ${open ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>
          {q}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 mt-0.5"
        >
          <ChevronDown className="w-4 h-4 text-muted-foreground" style={{ color: open ? accent : undefined }} />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-sm text-muted-foreground leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FAQSection({ section, index }) {
  const ref = React.useRef(null);
  const inView = motion.useInView ? null : null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="glass-panel rounded-2xl overflow-hidden"
    >
      <div className="flex items-center gap-3 px-6 py-5 border-b border-border/40"
        style={{ background: `linear-gradient(90deg, ${section.color}15, transparent)` }}>
        <div className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ background: `${section.color}20`, border: `1px solid ${section.color}40` }}>
          <section.icon className="w-4.5 h-4.5" style={{ color: section.color }} />
        </div>
        <h3 className="font-display font-bold text-base text-foreground">{section.title}</h3>
      </div>
      <div className="px-6">
        {section.items.map((item, i) => (
          <FAQItem key={i} q={item.q} a={item.a} accent={section.color} />
        ))}
      </div>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <div className="min-h-screen">
      <div className="max-w-[1000px] mx-auto px-6 py-12">
        <SectionTitle
          title="Часті питання"
          subtitle="Відповіді на найпоширеніші запитання про замовлення, доставку, оплату та гарантію."
          align="center"
        />

        {/* Quick contact bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-3 justify-center mb-12"
        >
          <div className="glass-panel rounded-xl px-5 py-3 flex items-center gap-3">
            <Phone className="w-4 h-4 text-primary" />
            <div>
              <p className="text-[10px] text-muted-foreground">Телефон</p>
              <p className="tech-mono text-xs text-foreground">+380 (99) 123-45-67</p>
            </div>
          </div>
          <div className="glass-panel rounded-xl px-5 py-3 flex items-center gap-3">
            <Clock className="w-4 h-4 text-primary" />
            <div>
              <p className="text-[10px] text-muted-foreground">Графік роботи</p>
              <p className="tech-mono text-xs text-foreground">Пн–Сб: 10:00 – 20:00</p>
            </div>
          </div>
          <div className="glass-panel rounded-xl px-5 py-3 flex items-center gap-3">
            <MapPin className="w-4 h-4 text-primary" />
            <div>
              <p className="text-[10px] text-muted-foreground">Адреса</p>
              <p className="tech-mono text-xs text-foreground">вул. Незалежності, 15, І-Ф</p>
            </div>
          </div>
          <div className="glass-panel rounded-xl px-5 py-3 flex items-center gap-3">
            <MessageCircle className="w-4 h-4 text-primary" />
            <div>
              <p className="text-[10px] text-muted-foreground">Telegram</p>
              <p className="tech-mono text-xs text-foreground">@stratum_if</p>
            </div>
          </div>
        </motion.div>

        {/* How to order — highlighted */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8 rounded-2xl overflow-hidden border border-primary/30"
          style={{ background: 'linear-gradient(135deg, hsl(227 100% 59% / 0.08), transparent)' }}
        >
          <div className="px-6 py-5 border-b border-primary/20">
            <h3 className="font-display font-bold text-lg text-foreground flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-primary" />
              Як оформити замовлення — крок за кроком
            </h3>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { step: '01', title: 'Оберіть товар', desc: 'Готова збірка з каталогу або свій конфіг у конфігураторі' },
              { step: '02', title: 'Додайте в кошик', desc: 'Натисніть «В кошик» і перейдіть до оформлення' },
              { step: '03', title: 'Підтвердження', desc: 'Менеджер передзвонить протягом 30 хвилин' },
              { step: '04', title: 'Отримайте ПК', desc: 'Самовивіз або доставка — як зручно вам' },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.08 }}
                className="flex flex-col"
              >
                <span className="tech-mono text-3xl font-bold text-primary/30 leading-none mb-2">{s.step}</span>
                <h4 className="text-sm font-semibold text-foreground mb-1">{s.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ sections */}
        <div className="space-y-4">
          {faqSections.map((section, i) => (
            <FAQSection key={i} section={section} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center glass-panel rounded-2xl p-8"
        >
          <h3 className="font-display text-xl font-bold text-foreground mb-2">Не знайшли відповідь?</h3>
          <p className="text-sm text-muted-foreground mb-6">Напишіть нам або зателефонуйте — відповімо протягом кількох хвилин.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/catalog">
              <Button className="glow-blue font-display tracking-wider text-xs">
                ПЕРЕГЛЯНУТИ КАТАЛОГ
              </Button>
            </Link>
            <Link to="/configurator">
              <Button variant="outline" className="font-display tracking-wider text-xs border-border/50">
                КОНФІГУРАТОР ПК
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}