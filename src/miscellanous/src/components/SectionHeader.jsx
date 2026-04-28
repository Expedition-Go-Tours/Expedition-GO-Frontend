import { motion } from "framer-motion";

const sectionMotion = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function SectionHeader({ eyebrow, title, description, action }) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="space-y-2">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary">{eyebrow}</p>
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-950 md:text-4xl">
          {title}
        </h2>
        {description ? <p className="max-w-2xl text-slate-600">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

export { sectionMotion };