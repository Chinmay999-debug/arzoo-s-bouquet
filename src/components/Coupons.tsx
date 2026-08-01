import { motion } from "motion/react";

const COUPONS = [
  { title: "One uninterrupted rant", note: "Nodding included. Timer optional.", tag: "No expiry" },
  { title: "Dessert, entirely yours", note: "I will not ask for a bite. Probably.", tag: "×3" },
  { title: "Movie night, your pick", note: "Even the one I said was too long.", tag: "×2" },
  { title: "Chores day pass", note: "I do all of it. You supervise from bed.", tag: "×1" },
  { title: "Emergency snack run", note: "Any hour. Any craving. No commentary.", tag: "Unlimited" },
  { title: "One free 'I told you so'", note: "Redeemable whenever I'm wrong again.", tag: "×5" },
];

export function Coupons() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {COUPONS.map((c, i) => (
        <motion.div
          key={c.title}
          initial={{ opacity: 0, y: 24, rotate: i % 2 ? 1.5 : -1.5 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: i * 0.07 }}
          whileHover={{ y: -6, rotate: i % 2 ? 1 : -1 }}
          className="relative overflow-hidden rounded-2xl border-2 border-dashed border-primary/40 bg-card p-6"
        >
          <span className="absolute -right-3 -top-3 h-14 w-14 rounded-full bg-secondary" aria-hidden />
          <p className="font-hand text-xl text-primary/70">Coupon</p>
          <h3 className="relative mt-1 text-2xl leading-tight text-foreground">{c.title}</h3>
          <p className="mt-2 text-base text-muted-foreground">{c.note}</p>
          <p className="mt-4 font-hand text-lg text-primary">{c.tag}</p>
        </motion.div>
      ))}
    </div>
  );
}
