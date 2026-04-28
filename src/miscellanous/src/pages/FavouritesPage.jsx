import { Link } from "react-router-dom";
import { ArrowLeft, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/components/AuthProvider";

export function FavouritesPage() {
  const { user } = useAuth();

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
              <Bookmark className="h-8 w-8" />
            </div>
            <h1 className="mt-6 font-display text-4xl font-extrabold text-slate-950">Favourites</h1>
            <p className="mt-4 max-w-2xl text-slate-600">
              {user
                ? "These are the tours you have saved for later."
                : "Sign in to view your saved favourites and manage your list."}
            </p>

            {user ? (
              <div className="mt-8 space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-6 text-slate-700">
                <p className="font-semibold">Saved favourites</p>
                <p>You haven’t saved any tours yet. Browse the homepage and add the ones you love.</p>
              </div>
            ) : (
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild variant="outline">
                  <Link to="/signin">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
