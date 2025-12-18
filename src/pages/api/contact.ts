import type { NextApiRequest, NextApiResponse } from "next"
import nodemailer from "nodemailer"

// Basic schema for the expected payload
interface ContactPayload {
  name?: string
  email?: string
  message?: string
}

interface ApiResponse {
  success: boolean
  message: string
}

const requiredEnv = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "FROM_EMAIL", "TO_EMAIL"]

function validateEnv() {
  const missing = requiredEnv.filter((key) => !process.env[key])
  if (missing.length) {
    throw new Error(`Missing SMTP env vars: ${missing.join(", ")}`)
  }
}

function validatePayload(body: ContactPayload) {
  if (!body.name || !body.email || !body.message) {
    throw new Error("Name, email, and message are required.")
  }
  const emailRegex = /[^@\s]+@[^@\s]+\.[^@\s]+/
  if (!emailRegex.test(body.email)) {
    throw new Error("Please provide a valid email address.")
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" })
  }

  try {
    validateEnv()
    validatePayload(req.body as ContactPayload)

    const { name, email, message } = req.body as ContactPayload

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: process.env.TO_EMAIL,
      replyTo: email,
      subject: `New contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    })

    return res.status(200).json({ success: true, message: "Message sent successfully." })
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Failed to send message."
    return res.status(400).json({ success: false, message: msg })
  }
}
