import { useRouter } from "next/router";
import { APIResponseType } from "@/utils/types";
import { FormEvent, useRef, useState, useTransition } from "react";

import { useAuthContext } from "@/context/auth";

export default function CommentInput() {
  const router = useRouter();
  const {
    auth: { user },
  } = useAuthContext();

  const inputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const refreshData = () => {
    router.replace(router.asPath, undefined, { scroll: false });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      if (!inputRef.current?.value) return;

      setIsLoading(true);

      const data = JSON.stringify({
        userId: user?.id,
        newContent: inputRef.current?.value,
      });

      const url = `/api/comments/addComment`;

      const res: APIResponseType<null> = await fetch(url, {
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      if (res.error) throw new Error(res.message);

      setIsLoading(false);
      inputRef.current!.value = "";

      startTransition(() => {
        refreshData();
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 mx-auto items-center w-[100%] justify-center mb-14">
      <span className="bg-[#ECF2F7] p-3 rounded-xl sm:rounded-none sm:rounded-tl-xl sm:rounded-bl-xl text-sm">
        Say Something!
      </span>

      <form className="contents" onSubmit={(e) => handleSubmit(e)}>
        <input
          required
          ref={inputRef}
          disabled={isLoading || isPending}
          placeholder="I Wanna be an Engineer!"
          className="border-2 border-[#ECF2F7] px-3 w-[60%] sm:w-[30%] text-xl py-1.5 outline-none rounded-xl sm:rounded-none"
        />

        <button
          type="submit"
          disabled={isLoading || isPending}
          className="bg-[#ECF2F7] text-green-600 p-2 rounded-xl sm:rounded-none sm:rounded-tr-xl sm:rounded-br-xl font-bold text-lg w-[40%] sm:w-28 hover:scale-[108%] sm:hover:scale-[100%] transition-all"
        >
          Post
        </button>
      </form>
    </div>
  );
}
