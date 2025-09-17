'use client';
import React, { useState } from "react";

export const NavigationBarSection = () => {
  const [searchValue, setSearchValue] = useState("");
  const [activeItem, setActiveItem] = useState("Search");

  const navigationItems = [
    {
      id: "home",
      label: "Home",
      
      iconClasses: "absolute w-[18px] h-[19px] top-0.5 left-[3px]",
    },
    {
      id: "workspace",
      label: "Workspace",
      
      iconClasses: "absolute w-5 h-[18px] top-0.5 left-0.5",
    },
    {
      id: "template",
      label: "Template",
      
      iconClasses: "absolute w-4 h-5 top-0.5 left-1",
    },
    {
      id: "settings",
      label: "Settings",
      
      iconClasses: "absolute w-5 h-5 top-0.5 left-0.5",
    },
  ];

  const handleNavItemClick = (itemId:any) => {
    setActiveItem(itemId);
  };

  const handleSearchChange = (e:any) => {
    setSearchValue(e.target.value);
  };

  const handleNewCaseClick = () => {
    console.log("New Case clicked");
  };

  return (
    <nav
      className="flex flex-col w-80 h-[959px] items-start justify-between p-4 relative bg-[#f7f9fc]"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex-col items-start gap-4 self-stretch flex-[0_0_auto] flex relative w-full">
        <ul
          className="flex-col gap-2 flex-[0_0_auto] flex items-start relative self-stretch w-full"
          role="list"
        >
          <li role="listitem">
            <button
              className={`flex w-72 items-center gap-3 px-3 py-2 relative flex-[0_0_auto] rounded-lg transition-colors duration-200 hover:bg-[#e8edf2] focus:outline-none focus:ring-2 focus:ring-[#197fe5] focus:ring-opacity-50 ${
                activeItem === "home" ? "bg-[#e8edf2]" : ""
              }`}
              onClick={() => handleNavItemClick("home")}
              aria-label="Navigate to Home"
            >
              <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                <div className="relative flex-1 w-6 grow">
                  
                </div>
              </div>
              <span className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                <span className="relative self-stretch mt-[-1.00px] [font-family:'Inter-Medium',Helvetica] font-medium text-[#0c141c] text-sm tracking-[0] leading-[21px] whitespace-nowrap">
                  Home
                </span>
              </span>
            </button>
          </li>

          <li role="listitem">
            <div className="flex w-72 items-center gap-3 px-3 py-2 relative flex-[0_0_auto] bg-[#e8edf2] rounded-lg">
              <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                <div className="relative flex-1 w-6 grow">
                  
                </div>
              </div>
              <label htmlFor="search-input" className="sr-only">
                Search
              </label>
              <input
                id="search-input"
                className="inline-flex flex-col items-start relative flex-[0_0_auto] border-[none] [background:none] [font-family:'Inter-Medium',Helvetica] font-medium text-sm leading-[21px] whitespace-nowrap self-stretch mt-[-1.00px] text-[#0c141c] tracking-[0] p-0 focus:outline-none"
                placeholder="Search"
                type="text"
                value={searchValue}
                onChange={handleSearchChange}
                aria-label="Search input"
              />
            </div>
          </li>

          {navigationItems.map((item) => (
            <li key={item.id} role="listitem">
              <button
                className={`flex w-72 items-center gap-3 px-3 py-2 relative flex-[0_0_auto] rounded-lg transition-colors duration-200 hover:bg-[#e8edf2] focus:outline-none focus:ring-2 focus:ring-[#197fe5] focus:ring-opacity-50 ${
                  activeItem === item.id ? "bg-[#e8edf2]" : ""
                }`}
                onClick={() => handleNavItemClick(item.id)}
                aria-label={`Navigate to ${item.label}`}
              >
                <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                  <div className="relative flex-1 w-6 grow">
                    
                  </div>
                </div>
                <span className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                  <span className="relative self-stretch mt-[-1.00px] [font-family:'Inter-Medium',Helvetica] font-medium text-[#0c141c] text-sm tracking-[0] leading-[21px] whitespace-nowrap">
                    {item.label}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button
        className="min-w-[84px] max-w-[480px] h-10 items-center justify-center px-4 py-0 bg-[#197fe5] rounded-lg overflow-hidden flex relative w-full transition-colors duration-200 hover:bg-[#1565c0] focus:outline-none focus:ring-2 focus:ring-[#197fe5] focus:ring-opacity-50 focus:ring-offset-2"
        onClick={handleNewCaseClick}
        aria-label="Create new case"
      >
        <span className="inline-flex flex-col items-center relative flex-[0_0_auto]">
          <span className="relative self-stretch mt-[-1.00px] [font-family:'Inter-Bold',Helvetica] font-bold text-[#f7f9fc] text-sm text-center tracking-[0] leading-[21px] whitespace-nowrap overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical]">
            New Case
          </span>
        </span>
      </button>
    </nav>
  );
};
