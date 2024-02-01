"use client";

import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function AuthButtonClient({
  session,
}: {
  session: Session | null;
}) {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return session ? (
    <button
      className="rounded-full py-2 px-4 border border-sky-400 text-xs text-sky-400"
      onClick={handleSignOut}
    >
      Logout
    </button>
  ) : (
    <button
      className="rounded-full py-2 px-4 border border-sky-400  bg-sky-400 text-xs text-white"
      onClick={handleSignIn}
    >
      Login
    </button>
  );
}
