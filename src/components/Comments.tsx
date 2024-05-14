import Image from "next/image";

import { APIResponseType, Comments } from "@/utils/types";

import ProfilePic from "@/components/ProfilePic";

import LikeButton from "@/assets/likebutton.svg";
import { useRouter } from "next/router";
import { useState, useTransition } from "react";
import { useAuthContext } from "@/context/auth";

export default function CommentsList({ comments }: { comments: Comments[] }) {
  const router = useRouter();
  const { auth } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const refreshData = () => {
    router.replace(router.asPath, undefined, { scroll: false });
  };

  const upVoteComment = async (commentId: number, oldLikes: number) => {
    try {
      setIsLoading(true);
      const data = JSON.stringify({ commentId, newLikes: oldLikes + 1 });

      const url = `/api/comments/likeComment`;

      const res: APIResponseType<null> = await fetch(url, {
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      if (res.error) throw new Error(res.message);

      setIsLoading(false);

      startTransition(() => {
        refreshData();
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-7 mx-auto w-full sm:w-[50%] md:w-[40%] h-[400px]">
      {comments?.map((comment, key) => (
        <div key={key} className="w-full">
          <div className="flex justify-between mb-7 px-5">
            <div className="flex gap-10">
              <ProfilePic text={"sj"} />
              <p className="text-lg">{comment.content}</p>
            </div>

            <div className="flex items-center gap-5">
              <p>{comment.likes ?? 0}</p>
              {auth.isLoggedIn && (
                <button
                  disabled={isLoading || isPending}
                  onClick={() => upVoteComment(comment.id, comment.likes ?? 0)}
                >
                  <Image height={20} src={LikeButton} alt="like-button" />
                </button>
              )}
            </div>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
}
