import React, { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { configuratorSteps, getCompatibleOptions, checkPSUWarning } from '@/lib/configuratorData';
import StepSelector from '@/components/configurator/StepSelector';
import PriceSummary from '@/components/configurator/PriceSummary';
import SectionTitle from '@/components/shared/SectionTitle';
import Footer from '@/components/layout/Footer';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ListChecks, Check, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

function ConfigOptionCard({ option, isSelected, onSelect, isIncompatible }) {
  return (
    <motion.button
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: isIncompatible ? 0.35 : 1, scale: 1 }}
      whileHover={!isIncompatible ? { scale: 1.02, transition: { duration: 0.15 } } : {}}
      onClick={() => !isIncompatible && onSelect(option)}
      disabled={isIncompatible}
      className={`w-full text-left rounded-xl border transition-all duration-200 relative overflow-hidden group
        ${isIncompatible ? 'cursor-not-allowed' : 'cursor-pointer'}
        ${isSelected
          ? 'border-primary bg-primary/8'
          : 'border-border/50 bg-secondary/20 hover:border-primary/40 hover:bg-secondary/40'}`}
      style={isSelected ? { boxShadow: '0 0 20px -4px rgba(45,91,255,0.3)' } : {}}
    >
      {/* Selected glow bar */}
      {isSelected && (
        <motion.div
          layoutId={`selected-bar-${option.id}`}
          className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary"
        />
      )}

      {/* Image area */}
      <div className="aspect-video bg-secondary/40 overflow-hidden rounded-t-xl relative">
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/10 text-5xl font-display font-bold select-none">
          {option.name.split(' ')[0]}
        </div>
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
          >
            <Check className="w-3.5 h-3.5 text-white" />
          </motion.div>
        )}
      </div>

      <div className="p-4">
        <h4 className="text-sm font-medium text-foreground leading-snug mb-2">{option.name}</h4>

        {/* Specs pills */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {option.socket && <span className="tech-mono text-[10px] px-2 py-0.5 rounded-md bg-secondary text-muted-foreground border border-border/50">{option.socket}</span>}
          {option.wattage && <span className="tech-mono text-[10px] px-2 py-0.5 rounded-md bg-secondary text-muted-foreground border border-border/50">{option.wattage}W</span>}
          {option.capacity && <span className="tech-mono text-[10px] px-2 py-0.5 rounded-md bg-secondary text-muted-foreground border border-border/50">{option.capacity}</span>}
          {option.type && <span className="tech-mono text-[10px] px-2 py-0.5 rounded-md bg-secondary text-muted-foreground border border-border/50">{option.type === 'liquid' ? 'Рідинне' : 'Повітряне'}</span>}
          {option.formFactor && <span className="tech-mono text-[10px] px-2 py-0.5 rounded-md bg-secondary text-muted-foreground border border-border/50">{option.formFactor}</span>}
          {option.tier && <span className={`tech-mono text-[10px] px-2 py-0.5 rounded-md border border-border/50
            ${option.tier === 'ultra' ? 'bg-accent/10 text-accent border-accent/30' :
              option.tier === 'high' ? 'bg-primary/10 text-primary border-primary/30' :
              'bg-secondary text-muted-foreground'}`}>
            {option.tier === 'ultra' ? 'ULTRA' : option.tier === 'high' ? 'HIGH' : 'MID'}
          </span>}
        </div>

        <div className="flex items-center justify-between">
          <span className="tech-mono text-base font-bold text-primary">
            {option.price?.toLocaleString('uk-UA')} ₴
          </span>
          {isSelected ? (
            <span className="text-[10px] text-primary font-medium">✓ Обрано</span>
          ) : (
            <span className="text-[10px] text-muted-foreground group-hover:text-primary transition-colors">Обрати →</span>
          )}
        </div>
      </div>
    </motion.button>
  );
}

