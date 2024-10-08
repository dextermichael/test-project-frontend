import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Siderbar from "../../components/shared/Sidebar";
import { getLoggedInUser } from "@/lib/server-function/user";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const getLoggedInUserDetail : any = await getLoggedInUser();
  return (
    <div className="text-foreground bg-background">
      <div className="min-h-[100vh]">
       
        <Siderbar session={session} userDetail={getLoggedInUserDetail.data?.user} />
        <div className="lg:pl-72">
          <main className="py-8 ">
            <div className="px-4 sm:px-6 lg:px-8"> {children} </div>
          </main>
        </div>
      </div>
    </div>
  );
}
