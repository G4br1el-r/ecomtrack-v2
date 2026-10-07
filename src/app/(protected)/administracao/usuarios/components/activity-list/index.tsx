"use client";

import { useState } from "react";

import { EmptyState } from "@/components/Modules/Core/DesignSystem/empty-state";
import { ErrorState } from "@/components/Modules/Core/DesignSystem/error-state";
import { PaginationBar } from "@/components/Modules/Core/DesignSystem/pagination-bar";
import { Timeline } from "@/components/Modules/Core/DesignSystem/timeline";
import { Skeleton } from "@/components/ui/skeleton";
import { ACTIVITY_PAGE_SIZE } from "@/constants/Modules/Administracao/Usuarios/users";
import { API_FIRST_PAGE } from "@/constants/Modules/Core/Api/http";
import { useUserActivity } from "@/hooks/Modules/Administracao/Usuarios/use-user-activity";
import { getPeriodStart } from "@/lib/Modules/Administracao/Usuarios/get-period-start";
import { groupActivityByDay } from "@/lib/Modules/Administracao/Usuarios/group-activity-by-day";

export function ActivityList({ userId, days }: { userId: string; days: number | null }) {
  const [page, setPage] = useState(API_FIRST_PAGE);
  const [from] = useState(() => getPeriodStart(days, new Date()));
  const { data, isPending, isError, refetch } = useUserActivity(userId, {
    Page: page,
    PageSize: ACTIVITY_PAGE_SIZE,
    Search: "",
    From: from,
  });

  if (isPending) {
    return (
      <div className="space-y-3" role="status" aria-label="Carregando atividades">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-3/4" />
      </div>
    );
  }

  if (isError) return <ErrorState onRetry={() => refetch()} className="min-h-0" />;

  if (data.items.length === 0) {
    return <EmptyState className="min-h-0 py-6" title="Nenhuma atividade no período" />;
  }

  return (
    <div className="space-y-5">
      {groupActivityByDay(data.items, new Date()).map((day) => (
        <section key={day.label} aria-label={day.label} className="space-y-2">
          <h4 className="font-medium text-muted-foreground text-xs">{day.label}</h4>
          <Timeline events={day.events} />
        </section>
      ))}
      {data.totalPages > 1 ? (
        <PaginationBar
          currentPage={data.page}
          totalPages={data.totalPages}
          totalItems={data.totalCount}
          itemsPerPage={data.pageSize}
          onPageChange={setPage}
        />
      ) : null}
    </div>
  );
}
