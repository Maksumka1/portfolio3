import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, ShoppingCart, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cartStore';
import { toast } from 'sonner';

export default function PriceSummary({ selections, steps, psuWarning }) {
  const { addItem } = useCart();

  const totalPrice = Object.values(selections).reduce((sum, s) => sum + (s?.price || 0), 0);
  const selectedCount = Object.values(selections).filter(Boolean).length;
  const requiredSteps = steps.filter(s => s.required);
  const allRequiredSelected = requiredSteps.every(s => !!selections[s.key]);

  const handleAddToCart = () => {
    const configName = `Кастомна збірка STRATUM`;
    const specsDesc = Object.entries(selections)
      .filter(([_, v]) => v)
      .map(([_, v]) => v.name)
      .join(' • ');

    addItem({
      id: `custom-${Date.now()}`,
      name: configName,
      price: totalPrice,
      short_desc: specsDesc,
      type: 'custom',
    });
    toast.success('Збірку додано в кошик!');
  };

  return (
    <div className="glass-panel rounded-xl p-5 space-y-4">
      <div className="flex items-center gap-2">
        <Zap className="w-4 h-4 text-primary" />
        <span className="text-xs font-medium uppercase tracking-wider text-foreground">Ваша збірка</span>
      </div>

      {/* Selected items summary */}
      <div className="space-y-2">
        {steps.map(step => {
          const sel = selections[step.key];
          return (
            <div key={step.key} className="flex justify-between items-center text-xs">
              <span className="text-muted-foreground">{step.shortLabel}</span>
              {sel ? (
                <span className="tech-mono text-foreground">{sel.price?.toLocaleString('uk-UA')} ₴</span>
              ) : (
                <span className="text-muted-foreground/40">—</span>
              )}
            </div>
          );
        })}
      </div>

      <div className="hairline" />

      {/* PSU Warning */}
      <AnimatePresence>
        {psuWarning && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-start gap-2 p-3 rounded-lg bg-accent/10 border border-accent/30"
          >
            <AlertTriangle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
            <p className="text-[11px] text-accent leading-relaxed">{psuWarning}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Total */}
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-foreground">Разом:</span>
        <motion.span
          key={totalPrice}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-2xl font-display font-bold text-gradient"
        >
          {totalPrice.toLocaleString('uk-UA')} ₴
        </motion.span>
      </div>

      <Button
        className="w-full h-11 font-display tracking-wider text-sm glow-blue"
        disabled={!allRequiredSelected}
        onClick={handleAddToCart}
      >
        <ShoppingCart className="w-4 h-4 mr-2" />
        ДОДАТИ В КОШИК
      </Button>

      {!allRequiredSelected && (
        <p className="text-[10px] text-center text-muted-foreground">
          Оберіть всі обов'язкові компоненти ({selectedCount}/{requiredSteps.length})
        </p>
      )}
    </div>
  );
}