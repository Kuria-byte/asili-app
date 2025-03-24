"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

interface LoginFormProps {
  onComplete: () => void
  onForgotPassword: () => void
  onSignUp: () => void
}

export function LoginForm({ onComplete, onForgotPassword, onSignUp }: LoginFormProps) {
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email")
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onComplete()
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="rounded-xl bg-white dark:bg-card shadow-lg overflow-hidden">
      <div className="bg-amber-50 dark:bg-amber-900/20 p-6">
        <h2 className="text-xl font-serif font-bold text-amber-950 dark:text-amber-100 mb-2 text-center">
          Welcome Back
        </h2>
        <p className="text-amber-700 dark:text-amber-300 text-center">
          Log in to continue your language learning journey
        </p>
      </div>

      <div className="p-6 space-y-6">
        <Tabs defaultValue="email" onValueChange={(value) => setLoginMethod(value as "email" | "phone")}>
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

          <TabsContent value="email">
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
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

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password-email">Password</Label>
                  <button
                    type="button"
                    onClick={onForgotPassword}
                    className="text-xs text-amber-600 dark:text-amber-400 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Input
                    id="password-email"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-700 dark:text-amber-300"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember-me-email"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-amber-300 text-amber-600 focus:ring-amber-500"
                />
                <Label htmlFor="remember-me-email" className="text-sm font-normal">
                  Remember me
                </Label>
              </div>

              <Button type="submit" className="w-full">
                Log In
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="phone">
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
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

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password-phone">Password</Label>
                  <button
                    type="button"
                    onClick={onForgotPassword}
                    className="text-xs text-amber-600 dark:text-amber-400 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Input
                    id="password-phone"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-700 dark:text-amber-300"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember-me-phone"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-amber-300 text-amber-600 focus:ring-amber-500"
                />
                <Label htmlFor="remember-me-phone" className="text-sm font-normal">
                  Remember me
                </Label>
              </div>

              <Button type="submit" className="w-full">
                Log In
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-amber-200 dark:border-amber-800"></div>
          <span className="mx-4 flex-shrink text-xs text-amber-600 dark:text-amber-400">or log in with</span>
          <div className="flex-grow border-t border-amber-200 dark:border-amber-800"></div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Button variant="outline" className="flex items-center justify-center">
            <Image src="/google-logo.svg" alt="Google" width={24} height={24} />
          </Button>

          <Button variant="outline" className="flex items-center justify-center">
            <Image src="/apple-logo.svg" alt="Apple" width={24} height={24} />
          </Button>

          <Button variant="outline" className="flex items-center justify-center">
            <Image src="/facebook-logo.svg" alt="Facebook" width={24} height={24} />
          </Button>
        </div>

        <div className="text-center">
          <p className="text-sm text-amber-700 dark:text-amber-300">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={onSignUp}
              className="font-medium text-amber-600 dark:text-amber-400 hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

