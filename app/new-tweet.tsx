/* New Tweet component renders a form so the user can enter a new tweet.
 * The form is submitted to a server action, which writes this data to Supabase.
 * We create a server action Supabase client and call the getUser function
 * to fetch the currently signed in user.
 *
 * NB: Write a Row Level Security (RLS) policy
 * to enable insert action for authenticated users.
 */

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default function NewTweet() {
  const addTweet = async (formData: FormData) => {
    "use server";
    console.log("submitted");
    const title = String(formData.get("title"));
    const supabase = createServerActionClient<Database>({ cookies });
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      await supabase.from("tweets").insert({ title, user_id: user.id });
    }
  };

  return (
    <form action={addTweet}>
      <input name="title" className="bg-inherit" />
    </form>
  );
}
