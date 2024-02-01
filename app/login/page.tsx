import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AuthButtonClient from "../auth-button-client";

export default async function Login() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="flex justify-between items-center p-4 border border-gray-800 border-t-0">
        <h1>Home</h1>
        <AuthButtonClient session={session} />
      </div>
    </div>
  );
}
