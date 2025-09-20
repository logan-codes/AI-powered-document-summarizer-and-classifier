"use client";

import React, { useState } from "react";

export const SettingsScreen: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    jobTitle: "",
    companyName: "",
  });

  const [searchQuery, setSearchQuery] = useState("");

  type NavigationItem = {
    label: string;
    isActive: boolean;
    icon?: string | null;
  };

  const navigationItems: NavigationItem[] = [
    { label: "Home", isActive: false, icon: null },
    { label: "Workspace", isActive: false, icon: null },
    { label: "Template", isActive: false, icon: null },
    { label: "Settings", isActive: true, icon: null },
  ];

  const formFields = [
    { key: "fullName", label: "Full Name*", type: "text" },
    { key: "email", label: "Email id*", type: "email" },
    { key: "phoneNumber", label: "Phone Number*", type: "tel" },
    { key: "jobTitle", label: "Job Title*", type: "text" },
    { key: "companyName", label: "Company Name*", type: "text" },
  ];

  const handleInputChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleUpdateProfile = () => {
    console.log("Profile updated:", formData);
  };

  const handleNewCase = () => {
    console.log("New case created");
  };

  return (
    <div className="flex flex-col h-[1024px] items-start relative bg-white">
      <div className="relative w-[1440px] h-[1024px] overflow-hidden">
        <header className="flex w-[1440px] h-[65px] items-center justify-between px-10 py-3 absolute top-0 left-0 bg-white border-b [border-bottom-style:solid] border-[#e5e8ea]">
          <div className="inline-flex items-center gap-4 relative flex-[0_0_auto]">
            <img
              className="relative flex-[0_0_auto]"
              alt="Legal AI Logo"
            />

            <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
              <h1 className="relative self-stretch mt-[-1.00px] [font-family:'Inter-Bold',Helvetica] font-bold text-[#0c141c] text-lg tracking-[0] leading-[23px] whitespace-nowrap">
                Legal AI
              </h1>
            </div>
          </div>

          <div className="flex w-[1257px] items-start justify-end gap-8 relative self-stretch">
            <div className="relative w-10 h-10 rounded-[20px] bg-[url(/depth-4-frame-1.png)] bg-cover bg-[50%_50%]" />
          </div>
        </header>

        <div className="absolute w-[1440px] h-[960px] top-[65px] left-0">
          <div className="absolute w-[1440px] h-[695px] top-0 left-0">
            <main className="flex flex-col max-w-[960px] w-[960px] h-[694px] items-start relative top-px left-[400px]">
              <div className="flex flex-wrap items-start justify-around gap-[12px_12px] p-4 relative self-stretch w-full flex-[0_0_auto]">
                <div className="flex flex-col w-72 items-start relative">
                  <h2 className="[font-family:'Inter-Bold',Helvetica] font-bold text-[32px] leading-10 relative self-stretch mt-[-1.00px] text-[#0c141c] tracking-[0]">
                    Settings
                  </h2>
                </div>
              </div>

              <div className="flex flex-col items-start pt-5 pb-3 px-4 relative self-stretch w-full flex-[0_0_auto]">
                <h3 className="relative self-stretch mt-[-1.00px] [font-family:'Inter-Bold',Helvetica] font-bold text-[#0c141c] text-[22px] tracking-[0] leading-7">
                  Profile
                </h3>
              </div>

              {formFields.map((field, index) => (
                <div
                  key={field.key}
                  className="inline-flex flex-wrap max-w-[480px] items-end gap-[16px_16px] px-4 py-3 relative flex-[0_0_auto]"
                >
                  <div className="flex-col min-w-40 items-start flex-1 grow flex relative">
                    <div className="flex flex-col items-start pt-0 pb-2 px-0 flex-[0_0_auto] relative self-stretch w-full">
                      <label className="relative self-stretch mt-[-1.00px] [font-family:'Inter-Medium',Helvetica] font-medium text-[#0c141c] text-base tracking-[0] leading-6">
                        {field.label}
                      </label>
                    </div>

                    <input
                      type={field.type}
                      value={formData[field.key as keyof typeof formData]}
                      onChange={(e) =>
                        handleInputChange(field.key, e.target.value)
                      }
                      className={`${index === 4 ? "h-7" : "h-8"} bg-[#f7f9fc] rounded-lg border border-solid border-[#d1dbe8] relative self-stretch w-full px-3 py-2 [font-family:'Inter-Medium',Helvetica] font-medium text-[#0c141c] text-sm tracking-[0] leading-5 focus:outline-none focus:border-[#197fe5] focus:ring-1 focus:ring-[#197fe5]`}
                      required
                      aria-label={field.label}
                    />
                  </div>
                </div>
              ))}

              <div className="flex items-start px-4 py-3 relative self-stretch w-full flex-[0_0_auto]">
                <button
                  onClick={handleUpdateProfile}
                  className="inline-flex min-w-[84px] max-w-[480px] h-10 items-center justify-center px-4 py-0 relative flex-[0_0_auto] bg-black rounded-lg overflow-hidden hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                  type="button"
                >
                  <div className="inline-flex flex-col items-center relative flex-[0_0_auto]">
                    <span className="relative self-stretch mt-[-1.00px] [font-family:'Inter-Bold',Helvetica] font-bold text-[#f7f9fc] text-sm text-center tracking-[0] leading-[21px] whitespace-nowrap overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical]">
                      Update Profile
                    </span>
                  </div>
                </button>
              </div>
            </main>
          </div>

          <nav className="flex flex-col w-80 h-[959px] items-start justify-between p-4 absolute top-px left-0 bg-[#f7f9fc]">
            <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
              <div className="flex flex-col items-start gap-2 flex-[0_0_auto] relative self-stretch w-full">
                {navigationItems.map((item, index) => (
                  <div
                    key={item.label}
                    className={`flex w-72 items-center gap-3 px-3 py-2 relative flex-[0_0_auto] ${item.isActive ? "bg-[#e8edf2] rounded-lg" : ""}`}
                  >
                    <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                      <div className="relative flex-1 w-6 grow">
                        {item.label === "Settings" ? (
                          <div className="relative flex-1 w-6 grow bg-[url(/settings.svg)] bg-[100%_100%]" />
                        ) : (
                          item.icon && (
                            <img
                              className={`${
                                item.label === "Home"
                                  ? "absolute w-[18px] h-[19px] top-0.5 left-[3px]"
                                  : item.label === "Workspace"
                                    ? "w-5 h-[18px] left-0.5 absolute top-0.5"
                                    : "w-4 h-5 left-1 absolute top-0.5"
                              }`}
                              alt={`${item.label} icon`}
                              src={item.icon}
                            />
                          )
                        )}
                      </div>
                    </div>

                    {index === 1 ? (
                      <input
                        className="inline-flex flex-col items-start relative flex-[0_0_auto] border-[none] [background:none] self-stretch mt-[-1.00px] [font-family:'Inter-Medium',Helvetica] font-medium text-[#0c141c] text-sm tracking-[0] leading-[21px] whitespace-nowrap p-0 focus:outline-none"
                        placeholder="Search"
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        aria-label="Search"
                      />
                    ) : (
                      <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                        <span
                          className={`relative self-stretch mt-[-1.00px] [font-family:'Inter-Medium',Helvetica] font-medium text-[#0c141c] text-sm tracking-[0] leading-[21px] whitespace-nowrap ${item.isActive ? "[font-family:'Inter-Medium',Helvetica] font-medium text-sm leading-[21px] whitespace-nowrap relative self-stretch mt-[-1.00px] text-[#0c141c] tracking-[0]" : ""}`}
                        >
                          {item.label}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleNewCase}
              className="min-w-[84px] max-w-[480px] h-10 items-center justify-center px-4 py-0 w-full bg-[#197fe5] rounded-lg overflow-hidden flex relative hover:bg-[#1565c0] focus:outline-none focus:ring-2 focus:ring-[#197fe5] focus:ring-offset-2 transition-colors"
              type="button"
            >
              <div className="inline-flex flex-col items-center relative flex-[0_0_auto]">
                <span className="relative self-stretch mt-[-1.00px] [font-family:'Inter-Bold',Helvetica] font-bold text-[#f7f9fc] text-sm text-center tracking-[0] leading-[21px] whitespace-nowrap overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical]">
                  New Case
                </span>
              </div>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};
