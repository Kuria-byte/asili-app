"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { WelcomeScreen } from "./welcome-screen"
import { ValueCarousel } from "./value-carousel"
import { PersonalizationForm } from "./personalization-form"
import { AccountOptions } from "./account-options"
import { SignUpForm } from "./sign-up-form"
import { PhoneSignUpForm } from "./phone-sign-up-form"
import { VerificationScreen } from "./verification-screen"
import { ProfileCustomization } from "./profile-customization"
import { CommunityOptIn } from "./community-opt-in"
import { LoginForm } from "./login-form"
import { ForgotPasswordForm } from "./forgot-password-form"
import { ReturningUserWelcome } from "./returning-user-welcome"

type AuthMethod = "email" | "phone" | "google" | "apple" | "facebook"
type OnboardingStep =
  | "welcome"
  | "value-carousel"
  | "personalization"
  | "account-options"
  | "sign-up"
  | "verification"
  | "profile"
  | "community"
  | "login"
  | "forgot-password"
  | "returning-user"

export function OnboardingContainer() {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("welcome")
  const [authMethod, setAuthMethod] = useState<AuthMethod>("email")
  const [userData, setUserData] = useState({
    email: "",
    phone: "",
    password: "",
    name: "",
    region: "",
    language: "",
    connection: "",
    level: "",
    goals: [] as string[],
    communityEnabled: true,
  })

  const updateUserData = (data: Partial<typeof userData>) => {
    setUserData((prev) => ({ ...prev, ...data }))
  }

  const goToStep = (step: OnboardingStep) => {
    setCurrentStep(step)
  }

  const selectAuthMethod = (method: AuthMethod) => {
    setAuthMethod(method)
    if (method === "email" || method === "phone") {
      goToStep("sign-up")
    } else {
      // For social auth, we'd typically handle this differently
      // For now, just simulate going to verification
      goToStep("verification")
    }
  }

  const handleSignUpComplete = () => {
    goToStep("verification")
  }

  const handleVerificationComplete = () => {
    goToStep("profile")
  }

  const handleProfileComplete = () => {
    goToStep("community")
  }

  const handleCommunityComplete = () => {
    // In a real app, we'd redirect to the main app here
    console.log("Onboarding complete!", userData)
    // For demo purposes, go back to welcome
    goToStep("welcome")
  }

  const handleLoginComplete = () => {
    goToStep("returning-user")
  }

  const handleForgotPasswordComplete = () => {
    goToStep("login")
  }

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      }
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      }
    },
  }

  // Determine the direction of the animation based on the step change
  const getDirection = (step: OnboardingStep): number => {
    const stepOrder: OnboardingStep[] = [
      "welcome",
      "value-carousel",
      "personalization",
      "account-options",
      "sign-up",
      "verification",
      "profile",
      "community",
    ]

    const currentIndex = stepOrder.indexOf(currentStep)
    const nextIndex = stepOrder.indexOf(step)

    if (currentIndex === -1 || nextIndex === -1) return 1
    return nextIndex > currentIndex ? 1 : -1
  }

  return (
    <div className="min-h-screen bg-cream dark:bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait" custom={getDirection(currentStep)}>
          {currentStep === "welcome" && (
            <motion.div
              key="welcome"
              custom={1}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
            >
              <WelcomeScreen onGetStarted={() => goToStep("value-carousel")} onLogin={() => goToStep("login")} />
            </motion.div>
          )}

          {currentStep === "value-carousel" && (
            <motion.div
              key="value-carousel"
              custom={1}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
            >
              <ValueCarousel onComplete={() => goToStep("personalization")} />
            </motion.div>
          )}

          {currentStep === "personalization" && (
            <motion.div
              key="personalization"
              custom={1}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
            >
              <PersonalizationForm
                userData={userData}
                onUpdateData={updateUserData}
                onComplete={() => goToStep("account-options")}
                onBack={() => goToStep("value-carousel")}
              />
            </motion.div>
          )}

          {currentStep === "account-options" && (
            <motion.div
              key="account-options"
              custom={1}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
            >
              <AccountOptions onSelectMethod={selectAuthMethod} onBack={() => goToStep("personalization")} />
            </motion.div>
          )}

          {currentStep === "sign-up" && (
            <motion.div
              key="sign-up"
              custom={1}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
            >
              {authMethod === "email" ? (
                <SignUpForm
                  userData={userData}
                  onUpdateData={updateUserData}
                  onComplete={handleSignUpComplete}
                  onBack={() => goToStep("account-options")}
                />
              ) : (
                <PhoneSignUpForm
                  userData={userData}
                  onUpdateData={updateUserData}
                  onComplete={handleSignUpComplete}
                  onBack={() => goToStep("account-options")}
                />
              )}
            </motion.div>
          )}

          {currentStep === "verification" && (
            <motion.div
              key="verification"
              custom={1}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
            >
              <VerificationScreen
                method={authMethod}
                contact={authMethod === "email" ? userData.email : userData.phone}
                onComplete={handleVerificationComplete}
                onResend={() => console.log("Resend verification")}
                onBack={() => goToStep("sign-up")}
              />
            </motion.div>
          )}

          {currentStep === "profile" && (
            <motion.div
              key="profile"
              custom={1}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
            >
              <ProfileCustomization
                userData={userData}
                onUpdateData={updateUserData}
                onComplete={handleProfileComplete}
                onSkip={handleProfileComplete}
              />
            </motion.div>
          )}

          {currentStep === "community" && (
            <motion.div
              key="community"
              custom={1}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
            >
              <CommunityOptIn userData={userData} onUpdateData={updateUserData} onComplete={handleCommunityComplete} />
            </motion.div>
          )}

          {currentStep === "login" && (
            <motion.div
              key="login"
              custom={1}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
            >
              <LoginForm
                onComplete={handleLoginComplete}
                onForgotPassword={() => goToStep("forgot-password")}
                onSignUp={() => goToStep("welcome")}
              />
            </motion.div>
          )}

          {currentStep === "forgot-password" && (
            <motion.div
              key="forgot-password"
              custom={1}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
            >
              <ForgotPasswordForm onComplete={handleForgotPasswordComplete} onBack={() => goToStep("login")} />
            </motion.div>
          )}

          {currentStep === "returning-user" && (
            <motion.div
              key="returning-user"
              custom={1}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
            >
              <ReturningUserWelcome onContinue={() => console.log("Continue to app")} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

