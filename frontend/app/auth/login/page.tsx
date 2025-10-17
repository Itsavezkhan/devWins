"use client";
import React from "react";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-700">
            DevWins
          </CardTitle>
          <p className="text-gray-500 mt-2">
            Track your progress, fight impostor syndrome
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="email"
            className="text-gray-700"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            className="text-gray-700"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button className="w-full cursor-pointer" variant="outline">
            <Link href="http://localhost:5001/auth/login/github">
              Login with Githubbbbbb
            </Link>
          </Button>
          <Button className="w-full cursor-pointer" variant="outline">
            <Link href="http://localhost:5001/auth/login/google">
              Login with Google
            </Link>
          </Button>

          <Button variant="outline" className="w-full cursor-pointer"></Button>
        </CardContent>
      </Card>
    </main>
  );
};

export default page;
