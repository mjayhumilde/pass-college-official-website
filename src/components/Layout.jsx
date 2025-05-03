import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="pt-[56px] sm:pt-[74px] md:pt-[133px] lg:pt-[109px]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
