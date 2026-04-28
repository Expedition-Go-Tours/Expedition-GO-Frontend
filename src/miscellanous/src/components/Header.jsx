import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Bookmark,
  LogOut,
  Menu,
  Search,
  UserCircle2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/AuthProvider";
import Logo from "../assets/images/company_pic.jpg";

export function Header({ menuOpen, setMenuOpen, profileOpen, setProfileOpen }) {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const profileRef = useRef(null);
  const usdRef = useRef(null);
  const [usdOpen, setUsdOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  const initials = useMemo(() => {
    if (!user) {
      return "";
    }

    const source = user.name || user.email || "U";
    return source
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("");
  }, [user]);

  useEffect(() => {
    function handlePointerDown(event) {
      const clickedInsideProfile = profileRef.current?.contains(event.target);
      const clickedInsideUsd = usdRef.current?.contains(event.target);

      if (!clickedInsideProfile && !clickedInsideUsd) {
        setProfileOpen(false);
        setUsdOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  async function handleSignOut() {
    await signOut();
    setMenuOpen(false);
    setProfileOpen(false);
    navigate("/");
  }

  const accountMenu = (
    <div className="relative" ref={profileRef}>
      <button
        className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-primary/20 bg-primary/10 text-sm font-bold text-primary transition hover:border-primary/40 hover:bg-primary/15"
        onClick={() => setProfileOpen((value) => !value)}
        type="button"
      >
        {user?.photoURL ? (
          <img alt={user.name || user.email || "User avatar"} className="h-full w-full object-cover" src={user.photoURL} />
        ) : (
          <span>{initials || "U"}</span>
        )}
      </button>

      {profileOpen ? (
        <div className="absolute right-0 top-14 z-50 w-56 rounded-3xl border border-slate-200 bg-white p-2 shadow-float">
          <div className="border-b border-slate-100 px-3 py-3">
            <p className="truncate text-sm font-bold text-slate-900">{user?.name || "Traveler"}</p>
            <p className="truncate text-xs text-slate-500">{user?.email}</p>
          </div>
          <div className="py-2">
            <button
              className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              onClick={() => {
                setProfileOpen(false);
                navigate("/my-tours");
              }}
              type="button"
            >
              <UserCircle2 className="h-4 w-4 text-primary" />
              My tours
            </button>
            <button
              className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              onClick={() => {
                setProfileOpen(false);
                navigate("/saved-tours");
              }}
              type="button"
            >
              <Bookmark className="h-4 w-4 text-primary" />
              Saved tours
            </button>
            <button
              className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-medium text-rose-600 transition hover:bg-rose-50"
              onClick={handleSignOut}
              type="button"
            >
              <LogOut className="h-4 w-4" />
              Signout
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <button
          onClick={() => {
            navigate("/");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex min-w-0 items-center cursor-pointer hover:opacity-80 transition-opacity"
          type="button"
          aria-label="Go to home page"
        >
          <img 
            alt="Expedition-Go Group Limited" 
            className="h-10 sm:h-14 lg:h-16 w-auto"
            src={Logo}
          />
        </button>

        <div className="flex flex-1 justify-center sm:max-w-xs md:max-w-md lg:max-w-lg mx-auto">
          <div className="flex w-full items-center rounded-full border border-slate-200 bg-slate-50 px-4 shadow-sm">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              className="h-11 w-full bg-transparent px-3 text-sm outline-none placeholder:text-slate-400"
              placeholder="Destinations, attractions, hotels..."
            />
          </div>
        </div>

        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 lg:hidden"
          onClick={() => setMenuOpen((value) => !value)}
          type="button"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <div className="ml-auto hidden items-center gap-5 lg:flex">
          <div className="relative" ref={usdRef}>
            <button
              className="text-sm font-medium text-slate-600 transition hover:text-primary"
              onClick={() => {
                setUsdOpen((value) => !value);
                setProfileOpen(false);
              }}
              type="button"
            >
              {selectedCurrency}
            </button>

            {usdOpen ? (
              <div className="absolute right-0 top-full z-50 mt-3 w-64 overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-float">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Choose currency</p>
                <div className="mt-3 grid gap-2">
                  {['USD', 'GHS', 'EUR', 'GBP', 'CAD'].map((currency) => (
                    <button
                      key={currency}
                      type="button"
                      className="rounded-2xl border border-slate-200 px-3 py-2 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                      onClick={() => {
                        setSelectedCurrency(currency);
                        setUsdOpen(false);
                      }}
                    >
                      {currency}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <button
            className="text-sm font-medium text-slate-600 transition hover:text-primary"
            type="button"
            onClick={() => navigate('/favourites')}
          >
            Favourites
          </button>
          <button
            className="text-sm font-medium text-slate-600 transition hover:text-primary"
            type="button"
            onClick={() => navigate('/support')}
          >
            Support
          </button>
          {user ? (
            accountMenu
          ) : (
            <>
              <Button asChild variant="outline">
                <Link to="/signin">Sign In</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Register</Link>
              </Button>
            </>
          )}
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-3">
            <button className="text-left text-sm font-medium text-slate-700">USD</button>
            <button className="text-left text-sm font-medium text-slate-700">
              <Link onClick={() => setMenuOpen(false)} to="/support">
                Support
              </Link>
            </button>
            <button className="text-left text-sm font-medium text-slate-700">
              <Link onClick={() => setMenuOpen(false)} to="/favourites">
                Favourites
              </Link>
            </button>
            {user ? (
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-3 rounded-[1.4rem] border border-slate-200 bg-slate-50 px-4 py-3">
                  <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {user.photoURL ? (
                      <img
                        alt={user.name || user.email || "User avatar"}
                        className="h-full w-full object-cover"
                        src={user.photoURL}
                      />
                    ) : (
                      <span>{initials || "U"}</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-slate-900">
                      {user.name || "Traveler"}
                    </p>
                    <p className="truncate text-xs text-slate-500">{user.email}</p>
                  </div>
                </div>
                <Button asChild className="w-full justify-start rounded-[1.4rem]" variant="outline">
                  <Link onClick={() => setMenuOpen(false)} to="/my-tours">
                    My tours
                  </Link>
                </Button>
                <Button asChild className="w-full justify-start rounded-[1.4rem]" variant="outline">
                  <Link onClick={() => setMenuOpen(false)} to="/saved-tours">
                    Saved tours
                  </Link>
                </Button>
                <Button className="w-full rounded-[1.4rem]" onClick={handleSignOut} variant="outline">
                  Signout
                </Button>
              </div>
            ) : (
              <div className="flex gap-3 pt-2">
                <Button asChild className="flex-1" variant="outline">
                  <Link to="/signin">Sign In</Link>
                </Button>
                <Button asChild className="flex-1">
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
                }
