"use client";
import React, { useState } from "react";
import { signUpUser } from "@/lib/auth";
import { toast } from "sonner"; // ✅ import Sonner
import Link from "next/link";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill all fields.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      await signUpUser(email, password, name);
      toast.success("Signup successful! Check your email for confirmation.");

      // Reset fields
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Signup failed.");
      }
    }
  };

  return (
    <div className="flex flex-col h-[1024px] items-center relative bg-white">
      <div className="flex flex-col max-w-[960px] w-[960px] h-[705px] items-center justify-center px-0 py-5 relative">

        <div className="relative self-stretch font-bold text-[#0c141c] text-[28px] text-center leading-[35px]">
          Sign up
        </div>

        {/* Name */}
        <div className="relative self-stretch w-full h-28 mt-5">
          <div className="flex-col w-[935px] items-start flex relative">
            <div className="flex w-[691px] items-start pt-0 pb-2 flex-col relative">
              <div className="self-stretch font-medium text-[#0c141c] text-base leading-6">
                Name*
              </div>
            </div>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-14 w-full p-4 bg-[#e8edf2] rounded-lg"
            />
          </div>
        </div>

        {/* Email */}
        <div className="relative self-stretch w-full mt-3">
          <div className="flex-col w-[938px] h-[88px] items-center flex relative">
            <div className="flex-col items-start pt-0 pb-2 flex-col relative w-full">
              <div className="self-stretch font-medium text-[#0c141c] text-base leading-6">
                Email id*
              </div>
            </div>
            <input
              type="email"
              placeholder="Enter your email id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-14 w-full p-4 bg-[#e8edf2] rounded-lg"
            />
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-wrap items-start justify-around gap-4 px-4 py-3 w-full mt-3">
          <div className="flex-col min-w-40 items-start flex-1 flex relative">
            <div className="flex-col items-start pt-0 pb-2 flex-col relative w-full">
              <div className="self-stretch font-medium text-[#0c141c] text-base leading-6">
                Password*
              </div>
            </div>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-14 w-full p-4 bg-[#e8edf2] rounded-lg"
            />
          </div>
        </div>

        {/* Confirm Password */}
        <div className="flex flex-wrap w-full items-end gap-4 px-4 py-3 mt-3">
          <div className="flex-col min-w-40 items-start flex-1 flex relative">
            <div className="flex-col items-start pt-0 pb-2 flex-col relative w-full">
              <div className="self-stretch font-medium text-[#0c141c] text-base leading-6">
                Confirm password*
              </div>
            </div>
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="h-14 w-full p-4 bg-[#e8edf2] rounded-lg"
            />
          </div>
        </div>

        {/* Sign up button */}
        <div className="flex h-[93px] items-center justify-center w-full mt-4">
          <button
            onClick={handleSignUp}
            className="max-w-[480px] w-[463px] h-10 bg-black rounded-lg text-sm text-white font-bold"
          >
            Sign up
          </button>
        </div>

        {/* Login link */}
        <div className="flex flex-col items-center pt-1 pb-3 px-4 mt-3 w-full">
          <p className="text-[#4f7296] text-sm text-center">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-black">
              Log In
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
