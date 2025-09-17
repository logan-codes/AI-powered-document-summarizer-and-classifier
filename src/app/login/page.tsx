import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link"

export default function Login(){
  return (
    <div className="flex flex-col h-[1024px] items-center relative bg-white">
      <div className="flex flex-col w-[967px] h-[963px] items-start px-0 py-5 relative mb-[-4.00px]">
        <div className="flex flex-col h-[67px] items-center pt-5 pb-3 px-4 relative self-stretch w-full">
          <p className="relative flex-1 self-stretch mt-[-1.00px] [font-family:'Inter-Bold',Helvetica] font-bold text-[#0c141c] text-[28px] text-center tracking-[0] leading-[35px] whitespace-nowrap">
            Log in to your account
          </p>
        </div>

        <div className="relative self-stretch w-full h-28">
          <div className="flex-col w-[935px] h-[88px] items-start top-3 left-4 flex relative">
            <div className="flex flex-col items-start pt-0 pb-2 px-0 relative self-stretch w-full flex-[0_0_auto]">
              <div className="self-stretch mt-[-1.00px] [font-family:'Inter-Medium',Helvetica] font-medium text-[#0c141c] relative text-base tracking-[0] leading-6">
                <Label 
                htmlFor="email"
                className="self-stretch mt-[-1.00px] [font-family:'Inter-Medium',Helvetica] font-medium text-[#0c141c] relative text-base tracking-[0] leading-6"
                >Email</Label>
                <Input 
                className="flex h-14 p-[15px] self-stretch w-full bg-[#f7f9fc] rounded-lg overflow-hidden border border-solid border-[#d1dbe8] items-center relative mt-4" 
                type="email" 
                placeholder="Email"/>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-[16px_16px] px-4 py-3 self-stretch w-full relative flex-[0_0_auto]">
          <div className="flex-col w-[933px] items-start flex relative">
            <Label 
                htmlFor="email"
                className="self-stretch mt-[-1.00px] [font-family:'Inter-Medium',Helvetica] font-medium text-[#0c141c] relative text-base tracking-[0] leading-6"
                >Password</Label>
                <Input 
                className="flex h-14 p-[15px] self-stretch w-full bg-[#f7f9fc] rounded-lg overflow-hidden border border-solid border-[#d1dbe8] items-center relative mt-4" 
                type="password" 
                placeholder="Password"/>
          </div>
        </div>

        <div className="flex w-[400px] items-center justify-end pt-1 pb-3 px-4 relative flex-[0_0_auto]">
          <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-[#4f7296] text-sm tracking-[0] leading-[21px] whitespace-nowrap">
            Forgot Password?
          </div>
        </div>

        <div className="flex items-center justify-center px-4 py-3 self-stretch w-full relative flex-[0_0_auto]">
          <div className="min-w-[84px] max-w-[480px] h-12 items-center justify-center px-5 py-0 flex-1 grow bg-black rounded-lg overflow-hidden flex relative">
            <div className="inline-flex flex-col flex-[0_0_auto] items-center relative">
              <div className="relative self-stretch mt-[-1.00px] [font-family:'Inter-Bold',Helvetica] font-bold text-[#f7f9fc] text-base text-center tracking-[0] leading-6 whitespace-nowrap overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical]">
                Log In
              </div>
              
              <Link href="/dashboard">Login</Link>
              
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center pt-1 pb-3 px-4 self-stretch w-full relative flex-[0_0_auto]">
          <p className="relative self-stretch mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-black text-sm text-center tracking-[0] leading-[21px]">
            Don&#39;t have an account? Sign Up
          </p>
        </div>
      </div>
    </div>
  );
};
