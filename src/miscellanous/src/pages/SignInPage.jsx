import { AuthForm } from "@/components/AuthForm";
import { AuthShell } from "@/components/AuthShell";
import { signInWithEmail } from "@/lib/auth";

export function SignInPage() {
  return (
    <AuthShell
      description="Sign in with your email address to manage bookings, saved journeys, and personalized trip alerts."
      eyebrow="Welcome Back"
      footer={
        <p className="text-sm text-slate-500">
          Need an account? Register with your email address and start building your next Ghana
          itinerary.
        </p>
      }
      title="Sign in to your account"
    >
      <AuthForm
        alternateAction="Create one"
        alternateHref="/register"
        alternateLabel="Don't have an account?"
        mode="signin"
        onSubmit={signInWithEmail}
        submitLabel="Sign In"
      />
    </AuthShell>
  );
}
