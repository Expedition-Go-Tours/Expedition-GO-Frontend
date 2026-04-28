import { AuthForm } from "@/components/AuthForm";
import { AuthShell } from "@/components/AuthShell";
import { registerWithEmail } from "@/lib/auth";

export function RegisterPage() {
  return (
    <AuthShell
      description="Create your account with an email address to save itineraries, track bookings, and unlock tailored travel planning."
      eyebrow="Join Expedition-Go"
      footer={
        <p className="text-sm text-slate-500">
          Already registered? Sign in and pick up right where your travel planning left off.
        </p>
      }
      title="Create your account"
    >
      <AuthForm
        alternateAction="Sign in"
        alternateHref="/signin"
        alternateLabel="Already have an account?"
        mode="register"
        onSubmit={registerWithEmail}
        submitLabel="Create Account"
      />
    </AuthShell>
  );
}
