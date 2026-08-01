type NotifyPayload = {
  answer: "yes" | "no";
  attempt?: number;
};

// Runs entirely in the browser: this build ships to GitHub Pages, which is
// static hosting with no server, so there's nowhere to keep the bot token
// private. The token is intentionally public in the built JS bundle.
export async function notifyResponse(payload: NotifyPayload) {
  const token = import.meta.env["VITE_TELEGRAM_BOT_TOKEN"];
  const chatId = import.meta.env["VITE_TELEGRAM_CHAT_ID"];
  if (!token || !chatId) {
    console.warn("notifyResponse: VITE_TELEGRAM_BOT_TOKEN or VITE_TELEGRAM_CHAT_ID is not set");
    return { ok: false };
  }

  const text =
    payload.answer === "yes"
      ? "Arzoo clicked Yes 🌹"
      : `Arzoo clicked No (attempt ${payload.attempt ?? 1})`;

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
    return { ok: res.ok };
  } catch (error) {
    console.error("notifyResponse: failed to reach Telegram", error);
    return { ok: false };
  }
}
