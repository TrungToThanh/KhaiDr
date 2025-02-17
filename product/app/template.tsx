import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./layout/app-sidebar";
// import { ScrollProgress } from "@/components/magicui/scroll-progress";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      {/* <ScrollProgress className="h-1" /> */}
      <AppSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
