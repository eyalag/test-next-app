import Link from "next/link";

export function Navbar() {
  return (
    <header className="border-b border-border">
      <nav className="flex items-center gap-6 px-6 h-14">
        <Link href="/" className="text-sm font-medium hover:text-muted-foreground">
          Home
        </Link>
        <Link href="/page2" className="text-sm font-medium hover:text-muted-foreground">
          Page 2
        </Link>
      </nav>
    </header>
  );
}
