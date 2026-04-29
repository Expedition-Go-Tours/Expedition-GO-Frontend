import { useEffect } from "react";
import { CheckCircle2, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import AuthShell from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/AuthProvider";

function SignOutPage() {
  const { t } = useTranslation();
  const { signOut } = useAuth();

  useEffect(() => {
    // Sign out when component mounts
    signOut();
  }, [signOut]);

  return (
    <AuthShell
      title={t('auth.signedOut')}
      description={t('auth.signedOutDesc')}
      footerText={t('auth.wantExplore')}
      footerLinkLabel={t('auth.returnHome')}
      footerLinkTo="/"
    >
      <div className="space-y-5">
        <div className="rounded-[24px] border border-[color:var(--brand-green)]/10 bg-[color:var(--brand-mist)] p-5">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 size-5 text-[color:var(--brand-green)]" />
            <div>
              <p className="text-base font-semibold text-slate-900">{t('auth.sessionClosed')}</p>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                {t('auth.sessionClosedDesc')}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Button asChild size="lg" className="w-full rounded-2xl bg-[color:var(--brand-green)] !text-white hover:bg-[color:var(--brand-green)]/90">
            <Link to="/signin">
              <LogOut className="size-4" />
              {t('auth.signInAgain')}
            </Link>
          </Button>
          <Button asChild size="lg" className="w-full rounded-2xl bg-[color:var(--brand-green)] !text-white hover:bg-[color:var(--brand-green)]/90">
            <Link to="/">{t('auth.backToHomepage')}</Link>
          </Button>
        </div>
      </div>
    </AuthShell>
  );
}

export default SignOutPage;
