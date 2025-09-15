import React from "react";

export default function SignUp(){
  return (
    <div className="flex flex-col h-[1024px] items-center relative bg-white">
      
      <div className="flex flex-col max-w-[960px] w-[960px] h-[705px] items-center justify-center px-0 py-5 relative">
        <div className="relative self-stretch [font-family:'Inter-Bold',Helvetica] font-bold text-[#0c141c] text-[28px] text-center tracking-[0] leading-[35px]">
          Sign up
        </div>

        <div className="relative self-stretch w-full h-28">
          <div className="flex-col w-[935px] items-start top-3 left-3 flex relative">
            <div className="flex w-[691px] items-start pt-0 pb-2 px-0 flex-[0_0_auto] flex-col relative">
              <div className="relative self-stretch mt-[-1.00px] [font-family:'Inter-Medium',Helvetica] font-medium text-[#0c141c] text-base tracking-[0] leading-6">
                Name*
              </div>
            </div>

            <div className="h-14 items-center p-4 bg-[#e8edf2] rounded-lg overflow-hidden flex relative self-stretch w-full">
              <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-[#757575] text-base tracking-[0] leading-6 whitespace-nowrap">
                Enter&nbsp;&nbsp;your full name
              </div>
            </div>
          </div>
        </div>

        <div className="relative self-stretch w-full flex-[0_0_auto]">
          <div className="flex-col w-[938px] h-[88px] items-center justify-between top-1.5 left-3 flex relative">
            <div className="flex-col items-start pt-0 pb-2 px-0 flex-[0_0_auto] flex relative self-stretch w-full">
              <div className="relative self-stretch mt-[-1.00px] [font-family:'Inter-Medium',Helvetica] font-medium text-[#0c141c] text-base tracking-[0] leading-6">
                Email id*
              </div>
            </div>

            <div className="h-14 items-center p-4 bg-[#e8edf2] rounded-lg overflow-hidden flex relative self-stretch w-full">
              <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-[#757575] text-base tracking-[0] leading-6 whitespace-nowrap">
                Enter&nbsp;&nbsp;your&nbsp;&nbsp;email&nbsp;&nbsp;id
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-start justify-around gap-[16px_16px] px-4 py-3 relative self-stretch w-full flex-[0_0_auto]">
          <div className="flex-col min-w-40 items-start flex-1 grow flex relative">
            <div className="flex-col items-start pt-0 pb-2 px-0 flex-[0_0_auto] flex relative self-stretch w-full">
              <div className="relative self-stretch mt-[-1.00px] [font-family:'Inter-Medium',Helvetica] font-medium text-[#0c141c] text-base tracking-[0] leading-6">
                Password*
              </div>
            </div>

            <div className="h-14 items-center p-4 bg-[#e8edf2] rounded-lg overflow-hidden flex relative self-stretch w-full">
              <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-[#757575] text-base tracking-[0] leading-6 whitespace-nowrap">
                Enter&nbsp;&nbsp;your&nbsp;&nbsp;password
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap w-[960px] items-end gap-[16px_16px] px-4 py-3 relative flex-[0_0_auto]">
          <div className="flex-col min-w-40 items-start flex-1 grow flex relative">
            <div className="flex-col items-start pt-0 pb-2 px-0 flex-[0_0_auto] flex relative self-stretch w-full">
              <div className="relative self-stretch mt-[-1.00px] [font-family:'Inter-Medium',Helvetica] font-medium text-[#0c141c] text-base tracking-[0] leading-6">
                Confirm password*
              </div>
            </div>

            <div className="h-14 items-center p-4 bg-[#e8edf2] rounded-lg overflow-hidden flex relative self-stretch w-full">
              <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-[#757575] text-base tracking-[0] leading-6 whitespace-nowrap">
                Confirm&nbsp;&nbsp;your&nbsp;&nbsp;password
              </div>
            </div>
          </div>
        </div>

        <div className="flex h-[93px] items-center justify-center px-4 py-3 relative self-stretch w-full">
          <div className="max-w-[480px] w-[463px] h-10 items-center justify-center px-4 py-0 bg-black rounded-lg overflow-hidden flex relative">
            <div className="flex w-[104px] items-center flex-col relative">
              <div className="relative self-stretch mt-[-1.00px] [font-family:'Inter-Bold',Helvetica] font-bold text-[#f7f9fc] text-sm text-center tracking-[0] leading-[21px] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical]">
                Sign up
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center pt-1 pb-3 px-4 relative self-stretch w-full flex-[0_0_auto]">
          <p className="relative self-stretch mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-[#4f7296] text-sm text-center tracking-[0] leading-[21px]">
            Already have an account? login
          </p>
        </div>
      </div>
    </div>
  );
};
