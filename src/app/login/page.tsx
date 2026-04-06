"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please fill in both email and password.");
      return;
    }
    try {
      const userId = await loginUser(email, password);
      if (!userId) throw new Error("User ID not found");
      toast.success("Login successful!");
      router.push(`/${userId}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Login failed.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-md w-full bg-card rounded-2xl shadow-xl border border-border p-8 space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-black text-card-foreground tracking-tight">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Log in to continue to your dashboard.
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground font-medium">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-background border-input h-12"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-foreground font-medium">
                Password
              </Label>
              <div className="text-sm font-medium text-primary hover:opacity-80 cursor-pointer transition-opacity">
                Forgot Password?
              </div>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-background border-input h-12"
            />
          </div>

          <Button 
            onClick={handleLogin} 
            className="w-full h-12 bg-primary hover:opacity-90 text-primary-foreground font-bold rounded-lg transition-all"
          >
            Log In
          </Button>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Don’t have an account?{" "}
          <Link href="/signup" className="font-semibold text-primary hover:opacity-80 transition-opacity">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
