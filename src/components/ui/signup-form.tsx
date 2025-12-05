"use client";

import { sansation } from "@/components/ui/fonts";
import {
  AtSymbolIcon,
  KeyIcon,
  UserIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { Check } from "lucide-react";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { useActionState } from "react";
import { signup } from "@/app/lib/actions";

export default function SignupForm() {
  const [state, formAction, isPending] = useActionState(signup, undefined);

  return (
    <form action={formAction} className="space-y-3" noValidate>
      {state?.success?.message && (
        <div className="text-sm rounded flex gap-2 text-green-200 bg-green-500 p-2 absolute right-2 lg:-right-100 top-4">
          <Check className="w-5 h-5" />
          {state.success.message}
        </div>
      )}
      <div className="relative rounded-lg bg-gray-50 px-6 pb-4 pt-12">
        <h1 className={`${sansation.className} mb-3 text-2xl`}>
          Welcome to our website, Please create your account
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="fname"
            >
              Firs Name
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="fname"
                type="text"
                name="fname"
                placeholder="Enter your first name"
                required
                disabled={isPending}
              />
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {state?.errors?.fname && (
              <div className="text-sm text-red-500 mt-1">
                {state.errors.fname.join(", ")}
              </div>
            )}
          </div>

          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="fname"
            >
              Last Name
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="lname"
                type="text"
                name="lname"
                placeholder="Enter your last name"
                required
                disabled={isPending}
              />
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {state?.errors?.lname && (
              <div className="text-sm text-red-500 mt-1">
                {state.errors.lname.join(", ")}
              </div>
            )}
          </div>

          <div className="mt-4">
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
                disabled={isPending}
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {state?.errors?.email && (
              <div className="text-sm text-red-500 mt-1">
                {state.errors.email.join(", ")}
              </div>
            )}
          </div>

          {/* Role Selection Field */}
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="account_type"
            >
              Account Type
            </label>
            <div className="relative">
              <select
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="account_type"
                name="account_type"
                required
                disabled={isPending}
              >
                <option value="">Select account type</option>
                <option value="customer">Customer</option>
                <option value="seller">Seller</option>
              </select>
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {state?.errors?.account_type && (
              <div className="text-sm text-red-500 mt-1">
                {state.errors.account_type.join(", ")}
              </div>
            )}
          </div>
        </div>

        <div className="mt-4">
          <label
            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
            htmlFor="password"
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
              minLength={8}
              disabled={isPending}
              autoComplete="new-password"
            />
            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
          {state?.errors?.pword && (
            <div className="text-sm text-red-500 mt-1">
              {state.errors.pword.join(", ")}
            </div>
          )}
        </div>

        <button
          type="submit"
          className={`mt-4 w-full flex h-10 items-center justify-center rounded-lg bg-amber-500 px-4 text-sm font-medium text-white transition-colors hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 active:bg-amber-600 ${
            isPending ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
          disabled={isPending}
        >
          {isPending ? (
            <div className="flex items-center">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              <span className="ml-2">Creating account...</span>
            </div>
          ) : (
            <div className="flex items-center w-full justify-center">
              Sign up
              <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
            </div>
          )}
        </button>

        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {state?.errors?.general && (
            <div className="flex gap-2 mt-2">
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{state.errors.general}</p>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
