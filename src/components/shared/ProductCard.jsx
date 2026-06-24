import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Zap, Monitor } from 'lucide-react';
import { useCart } from '@/lib/cartStore';
import { toast } from 'sonner';

export default function ProductCard({ product, index = 0 }) {
  const { addItem } = useCart();

  const handleAdd = (e) => {
    e.stopPropagation();
    addItem(product);
    toast.success(`${product.name} додано в кошик`);
  };

  const discount = product.old_price
    ? Math.round(((product.old_price - product.price) / product.old_price) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="group relative glass-panel rounded-xl overflow-hidden cursor-pointer"
    >
      {/* Badge */}
      {discount > 0 && (
        <div className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold tracking-wider">
          -{discount}%
        </div>
      )}
      {product.featured && (
        <div className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-primary/20 text-primary">
          <Zap className="w-3.5 h-3.5" />
        </div>
      )}

      {/* Image */}
      <div className="relative aspect-square bg-secondary/50 overflow-hidden">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground/30">
            <Monitor className="w-16 h-16" />
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Add to cart button on hover */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ scale: 1.05 }}
          onClick={handleAdd}
          className="absolute bottom-3 right-3 p-2.5 rounded-lg bg-primary text-primary-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 glow-blue"
        >
          <ShoppingCart className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        {product.category && (
          <span className="tech-mono text-[11px] text-muted-foreground uppercase">
            {product.category}
          </span>
        )}
        <h3 className="text-sm font-medium text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        {product.short_desc && (
          <p className="text-xs text-muted-foreground line-clamp-1">{product.short_desc}</p>
        )}
        
        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < Math.round(product.rating) ? 'text-accent fill-accent' : 'text-muted'}`}
              />
            ))}
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2 pt-1">
          <span className="text-lg font-display font-bold text-foreground">
            {product.price?.toLocaleString('uk-UA')} ₴
          </span>
          {product.old_price && (
            <span className="text-xs text-muted-foreground line-through">
              {product.old_price?.toLocaleString('uk-UA')} ₴
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}