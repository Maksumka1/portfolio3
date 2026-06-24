import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border/50 py-16 px-6">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Layers className="w-6 h-6 text-primary" strokeWidth={1.5} />
              <span className="font-display text-base font-bold tracking-[0.2em]">STRATUM</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Преміальний комп'ютерний магазин в Івано-Франківську. Ігрові ПК, комплектуючі та професійна збірка.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-4">Каталог</h4>
            <div className="space-y-2">
              <Link to="/catalog" className="block text-xs text-muted-foreground hover:text-primary transition-colors">Готові збірки</Link>
              <Link to="/components" className="block text-xs text-muted-foreground hover:text-primary transition-colors">Комплектуючі</Link>
              <Link to="/configurator" className="block text-xs text-muted-foreground hover:text-primary transition-colors">Конфігуратор ПК</Link>
              <Link to="/faq" className="block text-xs text-muted-foreground hover:text-primary transition-colors">Часті питання</Link>
            </div>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-4">Інформація</h4>
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Доставка та оплата</p>
              <p className="text-xs text-muted-foreground">Гарантія</p>
              <p className="text-xs text-muted-foreground">Повернення</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-4">Контакти</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                м. Івано-Франківськ
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Phone className="w-3.5 h-3.5 text-primary" />
                +380 (99) 123-45-67
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Mail className="w-3.5 h-3.5 text-primary" />
                info@stratum.ua
              </div>
            </div>
          </div>
        </div>

        <div className="hairline mt-10 mb-6" />
        <p className="text-[11px] text-muted-foreground/60 text-center tech-mono">
          © 2025 STRATUM. УСІХ ПРАВ ЗАХИЩЕНО.
        </p>
      </div>
    </footer>
  );
}