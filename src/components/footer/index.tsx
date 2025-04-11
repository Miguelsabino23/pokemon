import { useLocation } from "react-router";

export function Footer() {
  const location = useLocation();

  const footerBg =
    location.pathname === "/legendaries"
      ? "bg-dark text-white"
      : location.pathname === "/"
      ? "bg-gradient-to-r from-third to-primary"
      : "bg-white";

  return (
    <footer className={`px-40 flex justify-between  h-full w-full ${footerBg}`}>
      <span>Make with ❤️ for the PokéSpartans team Platzi Master</span>
      <span>Ours Team</span>
    </footer>
  );
}
