const SEND_EMAIL_URL = "https://contact-form-iota-opal.vercel.app/api/send-email";

export async function POST(request) {
  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const subject = String(body.subject || "").trim();
    const message = String(body.message || "").trim();

    if (!name || !email || !subject || !message) {
      return Response.json({ error: "All fields are required." }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const upstream = await fetch(SEND_EMAIL_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, subject, message }),
    });

    let data = {};
    try {
      data = await upstream.json();
    } catch {
      return Response.json(
        { error: "Email service returned an invalid response." },
        { status: 502 },
      );
    }

    if (!upstream.ok) {
      const error =
        typeof data.error === "string"
          ? data.error
          : "Unable to send your message right now.";
      return Response.json({ error }, { status: upstream.status });
    }

    return Response.json({ success: true, ...data });
  } catch {
    return Response.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 },
    );
  }
}
