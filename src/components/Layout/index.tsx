import { Link, Outlet } from "react-router-dom";
import Nav from "../Nav";

export function Logo() {
  return (
    <Link to={"/"}>
      <h2 className="dark:text-pink text-green font-logo text-4xl font-bold m-3 p-3 w-40">
        Holidaze
      </h2>
    </Link>
  );
}

export function Header() {
  return (
    <header>
      <Nav />
    </header>
  );
}

export function Footer() {
  return (
    <footer className="text-white-pink text-center backdrop-blur-lg backdrop-brightness-90 bg-white/30 p-6">
      Ken Thore Bjerke Bøeng 2023
    </footer>
  );
}

export function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
