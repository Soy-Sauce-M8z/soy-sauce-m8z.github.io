import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"
import { authTables } from "@convex-dev/auth/server"

export default defineSchema({
  ...authTables,
  contactSends: defineTable({
    email: v.string(),
    lastSentAt: v.number(),
  }).index("by_email", ["email"]),
})
