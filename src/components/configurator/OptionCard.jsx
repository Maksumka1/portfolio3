import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function OptionCard({ option, isSelected, onSelect, isIncompatible }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={() => !isIncompatible && onSelect(option)}
      disabled={isIncompatible}
      className={`w-full text-left p-4 rounded-lg border transition-all relative
        ${isIncompatible
          ? 'opacity-30 cursor-not-allowed border-border/30'
          : isSelected
            ? 'border-primary bg-primary/5 glow-blue'
            : 'border-border/50 bg-secondary/30 hover:border-primary/30 hover:bg-secondary/50'}`}
    >
      {isSelected && (
        <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
          <Check className="w-3 h-3 text-primary-foreground" />
        </div>
      )}
      <h4 className="text-sm font-medium text-foreground pr-8">{option.name}</h4>
      <div className="flex items-center gap-3 mt-2">
        <span className="tech-mono text-sm text-primary font-bold">
          {option.price?.toLocaleString('uk-UA')} ₴
        </span>
        {option.socket && (
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">
            {option.socket}
          </span>
        )}
        {option.wattage && (
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">
            {option.wattage}W
          </span>
        )}
        {option.capacity && (
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">
            {option.capacity}
          </span>
        )}
        {option.type && (
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">
            {option.type === 'liquid' ? 'Рідинне' : 'Повітряне'}
          </span>
        )}
      </div>
    </motion.button>
  );
}