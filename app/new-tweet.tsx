/* New Tweet component renders a form so the user can enter a new tweet.
 * The form is submitted to a server action, which writes this data to Supabase.
 * We create a server action Supabase client and call the getUser function
 * to fetch the currently signed in user.
 *
 * NB: Write a Row Level Security (RLS) policy
 * to enable insert action for authenticated users.
 */

import { User, createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";

export default function NewTweet({ user }: { user: User }) {
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
    <form className="p-4 border border-gray-800 border-t-0" action={addTweet}>
      <div className="flex gap-4">
        <div className="rounded-full bg-red-400 ">
          <Image
            src={user.user_metadata.avatar_url}
            alt={`user avatar`}
            width={48}
            height={48}
            className="rounded-full"
          />
        </div>
        <input
          name="title"
          className="bg-inherit flex-1 px-2"
          placeholder="What's up?"
        />
      </div>
    </form>
  );
}
