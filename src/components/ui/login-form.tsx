"use client";

import { useActionState } from "react";

import { signin } from "@/app/lib/actions";
import { SubmitButton } from "@/components/ui/submit-button";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(signin, undefined);

  return (
    <form action={formAction} className="space-y-3" noValidate>
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl font-bold">
          Welcome back!! Please log in to continue.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
            </div>
            {state?.errors?.email && (
              <div className="flex gap-2 mt-2">
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                <p className="text-sm text-red-500">{state.errors.email}</p>
              </div>
            )}
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="pword"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="pword"
                type="password"
                name="pword"
                placeholder="Enter password"
                required
                minLength={6}
              />
            </div>
            {state?.errors?.pword && (
              <div className="flex gap-2 mt-2">
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                <p className="text-sm text-red-500">{state.errors.pword}</p>
              </div>
            )}
          </div>
        </div>
        <SubmitButton className="mt-4 w-full" pending={isPending}>
          Log in
        </SubmitButton>
        <div className="flex h-8 items-end space-x-1">
          {state?.errors?.general && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{state.errors.general}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}
