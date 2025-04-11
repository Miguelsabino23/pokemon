import { Outlet } from "react-router";
import { Header } from "./components/header";
import { Footer } from "./components/footer";

export function Layout() {
  return (
    <div className='relative min-h-screen '>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
