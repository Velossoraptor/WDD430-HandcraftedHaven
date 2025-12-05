import SignupForm from "@/components/ui/signup-form";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function SignupPage() {
  return (
    <main className="flex items-center justify-center md:h-screen mt-5 lg:mt-15">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4">
        <div className="flex h-20 w-full items-end rounded-lg bg-amber-500 p-3 md:h-16">
          <div className="w-32 text-white md:w-36">{/*<Logo />*/}</div>
        </div>
        <Suspense>
          <SignupForm />
        </Suspense>
      </div>
    </main>
  );
}
