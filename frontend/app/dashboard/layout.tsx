"use client";

import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from "@/components/ui/Sidebar";
import Header from "@/components/ui/header/Header";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // className={`${geistSans.variable} ${geistMono.variable}`}
    <html >
      <body>
        {/* <div className="bg-yellow-300 overflow-hidden h-screen flex">
          <Sidebar />

          <div className="w-full flex flex-col min-h-screen bg-orange-500 dark:bg-gray-950 overflow-x-hidden">
            <Header />
            <Provider store={store}>
              <div className="bg-blue-400 p-2 w-full">{children}</div>
            </Provider>
          </div>
        </div> */}
        <Provider store={store}>
          <div className=" h-screen flex p-3 overflow-hidden">
            {/* Sidebar */}
            <Sidebar />

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden dark:bg-gray-950">
              {/* Header */}
              <Header />

              {/* Main content area */}

              <div className="flex-1 overflow-auto p-2 w-full">{children}</div>
            </div>
          </div>
        </Provider>

        {/* <div className="bg-yellow-300 h-screen flex p-3 overflow-hidden">
         
          <div className="w-[250px] shrink-0 bg-red-400">Sidebar</div>

          <div className="flex-1 flex flex-col gap-4 overflow-hidden">
         
            <div className="bg-red-400 p-2">Header / Top</div>

          
            <div className="overflow-x-auto w-full">
              <div className="flex gap-4 min-w-max p-2">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-40 h-40 bg-green-400 flex items-center justify-center"
                  >
                    Card {i + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div> */}
      </body>
    </html>
  );
}
