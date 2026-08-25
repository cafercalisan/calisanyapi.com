import { AdminLogin } from "@/components/AdminLogin";
import { AdminPanel } from "@/components/AdminPanel";
import { verifyAdmin } from "@/lib/admin";
import { getCatalog, listQuotes, listServiceRequests } from "@/lib/data";
export const dynamic="force-dynamic";
export default async function ManagementPage(){if(!(await verifyAdmin()))return <AdminLogin/>;const [quotes,requests,catalog]=await Promise.all([listQuotes(),listServiceRequests(),getCatalog()]);return <AdminPanel initialQuotes={quotes as never[]} initialRequests={requests as never[]} catalog={catalog}/>}
