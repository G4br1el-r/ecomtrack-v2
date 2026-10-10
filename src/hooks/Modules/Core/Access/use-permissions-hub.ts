"use client";

import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import { PERMISSIONS_CHANGED_EVENT, PERMISSIONS_QUERY_KEY } from "@/constants/Modules/Core/Access/access";
import { ME_QUERY_KEY } from "@/constants/Modules/Core/Conta/account";
import { permissionsChangedSchema } from "@/schemas/Modules/Core/Access/permissions-changed-schema";
import { useViewAsStore } from "@/store/Modules/Core/Access/view-as-store";
import { useSessionStore } from "@/store/Modules/Core/Auth/session-store";

export function usePermissionsHub(hubUrl: string | null) {
  const queryClient = useQueryClient();
  const sessionToken = useSessionStore((state) => state.accessToken);
  const viewAsToken = useViewAsStore((state) => state.session?.token ?? null);
  const token = viewAsToken ?? sessionToken;

  useEffect(() => {
    if (!hubUrl || !token) return;
    const connection = new HubConnectionBuilder()
      .withUrl(hubUrl, {
        accessTokenFactory: () =>
          useViewAsStore.getState().session?.token ?? useSessionStore.getState().accessToken ?? "",
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.None)
      .build();

    connection.on(PERMISSIONS_CHANGED_EVENT, (payload: unknown) => {
      if (!permissionsChangedSchema.safeParse(payload).success) return;
      queryClient.invalidateQueries({ queryKey: PERMISSIONS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ME_QUERY_KEY });
    });
    connection.start().catch(() => undefined);

    return () => {
      connection.stop().catch(() => undefined);
    };
  }, [hubUrl, token, queryClient]);
}
