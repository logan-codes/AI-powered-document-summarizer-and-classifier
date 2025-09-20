import React from 'react'

export default function SideNavBar() {
  return (
    <div className="flex flex-col w-60 h-screen items-start justify-between p-4 absolute top-0 left-0 bg-[#f7f9fc]">
        <div className="flex-col items-start gap-4 self-stretch flex-[0_0_auto] flex relative w-full">
          <div className="flex items-start gap-2 self-stretch w-full flex-col relative flex-[0_0_auto]">
            <div className="flex w-full items-center gap-3 px-3 py-2 relative flex-[0_0_auto]">
              <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                <div className="relative self-stretch mt-[-1.00px] [font-family:'Inter-Medium',Helvetica] font-medium text-[#0c141c] text-sm tracking-[0] leading-[21px] whitespace-nowrap">
                  Legal AI
                </div>
              </div>
            </div>

            <div className="flex w-full items-center gap-3 px-3 py-2 relative flex-[0_0_auto] rounded-lg">
              <div className="inline-flex flex-col items-start relative flex-[0_0_auto] mx-auto">
                <div className="relative self-stretch mt-[-1.00px] [font-family:'Inter-Medium',Helvetica] font-medium text-[#0c141c] text-sm tracking-[0] leading-[21px] whitespace-nowrap">
                  Search
                </div>
              </div>
            </div>

            <div className="flex w-full items-center gap-3 px-3 py-2 relative flex-[0_0_auto] bg-[#e8edf2] rounded-lg">
              <div className="inline-flex flex-col items-start relative flex-[0_0_auto] mx-auto">
                <div className="relative self-stretch mt-[-1.00px] [font-family:'Inter-Medium',Helvetica] font-medium text-[#0c141c] text-sm tracking-[0] leading-[21px] whitespace-nowrap">
                  Workspace
                </div>
              </div>
            </div>

            <div className="flex w-full items-center gap-3 px-3 py-2 relative flex-[0_0_auto]">
              <div className="inline-flex flex-col items-start relative flex-[0_0_auto] mx-auto">
                <div className="relative self-stretch mt-[-1.00px] [font-family:'Inter-Medium',Helvetica] font-medium text-[#0c141c] text-sm tracking-[0] leading-[21px] whitespace-nowrap">
                  Template
                </div>
              </div>
            </div>

            <div className="flex w-full items-center gap-3 px-3 py-2 relative flex-[0_0_auto]">
              <div className="inline-flex flex-col items-start relative flex-[0_0_auto] mx-auto">
                <div className="relative self-stretch mt-[-1.00px] [font-family:'Inter-Medium',Helvetica] font-medium text-[#0c141c] text-sm tracking-[0] leading-[21px] whitespace-nowrap">
                  Settings
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="min-w-[84px] max-w-[480px] h-10 items-center justify-center px-4 py-0 bg-[#197fe5] rounded-lg overflow-hidden flex relative w-full">
          <div className="inline-flex items-center flex-col relative flex-[0_0_auto]">
            <div className="relative self-stretch mt-[-1.00px] [font-family:'Inter-Bold',Helvetica] font-bold text-[#f7f9fc] text-sm text-center tracking-[0] leading-[21px] whitespace-nowrap overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical]">
              New Case
            </div>
          </div>
        </div>
      </div>
  )
}
