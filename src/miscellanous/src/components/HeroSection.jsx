import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CircleDollarSign, Headphones, Search, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  buildSearchParams,
  createDefaultSearchForms,
  searchCategories,
  searchCategoryMap,
} from "@/lib/searchConfig";
import { sectionMotion } from "./SectionHeader";

function SearchField({ field, value, onChange }) {
  const Icon = field.icon;

  return (
    <label className="min-h-[88px] rounded-[1.5rem] border border-slate-200 bg-slate-50/90 px-4 py-3.5 transition hover:border-primary/20 hover:bg-white">
      <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
        {field.label}
      </span>
      <div className="mt-3 flex items-center gap-2">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </div>
        <Input
          className="h-auto rounded-none border-0 bg-transparent px-0 py-0 text-sm font-semibold text-slate-700 shadow-none placeholder:text-slate-400 focus:ring-0 sm:text-[15px]"
          min={field.min}
          onChange={(event) => onChange(field.key, event.target.value)}
          placeholder={field.placeholder}
          type={field.type}
          value={value}
        />
      </div>
    </label>
  );
}

export function HeroSection() {
  const navigate = useNavigate();
  const [activeSearchCategory, setActiveSearchCategory] = useState("tours");
  const [searchForms, setSearchForms] = useState(() => createDefaultSearchForms());
  const selectedSearchCategory =
    searchCategoryMap[activeSearchCategory] ?? searchCategories[0];

  function updateField(fieldKey, fieldValue) {
    setSearchForms((currentForms) => ({
      ...currentForms,
      [activeSearchCategory]: {
        ...currentForms[activeSearchCategory],
        [fieldKey]: fieldValue,
      },
    }));
  }

  function handleSearchSubmit(event) {
    event.preventDefault();

    const params = buildSearchParams({
      categoryId: activeSearchCategory,
      formValues: searchForms[activeSearchCategory],
    });

    navigate({
      pathname: "/search",
      search: `?${params.toString()}`,
    });
  }

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-forest via-[#0B7A58] to-[#33C58B] pb-36 pt-14 text-white lg:pb-44 lg:pt-20">
        <div className="absolute inset-0 bg-hero-grid bg-[size:24px_24px] opacity-30" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.22),transparent_60%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-white/15 [clip-path:polygon(0_28%,100%_0,100%_100%,0_100%)]" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            animate="show"
            className="mx-auto max-w-4xl text-center"
            initial="hidden"
            variants={sectionMotion}
          >
            <Badge className="border-primary/20 bg-white/15 text-white">
              Eco-Certified Travel Agency - Accra, Ghana
            </Badge>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight md:text-6xl">
              Explore Ghana & Beyond
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-emerald-50/90 md:text-lg">
              Curated rail, air, and eco-tour experiences designed for travelers who want
              premium comfort, local authenticity, and seamless planning.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-5 text-sm font-medium text-emerald-50">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                Secure payment
              </span>
              <span className="inline-flex items-center gap-2">
                <Headphones className="h-4 w-4" />
                24/7 support
              </span>
              <span className="inline-flex items-center gap-2">
                <CircleDollarSign className="h-4 w-4" />
                Best price guarantee
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
        <Card className="overflow-hidden border-0 shadow-float">
          <CardContent className="space-y-6 p-4 md:p-6 lg:p-7">
            <div className="grid grid-cols-4 gap-2 pb-1 md:mx-auto md:flex md:w-fit md:flex-wrap md:justify-center">
              {searchCategories.map((category) => {
                const Icon = category.icon;
                const isActive = category.id === selectedSearchCategory.id;

                return (
                  <button
                    className={`flex min-h-11 w-full flex-col items-center justify-center gap-1 rounded-full px-1 py-2 text-[10px] font-semibold transition sm:px-2 sm:text-[11px] md:w-auto md:flex-row md:gap-2 md:px-5 md:text-sm ${
                      isActive
                        ? "bg-primary text-white shadow-soft"
                        : "border border-slate-200 bg-white text-slate-600 hover:border-primary/30 hover:text-primary"
                    }`}
                    key={category.id}
                    onClick={() => setActiveSearchCategory(category.id)}
                    type="button"
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
                    <span className="max-w-full whitespace-nowrap text-[10px] sm:text-[11px] md:text-sm">
                      {category.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <form
              className="grid gap-3 md:grid-cols-2 xl:grid-cols-[repeat(4,minmax(0,1fr))_auto]"
              onSubmit={handleSearchSubmit}
            >
              {selectedSearchCategory.fields.map((field) => (
                <SearchField
                  field={field}
                  key={field.key}
                  onChange={updateField}
                  value={searchForms[activeSearchCategory][field.key] ?? ""}
                />
              ))}

              <Button
                className="h-auto min-h-[88px] rounded-[1.5rem] px-7 py-4 text-base md:col-span-2 xl:col-span-1"
                type="submit"
              >
                <Search className="mr-2 h-4 w-4" />
                {selectedSearchCategory.buttonLabel}
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
