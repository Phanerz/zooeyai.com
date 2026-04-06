import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const resend = new Resend(process.env.RESEND_API_KEY!);
  const { email, plan } = await req.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email." }, { status: 400 });
  }

  // Insert — ignore duplicate emails gracefully
  const { error: dbError } = await supabase
    .from("waitlist")
    .insert({ email: email.toLowerCase().trim(), plan: plan || null });

  if (dbError) {
    if (dbError.code === "23505") {
      // Already on the list — still show success so they don't feel bad
      return NextResponse.json({ ok: true, duplicate: true });
    }
    console.error("Supabase error:", dbError);
    return NextResponse.json({ error: "Could not save. Try again." }, { status: 500 });
  }

  // Send confirmation email
  const planLabel = plan
    ? { lite: "Zooey Lite", plus: "Zooey Plus", maxx: "Zooey Maxx" }[plan as string] ?? ""
    : "";

  await resend.emails.send({
    from: "Zooey <waitlist@zooeyai.com>",
    to: email,
    subject: "You're on the Zooey waitlist 👾",
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#050608;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#fff;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#050608;min-height:100vh;">
    <tr><td align="center" style="padding:48px 16px;">
      <table width="100%" style="max-width:520px;background:#0d1117;border-radius:20px;border:1px solid rgba(74,222,128,0.18);overflow:hidden;">

        <!-- Header glow bar -->
        <tr><td style="background:linear-gradient(90deg,transparent,rgba(74,222,128,0.35) 50%,transparent);height:2px;"></td></tr>

        <!-- Body -->
        <tr><td style="padding:40px 36px;">

          <!-- Icon -->
          <div style="text-align:center;margin-bottom:28px;">
            <div style="display:inline-block;width:72px;height:72px;background:rgba(74,222,128,0.1);border:1px solid rgba(74,222,128,0.3);border-radius:50%;line-height:72px;text-align:center;font-size:32px;">👾</div>
          </div>

          <h1 style="margin:0 0 12px;text-align:center;font-size:24px;font-weight:700;color:#fff;letter-spacing:-0.5px;">
            You're on the list.
          </h1>
          <p style="margin:0 0 24px;text-align:center;font-size:15px;line-height:1.6;color:rgba(255,255,255,0.62);">
            Zooey is getting ready. When early access opens, you'll be among the first to know.
          </p>

          ${planLabel ? `
          <div style="background:rgba(74,222,128,0.08);border:1px solid rgba(74,222,128,0.2);border-radius:12px;padding:14px 18px;margin-bottom:24px;text-align:center;">
            <span style="font-size:12px;text-transform:uppercase;letter-spacing:0.1em;color:rgba(74,222,128,0.7);">Reserved plan</span>
            <p style="margin:4px 0 0;font-size:17px;font-weight:600;color:#fff;">${planLabel}</p>
          </div>
          ` : ""}

          <div style="border-top:1px solid rgba(255,255,255,0.07);padding-top:24px;margin-top:8px;">
            <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.38);text-align:center;">
              Confirmed: <strong style="color:rgba(255,255,255,0.55);">${email}</strong>
            </p>
          </div>

        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:20px 36px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;">
          <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.28);">
            You're receiving this because you signed up at zooeyai.com.<br>
            No spam. Just Zooey.
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
  });

  return NextResponse.json({ ok: true });
}
