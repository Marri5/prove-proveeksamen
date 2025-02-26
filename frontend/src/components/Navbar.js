import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between">
        <Link href="/" className="text-white font-bold">Reinsdyrregister</Link>
        <div className="space-x-4">
          <Link href="/reindeer" className="text-white">Reinsdyr</Link>
          <Link href="/faq" className="text-white">FAQ</Link>
          <Link href="/auth/login" className="bg-white text-blue-600 px-4 py-2 rounded">Logg inn</Link>
        </div>
      </div>
    </nav>
  );
}
