import { useMemo } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader, sectionMotion } from "./SectionHeader";
import { cn } from "@/lib/utils";

const storyFilters = ["All", "Food", "Culture", "Arts", "Destinations", "Tips"];

const stories = [
  {
    tag: "Food",
    title: "A Foodie's Guide to Ghanaian Cuisine",
    description:
      "From spicy jollof rice to rich groundnut soup, discover the flavors that define Ghana.",
    rating: "4.8",
    time: "5 min read",
    image:
      "https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    tag: "Culture",
    title: "The Living Legacy of Ashanti Culture",
    description:
      "Explore the vibrant Ashanti Kingdom through kente cloth, golden stools, and oral tradition.",
    rating: "4.9",
    time: "6 min read",
    image:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80",
  },
];

export function StoriesSection({ activeFilter, setActiveFilter }) {
  const filteredStories = useMemo(() => {
    if (activeFilter === "All") {
      return stories;
    }
    return stories.filter((story) => story.tag === activeFilter);
  }, [activeFilter]);

  return (
    <motion.section
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      initial="hidden"
      variants={sectionMotion}
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <SectionHeader
        description="Curated content from our travel experts on the ground."
        eyebrow="Discover Ghana"
        title="Stories, Tips & Guides"
      />

      <div className="mt-8 flex gap-3 overflow-x-auto pb-2">
        {storyFilters.map((filter) => (
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

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {filteredStories.map((story) => (
          <motion.article key={story.title} whileHover={{ y: -5 }}>
            <Card className="overflow-hidden">
              <div className="relative">
                <img alt={story.title} className="h-72 w-full object-cover" src={story.image} />
                <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-bold text-primary">
                  {story.tag}
                </span>
              </div>
              <CardContent>
                <h3 className="text-xl font-bold text-slate-950">{story.title}</h3>
                <p className="mt-3 text-sm text-slate-600">{story.description}</p>
                <div className="mt-5 flex items-center justify-between text-sm text-slate-500">
                  <span className="inline-flex items-center gap-1 font-semibold text-amber-500">
                    <Star className="h-4 w-4 fill-current" />
                    {story.rating}
                  </span>
                  <span>{story.time}</span>
                </div>
              </CardContent>
            </Card>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}