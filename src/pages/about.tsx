import Head from "next/head";

type AboutData = {
  createdAt: string;
  text: string;
  id: number;
};

// this component is rendered statically using Static Site Generation(SSG).
export default function About({ data }: { data: AboutData[] }) {
  if (!data) return;

  return (
    <>
      <Head>
        <title>About UpVoteMe</title>
      </Head>

      <p className="text-center text-5xl my-12">About UpVoteMe</p>

      <div className="flex flex-col items-center gap-10">
        {data?.map((item) => {
          return (
            <p key={item.id} className="max-w-4xl text-center">
              {item.text}
            </p>
          );
        })}
      </div>
    </>
  );
}

export async function getStaticProps() {
  try {
    const url = `${process.env.API_ROUTE}/api/about`;
    const aboutData = await fetch(url).then((res) => res.json());

    return {
      props: { data: aboutData },
      revalidate: 10, // In seconds
    };
  } catch (error) {
    console.log(error);
    return {
      props: { data: [] },
      revalidate: 10, // In seconds
    };
  }
}
