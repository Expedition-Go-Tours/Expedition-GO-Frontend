import { Link } from "react-router-dom";
import { ArrowLeft, Bookmark, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function LibraryPage({ title, description }) {
  const Icon = title === "Saved tours" ? Bookmark : Map;

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
              <Icon className="h-8 w-8" />
            </div>
            <h1 className="mt-6 font-display text-4xl font-extrabold text-slate-950">{title}</h1>
            <p className="mt-4 max-w-2xl text-slate-600">{description}</p>
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
