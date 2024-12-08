import React, { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import MobileNavigation from "@/components/MobileNavigation";
import Header from "@/components/Header";
import { fetchCurrentUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const Layout = async ({ children }: { children: ReactNode }) => {
  let currentUser = null;
  try {
    currentUser = await fetchCurrentUser();
  } catch {
    redirect("/sign-in");
  }

  return (
    <main className="flex h-screen">
      <Sidebar {...currentUser} />
      <section className="flex h-full flex-1 flex-col">
        <MobileNavigation {...currentUser} />
        <Header {...currentUser} />
        <div className="main-content">{children}</div>
      </section>
    </main>
  );
};

export default Layout;
