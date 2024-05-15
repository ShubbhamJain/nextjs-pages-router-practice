import Head from "next/head";
import { useEffect, useState } from "react";

import { useAuthContext } from "@/context/auth";
import { APIResponseType, CommentsWithUserName, User } from "@/utils/types";

import ProfilePic from "@/components/ProfilePic";

function UserComments({ user }: { user: User }) {
  const [comments, setComments] = useState<CommentsWithUserName[]>([]);

  const fetchComments = async () => {
    if (!user) return;

    const res: APIResponseType<CommentsWithUserName[] | null> = await fetch(
      "/api/user/userComments",
      {
        method: "POST",
        body: JSON.stringify({ userId: user?.id }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.json());

    if (!res || res.error) return;

    setComments(res.data!);
  };

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-7 mx-auto w-full sm:w-[50%] md:w-[95%] h-[400px]">
      {comments?.map((comment, key) => (
        <div key={key} className="w-full">
          <div className="flex justify-between mb-3 px-5">
            <div className="flex gap-6">
              <ProfilePic text={comment?.userName?.charAt(0)} />
              <p className="text-lg">{comment.content}</p>
            </div>

            <div className="flex items-center gap-5">
              <p>{comment.likes ?? 0}</p>
            </div>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default function Page() {
  const {
    auth: { isLoggedIn, user },
  } = useAuthContext();

  if (!isLoggedIn || !user)
    return (
      <div className="text-center">
        <p className="text-5xl">404</p>
      </div>
    );

  return (
    <>
      <Head>
        <title>{user?.userName} Dashboard</title>
      </Head>

      <main className="flex justify-center">
        <div className="flex h-full w-full flex-col md:max-w-2xl">
          <div className="mb-14">
            <p className="text-3xl mb-3 font-bold">{user?.userName}</p>
            <p className="text-xl">{user?.email}</p>
          </div>

          <UserComments user={user} />
        </div>
      </main>
    </>
  );
}
