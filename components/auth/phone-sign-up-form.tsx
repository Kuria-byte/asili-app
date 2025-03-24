"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PhoneSignUpFormProps {
  userData: {
    phone: string
    name: string
    email: string
    region: string
  }
  onUpdateData: (data: Partial<PhoneSignUpFormProps["userData"]>) => void
  onComplete: () => void
  onBack: () => void
}

export function PhoneSignUpForm({ userData, onUpdateData, onComplete, onBack }: PhoneSignUpFormProps) {
  const [countryCode, setCountryCode] = useState("+254") // Kenya

  const countryCodes = [
    { code: "+254", name: "Kenya", flag: "🇰🇪" },
    { code: "+255", name: "Tanzania", flag: "🇹🇿" },
    { code: "+256", name: "Uganda", flag: "🇺🇬" },
    { code: "+251", name: "Ethiopia", flag: "🇪🇹" },
    { code: "+252", name: "Somalia", flag: "🇸🇴" },
    { code: "+211", name: "South Sudan", flag: "🇸🇸" },
    { code: "+250", name: "Rwanda", flag: "🇷🇼" },
    { code: "+257", name: "Burundi", flag: "🇧🇮" },
    { code: "+1", name: "United States", flag: "🇺🇸" },
    { code: "+44", name: "United Kingdom", flag: "🇬🇧" },
  ]

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

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove any non-digit characters
    const phoneNumber = e.target.value.replace(/\D/g, "")
    onUpdateData({ phone: phoneNumber })
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateData({ name: e.target.value })
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateData({ email: e.target.value })
  }

  const handleRegionChange = (value: string) => {
    onUpdateData({ region: value })
  }

  const handleCountryCodeChange = (value: string) => {
    setCountryCode(value)
  }

  const formatPhoneNumber = (phone: string) => {
    // Format phone number for display (e.g., XXX-XXX-XXXX)
    if (!phone) return ""

    // Different formatting based on country code
    if (countryCode === "+254") {
      // Kenya format: 7XX XXX XXX
      if (phone.length <= 3) {
        return phone
      } else if (phone.length <= 6) {
        return `${phone.slice(0, 3)} ${phone.slice(3)}`
      } else {
        return `${phone.slice(0, 3)} ${phone.slice(3, 6)} ${phone.slice(6, 9)}`
      }
    }

    // Default international format
    if (phone.length <= 3) {
      return phone
    } else if (phone.length <= 6) {
      return `${phone.slice(0, 3)}-${phone.slice(3)}`
    } else {
      return `${phone.slice(0, 3)}-${phone.slice(3, 6)}-${phone.slice(6)}`
    }
  }

  const isPhoneValid = userData.phone.length >= 9
  const isEmailValid = !userData.email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)
  const isFormValid = isPhoneValid && userData.name && isEmailValid

  const fullPhoneNumber = `${countryCode}${userData.phone}`

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
          <h2 className="text-xl font-serif font-bold text-amber-950 dark:text-amber-100">Sign Up with Phone</h2>
        </div>
        <p className="text-amber-700 dark:text-amber-300">
          Enter your phone number to create an account. We'll send a verification code via SMS.
        </p>
      </div>

      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <div className="flex">
            <Select value={countryCode} onValueChange={handleCountryCodeChange}>
              <SelectTrigger className="w-[140px] rounded-r-none border-r-0">
                <SelectValue placeholder="Code" />
              </SelectTrigger>
              <SelectContent>
                {countryCodes.map((country) => (
                  <SelectItem key={country.code} value={country.code}>
                    <span className="flex items-center gap-2">
                      <span>{country.flag}</span>
                      <span>{country.code}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="relative flex-1">
              <Input
                id="phone"
                type="tel"
                placeholder="7XX XXX XXX"
                value={formatPhoneNumber(userData.phone)}
                onChange={handlePhoneChange}
                className="rounded-l-none"
              />
              {userData.phone && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {isPhoneValid ? <Check className="h-5 w-5 text-green-500" /> : <X className="h-5 w-5 text-red-500" />}
                </div>
              )}
            </div>
          </div>
          {userData.phone && !isPhoneValid && <p className="text-xs text-red-500">Please enter a valid phone number</p>}
          <p className="text-xs text-amber-600 dark:text-amber-400">We'll send a verification code to this number</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" type="text" placeholder="Your name" value={userData.name} onChange={handleNameChange} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address (Optional)</Label>
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
        </div>

        <Button className="w-full" onClick={onComplete} disabled={!isFormValid}>
          Continue
        </Button>

        <p className="text-center text-xs text-amber-700 dark:text-amber-300">
          By continuing, you agree to our{" "}
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
  )
}

