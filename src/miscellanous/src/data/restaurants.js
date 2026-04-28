export const restaurants = [
  {
    title: "Buka Bay",
    slug: "buka-bay",
    cuisine: "Contemporary Ghanaian",
    location: "Osu, Accra",
    priceRange: "$$",
    hours: "10:00 AM - 10:30 PM",
    image: "https://bukarestaurant.com/images/home-3.jpg",
    description:
      "A polished local favorite serving elevated Ghanaian staples, grilled seafood, and small plates in a breezy courtyard setting.",
    highlights: ["Jollof tasting board", "Charcoal tilapia", "Craft sobolo"],
  },
  {
    title: "Harbor Spoon",
    slug: "harbor-spoon",
    cuisine: "Seafood & Grill",
    location: "Labadi, Accra",
    priceRange: "$$$",
    hours: "12:00 PM - 11:00 PM",
    image: "https://images.tgtg.ninja/item/cover/3c1e9573-41f4-46a2-a109-ee0f3ff5ccbc.jpg",
    description:
      "Fresh catch, sunset views, and a relaxed terrace make this a strong stop after a beach day or evening tour.",
    highlights: ["Peppered lobster", "Coconut rice", "Sunset mocktails"],
  },
  {
    title: "Golden Kente Table",
    slug: "golden-kente-table",
    cuisine: "Ashanti Kitchen",
    location: "Adum, Kumasi",
    priceRange: "$$",
    hours: "9:00 AM - 9:00 PM",
    image: "https://media.evendo.com/locations-resized/RestaurantImages/360x263/213a7108-e398-4211-bb17-71aa02c5c710",
    description:
      "Comforting regional dishes, warm service, and a colorful dining room inspired by Ashanti textiles and craft traditions.",
    highlights: ["Fufu with light soup", "Kontomire stew", "Kelewele basket"],
  },
  {
    title: "Volta Vista Kitchen",
    slug: "volta-vista-kitchen",
    cuisine: "Lakefront Dining",
    location: "Akosombo, Eastern Region",
    priceRange: "$$$",
    hours: "11:00 AM - 10:00 PM",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/12/88/f0/sogakope-beach-resort.jpg",
    description:
      "A scenic restaurant with river breezes, grilled specialties, and family-style plates made for group getaways.",
    highlights: ["Smoked chicken platter", "Plantain canapes", "Passion fruit cooler"],
  },
  {
    title: "Savannah Clay Oven",
    slug: "savannah-clay-oven",
    cuisine: "Northern Fusion",
    location: "Tamale",
    priceRange: "$$",
    hours: "8:30 AM - 9:30 PM",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/c1/40/69/outdoor-lounge.jpg?w=900&h=500&s=1",
    description:
      "An easygoing spot blending northern flavors with wood-fired cooking, hearty brunches, and friendly communal seating.",
    highlights: ["Suya flatbread", "Braised goat bowl", "Spiced millet drink"],
  },
  {
    title: "Castle View Bistro",
    slug: "castle-view-bistro",
    cuisine: "Heritage Cafe",
    location: "Cape Coast",
    priceRange: "$$",
    hours: "10:30 AM - 10:00 PM",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjllXMBOGEi_9gQWhtYtnO0TBBwGwqZyf99Q&s",
    description:
      "Ideal for a relaxed meal after sightseeing, with pastries, local stews, and ocean-influenced mains near the historic coast.",
    highlights: ["Coconut fish curry", "House meat pie", "Iced ginger brew"],
  },
];

export function getRestaurantBySlug(slug) {
  return restaurants.find((restaurant) => restaurant.slug === slug);
}
