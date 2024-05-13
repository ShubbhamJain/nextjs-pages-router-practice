import Head from "next/head";

import { APIResponseType, Comments } from "@/utils/types";

import CommentsList from "@/components/Comments";
import CommentInput from "@/components/CommentInput";

export default function Upvote({ data }: { data: Comments[] }) {
  return (
    <>
      <Head>
        <title>Upvote & Post Comments</title>
      </Head>

      <p className="text-center text-3xl my-12 font-semibold">
        Upvote comments or Express yourself!
      </p>

      <CommentInput />

      <CommentsList comments={data} />
    </>
  );
}

export async function getServerSideProps() {
  try {
    const url = `${process.env.API_ROUTE}/api/comments`;

    const commentsData: APIResponseType<Comments[]> = await fetch(url).then(
      (res) => res.json()
    );

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
