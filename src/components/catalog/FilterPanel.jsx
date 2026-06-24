import React from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';

const purposes = [
  { value: 'gaming', label: 'Ігровий' },
  { value: 'work', label: 'Робочий' },
  { value: 'streaming', label: 'Стрімінг' },
  { value: 'design', label: 'Дизайн' },
  { value: 'universal', label: 'Універсал' },
];

const cpuBrands = ['Intel i5', 'Intel i7', 'Intel i9', 'AMD Ryzen 5', 'AMD Ryzen 7', 'AMD Ryzen 9'];
const gpuBrands = ['RTX 4060', 'RTX 4070', 'RTX 4080', 'RTX 4090', 'RTX 5070', 'RTX 5080', 'RTX 5090', 'RX 7800 XT', 'RX 9070 XT'];
const ramOptions = ['16 GB', '32 GB', '64 GB', '128 GB'];

export default function FilterPanel({ filters, onChange, onReset }) {
  const toggleFilter = (key, value) => {
    const current = filters[key] || [];
    const next = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    onChange({ ...filters, [key]: next });
  };

  const activeCount = Object.values(filters).reduce((c, arr) => c + (Array.isArray(arr) ? arr.length : 0), 0)
    + (filters.priceRange ? 1 : 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">Фільтри</span>
          {activeCount > 0 && (
            <Badge variant="secondary" className="text-[10px] px-1.5">{activeCount}</Badge>
          )}
        </div>
        {activeCount > 0 && (
          <Button variant="ghost" size="sm" onClick={onReset} className="text-xs text-muted-foreground h-7">
            <X className="w-3 h-3 mr-1" /> Скинути
          </Button>
        )}
      </div>

      {/* Price range */}
      <div>
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Ціна</h4>
        <Slider
          value={filters.priceRange || [0, 200000]}
          min={0}
          max={200000}
          step={1000}
          onValueChange={(val) => onChange({ ...filters, priceRange: val })}
          className="mb-2"
        />
        <div className="flex justify-between text-[11px] tech-mono text-muted-foreground">
          <span>{(filters.priceRange?.[0] || 0).toLocaleString('uk-UA')} ₴</span>
          <span>{(filters.priceRange?.[1] || 200000).toLocaleString('uk-UA')} ₴</span>
        </div>
      </div>

      {/* Purpose */}
      <div>
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Призначення</h4>
        <div className="flex flex-wrap gap-1.5">
          {purposes.map(p => (
            <button
              key={p.value}
              onClick={() => toggleFilter('purpose', p.value)}
              className={`px-3 py-1.5 rounded-md text-[11px] font-medium transition-all
                ${(filters.purpose || []).includes(p.value)
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'}`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* CPU */}
      <div>
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Процесор</h4>
        <div className="flex flex-wrap gap-1.5">
          {cpuBrands.map(cpu => (
            <button
              key={cpu}
              onClick={() => toggleFilter('cpu', cpu)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all
                ${(filters.cpu || []).includes(cpu)
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'}`}
            >
              {cpu}
            </button>
          ))}
        </div>
      </div>

      {/* GPU */}
      <div>
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Відеокарта</h4>
        <div className="flex flex-wrap gap-1.5">
          {gpuBrands.map(gpu => (
            <button
              key={gpu}
              onClick={() => toggleFilter('gpu', gpu)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all
                ${(filters.gpu || []).includes(gpu)
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'}`}
            >
              {gpu}
            </button>
          ))}
        </div>
      </div>

      {/* RAM */}
      <div>
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Оперативна пам'ять</h4>
        <div className="flex flex-wrap gap-1.5">
          {ramOptions.map(ram => (
            <button
              key={ram}
              onClick={() => toggleFilter('ram', ram)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all
                ${(filters.ram || []).includes(ram)
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'}`}
            >
              {ram}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}