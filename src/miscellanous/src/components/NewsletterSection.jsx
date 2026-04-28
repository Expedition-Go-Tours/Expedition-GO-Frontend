import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sectionMotion } from "./SectionHeader";

export function NewsletterSection() {
  return (
    <motion.section
      className="border-y border-[#F1E7B8] bg-sand py-16"
      initial="hidden"
      variants={sectionMotion}
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#D97706]">
          Stay In The Loop
        </p>
        <h2 className="mt-3 font-display text-3xl font-extrabold text-slate-950 md:text-4xl">
          Get travel inspiration in your inbox
        </h2>
        <p className="mt-4 text-slate-600">
          Join thousands of travellers receiving destination ideas, eco travel tips, and
          premium escape deals.
        </p>
        <div className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
          <Input className="h-12 flex-1 bg-white" placeholder="Enter your email address" />
          <Button className="h-12 px-8">Subscribe</Button>
        </div>
        <p className="mt-3 text-sm text-slate-500">No spam. Unsubscribe anytime.</p>
      </div>
    </motion.section>
  );
}