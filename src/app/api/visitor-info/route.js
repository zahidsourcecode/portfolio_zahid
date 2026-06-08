function formatLocation(data) {
  if (!data?.success) return "Unknown";
  return [data.city, data.region, data.country].filter(Boolean).join(", ") || "Unknown";
}

function isLocalIp(ip) {
  return (
    !ip ||
    ip === "Unknown" ||
    ip === "::1" ||
    ip.startsWith("127.") ||
    ip.startsWith("192.168.") ||
    ip.startsWith("10.")
  );
}

export async function GET(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip =
    forwarded?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "Unknown";

  if (isLocalIp(ip)) {
    try {
      const res = await fetch("https://ipwho.is/", { cache: "no-store" });
      const data = await res.json();
      if (data.success) {
        return Response.json({
          ip: data.ip,
          location: formatLocation(data),
        });
      }
    } catch {
      /* fall through */
    }

    return Response.json({
      ip: ip === "Unknown" ? "Unavailable" : ip,
      location: "Local network",
    });
  }

  try {
    const res = await fetch(`https://ipwho.is/${ip}`, { cache: "no-store" });
    const data = await res.json();
    if (data.success) {
      return Response.json({
        ip: data.ip || ip,
        location: formatLocation(data),
      });
    }
  } catch {
    /* fall through */
  }

  return Response.json({ ip, location: "Unknown" });
}
