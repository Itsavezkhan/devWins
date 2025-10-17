"use client";

import {
  LayoutDashboard,
  BarChart3,
  BookOpen,
  Target,
  Settings,
  HelpCircle,
} from "lucide-react";
import SidebarLink from "./SideBarLink";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const [active, setActive] = useState<string>("dashboard");
  const path = usePathname();

  const links = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Reflections",
      path: "/dashboard/reflections",
    },
    {
      name: "Analytics",
      path: "/dashboard/analytics",
    },
    {
      name: "Performance",
      path: "/dashboard/performance",
    },
  ];

  return (
    <aside className="hidden md:flex flex-col w-60 bg-white h-screen border-r  shrink-0 border-gray-200 dark:border-gray-800  dark:bg-gray-900 p-4">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
        DevWins
      </h1>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-2">
        {links?.map((link) => {
          const active = path === link.path;

          return (
            <Link href={link.path} key={link.name}>
              <div
                id={link.name}
                className={`${
                  active ? "bg-blue-600 text-white" : "bg-white text-black"
                } p-3 rounded-lg`}
              >
                <button>{link.name}</button>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-2">
        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">
          Preferences
        </p>

        <div>
          <button>
            <Link href="/dashboard/settings">Settings</Link>
          </button>
        </div>
        <div>
          <button>
            <Link href="/dashboard/help">Help</Link>
          </button>
        </div>
      </div>
    </aside>
  );
}
