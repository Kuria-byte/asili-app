"use client"

import { useState } from "react"
import { ArrowLeft, Mail, Phone, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ForgotPasswordFormProps {
  onComplete: () => void
  onBack: () => void
}

export function ForgotPasswordForm({ onComplete, onBack }: ForgotPasswordFormProps) {
  const [resetMethod, setResetMethod] = useState<"email" | "phone">("email")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [step, setStep] = useState<"request" | "verification" | "reset">("request")
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""])
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleRequestReset = () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setStep("verification")
    }, 1000)
  }

  const handleVerifyCode = () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setStep("reset")
    }, 1000)
  }

  const handleResetPassword = () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      // Redirect to login after success
      setTimeout(() => {
        onComplete()
      }, 2000)
    }, 1000)
  }

  const handleCodeChange = (index: number, value: string) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return

    const newCode = [...verificationCode]
    newCode[index] = value
    setVerificationCode(newCode)
  }

  const isRequestValid = resetMethod === "email" ? !!email : !!phone
  const isVerificationValid = verificationCode.every((digit) => digit)
  const isResetValid = newPassword && confirmPassword && newPassword === confirmPassword

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
          <h2 className="text-xl font-serif font-bold text-amber-950 dark:text-amber-100">Reset Password</h2>
        </div>
        <p className="text-amber-700 dark:text-amber-300">
          {step === "request" && "We'll send you a code to reset your password"}
          {step === "verification" && "Enter the verification code we sent you"}
          {step === "reset" && "Create a new password for your account"}
        </p>
      </div>

      <div className="p-6 space-y-6">
        {step === "request" && (
          <>
            <Tabs defaultValue="email" onValueChange={(value) => setResetMethod(value as "email" | "phone")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>Email</span>
                </TabsTrigger>
                <TabsTrigger value="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>Phone</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="email" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </TabsContent>

              <TabsContent value="phone" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+254 7XX XXX XXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </TabsContent>
            </Tabs>

            <Button className="w-full" onClick={handleRequestReset} disabled={!isRequestValid || isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Reset Code"}
            </Button>
          </>
        )}

        {step === "verification" && (
          <>
            <div className="space-y-4">
              <div className="text-center text-sm text-amber-700 dark:text-amber-300">
                Enter the 6-digit verification code sent to your {resetMethod}
              </div>

              <div className="flex justify-center gap-2">
                {verificationCode.map((digit, index) => (
                  <Input
                    key={index}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    className="h-12 w-12 text-center text-lg"
                  />
                ))}
              </div>

              <div className="text-center">
                <button className="text-xs text-amber-600 dark:text-amber-400 hover:underline">Resend code</button>
              </div>
            </div>

            <Button className="w-full" onClick={handleVerifyCode} disabled={!isVerificationValid || isSubmitting}>
              {isSubmitting ? "Verifying..." : "Verify Code"}
            </Button>
          </>
        )}

        {step === "reset" && (
          <>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                {confirmPassword && newPassword !== confirmPassword && (
                  <p className="text-xs text-red-500">Passwords do not match</p>
                )}
              </div>
            </div>

            {isSuccess ? (
              <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-4 text-center">
                <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-800">
                  <Check className="h-6 w-6 text-green-600 dark:text-green-300" />
                </div>
                <h3 className="text-lg font-medium text-green-800 dark:text-green-300">Password Reset Successful</h3>
                <p className="text-sm text-green-600 dark:text-green-400">
                  Your password has been reset successfully. Redirecting to login...
                </p>
              </div>
            ) : (
              <Button className="w-full" onClick={handleResetPassword} disabled={!isResetValid || isSubmitting}>
                {isSubmitting ? "Resetting..." : "Reset Password"}
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  )
}

