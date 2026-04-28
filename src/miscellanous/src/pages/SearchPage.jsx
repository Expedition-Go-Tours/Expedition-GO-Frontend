import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Filter,
  MapPin,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  Trees,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  buildSearchParams,
  createDefaultFormValues,
  getSearchStateFromParams,
  matchesSearchTokens,
  parseBudget,
  parsePartySize,
  searchCategories,
  searchCategoryMap,
} from "@/lib/searchConfig";

const filters = ["All", "Weekend", "Culture", "Nature", "Family", "Luxury"];

const experiences = [
  {
    id: "cape-coast-heritage",
    title: "Cape Coast Heritage Escape",
    location: "Cape Coast",
    category: "Culture",
    duration: "2 days",
    groupSize: "Up to 8 travelers",
    rating: 4.9,
    reviews: 214,
    price: 240,
    blurb: "Castle visits, beach sunsets, and storytelling-led heritage walks.",
    image:
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=80",
    tags: ["Weekend", "Culture"],
  },
  {
    id: "wli-waterfalls",
    title: "Volta Waterfalls Adventure",
    location: "Volta Region",
    category: "Nature",
    duration: "3 days",
    groupSize: "Up to 10 travelers",
    rating: 4.8,
    reviews: 178,
    price: 310,
    blurb: "Guided waterfall trails, mountain views, and peaceful eco-lodge stays.",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    tags: ["Nature", "Weekend"],
  },
  {
    id: "accra-food-trail",
    title: "Accra City and Food Trail",
    location: "Accra",
    category: "Family",
    duration: "1 day",
    groupSize: "Up to 12 travelers",
    rating: 4.7,
    reviews: 301,
    price: 95,
    blurb: "Markets, art spaces, and chef-picked stops across the city.",
    image:
      "https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=1200&q=80",
    tags: ["Family", "Culture"],
  },
  {
    id: "kumasi-culture",
    title: "Kumasi Culture Journey",
    location: "Kumasi",
    category: "Culture",
    duration: "2 days",
    groupSize: "Up to 6 travelers",
    rating: 4.9,
    reviews: 143,
    price: 220,
    blurb: "Ashanti history, kente workshops, and guided palace district tours.",
    image:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80",
    tags: ["Culture", "Luxury"],
  },
  {
    id: "mole-safari",
    title: "Mole Safari Retreat",
    location: "Mole National Park",
    category: "Nature",
    duration: "4 days",
    groupSize: "Up to 8 travelers",
    rating: 4.9,
    reviews: 126,
    price: 520,
    blurb: "Sunrise game drives, canopy viewpoints, and curated lodge dining.",
    image:
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1200&q=80",
    tags: ["Nature", "Luxury"],
  },
  {
    id: "ada-river",
    title: "Ada River and Beach Reset",
    location: "Ada Foah",
    category: "Weekend",
    duration: "2 days",
    groupSize: "Up to 10 travelers",
    rating: 4.6,
    reviews: 89,
    price: 180,
    blurb: "A calm river cruise, breezy beachfront stays, and slow travel energy.",
    image:
      "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&w=1200&q=80",
    tags: ["Weekend", "Family"],
  },
];

const sortOptions = {
  featured: (left, right) => right.rating - left.rating || left.price - right.price,
  priceAsc: (left, right) => left.price - right.price,
  priceDesc: (left, right) => right.price - left.price,
  rating: (left, right) => right.rating - left.rating,
};

