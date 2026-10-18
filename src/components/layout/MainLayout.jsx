import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { ScrollArea } from "../ui/scroll-area";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function MainLayout() {
  const token = useSelector((state) => state.token.token);
  const currentUser = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !currentUser || !currentUser?.email) {
      navigate("/auth/login");
    }
  }, [currentUser, token, navigate]);

  if (!token || !currentUser || !currentUser?.email) {
    return null;
  }

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 border-b shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 sticky top-0 bg-background z-50">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Build Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4">
          <ScrollArea className={"h-[88vh]  p-4"}>
            <Outlet />
          </ScrollArea>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
