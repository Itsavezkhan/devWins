"use client";

import LandingHeader from "@/components/ui/header/LandingHeader";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Github, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white text-gray-900 ">
      <LandingHeader />
      <section className="flex flex-col items-center justify-center text-center px-6 pt-24 pb-32">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold tracking-tight mb-4"
        >
          Track your developer journey —{" "}
          <span className="text-blue-600">visualize your wins</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg md:text-xl text-gray-600 max-w-2xl mb-8"
        >
          DevWins connects your GitHub, LeetCode, Hashnode, and more — giving
          you one beautiful dashboard to track your coding growth and
          performance over time.
        </motion.p>

        <div className="flex gap-4">
          <Link
            href="/auth/login"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition flex items-center gap-2"
          >
            Get Started <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#features"
            className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-24 px-6 bg-white border-t border-gray-100"
      >
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why DevWins?</h2>
          <p className="text-gray-600 text-lg">
            Developers grow every day — but our progress is scattered. DevWins
            brings everything together in one unified dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <FeatureCard
            icon={<Github className="w-6 h-6 text-blue-600" />}
            title="Connect Your Platforms"
            desc="Sync your GitHub, LeetCode, and Hashnode accounts in seconds."
          />
          <FeatureCard
            icon={<BarChart3 className="w-6 h-6 text-blue-600" />}
            title="Visualize Progress"
            desc="See streaks, top projects, solved problems, and writing stats in clean charts."
          />
          <FeatureCard
            icon={<Zap className="w-6 h-6 text-blue-600" />}
            title="Stay Consistent"
            desc="Track trends and get insights to keep your developer journey consistent."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 text-center bg-gradient-to-br from-blue-50 to-blue-100">
        <h2 className="text-4xl font-bold mb-6">Ready to track your wins?</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Your journey deserves a dashboard. Join hundreds of developers who
          already visualize their growth with DevWins.
        </p>
        <Link
          href="/auth/login"
          className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition flex items-center gap-2 mx-auto w-fit"
        >
          Login with GitHub <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-sm text-gray-500 border-t border-gray-100">
        © {new Date().getFullYear()} DevWins. Built for developers, by
        developers.
      </footer>
    </main>
  );
}

const FeatureCard = ({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-gray-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition text-left"
  >
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{desc}</p>
  </motion.div>
);
