import React, { useState, useMemo } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Search, Cpu, CircuitBoard, MemoryStick, HardDrive, Plug, Box, Fan, Monitor } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import ProductCard from '@/components/shared/ProductCard';
import SectionTitle from '@/components/shared/SectionTitle';
import Footer from '@/components/layout/Footer';
import mockProducts from '@/lib/mockProducts';

const componentCategories = [
  { value: 'all', label: 'Всі', icon: Monitor },
  { value: 'processor', label: 'Процесори', icon: Cpu },
  { value: 'gpu', label: 'Відеокарти', icon: CircuitBoard },
  { value: 'motherboard', label: 'Материнські плати', icon: CircuitBoard },
  { value: 'ram', label: "Пам'ять", icon: MemoryStick },
  { value: 'storage', label: 'Накопичувачі', icon: HardDrive },
  { value: 'psu', label: 'Блоки живлення', icon: Plug },
  { value: 'case', label: 'Корпуси', icon: Box },
  { value: 'cooling', label: 'Охолодження', icon: Fan },
];

export default function Components() {
  const urlParams = new URLSearchParams(window.location.search);
  const initialCat = urlParams.get('cat') || 'all';
  const [category, setCategory] = useState(initialCat);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('popular');

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['components'],
    queryFn: () => base44.entities.Product.filter({ type: 'component' }),
  });

  const productsToUse = (products && products.length) ? products : mockProducts.filter(p => p.type === 'component');

  const categoryMap = {
    processor: ['CPU'],
    gpu: ['GPU'],
    motherboard: ['Motherboard'],
    ram: ['RAM'],
    storage: ['Storage'],
    psu: ['PSU'],
    case: ['Case'],
    cooling: ['Cooler', 'Fan', 'Thermal Paste'],
    all: []
  };

  const filtered = useMemo(() => {
    let result = [...productsToUse];

    if (category !== 'all') {
      const allowed = categoryMap[category] || [category];
      result = result.filter(p => allowed.includes(p.category));
    }

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.name?.toLowerCase().includes(q) ||
        p.short_desc?.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'price_asc') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price_desc') result.sort((a, b) => b.price - a.price);
    else if (sortBy === 'name') result.sort((a, b) => (a.name || '').localeCompare(b.name || ''));

    return result;
  }, [products, category, search, sortBy]);

  return (
    <div className="min-h-screen">
      <div className="max-w-[1440px] mx-auto px-6 py-10">
        <SectionTitle
          title="Комплектуючі"
          subtitle="Індивідуальні комп'ютерні компоненти від провідних виробників."
        />

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          {componentCategories.map(cat => {
            const isActive = category === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex-shrink-0
                  ${isActive
                    ? 'bg-primary text-primary-foreground glow-blue'
                    : 'bg-secondary text-muted-foreground hover:text-foreground'}`}
              >
                <cat.icon className="w-3.5 h-3.5" strokeWidth={1.5} />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Пошук комплектуючих..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 h-10 bg-secondary border-border/50 text-sm"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-44 h-10 bg-secondary border-border/50 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Популярні</SelectItem>
              <SelectItem value="price_asc">Ціна: від дешевих</SelectItem>
              <SelectItem value="price_desc">Ціна: від дорогих</SelectItem>
              <SelectItem value="name">За назвою</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-xs text-muted-foreground tech-mono ml-auto">
            {filtered.length} товарів
          </span>
        </div>

        {/* Products */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array(8).fill(0).map((_, i) => (
              <div key={i} className="glass-panel rounded-xl p-4 space-y-3">
                <Skeleton className="aspect-square rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-6 w-1/3" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-sm">Нічого не знайдено</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}