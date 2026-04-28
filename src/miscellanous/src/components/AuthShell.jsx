import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import companyLogo from "@/assets/images/company_pic.jpg";

export function AuthShell({ eyebrow, title, description, children, footer }) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f6fcf7_0%,#ffffff_60%)]">
      <div className="mx-auto grid min-h-screen max-w-6xl items-center gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,540px)] lg:px-8 lg:py-10">
        <div className="rounded-[2rem] bg-gradient-to-br from-forest via-[#0B7A58] to-[#33C58B] p-8 text-white shadow-float lg:p-10">
          <div>
            <Link
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
              to="/"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
            <div className="mt-10">
              <div className="inline-flex items-center justify-center rounded-2xl bg-white/10 p-3 backdrop-blur-sm transition hover:bg-white/15">
                <img 
                  src={companyLogo} 
                  alt="Expedition-Go Tours" 
                  className="h-16 w-auto object-contain drop-shadow-lg"
                />
              </div>
              <p className="mt-4 text-sm text-emerald-50/80">Secure travel booking account access</p>
            </div>
            <Badge className="mt-10 border-white/20 bg-white/10 text-white">
              Eco-Certified Travel Agency - Accra, Ghana
            </Badge>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight md:text-5xl">
              Book smarter trips with one secure account
            </h1>
            <p className="mt-5 max-w-lg text-base text-emerald-50/90">
              Save itineraries, manage bookings, and access personalised travel support across
              Ghana and beyond.
            </p>
          </div>
        </div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto flex w-full max-w-xl items-center justify-center"
          initial={{ opacity: 0, y: 18 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <Card className="w-full border-0">
            <CardContent className="p-6 sm:p-8 lg:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-primary">
                {eyebrow}
              </p>
              <h2 className="mt-3 font-display text-3xl font-extrabold text-slate-950">
                {title}
              </h2>
              <p className="mt-3 text-slate-600">{description}</p>
              <div className="mt-8">{children}</div>
              {footer ? <div className="mt-8 border-t border-slate-100 pt-6">{footer}</div> : null}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
