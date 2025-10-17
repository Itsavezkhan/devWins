"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const page = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-gray-700">Register</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 text-gray-700">
          <Input placeholder="Name" />
          <Input placeholder="Email" type="email" />
          <Input placeholder="Password" type="password" />
          <Button className="mt-2 text-white" variant="outline">
            Sign Up
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
