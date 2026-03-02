import React, { useState } from "react";
import Link from "next/link";
import { mobile_menu } from "@/data/menu-data";
import ProductItem from "../products/skincare/product-item";
import ErrorMsg from "./error-msg";
import { HomeNewArrivalPrdLoader } from "../loader";
import { useGetProductTypeQuery } from "@/redux/features/productApi";

const MobileMenus = () => {
  const [isActiveMenu, setIsActiveMenu] = useState("");

  const { data: products, isError, isLoading } =
    useGetProductTypeQuery({
      type: "skincare",
      query: "new=true",
    });

  // decide what to render (kept intact)
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

  // handleOpenSubMenu
  const handleOpenSubMenu = (title) => {
    setIsActiveMenu((prev) => (prev === title ? "" : title));
  };

  return (
    <nav className="tp-main-menu-content">
      {mobile_menu?.map((menu) => (
        <ul key={menu.id}>
          
          {/* ✅ SUB MENU */}
          {menu.sub_menu && menu.sub_menus ? (
            <li
              className={`has-dropdown ${
                isActiveMenu === menu.title ? "dropdown-opened" : ""
              }`}
            >
              <a
                className={`${
                  isActiveMenu === menu.title ? "expanded" : ""
                }`}
              >
                {menu.title}
                <button
                  onClick={() => handleOpenSubMenu(menu.title)}
                  className={`dropdown-toggle-btn ${
                    isActiveMenu === menu.title
                      ? "dropdown-opened"
                      : ""
                  }`}
                >
                  <i className="fa-regular fa-angle-right"></i>
                </button>
              </a>

              <ul
                className={`tp-submenu ${
                  isActiveMenu === menu.title ? "active" : ""
                }`}
              >
                {menu.sub_menus?.map((b, i) => (
                  <li key={i}>
                    <Link href={b.link}>{b.title}</Link>
                  </li>
                ))}
              </ul>
            </li>
          ) : (
            /* ✅ DEFAULT SINGLE LINK (Home now comes here) */
            <li>
              <Link href={menu.link}>{menu.title}</Link>
            </li>
          )}

        </ul>
      ))}
    </nav>
  );
};

export default MobileMenus;