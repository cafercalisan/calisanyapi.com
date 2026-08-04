import { AdminLogin } from "@/components/AdminLogin";
import { AdminPanel } from "@/components/AdminPanel";
import { verifyAdmin } from "@/lib/admin";
import { getCatalog, listQuotes } from "@/lib/data";
export const dynamic="force-dynamic";
export default async function ManagementPage(){if(!(await verifyAdmin()))return <AdminLogin/>;const [quotes,catalog]=await Promise.all([listQuotes(),getCatalog()]);return <AdminPanel initialQuotes={quotes as never[]} catalog={catalog}/>}
