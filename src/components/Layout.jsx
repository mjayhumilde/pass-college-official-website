import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect, useState } from "react";

const Layout = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  //  scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Header />
      <main
        className={` ${
          isScrolled
            ? "pt-[56px] sm:pt-[74px] md:pt-[133px] lg:pt-[109px]"
            : "pt-[69px] sm:pt-[72px] md:pt-[130px] lg:pt-[125px]"
        }`}
      >
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
