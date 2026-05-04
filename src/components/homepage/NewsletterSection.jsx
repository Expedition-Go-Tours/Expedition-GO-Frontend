import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterSection() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // Handle newsletter subscription
      console.log("Subscribing email:", email);
      setIsSubscribed(true);
      setTimeout(() => {
        setEmail("");
        setIsSubscribed(false);
      }, 3000);
    }
  };

  return (
    <section
      className="py-[2.125rem] sm:py-12"
    >
      <div className="grid gap-0 lg:grid-cols-2 items-stretch rounded-2xl overflow-hidden border border-slate-200 shadow-lg">
        {/* Image Side */}
        <div
          className="relative h-[280px] lg:h-auto overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80"
            alt="Travel adventure"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
        </div>

        {/* Content Side */}
        <div
          className="bg-[color:var(--brand-mist)] p-[1.7rem] sm:p-10 lg:p-12 flex flex-col justify-center"
        >
          <h2 className="mb-[1.1rem] text-3xl font-bold text-slate-900 sm:mb-3">
            {t('newsletter.title')}
          </h2>
          
          <p className="mb-[1.7rem] text-base text-slate-700 sm:mb-6">
            {t('newsletter.description')}
          </p>

          {/* Subscription Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Input
                type="email"
                placeholder={t('newsletter.emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 border-slate-300 bg-white focus:border-[color:var(--brand-green)] focus:ring-[color:var(--brand-green)]"
              />
            </div>
            <Button
              type="submit"
              className="h-12 px-8 bg-[color:var(--brand-green)] hover:bg-[color:var(--brand-green)]/90 !text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg"
              disabled={isSubscribed}
            >
              {isSubscribed ? t('newsletter.subscribed') : t('newsletter.signUp')}
            </Button>
          </form>

          {isSubscribed && (
            <p
              className="mt-3 text-sm text-[color:var(--brand-green)] font-medium"
            >
              ✓ Thank you for subscribing! Check your inbox for exclusive deals.
            </p>
          )}

          <p className="mt-[1.1rem] text-sm text-slate-600 sm:mt-4 sm:text-xs">
            {t('newsletter.privacy')}{" "}
            <a href="#" className="text-[color:var(--brand-green)] hover:underline">{t('newsletter.privacyLink')}</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
