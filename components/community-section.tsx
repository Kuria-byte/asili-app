"use client"

import { Users, Heart, Handshake } from "lucide-react"
import { motion } from "framer-motion"
import { InteractiveRoleCard } from "./interactive-role-card"

export function CommunitySection() {
  const ambassadorRequirements = [
    { completed: true, text: "Create an account and complete profile" },
    { completed: true, text: "Reach level 5 in at least one language" },
    { completed: false, text: "Participate in at least 3 community events" },
    { completed: false, text: "Complete the cultural sensitivity training" },
    { completed: false, text: "Submit application with personal statement" },
  ]

  const heritagekeeperRequirements = [
    { completed: true, text: "Verified native speaker status" },
    { completed: false, text: "Submit language proficiency documentation" },
    { completed: false, text: "Record sample pronunciation guide" },
    { completed: false, text: "Complete content creation workshop" },
  ]

  const culturalBridgeRequirements = [
    { completed: true, text: "Create an account and complete profile" },
    { completed: true, text: "Participate in at least 1 language exchange" },
    { completed: false, text: "Submit availability for future events" },
    { completed: false, text: "Complete at least 3 lessons in target language" },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="rounded-xl border border-amber-100 bg-white overflow-hidden dark:bg-card">
      <div className="p-6">
        <h2 className="mb-6 font-serif text-xl text-amber-950 dark:text-foreground">Community Building</h2>

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item}>
            <InteractiveRoleCard
              title="Asili Ambassador"
              icon={<Users className="h-5 w-5" />}
              description="Join our network of passionate language advocates organizing local learning circles and cultural events."
              illustrationUrl="/images/kikuyu-woman-illustration2.jpg?q=80&w=1000&h=1000"
              requirements={ambassadorRequirements}
              ctaText="Apply to Join Program"
              ctaLink="/community/ambassadors"
              color="amber"
              colorScheme={{
                primary: "hsl(36, 100%, 40%)",
                secondary: "hsl(36, 80%, 90%)",
                accent: "hsl(36, 100%, 50%)",
              }}
            />
          </motion.div>

          <motion.div variants={item}>
            <InteractiveRoleCard
              title="Heritage Keeper"
              icon={<Heart className="h-5 w-5" />}
              description="Share your cultural knowledge and language expertise to ensure authentic learning experiences."
              illustrationUrl="/images/kikuyu-man-illustration.jpg?q=80&w=1000"
              requirements={heritagekeeperRequirements}
              ctaText="Nominate a Heritage Keeper"
              ctaLink="/community/heritage-keepers"
              color="green"
              colorScheme={{
                primary: "hsl(142, 76%, 25%)",
                secondary: "hsl(142, 76%, 95%)",
                accent: "hsl(142, 76%, 36%)",
              }}
            />
          </motion.div>

          <motion.div variants={item}>
            <InteractiveRoleCard
              title="Cultural Bridge"
              icon={<Handshake className="h-5 w-5" />}
              description="Connect with learners through virtual and in-person language exchange events and cultural activities."
              illustrationUrl="/images/kikuyu-vendor.jpg?q=80&w=1000"
              requirements={culturalBridgeRequirements}
              ctaText="View Upcoming Events"
              ctaLink="/community/events"
              color="blue"
              colorScheme={{
                primary: "hsl(210, 100%, 35%)",
                secondary: "hsl(210, 100%, 95%)",
                accent: "hsl(210, 100%, 50%)",
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

