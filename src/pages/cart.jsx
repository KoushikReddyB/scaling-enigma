import React from 'react';
import SEO from '@/components/seo';
import Header from '@/layout/headers/header';
import Footer from '@/layout/footers/footer';
import Wrapper from '@/layout/wrapper';
import CartArea from '@/components/cart-wishlist/cart-area';
import CommonBreadcrumb from '@/components/breadcrumb/common-breadcrumb';

const CartPage = () => {
  return (
    <Wrapper>
      <SEO pageTitle="Cart" />
      <Header style_2={true} />
      <CommonBreadcrumb title="Shopping Cart" subtitle="Shopping Cart" />
      <CartArea/>
      <Footer primary_style={true} />
    </Wrapper>
  );
};

export default CartPage;