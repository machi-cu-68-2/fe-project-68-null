import { Restaurant } from "@/interface/Restaurant";

export const FILTERS = [
  "All",
  "French",
  "Japanese",
  "Italian",
  "Mediterranean",
  "Contemporary",
  "Seafood",
];

export const mockRestaurants: (Restaurant & {
  filter: string;
  description: string;
  tags: string[];
})[] = [
  {
    name: "La Maison Dorée",
    category: "French Contemporary",
    location: "Downtown, Manhattan",
    rating: "4.9",
    reviews: "324",
    imageSrc: "/images/la-maison-doree.jpg",
    filter: "French",
    description:
      "An intimate Parisian-inspired dining room where classical French technique meets modern creativity. Chef Laurent Blanc's tasting menu is a journey through the finest seasonal ingredients sourced from local farms and European purveyors.",
    tags: ["Michelin ★★", "Wine Bar", "Tasting Menu", "Private Dining"],
  },
  {
    name: "Sakura Garden",
    category: "Japanese Fusion",
    location: "Midtown East",
    rating: "4.8",
    reviews: "256",
    imageSrc: "/images/sakura-garden.jpg",
    filter: "Japanese",
    description:
      "Where Tokyo precision meets New York energy. Our omakase experience features the freshest fish flown in daily from Toyosu Market, alongside innovative fusion dishes that honor Japanese culinary traditions.",
    tags: ["Omakase", "Sake Bar", "Sushi", "Seasonal Menu"],
  },
  {
    name: "Oceano Blu",
    category: "Mediterranean Seafood",
    location: "Chelsea, West Side",
    rating: "4.7",
    reviews: "198",
    imageSrc: "/images/oceano-blu.jpg",
    filter: "Seafood",
    description:
      "Inspired by the coastal villages of Southern Italy and Greece, Oceano Blu brings the spirit of the Mediterranean to New York. Our daily catch is prepared simply and beautifully to let the ocean's bounty shine.",
    tags: ["Terrace", "Seafood", "Mediterranean", "Sunset Views"],
  },
  {
    name: "Ember & Oak",
    category: "Modern American Grill",
    location: "TriBeCa",
    rating: "4.6",
    reviews: "412",
    imageSrc: "/images/ember-and-oak.jpg",
    filter: "Contemporary",
    description:
      "Fire is our ingredient. Every dish at Ember & Oak is kissed by the wood-fired hearth, from our dry-aged prime cuts to the roasted seasonal vegetables. Pair with our curated American whiskey collection.",
    tags: ["Wood Fire", "Cocktails", "Steakhouse", "Craft Whiskey"],
  },
  {
    name: "Trattoria Bianca",
    category: "Italian Fine Dining",
    location: "Upper West Side",
    rating: "4.5",
    reviews: "289",
    imageSrc: "/images/trattoria-bianca.jpg",
    filter: "Italian",
    description:
      "A love letter to Northern Italy. Our handmade pastas are crafted fresh each morning, our truffles sourced from Alba, and our wine cellar holds over 800 Italian labels. Eleganza in every bite.",
    tags: ["Pasta Bar", "Truffle", "Italian Wine", "Handmade Pasta"],
  },
  {
    name: "Verdure",
    category: "Plant-Based Contemporary",
    location: "West Village",
    rating: "4.4",
    reviews: "174",
    imageSrc: "/images/verdure.jpg",
    filter: "Contemporary",
    description:
      "Fine dining without compromise. Verdure proves that plant-based cuisine can be just as luxurious and satisfying as anything else. Our 10-course tasting menu is a celebration of vegetables at their peak.",
    tags: ["Vegan", "Organic", "Tasting Menu", "Farm-to-Table"],
  },
  {
    name: "Golden Spice",
    category: "Modern Indian",
    location: "Flatiron District",
    rating: "4.8",
    reviews: "203",
    imageSrc: "/images/golden-spice.jpg",
    filter: "Contemporary",
    description:
      "Chef Priya Sharma reimagines the flavors of her grandmother's kitchen through a modern fine-dining lens. Expect bold spices, unexpected textures, and a warm hospitality that feels like coming home.",
    tags: [
      "Tasting Menu",
      "Vegetarian Options",
      "Cocktail Pairing",
      "Modern Indian",
    ],
  },
  {
    name: "Atelier Blanc",
    category: "French Patisserie & Bistro",
    location: "SoHo",
    rating: "4.6",
    reviews: "156",
    imageSrc: "/images/atelier-blanc.jpg",
    filter: "French",
    description:
      "Morning croissants to evening Burgundy — Atelier Blanc is your all-day Parisian escape in the heart of SoHo. Our pastry chef trained at Ladurée; our sommelier at La Tour d'Argent.",
    tags: ["Breakfast", "Brunch", "Patisserie", "Natural Wine"],
  },
  {
    name: "Pearl & Tide",
    category: "Contemporary Seafood",
    location: "Battery Park",
    rating: "4.7",
    reviews: "231",
    imageSrc: "/images/pearl-and-tide.jpg",
    filter: "Seafood",
    description:
      "Perched at the edge of the harbor, Pearl & Tide offers an unparalleled seafood experience with sweeping views of the bay. Our raw bar is the finest in the city, our lobster bisque legendary.",
    tags: ["Oyster Bar", "Harbor View", "Raw Bar", "Champagne"],
  },
  {
    name: "Kyoto Table",
    category: "Japanese Fine Dining",
    location: "East Village",
    rating: "4.9",
    reviews: "311",
    imageSrc: "/images/kyoto-table.jpg",
    filter: "Japanese",
    description:
      "The quiet elegance of Kyoto distilled into every dish. A 12-seat counter where Chef Takeshi serves a single kaiseki menu each evening, guided by the seasons and the philosophy of wabi-sabi.",
    tags: ["Kaiseki", "Sake Pairing", "Counter Dining", "Reservation Only"],
  },
  {
    name: "Ristorante Fiorentino",
    category: "Italian Coastal",
    location: "Little Italy",
    rating: "4.5",
    reviews: "189",
    imageSrc: "/images/ristorante-fiorentino.jpg",
    filter: "Italian",
    description:
      "Three generations of the Fiorentino family have served the flavors of coastal Tuscany in this beloved Little Italy institution. The ribollita and the bistecca Fiorentina remain unchanged since 1987.",
    tags: ["Family-Owned", "Tuscan", "Traditional", "Historic"],
  },
  {
    name: "Le Petit Jardin",
    category: "French Bistro",
    location: "Upper East Side",
    rating: "4.6",
    reviews: "142",
    imageSrc: "/images/le-petit-jardin.jpg",
    filter: "French",
    description:
      "A flower-filled garden terrace that transports you to the 6th arrondissement. Classic bistro fare done with love — steak frites, soupe à l'oignon, and the best crème brûlée on the Upper East Side.",
    tags: ["Garden Terrace", "Classic Bistro", "Pet-Friendly", "Lunch"],
  },
];
