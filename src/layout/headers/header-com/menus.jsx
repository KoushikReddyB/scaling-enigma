import React from "react";
import menu_data from "@/data/menu-data";
import Link from "next/link";
import { useGetProductTypeQuery } from "@/redux/features/productApi";
import { HomeNewArrivalPrdLoader } from "@/components/loader";
import ErrorMsg from "@/components/common/error-msg";
import ProductItem from "@/components/products/skincare/product-item";

const Menus = () => {
  const { data: products, isError, isLoading } =
    useGetProductTypeQuery({
      type: "skincare",
      query: "new=true",
    });

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <HomeNewArrivalPrdLoader loading={isLoading} />;
  } else if (isError) {
    content = <ErrorMsg msg="There was an error" />;
  } else if (!products?.data?.length) {
    content = <ErrorMsg msg="No Products found!" />;
  } else {
    content = (
      <div className="row">
        {products.data.slice(0, 4).map((item) => (
          <div key={item._id} className="col-md-3">
            <ProductItem product={item} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <ul>
      {menu_data?.map((menu) => {
        // ✅ PRODUCTS MEGA MENU
        if (menu.products && menu.product_pages) {
          return (
            <li key={menu.id} className="has-dropdown has-mega-menu">
              <Link href={menu.link}>{menu.title}</Link>

              <ul className="tp-submenu tp-mega-menu mega-menu-style-2">
                {menu.product_pages?.map((p, i) => (
                  <li key={i} className="has-dropdown">
                    <Link href={p.link} className="mega-menu-title">
                      {p.title}
                    </Link>

                    <ul className="tp-submenu">
                      {p.mega_menus?.map((m, j) => (
                        <li key={j}>
                          <Link href={m.link}>{m.title}</Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </li>
          );
        }

        // ✅ NORMAL SUB MENU
        if (menu.sub_menu && menu.sub_menus) {
          return (
            <li key={menu.id} className="has-dropdown">
              <Link href={menu.link}>{menu.title}</Link>

              <ul className="tp-submenu">
                {menu.sub_menus?.map((b, i) => (
                  <li key={i}>
                    <Link href={b.link}>{b.title}</Link>
                  </li>
                ))}
              </ul>
            </li>
          );
        }

        // ✅ DEFAULT SINGLE LINK (Home now comes here)
        return (
          <li key={menu.id}>
            <Link href={menu.link}>{menu.title}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Menus;