export const SUPPORTED_LANGUAGES = [
  { code: "en", name: "English", native: "English" },
  { code: "hi", name: "Hindi",   native: "Hindi"   },
  { code: "mr", name: "Marathi", native: "Marathi"  },
  { code: "ta", name: "Tamil",   native: "Tamil"    },
] as const

export type SupportedLocale = "en" | "hi" | "mr" | "ta"