export default function Configurator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState({});
  const [search, setSearch] = useState('');

  const step = configuratorSteps[currentStep];
  const allOptions = useMemo(() => getCompatibleOptions(step, selections), [step, selections]);
  const filteredOptions = useMemo(() => {
    if (!search.trim()) return allOptions;
    return allOptions.filter(o => o.name.toLowerCase().includes(search.toLowerCase()));
  }, [allOptions, search]);

  const psuWarning = useMemo(() => checkPSUWarning(selections), [selections]);

  const handleSelect = (option) => {
    const newSelections = { ...selections, [step.key]: option };
    if (step.key === 'cpu') delete newSelections.motherboard;
    setSelections(newSelections);
    setSearch('');
  };

  const handleStepClick = (i) => {
    setCurrentStep(i);
    setSearch('');
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-[1440px] mx-auto px-6 py-10">
        <SectionTitle
          title="Конфігуратор ПК"
          subtitle="Зберіть свій ідеальний комп'ютер крок за кроком. Система автоматично перевіряє сумісність компонентів."
        />

        <div className="flex gap-8">
          {/* Left: step navigation */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              <div className="glass-panel rounded-xl p-4">
                <StepSelector
                  steps={configuratorSteps}
                  currentStep={currentStep}
                  selections={selections}
                  onStepClick={handleStepClick}
                />
              </div>
              <PriceSummary selections={selections} steps={configuratorSteps} psuWarning={psuWarning} />
            </div>
          </aside>

          {/* Mobile step nav */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden fixed bottom-20 left-4 z-40 shadow-lg">
                <ListChecks className="w-4 h-4 mr-2" /> Компоненти
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 bg-background p-4 overflow-y-auto space-y-4">
              <StepSelector steps={configuratorSteps} currentStep={currentStep} selections={selections} onStepClick={handleStepClick} />
              <PriceSummary selections={selections} steps={configuratorSteps} psuWarning={psuWarning} />
            </SheetContent>
          </Sheet>

          {/* Main area */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={step.key}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                {/* Step header */}
                <div className="mb-6">
                  <span className="tech-mono text-[11px] text-primary tracking-wider">
                    КРОК {currentStep + 1} / {configuratorSteps.length}
                  </span>
                  <h3 className="text-2xl font-display font-bold text-foreground mt-1">{step.label}</h3>
                  {!step.required && (
                    <span className="text-xs text-muted-foreground">Необов'язковий компонент</span>
                  )}
                  {step.dependsOn && !selections[step.dependsOn] && (
                    <p className="text-xs text-accent mt-1">
                      ⚠ Спочатку оберіть {configuratorSteps.find(s => s.key === step.dependsOn)?.label?.toLowerCase()}
                    </p>
                  )}
                </div>

                {/* Search */}
                {allOptions.length > 3 && (
                  <div className="relative mb-5">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder={`Пошук по ${step.label.toLowerCase()}...`}
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      className="pl-9 h-10 bg-secondary border-border/50 text-sm"
                    />
                  </div>
                )}

                {/* Options catalog grid */}
                <motion.div
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
                >
                  <AnimatePresence>
                    {filteredOptions.map((option, i) => (
                      <motion.div
                        key={option.id}
                        layout
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: i * 0.04 }}
                      >
                        <ConfigOptionCard
                          option={option}
                          isSelected={selections[step.key]?.id === option.id}
                          onSelect={handleSelect}
                          isIncompatible={!!(step.dependsOn && !selections[step.dependsOn])}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {filteredOptions.length === 0 && (
                    <div className="col-span-full text-center py-12 text-muted-foreground text-sm">
                      Нічого не знайдено
                    </div>
                  )}
                </motion.div>

                {/* Auto-advance after selection */}
                <AnimatePresence>
                  {selections[step.key] && currentStep < configuratorSteps.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-6 flex justify-end"
                    >
                      <Button
                        onClick={() => { setCurrentStep(currentStep + 1); setSearch(''); }}
                        className="glow-blue font-display tracking-wider text-xs"
                      >
                        ДАЛІ: {configuratorSteps[currentStep + 1]?.label} →
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile floating price bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 glass-panel border-t border-border px-6 py-3">
          <div className="flex items-center justify-between max-w-lg mx-auto">
            <div>
              <span className="text-[10px] text-muted-foreground">Разом:</span>
              <p className="text-lg font-display font-bold text-gradient">
                {Object.values(selections).reduce((s, v) => s + (v?.price || 0), 0).toLocaleString('uk-UA')} ₴
              </p>
            </div>
            <Button size="sm" className="glow-blue font-display tracking-wider text-xs">В КОШИК</Button>
          </div>
        </div>
      </div>
      <div className="pb-20 lg:pb-0">
        <Footer />
      </div>
    </div>
  );
}