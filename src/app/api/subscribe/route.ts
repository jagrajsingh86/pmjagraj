import { NextResponse } from "next/server";

// Simple newsletter subscription endpoint.
// Wire this to ConvertKit / Mailchimp / Buttondown by setting NEWSLETTER_PROVIDER
// and the relevant API keys in env. Until then, it logs + returns ok.
export async function POST(req: Request) {
  try {
    const { email } = (await req.json()) as { email?: string };
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // TODO: forward to ESP. For now, server-log the signup.
    console.log("[pulse:subscribe]", email, new Date().toISOString());

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
