import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";

const CONVEX_URL = (import.meta as any).env.VITE_CONVEX_URL as string | undefined

// Never build the client with an empty address: that throws while the module is
// imported and would blank every page. Without the variable the site still
// renders and only the contact form reports that it cannot send.
const FALLBACK_URL = 'https://missing-convex-url.invalid'

if (!CONVEX_URL) {
  console.warn(
    'VITE_CONVEX_URL is not set. The site will render, but the contact form cannot send.',
  )
}

const convex = new ConvexReactClient(CONVEX_URL || FALLBACK_URL)

export default function AppConvexProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ConvexAuthProvider client={convex}>
      {children}
    </ConvexAuthProvider>
  )
}
