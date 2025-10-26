"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Page = () => {
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
          <Button className="w-full cursor-pointer" variant="outline" asChild>
            <Link href="http://localhost:5001/auth/login/github">
              Login with GitHub
            </Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
};

export default Page;

