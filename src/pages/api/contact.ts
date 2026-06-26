import type { NextApiRequest, NextApiResponse } from "next"
import { Resend } from "resend"

interface ContactPayload {
  name?: string
  email?: string
  message?: string
}

interface ApiResponse {
  success: boolean
  message: string
}

const resend = new Resend(process.env.RESEND_API_KEY)

function validateEnv() {
  if (!process.env.RESEND_API_KEY || !process.env.TO_EMAIL) {
    throw new Error("Missing required env vars: RESEND_API_KEY, TO_EMAIL")
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

    await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: process.env.TO_EMAIL!,
      replyTo: email!,
      subject: `New contact from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message!.replace(/\n/g, "<br>")}</p>
      `,
    })

    return res.status(200).json({ success: true, message: "Message sent successfully." })
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Failed to send message."
    return res.status(400).json({ success: false, message: msg })
  }
}
