import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Home, Users, ListCollapse, Settings, LogOut, Clock } from "lucide-react"
import Link from "next/link"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarContent>
            <SidebarHeader>
              <div className="flex items-center gap-2">
                 <Clock className="w-8 h-8 text-primary" />
                 <h1 className="text-2xl font-headline font-semibold">FenceTime</h1>
              </div>
            </SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton href="/admin" asChild>
                  <Link href="/admin">
                    <Home />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="/admin/employees" asChild>
                  <Link href="/admin/employees">
                    <Users />
                    <span>Employees</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="/admin/logs" asChild>
                  <Link href="/admin/logs">
                    <ListCollapse />
                    <span>Time Logs</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="/admin/settings" asChild>
                   <Link href="/admin/settings">
                    <Settings />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
             <SidebarMenu>
               <SidebarMenuItem>
                 <SidebarMenuButton href="/login" asChild>
                   <Link href="/login">
                    <LogOut />
                    <span>Logout</span>
                   </Link>
                 </SidebarMenuButton>
               </SidebarMenuItem>
             </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="flex items-center justify-between p-4 border-b">
            <SidebarTrigger />
            <div className="flex items-center gap-4">
              <span className="font-semibold">Admin User</span>
              <Avatar>
                <AvatarImage src="https://placehold.co/100x100.png" alt="Admin" data-ai-hint="person" />
                <AvatarFallback>AU</AvatarFallback>
              </Avatar>
            </div>
          </header>
          <main className="p-4 sm:p-6 lg:p-8 bg-muted/40 flex-1">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
