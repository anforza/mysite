import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { AdminDashboard } from "@/components/AdminDashboard";

export default async function AdminDashboardPage() {
  const user = await getSessionUser();
  if (!user) redirect("/admin/login");
  return (
    <div className="container-page py-8">
      <AdminDashboard />
    </div>
  );
}
