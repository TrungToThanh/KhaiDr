"use client";
import * as React from "react";
import { Phone, Info, Home, ShoppingBag, Menu, Link } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import logo from "@/public/logo/logo.webp";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// This is sample data.
const menuItems = {
  navMain: [
    {
      title: "TRANG CHỦ",
      url: "/home",
      icon: Home,
      items: [],
    },
    {
      title: "SẢN PHẨM",
      url: "products",
      icon: ShoppingBag,
      items: [],
    },
    {
      title: "GIỚI THIỆU",
      url: "about-us",
      icon: Info,
      items: [],
    },
    {
      title: "LIÊN HỆ",
      url: "contact",
      icon: Phone,
      items: [],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const isMobile = useIsMobile();

  const memoizedLogo = React.useMemo(
    () => (
      <Image
        src={logo}
        alt="logo"
        width={120}
        height={120}
        priority
        className="w-fit justify-center flex text-center"
      />
    ),
    []
  );

  const memoizedLogoMobile = React.useMemo(
    () => (
      <Image
        src={logo}
        alt="logo"
        width={50}
        height={50}
        priority
        className="w-fit justify-center flex text-center"
      />
    ),
    []
  );

  const [isOpen, setIsOpen] = React.useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  if (isMobile) {
    return (
      <div className="flex justify-between fixed top-0 left-0 right-0 z-50 mb-20 bg-slate-50">
        {memoizedLogoMobile}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button>
              <Menu size={24} className="mr-4" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px]">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="p-4">
              {menuItems.navMain.map((item) => (
                <Link
                  key={item.url}
                  href={item.url}
                  className="flex items-center gap-4 p-2 rounded !text-black"
                  onClick={toggleSidebar}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="!text-black">{item.title}</span>
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    );
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <a
              href="#"
              className="w-full justify-center text-center mx-auto flex"
            >
              {memoizedLogo}
            </a>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {menuItems.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a
                    href={item.url}
                    className="font-bold line-clamp-[50px] py-6 pl-4"
                  >
                    <item.icon className="h-5 w-5" />
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {/* {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item?.title}>
                        <SidebarMenuSubButton asChild isActive={item?.isActive}>
                          <a href={item?.url}>{item?.title}</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null} */}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
