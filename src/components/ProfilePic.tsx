export default function ProfilePic({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-center uppercase w-[30px] h-[30px] rounded-[50%] border-gray-400 border-2 bg-slate-400">
      {text}
    </div>
  );
}
