import React from 'react';
import { motion } from 'framer-motion';
import { Check, Circle } from 'lucide-react';

export default function StepSelector({ steps, currentStep, selections, onStepClick }) {
  return (
    <div className="space-y-1">
      {steps.map((step, i) => {
        const isActive = currentStep === i;
        const isCompleted = !!selections[step.key];
        const selection = selections[step.key];

        return (
          <button
            key={step.key}
            onClick={() => onStepClick(i)}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3
              ${isActive
                ? 'bg-primary/10 border border-primary/30'
                : 'hover:bg-secondary/80 border border-transparent'}`}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold
              ${isCompleted
                ? 'bg-primary text-primary-foreground'
                : isActive
                  ? 'border-2 border-primary text-primary'
                  : 'border border-border text-muted-foreground'}`}
            >
              {isCompleted ? <Check className="w-3 h-3" /> : i + 1}
            </div>
            <div className="flex-1 min-w-0">
              <div className={`text-xs font-medium ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                {step.label}
                {step.required && <span className="text-destructive ml-1">*</span>}
              </div>
              {selection && (
                <p className="text-[10px] text-muted-foreground truncate mt-0.5">
                  {selection.name}
                </p>
              )}
            </div>
            {selection && (
              <span className="tech-mono text-[10px] text-primary flex-shrink-0">
                {selection.price?.toLocaleString('uk-UA')} ₴
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}