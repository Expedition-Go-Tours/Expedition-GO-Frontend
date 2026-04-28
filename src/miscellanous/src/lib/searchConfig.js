import {
  BedDouble,
  CalendarDays,
  CircleDollarSign,
  MapPin,
  Plane,
  Search,
  Ticket,
  Trees,
  Users,
  UtensilsCrossed,
} from "lucide-react";

export const searchCategories = [
  {
    id: "tours",
    label: "Tours",
    icon: Trees,
    buttonLabel: "Find tours",
    searchPlaceholder: "Search tour destinations",
    fields: [
      {
        key: "destination",
        label: "Destination",
        icon: MapPin,
        type: "text",
        placeholder: "Accra or Cape Coast",
        defaultValue: "Accra",
        searchable: true,
      },
      {
        key: "date",
        label: "Departure",
        icon: CalendarDays,
        type: "date",
        defaultValue: "",
      },
      {
        key: "travelers",
        label: "Travelers",
        icon: Users,
        type: "number",
        min: 1,
        placeholder: "2",
        defaultValue: "2",
      },
      {
        key: "budget",
        label: "Budget",
        icon: CircleDollarSign,
        type: "number",
        min: 0,
        placeholder: "500",
        defaultValue: "",
      },
    ],
  },
  {
    id: "flights",
    label: "Flights",
    icon: Plane,
    buttonLabel: "Search flights",
    searchPlaceholder: "Search routes",
    fields: [
      {
        key: "from",
        label: "From",
        icon: Plane,
        type: "text",
        placeholder: "Accra",
        defaultValue: "Accra",
        searchable: true,
      },
      {
        key: "to",
        label: "To",
        icon: MapPin,
        type: "text",
        placeholder: "Kumasi",
        defaultValue: "",
        searchable: true,
      },
      {
        key: "date",
        label: "Departure",
        icon: CalendarDays,
        type: "date",
        defaultValue: "",
      },
      {
        key: "travelers",
        label: "Travelers",
        icon: Users,
        type: "number",
        min: 1,
        placeholder: "1",
        defaultValue: "1",
      },
    ],
  },
  {
    id: "hotels",
    label: "Hotels",
    icon: BedDouble,
    buttonLabel: "Search stays",
    searchPlaceholder: "Search stays by city",
    fields: [
      {
        key: "location",
        label: "Location",
        icon: MapPin,
        type: "text",
        placeholder: "Labadi, Accra",
        defaultValue: "Accra",
        searchable: true,
      },
      {
        key: "checkIn",
        label: "Check-in",
        icon: CalendarDays,
        type: "date",
        defaultValue: "",
      },
      {
        key: "guests",
        label: "Guests",
        icon: Users,
        type: "number",
        min: 1,
        placeholder: "2",
        defaultValue: "2",
      },
      {
        key: "budget",
        label: "Budget",
        icon: CircleDollarSign,
        type: "number",
        min: 0,
        placeholder: "450",
        defaultValue: "",
      },
    ],
  },
  {
    id: "restaurants",
    label: "Restaurants",
    icon: UtensilsCrossed,
    buttonLabel: "Find tables",
    searchPlaceholder: "Search dining spots",
    fields: [
      {
        key: "city",
        label: "City",
        icon: MapPin,
        type: "text",
        placeholder: "Accra",
        defaultValue: "Accra",
        searchable: true,
      },
      {
        key: "date",
        label: "Date",
        icon: CalendarDays,
        type: "date",
        defaultValue: "",
      },
      {
        key: "diners",
        label: "Diners",
        icon: Users,
        type: "number",
        min: 1,
        placeholder: "2",
        defaultValue: "2",
      },
      {
        key: "cuisine",
        label: "Cuisine",
        icon: Ticket,
        type: "text",
        placeholder: "Seafood or local",
        defaultValue: "",
        searchable: true,
      },
    ],
  },
];

export const searchCategoryMap = Object.fromEntries(
  searchCategories.map((category) => [category.id, category]),
);

export function createDefaultFormValues(categoryId) {
  const category = searchCategoryMap[categoryId] ?? searchCategories[0];

  return category.fields.reduce((accumulator, field) => {
    accumulator[field.key] = field.defaultValue ?? "";
    return accumulator;
  }, {});
}

export function createDefaultSearchForms() {
  return searchCategories.reduce((accumulator, category) => {
    accumulator[category.id] = createDefaultFormValues(category.id);
    return accumulator;
  }, {});
}

export function buildSearchParams({ categoryId, formValues, filter = "All", sortBy = "featured" }) {
  const params = new URLSearchParams();
  const category = searchCategoryMap[categoryId] ?? searchCategories[0];

  params.set("category", category.id);

  if (filter && filter !== "All") {
    params.set("filter", filter);
  }

  if (sortBy && sortBy !== "featured") {
    params.set("sort", sortBy);
  }

  category.fields.forEach((field) => {
    const value = formValues[field.key]?.toString().trim();

    if (value) {
      params.set(field.key, value);
    }
  });

  const query = deriveSearchText(category.id, formValues);

  if (query) {
    params.set("q", query);
  }

  return params;
}

export function getSearchStateFromParams(searchParams) {
  const requestedCategoryId = searchParams.get("category");
  const category = searchCategoryMap[requestedCategoryId] ?? searchCategories[0];
  const filter = searchParams.get("filter") || "All";
  const sortBy = searchParams.get("sort") || "featured";
  const formValues = createDefaultFormValues(category.id);

  category.fields.forEach((field) => {
    const value = searchParams.get(field.key);

    if (value !== null) {
      formValues[field.key] = value;
    }
  });

  return {
    categoryId: category.id,
    filter,
    sortBy,
    formValues,
    query: searchParams.get("q") || deriveSearchText(category.id, formValues),
  };
}

export function deriveSearchText(categoryId, formValues) {
  const category = searchCategoryMap[categoryId] ?? searchCategories[0];

  return category.fields
    .filter((field) => field.searchable)
    .map((field) => formValues[field.key]?.toString().trim())
    .filter(Boolean)
    .join(" ");
}

export function parsePartySize(formValues) {
  const candidate =
    formValues.travelers || formValues.guests || formValues.diners || "";
  const parsed = Number.parseInt(candidate, 10);

  return Number.isNaN(parsed) ? null : parsed;
}

export function parseBudget(formValues) {
  const parsed = Number.parseInt(formValues.budget || "", 10);

  return Number.isNaN(parsed) ? null : parsed;
}

export function matchesSearchTokens(text, query) {
  const normalizedText = text.toLowerCase();
  const tokens = query
    .toLowerCase()
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean);

  if (!tokens.length) {
    return true;
  }

  return tokens.some((token) => normalizedText.includes(token));
}

export const searchFormDecor = {
  formIcon: Search,
};
