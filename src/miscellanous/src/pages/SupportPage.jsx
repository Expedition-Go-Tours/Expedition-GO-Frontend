import { Link } from "react-router-dom";
import { ArrowLeft, LifeBuoy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function SupportPage() {
  return (
    <main className="min-h-screen bg-mist px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link className="inline-flex items-center gap-2 text-sm font-semibold text-primary" to="/">
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <Card className="mt-8 border-0">
          <CardContent className="p-8 md:p-12">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/10 text-primary">
              <LifeBuoy className="h-8 w-8" />
            </div>
            <h1 className="mt-6 font-display text-4xl font-extrabold text-slate-950">Support</h1>
            <p className="mt-4 max-w-2xl text-slate-600">
              Need help booking a tour or managing your favorites? Our support team is ready to assist you.
            </p>
            <div className="mt-8 space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-6 text-slate-700">
              <div>
                <p className="font-semibold">Email</p>
                <p>support@expedition-go.com</p>
              </div>
              <div>
                <p className="font-semibold">Phone</p>
                <p>+233 30 000 0000</p>
              </div>
              <div>
                <p className="font-semibold">Hours</p>
                <p>Mon - Fri, 8:00 AM - 6:00 PM GMT</p>
              </div>
            </div>
            <div className="mt-8">
              <Button asChild>
                <Link to="/">Return to Expedition-Go Tours</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
