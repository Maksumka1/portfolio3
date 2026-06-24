import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import CategoryGrid from '@/components/home/CategoryGrid';
import WhyUs from '@/components/home/WhyUs';
import BrandSection from '@/components/home/BrandSection';
import TrustSection from '@/components/home/TrustSection';
import ParticleField from '@/components/home/ParticleField';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <div className="relative">
      <ParticleField />
      <HeroSection />
      <TrustSection />
      <CategoryGrid />
      <FeaturedProducts />
      <BrandSection />
      <WhyUs />
      <Footer />
    </div>
  );
}