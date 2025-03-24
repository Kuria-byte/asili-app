"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Eye, EyeOff, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SignUpFormProps {
  userData: {
    email: string
    password: string
    name: string
    region: string
  }
  onUpdateData: (data: Partial<SignUpFormProps["userData"]>) => void
  onComplete: () => void
  onBack: () => void
}

export function SignUpForm({ userData, onUpdateData, onComplete, onBack }: SignUpFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  const regions = [
    { id: "central", name: "Central Kenya" },
    { id: "coast", name: "Coastal Kenya" },
    { id: "eastern", name: "Eastern Kenya" },
    { id: "nairobi", name: "Nairobi" },
    { id: "northeastern", name: "Northeastern Kenya" },
    { id: "nyanza", name: "Nyanza" },
    { id: "rift", name: "Rift Valley" },
    { id: "western", name: "Western Kenya" },
    { id: "diaspora", name: "Kenyan Diaspora" },
    { id: "other", name: "Other" },
  ]

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateData({ email: e.target.value })
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value
    onUpdateData({ password })

    // Simple password strength calculation
    let strength = 0
    if (password.length >= 8) strength += 1
    if (/[A-Z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1

    setPasswordStrength(strength)
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateData({ name: e.target.value })
  }

  const handleRegionChange = (value: string) => {
    onUpdateData({ region: value })
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return "Very Weak"
    if (passwordStrength === 1) return "Weak"
    if (passwordStrength === 2) return "Medium"
    if (passwordStrength === 3) return "Strong"
    return "Very Strong"
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return "bg-red-500"
    if (passwordStrength === 1) return "bg-orange-500"
    if (passwordStrength === 2) return "bg-yellow-500"
    if (passwordStrength === 3) return "bg-green-500"
    return "bg-green-600"
  }

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)
  const isPasswordValid = userData.password.length >= 8
  const isFormValid = isEmailValid && isPasswordValid && userData.name

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
          <h2 className="text-xl font-serif font-bold text-amber-950 dark:text-amber-100">Create Your Account</h2>
        </div>
        <p className="text-amber-700 dark:text-amber-300">
          Enter your details to create an account and start your language journey.
        </p>
      </div>

      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={userData.email}
              onChange={handleEmailChange}
              className="pr-10"
            />
            {userData.email && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {isEmailValid ? <Check className="h-5 w-5 text-green-500" /> : <X className="h-5 w-5 text-red-500" />}
              </div>
            )}
          </div>
          {userData.email && !isEmailValid && (
            <p className="text-xs text-red-500">Please enter a valid email address</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a secure password"
              value={userData.password}
              onChange={handlePasswordChange}
              className="pr-10"
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

          {userData.password && (
            <>
              <div className="flex items-center gap-2">
                <div className="h-2 flex-1 rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    className={`h-full rounded-full transition-all ${getPasswordStrengthColor()}`}
                    style={{ width: `${(passwordStrength / 4) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-amber-700 dark:text-amber-300">{getPasswordStrengthText()}</span>
              </div>

              <ul className="space-y-1 text-xs">
                <li className="flex items-center gap-1">
                  <span
                    className={userData.password.length >= 8 ? "text-green-500" : "text-amber-700 dark:text-amber-300"}
                  >
                    {userData.password.length >= 8 ? <Check className="h-3 w-3" /> : "•"}
                  </span>
                  <span>At least 8 characters</span>
                </li>
                <li className="flex items-center gap-1">
                  <span
                    className={
                      /[A-Z]/.test(userData.password) ? "text-green-500" : "text-amber-700 dark:text-amber-300"
                    }
                  >
                    {/[A-Z]/.test(userData.password) ? <Check className="h-3 w-3" /> : "•"}
                  </span>
                  <span>At least one uppercase letter</span>
                </li>
                <li className="flex items-center gap-1">
                  <span
                    className={
                      /[0-9]/.test(userData.password) ? "text-green-500" : "text-amber-700 dark:text-amber-300"
                    }
                  >
                    {/[0-9]/.test(userData.password) ? <Check className="h-3 w-3" /> : "•"}
                  </span>
                  <span>At least one number</span>
                </li>
                <li className="flex items-center gap-1">
                  <span
                    className={
                      /[^A-Za-z0-9]/.test(userData.password) ? "text-green-500" : "text-amber-700 dark:text-amber-300"
                    }
                  >
                    {/[^A-Za-z0-9]/.test(userData.password) ? <Check className="h-3 w-3" /> : "•"}
                  </span>
                  <span>At least one special character</span>
                </li>
              </ul>
            </>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" type="text" placeholder="Your name" value={userData.name} onChange={handleNameChange} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="region">Region (Optional)</Label>
          <Select value={userData.region} onValueChange={handleRegionChange}>
            <SelectTrigger id="region">
              <SelectValue placeholder="Select your region" />
            </SelectTrigger>
            <SelectContent>
              {regions.map((region) => (
                <SelectItem key={region.id} value={region.id}>
                  {region.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-amber-600 dark:text-amber-400">
            This helps us provide regionally relevant content
          </p>
        </div>

        <Button className="w-full" onClick={onComplete} disabled={!isFormValid}>
          Create Account
        </Button>
      </div>
    </div>
  )
}

