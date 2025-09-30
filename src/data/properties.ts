// src/data/properties.ts

export type Property = {
  id: string;
  name: string;
  location: string;
  pricePerNight: number;
  type: string;
  images: string[];
  description: string;
};

export const properties: Property[] = [
  {
    id: "golden-royale",
    name: "Golden Royale Hotel",
    location: "Enugu, Enugu State",
    pricePerNight: 20000,
    type: "Hotel",
    images: [
      "https://source.unsplash.com/800x600/?hotel,enugu",
      "https://source.unsplash.com/800x600/?hotel,lounge",
    ],
    description: "Premium hotel in Enugu with luxury rooms, pool, and restaurant.",
  },
  {
    id: "nike-lake",
    name: "Nike Lake Resort",
    location: "Enugu, Enugu State",
    pricePerNight: 18000,
    type: "Resort",
    images: [
      "https://source.unsplash.com/800x600/?resort,lake",
      "https://source.unsplash.com/800x600/?resort,room",
    ],
    description: "Relaxing resort by Nike Lake. Perfect for leisure and conferences.",
  },
  {
    id: "awka-luxe",
    name: "Awka Luxe Apartment",
    location: "Awka, Anambra State",
    pricePerNight: 12000,
    type: "Apartment",
    images: [
      "https://source.unsplash.com/800x600/?apartment,nigeria",
      "https://source.unsplash.com/800x600/?apartment,livingroom",
    ],
    description: "Modern 2-bedroom apartment in Awka, ideal for short stays.",
  },
];
