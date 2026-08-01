import { createServerFn } from "@tanstack/react-start";

type NotifyPayload = {
  answer: "yes" | "no";
  attempt?: number;
};

export const notifyResponse = createServerFn({ method: "POST" })
  .validator((data: unknown) => data as NotifyPayload)
  .handler(async ({ data }) => {
    const token = process.env["TELEGRAM_BOT_TOKEN"];
    const chatId = process.env["TELEGRAM_CHAT_ID"];
    if (!token || !chatId) {
      console.warn("notifyResponse: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set");
      return { ok: false };
    }

    const text =
      data.answer === "yes"
        ? "Arzoo clicked Yes 🌹"
        : `Arzoo clicked No (attempt ${data.attempt ?? 1})`;

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
  });
