import React from 'react';
import SEO from '@/components/seo';
import Header from '@/layout/headers/header';
import Wrapper from '@/layout/wrapper';
import SkinCareBanner from '@/components/banner/skincare-banner';
import SkinCareCategory from '@/components/categories/skincare-category';
import PopularProducts from '@/components/products/skincare/popular-products';
import ProductArea from '@/components/products/skincare/product-area';
import WeeksFeatured from '@/components/products/skincare/weeks-featured';
import TrendingProducts from '@/components/products/skincare/trending-products';
import BestSellerProducts from '@/components/products/skincare/best-seller-products';
import SkinCareTestimonial from '@/components/testimonial/skincare-testimonial';
import FeatureAreaTwo from '@/components/features/feature-area-2';
import InstagramAreaTwo from '@/components/instagram/instagram-area-2';
import Footer from '@/layout/footers/footer';

export default function Home() {
  return (
    <Wrapper>
      <SEO pageTitle="Home" />
      <Header/>
      <SkinCareBanner/>
      <SkinCareCategory/>
      <PopularProducts/>
      <ProductArea/>
      <WeeksFeatured/>
      <TrendingProducts/>
      <BestSellerProducts/>
      <SkinCareTestimonial/>
      <FeatureAreaTwo/>
      <InstagramAreaTwo/>
      <Footer style_2={true} />
    </Wrapper>
  )
}
