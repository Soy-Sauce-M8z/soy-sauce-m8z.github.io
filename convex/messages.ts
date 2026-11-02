import { v } from "convex/values";
import { action, internalMutation, internalQuery } from "./_generated/server";
import { internal } from "./_generated/api";
import { callMacalyJson } from "./macaly";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** One message per visitor per minute. */
const COOLDOWN_MS = 60_000;

function clean(value: string, max: number): string {
  return value.trim().slice(0, max);
}

/** Timestamp of the visitor's last accepted message, if any. */
export const getLastSend = internalQuery({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const record = await ctx.db
      .query("contactSends")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
    return record?.lastSentAt ?? null;
  },
});

/** Remembers when this visitor last sent a message. */
export const recordSend = internalMutation({
  args: { email: v.string(), sentAt: v.number() },
  handler: async (ctx, args) => {
    const record = await ctx.db
      .query("contactSends")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (record) {
      await ctx.db.patch(record._id, { lastSentAt: args.sentAt });
      return;
    }
    await ctx.db.insert("contactSends", {
      email: args.email,
      lastSentAt: args.sentAt,
    });
  },
});

/**
 * Sends a portfolio contact message as an email notification.
 * Validation, honeypot, and the one-per-minute throttle all run here so the
 * endpoint never receives malformed or repeated input.
 */
export const sendContactMessage = action({
  args: {
    name: v.string(),
    email: v.string(),
    message: v.string(),
    company: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const name = clean(args.name, 120);
    const email = clean(args.email, 200);
    const message = clean(args.message, 1000);
    const honeypot = clean(args.company ?? "", 200);

    // Hidden field filled in: almost certainly a bot. Pretend success, send nothing.
    if (honeypot) {
      console.log("Contact form: honeypot triggered, submission ignored.");
      return { success: true };
    }

    if (!name) {
      return { error: "Please add your name." };
    }
    if (!EMAIL_PATTERN.test(email)) {
      return { error: "Please enter a valid email address." };
    }
    if (message.length > 1000) {
      return { error: "Please keep your message under 1000 characters." };
    }
    if (message.length < 10) {
      return { error: "Please write a little more, at least 10 characters." };
    }

    const now = Date.now();
    const throttleKey = email.toLowerCase();
    const lastSentAt = await ctx.runQuery(internal.messages.getLastSend, {
      email: throttleKey,
    });

    if (lastSentAt !== null) {
      const elapsed = now - lastSentAt;
      if (elapsed < COOLDOWN_MS) {
        const retryAfterMs = COOLDOWN_MS - Math.max(elapsed, 0);
        return {
          error: `You just sent a message. Please wait ${Math.ceil(
            retryAfterMs / 1000,
          )} more seconds before sending another.`,
          retryAfterMs,
        };
      }
    }

    const recipient = process.env.RECIPIENT_EMAIL;
    if (!recipient) {
      console.error("Contact form: RECIPIENT_EMAIL is not configured.");
      return { error: "The contact form is not set up yet. Please email me directly." };
    }

    try {
      await callMacalyJson("/api/emails/client-notifications", {
        toEmail: recipient,
        replyTo: email,
        subject: `Portfolio message from ${name}`,
        message: `From: ${name} <${email}>\n\n${message}`,
        appName: process.env.APP_NAME,
        secretKey: process.env.SECRET_KEY,
      });
      await ctx.runMutation(internal.messages.recordSend, {
        email: throttleKey,
        sentAt: now,
      });
      console.log("Contact form: notification sent.");
      return { success: true };
    } catch (error) {
      console.error("Contact form: sending failed.", error);
      return { error: "Your message could not be sent. Please try again in a moment." };
    }
  },
});
