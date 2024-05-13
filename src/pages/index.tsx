import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`${inter.className} h-screen flex items-center justify-center -mt-24`}
    >
      <p className="text-4xl sm:text-6xl mr-5">Welcome to</p>
      <p className="text-4xl sm:text-6xl text-orange-400">UpVoteMe!</p>
    </main>
  );
}
