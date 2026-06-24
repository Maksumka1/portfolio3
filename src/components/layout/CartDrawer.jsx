import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cartStore';

function CartItem({ item, onUpdate, onRemove }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      className="flex gap-4 p-4 glass-panel rounded-lg"
    >
      <div className="w-20 h-20 rounded-md overflow-hidden bg-secondary flex-shrink-0">
        {item.image_url ? (
          <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <ShoppingBag className="w-6 h-6" />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-foreground truncate">{item.name}</h4>
        <p className="tech-mono text-primary mt-1">
          {item.price?.toLocaleString('uk-UA')} ₴
        </p>
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => onUpdate(item.id, item.qty - 1)}
            className="w-6 h-6 rounded flex items-center justify-center bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="tech-mono text-sm w-6 text-center">{item.qty}</span>
          <button
            onClick={() => onUpdate(item.id, item.qty + 1)}
            className="w-6 h-6 rounded flex items-center justify-center bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          >
            <Plus className="w-3 h-3" />
          </button>
          <button
            onClick={() => onRemove(item.id)}
            className="ml-auto p-1 text-muted-foreground hover:text-destructive transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function CartDrawer({ open, onClose }) {
  const { items, updateQty, removeItem, totalPrice } = useCart();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-[80] w-full max-w-md bg-background border-l border-border flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <h2 className="font-display text-lg font-bold tracking-wide">КОШИК</h2>
                <p className="text-xs text-muted-foreground tech-mono mt-1">
                  {items.length} {items.length === 1 ? 'товар' : 'товарів'}
                </p>
              </div>
              <button onClick={onClose} className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <AnimatePresence mode="popLayout">
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-full text-muted-foreground"
                  >
                    <ShoppingBag className="w-12 h-12 mb-4 opacity-30" />
                    <p className="text-sm">Кошик порожній</p>
                  </motion.div>
                ) : (
                  items.map(item => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onUpdate={updateQty}
                      onRemove={removeItem}
                    />
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-border space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Разом:</span>
                  <span className="text-xl font-display font-bold text-gradient">
                    {totalPrice.toLocaleString('uk-UA')} ₴
                  </span>
                </div>
                <Button className="w-full h-12 font-display tracking-wider text-sm glow-blue">
                  ОФОРМИТИ ЗАМОВЛЕННЯ
                </Button>
                <p className="text-[11px] text-center text-muted-foreground">
                  Доставка по Івано-Франківську — безкоштовно
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}