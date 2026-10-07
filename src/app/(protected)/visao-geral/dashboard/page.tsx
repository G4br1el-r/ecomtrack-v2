import type { Metadata } from "next";

import { PageHeader } from "@/components/Modules/Core/DesignSystem/page-header";
import { StaggerReveal } from "@/components/Modules/Core/DesignSystem/stagger-reveal";
import { StaggerRevealItem } from "@/components/Modules/Core/DesignSystem/stagger-reveal-item";

import { ChannelsCard } from "./components/channels-card";
import { CustomersCard } from "./components/customers-card";
import { DashboardToolbar } from "./components/dashboard-toolbar";
import { GoalCard } from "./components/goal-card";
import { HeroCard } from "./components/hero-card";
import { HourlyHeatmapCard } from "./components/hourly-heatmap-card";
import { MetricTiles } from "./components/metric-tiles";
import { OrderStatusCard } from "./components/order-status-card";
import { StatesCard } from "./components/states-card";
import { TopProductsCard } from "./components/top-products-card";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Visão geral do desempenho da empresa.",
};

export default function DashboardPage() {
  return (
    <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-6 p-4 md:p-6 lg:p-8">
      <PageHeader
        title="Dashboard"
        description="Visão geral do desempenho da empresa."
        actions={<DashboardToolbar />}
      />
      <StaggerReveal className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <StaggerRevealItem className="min-w-0 lg:col-span-8">
          <HeroCard />
        </StaggerRevealItem>
        <StaggerRevealItem className="min-w-0 lg:col-span-4">
          <GoalCard />
        </StaggerRevealItem>
        <StaggerRevealItem className="min-w-0 lg:col-span-12">
          <MetricTiles />
        </StaggerRevealItem>
        <StaggerRevealItem className="min-w-0 lg:col-span-7">
          <CustomersCard />
        </StaggerRevealItem>
        <StaggerRevealItem className="min-w-0 lg:col-span-5">
          <ChannelsCard />
        </StaggerRevealItem>
        <StaggerRevealItem className="min-w-0 lg:col-span-7">
          <HourlyHeatmapCard />
        </StaggerRevealItem>
        <StaggerRevealItem className="min-w-0 lg:col-span-5">
          <OrderStatusCard />
        </StaggerRevealItem>
        <StaggerRevealItem className="min-w-0 lg:col-span-12">
          <StatesCard />
        </StaggerRevealItem>
        <StaggerRevealItem className="min-w-0 lg:col-span-12">
          <TopProductsCard />
        </StaggerRevealItem>
      </StaggerReveal>
    </div>
  );
}
