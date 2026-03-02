import React from 'react';
import SEO from '@/components/seo';
import Header from '@/layout/headers/header';
import Footer from '@/layout/footers/footer';
import Wrapper from '@/layout/wrapper';
import CommonBreadcrumb from '@/components/breadcrumb/common-breadcrumb';
import LoginArea from '@/components/login-register/login-area';

const LoginPage = () => {
  return (
    <Wrapper>
      <SEO pageTitle="Login" />
      <Header style_2={true} />
      <CommonBreadcrumb title="Login" subtitle="Login" center={true} />
      <LoginArea/>
      <Footer primary_style={true} />
    </Wrapper>
  );
};

export default LoginPage;