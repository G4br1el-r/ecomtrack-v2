"use client";

import { LogOut, ShieldCheck, User } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/animate-ui/components/radix/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { ACCOUNT_HREF, ACCOUNT_SECURITY_HREF } from "@/constants/Modules/Core/Conta/account";
import { useLogout } from "@/hooks/Modules/Core/Auth/use-logout";
import { getInitials } from "@/lib/Modules/Core/Shell/get-initials";
import { useSessionStore } from "@/store/Modules/Core/Auth/session-store";

export function UserMenu() {
  const router = useRouter();
  const user = useSessionStore((state) => state.user);
  const { mutate: logout, isPending: loggingOut } = useLogout();
  const name = user ? `${user.firstName} ${user.lastName}`.trim() : "";

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" tooltip={name} className="hover:bg-sidebar-accent/50">
              <Avatar className="size-8 rounded-md">
                {user?.avatarUrl ? <AvatarImage src={user.avatarUrl} alt="" /> : null}
                <AvatarFallback className="rounded-md text-xs">{getInitials(name)}</AvatarFallback>
              </Avatar>
              <span className="flex min-w-0 flex-1 flex-col text-left leading-tight">
                <span className="truncate">{name}</span>
                {user?.profileName ? (
                  <span className="truncate text-muted-foreground text-xs">{user.profileName}</span>
                ) : null}
              </span>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" align="start" className="w-56">
            {user ? (
              <>
                <DropdownMenuLabel className="truncate font-normal text-muted-foreground">
                  {user.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
              </>
            ) : null}
            <DropdownMenuItem onSelect={() => router.push(ACCOUNT_HREF)}>
              <User aria-hidden="true" />
              Meu Perfil
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => router.push(ACCOUNT_SECURITY_HREF)}>
              <ShieldCheck aria-hidden="true" />
              Segurança
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" disabled={loggingOut} onSelect={() => logout()}>
              <LogOut aria-hidden="true" />
              {loggingOut ? "Saindo..." : "Sair"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
