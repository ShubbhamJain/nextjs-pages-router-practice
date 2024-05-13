import Image from "next/image";
import { FormEvent, useRef, useState } from "react";

import Close from "@/assets/close.svg";

export default function SignUp() {
  const emailRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);

  const [userHasAccount, setUserHasAccount] = useState(false);

  const handleDialogOpen = () => {
    if (dialogRef.current?.open) {
      dialogRef.current?.close();
    } else {
      dialogRef.current?.showModal();
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userHasAccount) {
      console.log(emailRef.current?.value);
      console.log(passwordRef.current?.value);
    } else {
      console.log(userNameRef.current?.value);
      console.log(emailRef.current?.value);
      console.log(passwordRef.current?.value);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleDialogOpen}
        className="bg-black text-white rounded-lg p-2 px-4 hover:scale-[105%] transition-all"
      >
        Sign Up
      </button>

      <dialog
        role="dialog"
        ref={dialogRef}
        className="border-slate-500 border-[0.75px] w-fit md:w-[60%] lg:w-[40%] h-fit rounded-xl p-3"
      >
        <button
          formMethod="dialog"
          className="flex ml-auto"
          onClick={handleDialogOpen}
        >
          <Image className="size-8" src={Close} alt="Close" />
        </button>

        <div className="mt-8">
          <form className="contents" onSubmit={(e) => handleSubmit(e)}>
            <div className="px-12 flex flex-col gap-6">
              {!userHasAccount && (
                <input
                  required
                  type="text"
                  ref={userNameRef}
                  className="border-2 border-black px-3 py-1.5 w-full text-lg outline-none rounded-md"
                  placeholder="User Name"
                />
              )}
              <input
                required
                type="email"
                ref={emailRef}
                className="border-2 border-black px-3 py-1.5 w-full text-lg outline-none rounded-md"
                placeholder="Email"
              />
              <input
                required
                type="password"
                ref={passwordRef}
                className="border-2 border-black px-3 py-1.5 w-full text-lg outline-none rounded-md"
                placeholder="Password"
              />
            </div>

            <div className="flex justify-center mt-8">
              {userHasAccount ? (
                <button
                  type="submit"
                  className="bg-[#2a2a2a] text-white w-[50%] p-2 rounded-lg font-bold text-lg hover:scale-[102%] transition-all"
                >
                  Log in
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-[#2a2a2a] text-white w-[50%] p-2 rounded-lg font-bold text-lg hover:scale-[102%] transition-all"
                >
                  Create Account
                </button>
              )}
            </div>
          </form>

          <div className="text-center mt-8 flex flex-col  gap-4 mb-4">
            {!userHasAccount && (
              <p className="text-[#818181] text-sm">
                By clicking {'"'}Create account{'"'}, you agree to the TOS and
                Privacy Policy.
              </p>
            )}

            <span className="flex flex-col sm:flex-row gap-2 justify-center">
              {userHasAccount ? (
                <>
                  <p className="text-[#818181] text-md">No account?</p>
                  <button
                    className="text-blue-500 text-md"
                    onClick={() => setUserHasAccount(false)}
                  >
                    Create One
                  </button>
                </>
              ) : (
                <>
                  <p className="text-[#818181] text-md">
                    Already have an account?
                  </p>
                  <button
                    className="text-blue-500 text-md"
                    onClick={() => setUserHasAccount(true)}
                  >
                    Log in
                  </button>
                </>
              )}
            </span>
          </div>
        </div>
      </dialog>
    </>
  );
}
