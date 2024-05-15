import Head from "next/head";

import { useAuthContext } from "@/context/auth";
import { APIResponseType, CommentsWithUserName } from "@/utils/types";

import CommentsList from "@/components/Comments";
import CommentInput from "@/components/CommentInput";

export default function Upvote({ data }: { data: CommentsWithUserName[] }) {
  const { auth } = useAuthContext();

  return (
    <>
      <Head>
        <title>Upvote & Post Comments</title>
      </Head>

      <p className="text-center text-3xl my-12 font-semibold">
        Upvote comments or Express yourself!
      </p>

      {auth.isLoggedIn && <CommentInput />}

      <CommentsList comments={data} />
    </>
  );
}

export async function getServerSideProps() {
  try {
    const url = `${process.env.API_ROUTE}/api/comments`;

    const commentsData: APIResponseType<CommentsWithUserName[]> = await fetch(
      url
    ).then((res) => res.json());

    if (commentsData.error) throw new Error(commentsData.message);

    return {
      props: { data: commentsData.data },
    };
  } catch (error) {
    console.log(error);
    return {
      props: { data: [] },
    };
  }
}
