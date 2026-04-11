export type StartupStatus = "completed" | "in-progress" | "upcoming";

export interface Startup {
  week: number;
  name: string;
  tagline: string;
  url: string;
  thumbnail: string;
  category: string;
  status: StartupStatus;
  launchDate: string;
  tags: string[];
  blogUrl?: string;
}

export const startups: Startup[] = [
  {
    week: 1,
    name: "Startup Alpha",
    tagline: "The beginning of a long journey to greatness.",
    url: "https://alpha.52startup.com",
    thumbnail: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "SaaS",
    status: "completed",
    launchDate: "2026-04-01",
    tags: ["MVP", "SaaS", "India"],
  },
  {
    week: 2,
    name: "Beta Analytics",
    tagline: "Simple analytics for Indian SME builders.",
    url: "https://beta.52startup.com",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Analytics",
    status: "in-progress",
    launchDate: "2026-04-08",
    tags: ["Analytics", "B2B"],
  },
  // Placeholders for remaining weeks
  ...Array.from({ length: 50 }, (_, i) => ({
    week: i + 3,
    name: "Coming Soon",
    tagline: "Something big is brewing in Bharat.",
    url: "#",
    thumbnail: "",
    category: "Upcoming",
    status: "upcoming" as StartupStatus,
    launchDate: "",
    tags: [],
  })),
];
