import React, { useState, useMemo } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Search, LayoutGrid, List } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal } from 'lucide-react';
import ProductCard from '@/components/shared/ProductCard';
import FilterPanel from '@/components/catalog/FilterPanel';
import SectionTitle from '@/components/shared/SectionTitle';
import Footer from '@/components/layout/Footer';
import mockProducts from '@/lib/mockProducts';

export default function Catalog() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [filters, setFilters] = useState({});

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['catalog-pcs'],
    queryFn: () => base44.entities.Product.filter({ type: 'pc' }),
  });

  const productsToUse = (products && products.length) ? products : mockProducts.filter(p => p.type === 'pc');

  const filtered = useMemo(() => {
    let result = [...productsToUse];

    // Search
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.name?.toLowerCase().includes(q) ||
        p.short_desc?.toLowerCase().includes(q) ||
        p.specs?.cpu?.toLowerCase().includes(q) ||
        p.specs?.gpu?.toLowerCase().includes(q)
      );
    }

    // Price
    if (filters.priceRange) {
      result = result.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);
    }

    // Purpose
    if (filters.purpose?.length) {
      result = result.filter(p => filters.purpose.includes(p.purpose));
    }

    // CPU
    if (filters.cpu?.length) {
      result = result.filter(p => filters.cpu.some(c => p.specs?.cpu?.includes(c)));
    }

    // GPU
    if (filters.gpu?.length) {
      result = result.filter(p => filters.gpu.some(g => p.specs?.gpu?.includes(g)));
    }

    // RAM
    if (filters.ram?.length) {
      result = result.filter(p => filters.ram.some(r => p.specs?.ram?.includes(r)));
    }

    // Sort
    if (sortBy === 'price_asc') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price_desc') result.sort((a, b) => b.price - a.price);
    else if (sortBy === 'name') result.sort((a, b) => (a.name || '').localeCompare(b.name || ''));

    return result;
  }, [productsToUse, search, filters, sortBy]);

  return (
    <div className="min-h-screen">
      <div className="max-w-[1440px] mx-auto px-6 py-10">
        <SectionTitle
          title="Готові збірки"
          subtitle="Преміальні конфігурації для ігор, роботи та стрімінгу. Зібрано та протестовано нашими інженерами."
        />

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Пошук збірки..."
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

          {/* Mobile filter trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="lg:hidden h-10">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Фільтри
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 bg-background p-6 overflow-y-auto">
              <FilterPanel filters={filters} onChange={setFilters} onReset={() => setFilters({})} />
            </SheetContent>
          </Sheet>

          <span className="text-xs text-muted-foreground tech-mono ml-auto">
            {filtered.length} товарів
          </span>
        </div>

        {/* Main layout */}
        <div className="flex gap-8">
          {/* Desktop filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 glass-panel rounded-xl p-5">
              <FilterPanel filters={filters} onChange={setFilters} onReset={() => setFilters({})} />
            </div>
          </aside>

          {/* Products grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {Array(6).fill(0).map((_, i) => (
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
                <p className="text-xs text-muted-foreground/60 mt-1">Спробуйте змінити фільтри або пошуковий запит</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}