function StatPill({ icon: Icon, label, value }) {
  return (
    <div className="rounded-[1.4rem] border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm">
      <div className="flex items-center gap-2 text-emerald-100">
        <Icon className="h-4 w-4" />
        <span className="text-xs font-bold uppercase tracking-[0.18em]">{label}</span>
      </div>
      <p className="mt-2 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}

function SearchField({ field, value, onChange }) {
  const Icon = field.icon;

  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
        {field.label}
      </span>
      <div className="flex items-center rounded-full border border-slate-200 bg-slate-50 px-4">
        <Icon className="h-4 w-4 text-slate-400" />
        <Input
          className="border-0 bg-transparent px-3 shadow-none focus:border-0 focus:ring-0"
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

function getCapacity(experience) {
  const match = experience.groupSize.match(/\d+/);
  return match ? Number.parseInt(match[0], 10) : null;
}

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const appliedState = useMemo(
    () => getSearchStateFromParams(searchParams),
    [searchParams],
  );

  const [selectedCategoryId, setSelectedCategoryId] = useState(appliedState.categoryId);
  const [formValues, setFormValues] = useState(appliedState.formValues);
  const [activeFilter, setActiveFilter] = useState(appliedState.filter);
  const [sortBy, setSortBy] = useState(appliedState.sortBy);

  useEffect(() => {
    setSelectedCategoryId(appliedState.categoryId);
    setFormValues(appliedState.formValues);
    setActiveFilter(appliedState.filter);
    setSortBy(appliedState.sortBy);
  }, [appliedState]);

  const selectedCategory = searchCategoryMap[selectedCategoryId] ?? searchCategories[0];
  const queryText = appliedState.query;

  const results = useMemo(() => {
    const budgetCap = parseBudget(formValues);
    const partySize = parsePartySize(formValues);

    return experiences
      .filter((experience) => {
        const searchableText = [
          experience.title,
          experience.location,
          experience.blurb,
          experience.category,
          ...experience.tags,
        ].join(" ");
        const matchesQuery = matchesSearchTokens(searchableText, queryText);
        const matchesFilter =
          activeFilter === "All" ||
          experience.category === activeFilter ||
          experience.tags.includes(activeFilter);
        const matchesBudget = budgetCap === null || experience.price <= budgetCap;
        const capacity = getCapacity(experience);
        const matchesPartySize =
          partySize === null || capacity === null || capacity >= partySize;

        return matchesQuery && matchesFilter && matchesBudget && matchesPartySize;
      })
      .sort(sortOptions[sortBy]);
  }, [activeFilter, formValues, queryText, sortBy]);

  const highlightedResult = results[0] ?? null;

  function updateField(fieldKey, fieldValue) {
    setFormValues((currentValues) => ({
      ...currentValues,
      [fieldKey]: fieldValue,
    }));
  }

  function handleCategoryChange(nextCategoryId) {
    setSelectedCategoryId(nextCategoryId);
    setFormValues(createDefaultFormValues(nextCategoryId));
  }

  function handleSearchSubmit(event) {
    event.preventDefault();

    setSearchParams(
      buildSearchParams({
        categoryId: selectedCategoryId,
        formValues,
        filter: activeFilter,
        sortBy,
      }),
    );
  }

  function resetSearch() {
    const defaultCategoryId = "tours";

    setSelectedCategoryId(defaultCategoryId);
    setFormValues(createDefaultFormValues(defaultCategoryId));
    setActiveFilter("All");
    setSortBy("featured");
    setSearchParams(
      buildSearchParams({
        categoryId: defaultCategoryId,
        formValues: createDefaultFormValues(defaultCategoryId),
      }),
    );
  }

  return (
    <main className="min-h-screen bg-mist text-slate-900">
      <section className="relative overflow-hidden bg-gradient-to-br from-forest via-[#0B7A58] to-[#2EC489] px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-hero-grid bg-[size:24px_24px] opacity-20" />
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl">
          <Link
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-50 transition hover:text-white"
            to="/"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <Badge className="border-white/15 bg-white/10 text-white">
                Curated travel search
              </Badge>
              <h1 className="mt-5 font-display text-4xl font-extrabold text-white md:text-6xl">
                Find the next trip that fits your pace.
              </h1>
              <p className="mt-4 max-w-2xl text-base text-emerald-50/90 md:text-lg">
                Browse handpicked Ghana experiences with fast filters for style, budget, and trip
                length.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <StatPill icon={Trees} label="Trips" value={`${results.length} curated options`} />
              <StatPill icon={Sparkles} label="Focus" value={selectedCategory.label} />
              <StatPill
                icon={Star}
                label="Query"
                value={queryText || selectedCategory.searchPlaceholder}
              />
            </div>
          </div>

          <Card className="mt-10 border-0 bg-white/95 shadow-float backdrop-blur">
            <CardContent className="p-4 md:p-5">
              <form
                className="grid gap-4 xl:grid-cols-[1fr_repeat(4,minmax(0,1fr))_0.85fr_0.85fr_auto]"
                onSubmit={handleSearchSubmit}
              >
                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                    Search type
                  </span>
                  <div className="flex items-center rounded-full border border-slate-200 bg-slate-50 px-4">
                    <Filter className="h-4 w-4 text-slate-400" />
                    <select
                      className="h-11 w-full bg-transparent px-3 text-sm font-medium text-slate-700 outline-none"
                      onChange={(event) => handleCategoryChange(event.target.value)}
                      value={selectedCategoryId}
                    >
                      {searchCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </label>

                {selectedCategory.fields.map((field) => (
                  <SearchField
                    field={field}
                    key={field.key}
                    onChange={updateField}
                    value={formValues[field.key] ?? ""}
                  />
                ))}

                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                    Style
                  </span>
                  <div className="flex items-center rounded-full border border-slate-200 bg-slate-50 px-4">
                    <Search className="h-4 w-4 text-slate-400" />
                    <select
                      className="h-11 w-full bg-transparent px-3 text-sm font-medium text-slate-700 outline-none"
                      onChange={(event) => setActiveFilter(event.target.value)}
                      value={activeFilter}
                    >
                      {filters.map((filter) => (
                        <option key={filter} value={filter}>
                          {filter}
                        </option>
                      ))}
                    </select>
                  </div>
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                    Sort
                  </span>
                  <div className="flex items-center rounded-full border border-slate-200 bg-slate-50 px-4">
                    <SlidersHorizontal className="h-4 w-4 text-slate-400" />
                    <select
                      className="h-11 w-full bg-transparent px-3 text-sm font-medium text-slate-700 outline-none"
                      onChange={(event) => setSortBy(event.target.value)}
                      value={sortBy}
                    >
                      <option value="featured">Featured</option>
                      <option value="rating">Top rated</option>
                      <option value="priceAsc">Lowest price</option>
                      <option value="priceDesc">Highest price</option>
                    </select>
                  </div>
                </label>

                <Button className="h-11 px-6 xl:self-end" type="submit">
                  Explore
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 xl:grid-cols-[0.7fr_1.3fr]">
          <aside className="space-y-6">
            <Card className="border-0">
              <CardContent className="p-6">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-400">
                  Quick filters
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {filters.map((filter) => (
                    <button
                      className={cn(
                        "rounded-full border px-4 py-2 text-sm font-semibold transition",
                        activeFilter === filter
                          ? "border-primary bg-primary text-white"
                          : "border-slate-200 bg-white text-slate-600 hover:border-primary/30 hover:text-primary",
                      )}
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      type="button"
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {highlightedResult ? (
              <Card className="overflow-hidden border-0 bg-slate-950 text-white">
                <img
                  alt={highlightedResult.title}
                  className="h-56 w-full object-cover opacity-80"
                  src={highlightedResult.image}
                />
                <CardContent className="p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-200">
                    Featured match
                  </p>
                  <h2 className="mt-3 font-display text-2xl font-extrabold">
                    {highlightedResult.title}
                  </h2>
                  <p className="mt-3 text-sm text-slate-300">{highlightedResult.blurb}</p>
                  <div className="mt-5 flex items-center gap-3 text-sm text-slate-200">
                    <span className="inline-flex items-center gap-1">
                      <Star className="h-4 w-4 fill-current text-amber-400" />
                      {highlightedResult.rating}
                    </span>
                    <span>{highlightedResult.location}</span>
                  </div>
                </CardContent>
              </Card>
            ) : null}
          </aside>

          <div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-400">
                  Results
                </p>
                <h2 className="mt-1 font-display text-3xl font-extrabold text-slate-950">
                  {results.length} trip{results.length === 1 ? "" : "s"} available
                </h2>
              </div>
              <p className="text-sm text-slate-500">
                Showing curated matches for{" "}
                <span className="font-semibold text-slate-700">
                  {queryText || selectedCategory.label}
                </span>
              </p>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {results.map((experience) => (
                <Card className="overflow-hidden border-0" key={experience.id}>
                  <div className="relative">
                    <img
                      alt={experience.title}
                      className="h-64 w-full object-cover"
                      src={experience.image}
                    />
                    <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-primary">
                        {experience.category}
                      </span>
                      <span className="rounded-full bg-slate-950/70 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
                        From ${experience.price}
                      </span>
                    </div>
                  </div>

                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-display text-2xl font-extrabold text-slate-950">
                          {experience.title}
                        </h3>
                        <p className="mt-2 text-sm text-slate-600">{experience.blurb}</p>
                      </div>
                      <div className="rounded-full bg-amber-50 px-3 py-1 text-sm font-bold text-amber-600">
                        {experience.rating}
                      </div>
                    </div>

                    <div className="mt-5 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                      <div className="inline-flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        {experience.location}
                      </div>
                      <div className="inline-flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-primary" />
                        {experience.duration}
                      </div>
                      <div className="inline-flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        {experience.groupSize}
                      </div>
                      <div className="inline-flex items-center gap-2">
                        <Clock3 className="h-4 w-4 text-primary" />
                        {experience.reviews} verified reviews
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {experience.tags.map((tag) => (
                        <span
                          className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-500"
                          key={tag}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <p className="text-sm text-slate-500">
                        Starting from{" "}
                        <span className="font-bold text-slate-900">${experience.price}</span>
                      </p>
                      <Button size="sm">View itinerary</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {results.length === 0 ? (
              <Card className="mt-6 border-0">
                <CardContent className="p-8 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Search className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-extrabold text-slate-950">
                    No trips matched that search
                  </h3>
                  <p className="mt-3 text-slate-600">
                    Try a broader destination name, raise the budget, or reset the active filter.
                  </p>
                  <Button className="mt-6" onClick={resetSearch} variant="outline">
                    Reset filters
                  </Button>
                </CardContent>
              </Card>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}
