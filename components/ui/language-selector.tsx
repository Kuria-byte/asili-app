"use client"

import { useState } from "react"
import { Check, ChevronDown, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface Language {
  id: string
  name: string
  code: string
  iconUrl?: string
}

interface LanguageSelectorProps {
  languages: Language[]
  selectedLanguage: Language
  onLanguageChange: (language: Language) => void
  className?: string
}

export function LanguageSelector({ languages, selectedLanguage, onLanguageChange, className }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "flex items-center gap-2 rounded-full border-2 border-neutral-200 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50",
            className,
          )}
        >
          {selectedLanguage.iconUrl ? (
            <Image
              src={selectedLanguage.iconUrl || "/placeholder.svg"}
              alt={selectedLanguage.name}
              width={20}
              height={20}
              className="rounded-full"
            />
          ) : (
            <Globe size={18} className="text-primary" />
          )}
          {selectedLanguage.name}
          <ChevronDown size={16} className="text-neutral-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 p-1">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.id}
            className={cn(
              "flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm",
              selectedLanguage.id === language.id && "bg-primary-50 text-primary-600",
            )}
            onClick={() => {
              onLanguageChange(language)
              setIsOpen(false)
            }}
          >
            {language.iconUrl ? (
              <Image
                src={language.iconUrl || "/placeholder.svg"}
                alt={language.name}
                width={20}
                height={20}
                className="rounded-full"
              />
            ) : (
              <Globe size={18} className="text-primary" />
            )}
            <span className="flex-1">{language.name}</span>
            {selectedLanguage.id === language.id && <Check size={16} className="text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

