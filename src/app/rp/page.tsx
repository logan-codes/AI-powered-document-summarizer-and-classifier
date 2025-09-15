import React from "react";

export default function ResetPassword(){
  return (
    <div className="flex flex-col h-[1024px] items-center gap-[122px] relative bg-white overflow-x-hidden">
      
      <div className="flex flex-col max-w-[960px] w-[480px] h-[375px] items-center justify-center px-0 py-5 relative">
        <div className="flex flex-col pt-5 pb-3 px-4 self-stretch w-full mt-[-10.00px] items-center relative flex-[0_0_auto]">
          <div className="relative self-stretch mt-[-1.00px] [font-family:'Inter-Bold',Helvetica] font-bold text-[#0c141c] text-[28px] text-center tracking-[0] leading-[35px]">
            Reset your password
          </div>
        </div>

        <div className="inline-flex flex-col items-start gap-2.5 relative flex-[0_0_auto]">
          <div className="flex flex-wrap max-w-[480px] w-[480px] h-20 items-end gap-[16px_16px] px-4 py-3 relative">
            <div className="flex flex-col w-[443px] items-start relative">
              <div className="flex-[0_0_auto] flex items-center p-[15px] relative self-stretch w-full bg-[#f7f9fc] rounded-lg overflow-hidden border border-solid border-[#cedbe8]">
                <div className="relative w-fit [font-family:'Inter-Regular',Helvetica] font-normal text-[#4c7299] text-base tracking-[0] leading-6 whitespace-nowrap">
                  Phone&nbsp;&nbsp;Number
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-[480px] items-start px-4 py-3 relative flex-[0_0_auto]">
          <div className="flex min-w-[84px] max-w-[480px] h-10 items-center justify-center px-4 py-0 relative flex-1 grow bg-[#117fed] rounded-lg overflow-hidden">
            <div className="inline-flex flex-col items-center relative flex-[0_0_auto]">
              <div className="relative self-stretch mt-[-1.00px] [font-family:'Inter-Bold',Helvetica] font-bold text-[#f7f9fc] text-sm text-center tracking-[0] leading-[21px] whitespace-nowrap overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical]">
                Send OTP
              </div>
            </div>
          </div>
        </div>

        <div className="inline-flex flex-wrap max-w-[480px] items-end gap-[16px_16px] px-4 py-3 relative flex-[0_0_auto]">
          <div className="flex flex-col min-w-40 items-start relative flex-1 grow">
            <div className="h-14 flex items-center p-[15px] relative self-stretch w-full bg-[#f7f9fc] rounded-lg overflow-hidden border border-solid border-[#cedbe8]">
              <div className="relative w-fit [font-family:'Inter-Regular',Helvetica] font-normal text-[#4c7299] text-base tracking-[0] leading-6 whitespace-nowrap">
                OTP
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-[480px] items-start px-4 py-3 mb-[-10.00px] relative flex-[0_0_auto]">
          <div className="flex min-w-[84px] max-w-[480px] h-10 items-center justify-center px-4 py-0 relative flex-1 grow bg-[#117fed] rounded-lg overflow-hidden">
            <div className="inline-flex flex-col items-center relative flex-[0_0_auto]">
              <div className="relative self-stretch mt-[-1.00px] [font-family:'Inter-Bold',Helvetica] font-bold text-[#f7f9fc] text-sm text-center tracking-[0] leading-[21px] whitespace-nowrap overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical]">
                Reset Password
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
