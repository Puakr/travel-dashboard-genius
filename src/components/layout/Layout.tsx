
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const isMobile = useIsMobile();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  // Close mobile sidebar when resizing to desktop
  useEffect(() => {
    if (!isMobile) {
      setIsMobileOpen(false);
    }
  }, [isMobile]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
      
      <div className="flex-1 flex">
        {/* Desktop sidebar */}
        {!isMobile && <Sidebar />}
        
        {/* Mobile sidebar */}
        {isMobile && (
          <div
            className={cn(
              "fixed inset-0 bg-black/80 z-40 transition-opacity duration-300",
              isMobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
            onClick={() => setIsMobileOpen(false)}
          >
            <div
              className={cn(
                "absolute top-16 left-0 bottom-0 max-w-[280px] transition-transform duration-300 ease-in-out",
                isMobileOpen ? "translate-x-0" : "-translate-x-full"
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <Sidebar isMobile setIsMobileOpen={setIsMobileOpen} />
            </div>
          </div>
        )}
        
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
