export interface PricingRow {
  product: string
  priceUsd: string
  priceAed: string
  unit: string
  note?: string
  highlight?: boolean
}

export const PRICING_ROWS: PricingRow[] = [
  { product: "General Cargo", priceUsd: "$16", priceAed: "58 AED", unit: "per kg" },
  { product: "Desktops", priceUsd: "$16", priceAed: "58 AED", unit: "per kg" },
  {
    product: "Laptops",
    priceUsd: "$45",
    priceAed: "165 AED",
    unit: "per laptop",
    note: "Standard laptop, not more than 2.5 kg",
    highlight: true,
  },
  { product: "MacBook Laptop", priceUsd: "$50", priceAed: "182 AED", unit: "per laptop", highlight: true },
  {
    product: "Mobile Phones",
    priceUsd: "$30",
    priceAed: "110 AED",
    unit: "per phone",
    note: "$23 per phone for orders of 10+ phones",
    highlight: true,
  },
  { product: "Clothing", priceUsd: "$16", priceAed: "58 AED", unit: "per kg" },
  { product: "Weaves / Wigs", priceUsd: "$16", priceAed: "58 AED", unit: "per head" },
  { product: "Batteries", priceUsd: "$25", priceAed: "91 AED", unit: "per kg" },
  { product: "Perfumes", priceUsd: "$18", priceAed: "66 AED", unit: "per kg" },
  { product: "Power Banks", priceUsd: "$22", priceAed: "80 AED", unit: "per kg" },
  { product: "Pouches & Phone Accessories", priceUsd: "$16", priceAed: "58 AED", unit: "per kg" },
  { product: "CCTVs", priceUsd: "$16", priceAed: "58 AED", unit: "per kg" },
  { product: "Gold Detectors", priceUsd: "$19", priceAed: "70 AED", unit: "per kg" },
  {
    product: "Cameras (Small)",
    priceUsd: "$41",
    priceAed: "150 AED",
    unit: "per piece",
    note: "Small cameras",
  },
  {
    product: "Cameras (Large)",
    priceUsd: "$22",
    priceAed: "80 AED",
    unit: "per kg",
    note: "Huge cameras",
  },
  { product: "Tablets", priceUsd: "$33", priceAed: "120 AED", unit: "per piece" },
  { product: "Watches", priceUsd: "$16.50", priceAed: "60 AED", unit: "per kg" },
  { product: "Hand Bags", priceUsd: "$16.50", priceAed: "60 AED", unit: "per kg" },
  { product: "Jewellery", priceUsd: "Quote", priceAed: "Quote", unit: "charged per value" },
  { product: "Spare Parts", priceUsd: "$16", priceAed: "58 AED", unit: "per kg" },
  { product: "Shoes", priceUsd: "$16", priceAed: "58 AED", unit: "per kg" },
  { product: "Speakers with Magnetic Components", priceUsd: "$16.50", priceAed: "60 AED", unit: "per kg" },
  { product: "PS4/5 & Gaming Accessories", priceUsd: "$16.50", priceAed: "60 AED", unit: "per kg" },
]
