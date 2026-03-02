import React, { useState, useEffect } from "react";
import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import HeaderTwo from "@/layout/headers/header-2";
import ShopBreadcrumb from "@/components/breadcrumb/shop-breadcrumb";
import ShopArea from "@/components/shop/shop-area";
import { useGetAllProductsQuery } from "@/redux/features/productApi";
import ErrorMsg from "@/components/common/error-msg";
import Footer from "@/layout/footers/footer";
import ShopLoader from "@/components/loader/shop/shop-loader";

const ShopPage = ({ query }) => {
  const { data: products, isError, isLoading } = useGetAllProductsQuery();
  const [priceValue, setPriceValue] = useState([0, 0]);
  const [selectValue, setSelectValue] = useState("");
  const [currPage, setCurrPage] = useState(1);

  // Load the maximum price once products are available
  useEffect(() => {
    if (!isLoading && !isError && products?.data?.length > 0) {
      const maxPrice = products.data.reduce((max, product) => {
        return product.price > max ? product.price : max;
      }, 0);
      setPriceValue([0, maxPrice]);
    }
  }, [isLoading, isError, products]);

  const handleChanges = (val) => {
    setCurrPage(1);
    setPriceValue(val);
  };

  const selectHandleFilter = (e) => {
    setSelectValue(e.value);
  };

  const otherProps = {
    priceFilterValues: {
      priceValue,
      handleChanges,
    },
    selectHandleFilter,
    currPage,
    setCurrPage,
  };

  let content = null;

  if (isLoading) {
    content = <ShopLoader loading={isLoading} />;
  } else if (isError) {
    content = (
      <div className="pb-80 text-center">
        <ErrorMsg msg="There was an error loading skincare products." />
      </div>
    );
  } else if (products?.data?.length === 0) {
    content = <ErrorMsg msg="No skincare products found!" />;
  } else {
    let product_items = products.data;

    // Sorting Logic
    if (selectValue) {
      if (selectValue === "Low to High") {
        product_items = [...product_items].sort((a, b) => Number(a.price) - Number(b.price));
      } else if (selectValue === "High to Low") {
        product_items = [...product_items].sort((a, b) => Number(b.price) - Number(a.price));
      } else if (selectValue === "New Added") {
        product_items = [...product_items].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else if (selectValue === "On Sale") {
        product_items = product_items.filter((p) => p.discount > 0);
      }
    }

    // Price Filtering
    product_items = product_items.filter(
      (p) => p.price >= priceValue[0] && p.price <= priceValue[1]
    );

    // Filter by Category/Brand if query exists
    if (query.category) {
      product_items = product_items.filter(
        (p) => p.parent.toLowerCase().replace("&", "").split(" ").join("-") === query.category
      );
    }

    content = (
      <ShopArea
        all_products={products.data}
        products={product_items}
        otherProps={otherProps}
      />
    );
  }

  return (
    <Wrapper>
      <SEO pageTitle="Shop" />
      <HeaderTwo style_2={true} />
      <ShopBreadcrumb title="Skincare Products" subtitle="Shop" />
      {content}
      <Footer primary_style={true} />
    </Wrapper>
  );
};

export default ShopPage;

export const getServerSideProps = async (context) => {
  return {
    props: {
      query: context.query,
    },
  };
};