import Link from "next/link";

export default function NavLinks() {
  const nav = [
    { href: "/", label: "Home" },
    { href: "/games", label: "Games" },
    { href: "/about", label: "About" },
    { href: "/leaderboard", label: "Leaderboard" },
  ];

  return (
    <nav
      className="hidden md:flex items-center gap-20 ml-4"
      aria-label="Primary navigation"
    >
      {nav.map((n) => (
        <Link key={n.href} href={n.href} className="nav-link">
          {n.label}
        </Link>
      ))}
    </nav>
  );
}
