"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { ArrowLeft, Mail, Phone, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type AuthMethod = "email" | "phone" | "google" | "apple" | "facebook"

interface VerificationScreenProps {
  method: AuthMethod
  contact: string
  onComplete: () => void
  onResend: () => void
  onBack: () => void
}

export function VerificationScreen({ method, contact, onComplete, onResend, onBack }: VerificationScreenProps) {
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""])
  const [timeLeft, setTimeLeft] = useState(60)
  const [isResending, setIsResending] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleCodeChange = (index: number, value: string) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return

    const newCode = [...verificationCode]
    newCode[index] = value
    setVerificationCode(newCode)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text")
    const digits = pastedData.replace(/\D/g, "").split("").slice(0, 6)

    const newCode = [...verificationCode]
    digits.forEach((digit, index) => {
      if (index < 6) {
        newCode[index] = digit
      }
    })

    setVerificationCode(newCode)

    // Focus the next empty input or the last input
    const nextEmptyIndex = newCode.findIndex((digit) => !digit)
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus()
    } else if (digits.length > 0) {
      inputRefs.current[5]?.focus()
    }
  }

  const handleResend = () => {
    setIsResending(true)
    onResend()
    setTimeLeft(60)

    // Simulate API call
    setTimeout(() => {
      setIsResending(false)
    }, 1000)
  }

  const isCodeComplete = verificationCode.every((digit) => digit)

  const formatContact = () => {
    if (method === "email") {
      // Partially mask email
      const [username, domain] = contact.split("@")
      if (!username || !domain) return contact

      const maskedUsername =
        username.length > 3 ? `${username.slice(0, 3)}${"*".repeat(username.length - 3)}` : username

      return `${maskedUsername}@${domain}`
    } else if (method === "phone") {
      // Partially mask phone number
      return contact.replace(/(\d{3})\d{3}(\d{3})/, "$1***$2")
    }

    return contact
  }

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
          <h2 className="text-xl font-serif font-bold text-amber-950 dark:text-amber-100">Verification</h2>
        </div>
        <p className="text-amber-700 dark:text-amber-300">
          {method === "email" ? (
            <>We've sent a verification code to your email</>
          ) : method === "phone" ? (
            <>We've sent a verification code via SMS</>
          ) : (
            <>Please verify your account</>
          )}
        </p>
      </div>

      <div className="p-6 space-y-6">
        <div className="flex items-center justify-center gap-2 text-sm text-amber-700 dark:text-amber-300">
          {method === "email" ? <Mail className="h-5 w-5" /> : <Phone className="h-5 w-5" />}
          <span>{formatContact()}</span>
        </div>

        <div className="space-y-2">
          <div className="text-center text-sm text-amber-700 dark:text-amber-300">
            Enter the 6-digit verification code
          </div>

          <div className="flex justify-center gap-2">
            {verificationCode.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="h-12 w-12 text-center text-lg"
              />
            ))}
          </div>

          <div className="text-center">
            {timeLeft > 0 ? (
              <p className="text-xs text-amber-600 dark:text-amber-400">Resend code in {timeLeft} seconds</p>
            ) : (
              <button
                onClick={handleResend}
                disabled={isResending}
                className="flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400 hover:underline"
              >
                <RefreshCw className={`h-3 w-3 ${isResending ? "animate-spin" : ""}`} />
                <span>Resend code</span>
              </button>
            )}
          </div>
        </div>

        <Button className="w-full" onClick={onComplete} disabled={!isCodeComplete}>
          Verify
        </Button>

        <div className="text-center text-xs text-amber-700 dark:text-amber-300">
          <p>
            Didn't receive the code? Check your spam folder or{" "}
            <button onClick={handleResend} className="text-amber-600 dark:text-amber-400 hover:underline">
              try another method
            </button>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

