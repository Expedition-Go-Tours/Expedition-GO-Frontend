import { Facebook, Instagram, Music2, Youtube, Smartphone, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { footerGroups, paymentLogos } from "./data";
import { useCurrency } from "@/contexts/CurrencyContext";

// Import payment method images
import viiviPay from "@/assets/images/Viivi.svg";
import mastercardPay from "@/assets/images/mastercard.svg";
import amexPay from "@/assets/images/americanexpress_pay.svg";
import googlePay from "@/assets/images/google_pay.svg";
import applePay from "@/assets/images/apple_pay.svg";
import paypalPay from "@/assets/images/paypal_pay.svg";

// Import social media images
import instagramImg from "@/assets/images/instagram.svg";
import facebookImg from "@/assets/images/facebook.svg";
import tiktokImg from "@/assets/images/tiktok.svg";
import youtubeImg from "@/assets/images/utube.svg";

// Google Play Icon Component
function GooglePlayIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
    </svg>
  );
}

// Apple Icon Component
function AppleIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
    </svg>
  );
}

export function Footer() {
  const { t, i18n } = useTranslation();
  const { currency, setCurrency, availableCurrencies } = useCurrency();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('language', langCode);
    setIsLanguageOpen(false);
  };

  const handleCurrencyChange = (currencyCode) => {
    setCurrency(currencyCode);
    setIsCurrencyOpen(false);
  };

  const languages = [
    { code: "en", name: "English (US)" },
    { code: "es", name: "Español (ES)" },
    { code: "fr", name: "Français (FR)" },
    { code: "de", name: "Deutsch (DE)" },
    { code: "nl", name: "Nederlands (NL)" }
  ];

  const getCurrentLanguageName = () => {
    const lang = languages.find(l => l.code === i18n.language);
    return lang ? lang.name : "English (US)";
  };

  const getCurrentCurrencyName = () => {
    const curr = availableCurrencies.find(c => c.code === currency);
    return curr ? `${curr.code} - ${curr.name} (${curr.symbol})` : "USD - US Dollar ($)";
  };
  
  // Map footer titles and links to translation keys
  const getTranslationKey = (text) => {
    const keyMap = {
      'Explore': 'explore',
      'Support': 'support',
      'Company': 'company',
      'Supplier Zone': 'supplierZone',
      'Follow Us': 'followUs',
      'Home': 'home',
      'Tours': 'tours',
      'Destinations': 'destinations',
      'Experiences': 'experiences',
      'Deals': 'deals',
      'About Us': 'aboutUs',
      'Contact': 'contact',
      'Help Centre': 'helpCentre',
      'Contact Us': 'contactUs',
      'Live Chat': 'liveChat',
      'Booking Support': 'bookingSupport',
      'Cancellation Help': 'cancellationHelp',
      'FAQ': 'faq',
      'Careers': 'careers',
      'Partners': 'partners',
      'Affiliate Program': 'affiliateProgram',
      'Press': 'press',
      'Investor Relations': 'investorRelations',
      'List Your Tours': 'listYourTours',
      'Become a Tour Operator': 'becomeOperator',
      'Supplier Dashboard': 'supplierDashboard',
      'API Access': 'apiAccess',
      'Agent Accounts': 'agentAccounts',
      'Instagram': 'instagram',
      'Facebook': 'facebook',
      'TikTok': 'tiktok',
      'Link': 'link',
      'YouTube': 'youtube',
      'X': 'x'
    };
    return keyMap[text] || text.toLowerCase().replace(/\s+/g, '');
  };
  
  return (
    <footer id="contact" className="mt-10 bg-[color:var(--brand-green)] text-white">
      <div className="mx-auto grid max-w-[1520px] gap-6 px-3 py-6 sm:gap-8 sm:px-4 sm:py-8 lg:px-6 lg:py-10 xl:grid-cols-[180px_200px_200px_1fr_1fr_1fr_190px]">
        {/* Language & Currency Section */}
        <div className="space-y-4">
          <div className="relative">
            <p className="mb-2 text-sm font-semibold">Language</p>
            <button
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              className="w-full rounded-md border border-white/15 bg-white px-3 py-2 text-left text-[13px] text-slate-900 transition hover:border-white/30 flex items-center justify-between"
            >
              <span>{getCurrentLanguageName()}</span>
              <ChevronDown className={`size-4 text-slate-500 transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`} />
            </button>
            {isLanguageOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setIsLanguageOpen(false)}
                />
                <div className="absolute bottom-full left-0 mb-2 z-50 w-full min-w-[200px] rounded-lg border border-slate-200 bg-white shadow-xl">
                  <div className="max-h-[300px] overflow-y-auto p-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition ${
                          i18n.language === lang.code
                            ? "bg-[color:var(--brand-mist)] text-[color:var(--brand-green)] font-semibold"
                            : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <span>{lang.name}</span>
                        {i18n.language === lang.code && (
                          <svg className="size-4 text-[color:var(--brand-green)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="relative">
            <p className="mb-2 text-sm font-semibold">Currency</p>
            <button
              onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
              className="w-full rounded-md border border-white/15 bg-white px-3 py-2 text-left text-[13px] text-slate-900 transition hover:border-white/30 flex items-center justify-between"
            >
              <span>{getCurrentCurrencyName()}</span>
              <ChevronDown className={`size-4 text-slate-500 transition-transform ${isCurrencyOpen ? 'rotate-180' : ''}`} />
            </button>
            {isCurrencyOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setIsCurrencyOpen(false)}
                />
                <div className="absolute bottom-full left-0 mb-2 z-50 w-full min-w-[250px] rounded-lg border border-slate-200 bg-white shadow-xl">
                  <div className="max-h-[300px] overflow-y-auto p-2">
                    {availableCurrencies.map((curr) => (
                      <button
                        key={curr.code}
                        onClick={() => handleCurrencyChange(curr.code)}
                        className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition ${
                          currency === curr.code
                            ? "bg-[color:var(--brand-mist)] text-[color:var(--brand-green)] font-semibold"
                            : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <div>
                          <div className="font-medium">{curr.code}</div>
                          <div className="text-xs text-slate-500">{curr.name} ({curr.symbol})</div>
                        </div>
                        {currency === curr.code && (
                          <svg className="size-4 text-[color:var(--brand-green)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Ways You Can Pay */}
        <div>
          <p className="mb-3 text-sm font-semibold">{t('footer.waysYouCanPay')}</p>
          <div className="grid grid-cols-3 gap-0">
            <div className="flex items-center justify-center h-8 w-12">
              <img src={viiviPay} alt="Viivi" className="h-full w-full object-contain" />
            </div>
            <div className="flex items-center justify-center h-8 w-12">
              <img src={mastercardPay} alt="Mastercard" className="h-full w-full object-contain" />
            </div>
            <div className="flex items-center justify-center h-8 w-12">
              <img src={amexPay} alt="American Express" className="h-full w-full object-contain" />
            </div>
            <div className="flex items-center justify-center h-8 w-12">
              <img src={googlePay} alt="Google Pay" className="h-full w-full object-contain" />
            </div>
            <div className="flex items-center justify-center h-8 w-12">
              <img src={applePay} alt="Apple Pay" className="h-full w-full object-contain" />
            </div>
            <div className="flex items-center justify-center h-8 w-12">
              <img src={paypalPay} alt="PayPal" className="h-full w-full object-contain" />
            </div>
          </div>
        </div>

        {/* Mobile (Download App) */}
        <div>
          <p className="mb-3 text-sm font-semibold">Mobile</p>
          <div className="space-y-2">
            <a 
              href="#" 
              className="flex items-center gap-2 rounded-lg border border-white/20 bg-black/30 px-3 py-2 transition hover:bg-black/50 hover:border-white/40"
            >
              <GooglePlayIcon />
              <div className="flex flex-col items-start">
                <span className="text-[9px] text-white/70">{t('footer.getItOn')}</span>
                <span className="text-xs font-semibold">{t('footer.googlePlay')}</span>
              </div>
            </a>
            <a 
              href="#" 
              className="flex items-center gap-2 rounded-lg border border-white/20 bg-black/30 px-3 py-2 transition hover:bg-black/50 hover:border-white/40"
            >
              <AppleIcon />
              <div className="flex flex-col items-start">
                <span className="text-[9px] text-white/70">{t('footer.downloadOn')}</span>
                <span className="text-xs font-semibold">{t('footer.appStore')}</span>
              </div>
            </a>
          </div>
        </div>

        {/* Support */}
        <div>
          <p className="mb-3 text-sm font-semibold">{t('footer.support')}</p>
          <div className="space-y-2 text-xs text-white/80">
            <a href="#" className="block transition hover:text-white">{t('footer.helpCentre')}</a>
            <a href="#" className="block transition hover:text-white">{t('footer.contactUs')}</a>
            <a href="#" className="block transition hover:text-white">{t('footer.liveChat')}</a>
            <a href="#" className="block transition hover:text-white">{t('footer.bookingSupport')}</a>
            <a href="#" className="block transition hover:text-white">{t('footer.cancellationHelp')}</a>
            <a href="#" className="block transition hover:text-white">{t('footer.faq')}</a>
          </div>
        </div>

        {/* Company */}
        <div>
          <p className="mb-3 text-sm font-semibold">{t('footer.company')}</p>
          <div className="space-y-2 text-xs text-white/80">
            <a href="#" className="block transition hover:text-white">{t('footer.aboutUs')}</a>
            <a href="#" className="block transition hover:text-white">{t('footer.careers')}</a>
            <a href="#" className="block transition hover:text-white">{t('footer.partners')}</a>
            <a href="#" className="block transition hover:text-white">{t('footer.affiliateProgram')}</a>
            <a href="#" className="block transition hover:text-white">{t('footer.press')}</a>
            <a href="#" className="block transition hover:text-white">{t('footer.investorRelations')}</a>
          </div>
        </div>

        {/* Supplier Zone */}
        <div>
          <p className="mb-3 text-sm font-semibold">{t('footer.supplierZone')}</p>
          <div className="space-y-2 text-xs text-white/80">
            <a href="#" className="block transition hover:text-white">{t('footer.listYourTours')}</a>
            <a href="#" className="block transition hover:text-white">{t('footer.becomeOperator')}</a>
            <a href="#" className="block transition hover:text-white">{t('footer.supplierDashboard')}</a>
            <a href="#" className="block transition hover:text-white">{t('footer.apiAccess')}</a>
            <a href="#" className="block transition hover:text-white">{t('footer.agentAccounts')}</a>
          </div>
        </div>

        {/* Explore Section */}
        <div>
          <p className="mb-3 text-sm font-semibold">{t('footer.explore')}</p>
          <div className="space-y-2 text-xs text-white/80">
            <a href="#" className="block transition hover:text-white">{t('footer.home')}</a>
            <a href="#" className="block transition hover:text-white">{t('footer.tours')}</a>
            <a href="#" className="block transition hover:text-white">{t('footer.destinations')}</a>
            <a href="#" className="block transition hover:text-white">{t('footer.deals')}</a>
            <a href="#" className="block transition hover:text-white">{t('footer.aboutUs')}</a>
            <a href="#" className="block transition hover:text-white">{t('footer.contact')}</a>
          </div>
        </div>
      </div>

      {/* Bottom Section with Copyright, Social Media, and Links */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1520px] px-3 py-4 sm:px-4 lg:px-6">
          <div className="flex flex-col gap-4 text-xs text-white/80 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
              <p>{t('footer.copyright')}</p>
              <div className="flex items-center justify-center gap-3 text-white">
                <a href="#" className="transition hover:opacity-80">
                  <img src={instagramImg} alt="Instagram" className="h-5 w-5 object-contain" />
                </a>
                <a href="#" className="transition hover:opacity-80">
                  <img src={facebookImg} alt="Facebook" className="h-5 w-5 object-contain" />
                </a>
                <a href="#" className="transition hover:opacity-80">
                  <img src={tiktokImg} alt="TikTok" className="h-5 w-5 object-contain" />
                </a>
                <a href="#" className="transition hover:opacity-80">
                  <img src={youtubeImg} alt="YouTube" className="h-5 w-5 object-contain" />
                </a>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <a href="#" className="transition hover:text-white">{t('footer.termsConditions')}</a>
              <span>|</span>
              <a href="#" className="transition hover:text-white">{t('footer.privacyPolicy')}</a>
              <span>|</span>
              <a href="#" className="transition hover:text-white">{t('footer.refundPolicy')}</a>
              <span>|</span>
              <a href="#" className="transition hover:text-white">{t('footer.cookiePolicy')}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
