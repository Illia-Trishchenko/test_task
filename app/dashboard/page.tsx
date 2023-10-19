import { Metadata } from "next";

import DashboardHeader from "./components/dashboard-header";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app using the components.",
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <DashboardHeader />
    </div>
  );
}
