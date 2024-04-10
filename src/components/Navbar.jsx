import React from "react";
import "../font.css";
import { useAuthStore } from "../store/store";
import { useContext } from "react";
import { AdminContext } from "../mycontext";


const Navbar = () => {

  const setPolicyModalOpen = useAuthStore((state) => state.setPolicyModalOpen);
  const { setIsAdmin } = useContext(AdminContext);
  const handlePolicy = () => {
    setPolicyModalOpen(true);
  }

  return (
    <header className="z-[50] fixed top-0 w-full border-b  backdrop-blur-sm bg-black/[0.6] border-zinc-700">
      <div className="p-2 md:p-0 flex h-16 items-center max-w-[88rem] mx-auto">
        <div className="mr-4 hidden md:flex">
          <a
            className="flex items-center justify-center space-x-2 text-xl font-bold py-6 text-center text-gray-100 selection:bg-emerald-500 mr-10"
            href="/"
          >
            <div className="relative h-8 w-8 md:h-6 md:w-6 bg-black border border-slate-800  text-white   flex items-center justify-center rounded-md text-sm antialiased">
              <div className="absolute h-20 w-full bg-white/[0.2] -top-10 inset-x-0 rounded-full blur-xl"></div>
              <div className="text-sm h-full text-emerald-500 relative z-20">
                <img
                  alt="Logo"
                  loading="lazy"
                  width="80"
                  height="80"
                  decoding="async"
                  data-nimg="1"
                  src="./link-hyperlink-color-icon.svg"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-white">Chain Cover</h1>
            </div>
            
          </a>
          
        </div>
        
        <a
          className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 py-2 mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          type="button"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="radix-:rn:"
          data-state="closed"
          href="/"
        >
          <div className="relative h-8 w-8 md:h-6 md:w-6 bg-black border border-slate-800  text-white  flex items-center justify-center rounded-md text-sm antialiased">
            <div className="absolute h-10 w-full bg-white/[0.2] -top-10 inset-x-0 rounded-full blur-xl"></div>
            <div className="text-sm  text-emerald-500 relative z-20">
              <img
                alt="Logo"
                loading="lazy"
                width="30"
                height="30"
                decoding="async"
                data-nimg="1"
                src="./link-hyperlink-color-icon.svg"
              />
            </div>
          </div>
          <span className="ml-2 text-white text-xl">Chain Cover</span>
        </a>
        <div className="flex flex-1 items-center justify-end gap-2 ">
        <button className="sm:px-8 sm:py-2  px-8 sm:text-base text-sm sm:mr-3 mr-1 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200" onClick={()=>handlePolicy()}>
  My Policies
</button>
<button className="sm:px-8 sm:py-2  px-8 sm:text-base text-sm sm:mr-3 mr-1 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200" onClick={()=>setIsAdmin(true)}>
  Admin Login
</button>
          <button className="sm:flex relative hidden justify-start items-center text-sm text-muted-foreground dark:border-white/[0.2] py-2 w-fit border border-transparent shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] px-4 rounded-xl bg-white dark:bg-brand">
            <span className="transition-colors hover:text-foreground/80 text-foreground/60 text-sm font-medium pl-2 pr-4">
              Contact Us
            </span>
            <kbd className="pointer-events-none  hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
