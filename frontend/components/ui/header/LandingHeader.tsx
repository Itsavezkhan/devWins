"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function MarketingHeader() {
  return (
    <header className="flex justify-between items-center px-6 py-4 border-b bg-white">
      <Link href="/" className="text-xl font-bold text-blue-600">
        DevWins
      </Link>
      <nav className="flex items-center gap-4">
        <Link href="#features" className="text-gray-600 hover:text-gray-900">
          Features
        </Link>
        <Link href="/auth/login">
          <Button>Login</Button>
        </Link>
      </nav>
    </header>
  );
}
