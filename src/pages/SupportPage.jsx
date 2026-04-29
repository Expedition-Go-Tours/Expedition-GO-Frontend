import { useEffect } from "react";
import { Navbar } from "@/components/homepage/Navbar";
import { Footer } from "@/components/homepage/Footer";

export default function SupportPage() {
  useEffect(() => {
    // Load Tawk.to chatbot script (guarded to avoid duplicate widgets in dev/strict-mode).
    if (typeof window === "undefined") return;

    const TAUK_SCRIPT_ID = "tawk-to-support-script";
    const TAUK_SRC = "https://embed.tawk.to/644922ef31ebfa0fe7fa8b14/1guur0u4t";

    const existingScript = document.getElementById(TAUK_SCRIPT_ID);
    if (existingScript) return;

    const script = document.createElement("script");
    script.id = TAUK_SCRIPT_ID;
    script.async = true;
    script.src = TAUK_SRC;
    script.setAttribute("crossorigin", "anonymous");
    document.body.appendChild(script);

    // Avoid calling Tawk's methods on unmount: in React strict-mode the effect is mounted/unmounted twice,
    // and hiding the widget can cause confusing UX.
  }, []);

  const handleStartChat = () => {
    if (typeof window === "undefined") return;

    const tryOpen = (attempt) => {
      const tawk = window.Tawk_API;
      if (!tawk) {
        // Widget may not be ready yet—retry a few times.
        if (attempt < 10) setTimeout(() => tryOpen(attempt + 1), 300);
        return;
      }

      // Tawk provides multiple ways to open/maximize; try common ones safely.
      if (typeof tawk.maximize === "function") return tawk.maximize();
      if (typeof tawk.showWidget === "function") return tawk.showWidget();
      if (typeof tawk.openWidget === "function") return tawk.openWidget();
    };

    tryOpen(0);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-white">
        <Navbar />
      </div>

      <main className="flex-1 bg-white">
        <div className="mx-auto max-w-[1520px] px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">Support Center</h1>
            <p className="text-lg text-slate-600">
              We're here to help! Chat with our support team using the chat widget on the right side of the screen.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* FAQ Section */}
            <div className="rounded-lg border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-[color:var(--brand-green)] font-bold">•</span>
                  <span>How do I book a tour?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[color:var(--brand-green)] font-bold">•</span>
                  <span>What is your cancellation policy?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[color:var(--brand-green)] font-bold">•</span>
                  <span>How can I modify my booking?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[color:var(--brand-green)] font-bold">•</span>
                  <span>What payment methods do you accept?</span>
                </li>
              </ul>
            </div>

            {/* Contact Information */}
            <div className="rounded-lg border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Contact Information</h2>
              <div className="space-y-4 text-slate-700">
                <div>
                  <p className="font-semibold text-slate-900">Email</p>
                  <p>support@expeditiongo.com</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Phone</p>
                  <p>+1 (555) 123-4567</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Hours</p>
                  <p>24/7 Support Available</p>
                </div>
              </div>
            </div>

            {/* Live Chat */}
            <div className="rounded-lg border border-slate-200 p-6 bg-[color:var(--brand-mist)]">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Live Chat Support</h2>
              <p className="text-slate-700 mb-4">
                Our support team is available 24/7 to assist you. Click the chat widget on the right to start a conversation.
              </p>
              <button
                type="button"
                onClick={handleStartChat}
                className="w-full rounded-lg bg-[color:var(--brand-green)] px-4 py-2 font-semibold text-white transition hover:bg-[color:var(--brand-green)]/90"
              >
                Start Chat
              </button>
            </div>
          </div>

          {/* Help Topics */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Help Topics</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-slate-200 p-4 hover:border-[color:var(--brand-green)] transition cursor-pointer">
                <h3 className="font-semibold text-slate-900">Booking & Reservations</h3>
                <p className="text-sm text-slate-600 mt-1">Learn how to search, book, and manage your tours</p>
              </div>
              <div className="rounded-lg border border-slate-200 p-4 hover:border-[color:var(--brand-green)] transition cursor-pointer">
                <h3 className="font-semibold text-slate-900">Payment & Billing</h3>
                <p className="text-sm text-slate-600 mt-1">Information about payments, refunds, and invoices</p>
              </div>
              <div className="rounded-lg border border-slate-200 p-4 hover:border-[color:var(--brand-green)] transition cursor-pointer">
                <h3 className="font-semibold text-slate-900">Account & Profile</h3>
                <p className="text-sm text-slate-600 mt-1">Manage your account settings and preferences</p>
              </div>
              <div className="rounded-lg border border-slate-200 p-4 hover:border-[color:var(--brand-green)] transition cursor-pointer">
                <h3 className="font-semibold text-slate-900">Technical Support</h3>
                <p className="text-sm text-slate-600 mt-1">Get help with app or website issues</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
