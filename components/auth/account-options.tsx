"use client"
import { ArrowLeft, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

type AuthMethod = "email" | "phone" | "google" | "apple" | "facebook"

interface AccountOptionsProps {
  onSelectMethod: (method: AuthMethod) => void
  onBack: () => void
}

export function AccountOptions({ onSelectMethod, onBack }: AccountOptionsProps) {
  return (
    <div className="rounded-xl bg-white dark:bg-card shadow-lg overflow-hidden">
      <div className="bg-amber-50 dark:bg-amber-900/20 p-6">
        <div className="flex items-center mb-4">
          <button
            onClick={onBack}
            className="mr-2 rounded-full p-2 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-800/50"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h2 className="text-xl font-serif font-bold text-amber-950 dark:text-amber-100">Create an Account</h2>
        </div>
        <p className="text-amber-700 dark:text-amber-300">
          Choose how you'd like to sign up to track your progress and join the community.
        </p>
      </div>

      <div className="p-6 space-y-4">
        <Button
          variant="outline"
          className="w-full flex items-center justify-start gap-3"
          onClick={() => onSelectMethod("email")}
        >
          <Mail className="h-5 w-5 text-amber-700 dark:text-amber-300" />
          <span>Continue with Email</span>
        </Button>

        <Button
          variant="outline"
          className="w-full flex items-center justify-start gap-3"
          onClick={() => onSelectMethod("phone")}
        >
          <Phone className="h-5 w-5 text-amber-700 dark:text-amber-300" />
          <span>Continue with Phone</span>
        </Button>

        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-amber-200 dark:border-amber-800"></div>
          <span className="mx-4 flex-shrink text-xs text-amber-600 dark:text-amber-400">or continue with</span>
          <div className="flex-grow border-t border-amber-200 dark:border-amber-800"></div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Button
            variant="outline"
            className="flex items-center justify-center"
            onClick={() => onSelectMethod("google")}
          >
            <Image src="/google-logo.svg" alt="Google" width={24} height={24} />
          </Button>

          <Button
            variant="outline"
            className="flex items-center justify-center"
            onClick={() => onSelectMethod("apple")}
          >
            <Image src="/apple-logo.svg" alt="Apple" width={24} height={24} />
          </Button>

          <Button
            variant="outline"
            className="flex items-center justify-center"
            onClick={() => onSelectMethod("facebook")}
          >
            <Image src="/facebook-logo.svg" alt="Facebook" width={24} height={24} />
          </Button>
        </div>

        <div className="mt-4 text-center text-xs text-amber-700 dark:text-amber-300">
          <p>
            By signing up, you agree to our{" "}
            <a href="#" className="text-amber-600 dark:text-amber-400 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-amber-600 dark:text-amber-400 hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

