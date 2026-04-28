import { Leaf, Instagram, Facebook, Youtube, Music } from "lucide-react";
import Logo from "../assets/images/company_pic.jpg";

// Payment method icons as SVG components
const VisaIcon = () => (
  <svg viewBox="0 0 48 32" className="h-8 w-12" fill="none">
    <rect width="48" height="32" rx="4" fill="#1434CB"/>
    <text x="8" y="20" fontSize="10" fontWeight="bold" fill="white">VISA</text>
  </svg>
);

const MastercardIcon = () => (
  <svg viewBox="0 0 48 32" className="h-8 w-12" fill="none">
    <rect width="48" height="32" rx="4" fill="#EB001B"/>
    <circle cx="16" cy="16" r="8" fill="#FF5F00"/>
    <circle cx="32" cy="16" r="8" fill="#FFB81C"/>
  </svg>
);

const PayPalIcon = () => (
  <svg viewBox="0 0 48 32" className="h-8 w-12" fill="none">
    <rect width="48" height="32" rx="4" fill="#003087"/>
    <text x="4" y="20" fontSize="9" fontWeight="bold" fill="#009cde">Pay</text>
    <text x="26" y="20" fontSize="9" fontWeight="bold" fill="white">Pal</text>
  </svg>
);

const JCBIcon = () => (
  <svg viewBox="0 0 48 32" className="h-8 w-12" fill="none">
    <rect width="48" height="32" rx="4" fill="#0066B2"/>
    <text x="6" y="20" fontSize="8" fontWeight="bold" fill="white">JCB</text>
  </svg>
);

export function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img 
              alt="Expedition-Go Group Limited" 
              className="h-12 sm:h-14 lg:h-16 w-auto rounded-lg object-cover"
              src={Logo}
            />
          </div>
          <div className="space-y-2 text-sm text-slate-600">
            <p>info@expeditiongo.com</p>
            <p>+233 (0) 00 000 0000</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-[0.18em] text-slate-900">
            Support
          </h3>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <p>Get in touch</p>
            <p>Help Center</p>
            <p>Cancellation options</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-[0.18em] text-slate-900">
            Company
          </h3>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <p>Home</p>
            <p>Blog</p>
            <p>Privacy policy</p>
            <p>Terms of service</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-[0.18em] text-slate-900">
            Connect With Us
          </h3>
          <div className="mt-4 flex gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white transition hover:bg-pink-600"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white transition hover:bg-blue-600"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white transition hover:bg-red-600"
              aria-label="YouTube"
            >
              <Youtube className="h-5 w-5" />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white transition hover:bg-slate-700"
              aria-label="TikTok"
            >
              <Music className="h-5 w-5" />
            </a>
          </div>
          <div className="mt-6 space-y-3 text-sm text-slate-600">
            <p>About</p>
            <p>Partnerships</p>
            <p>FAQ</p>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 text-sm text-slate-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>2022-2026 All rights reserved | Expedition-Go Tours LTD | Accra, Ghana</p>
          <div className="flex gap-3">
            <VisaIcon />
            <MastercardIcon />
            <PayPalIcon />
            <JCBIcon />
          </div>
        </div>
      </div>
    </footer>
  );
}