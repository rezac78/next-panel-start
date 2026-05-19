import { redirect } from "next/navigation";

// This page is being moved to editor/theme
export default function DashboardRedirect() {
  redirect("/auth");
}
