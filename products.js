// ============================================================
//  ASMAIN COLLECTION — PRODUCT CATALOG
//  To add a new product: copy one block, change the values.
//  Images go in /images/ folder. Just add the filename below.
// ============================================================

const PRODUCTS = [
  {
    id: 1,
    name: "Aurora Ring",
    category: "Rings",
    price: 8900,
    oldPrice: 12000,          // set to null if not on sale
    image: "images/ring-1.jpg",
    badge: "Sale",            // "New", "Sale", "Bestseller", or null
    description: "A delicate gold-plated ring with a crystal centerpiece — perfect for everyday elegance.",
    featured: true,
  },
  {
    id: 2,
    name: "Luna Pendant",
    category: "Necklaces",
    price: 14500,
    oldPrice: null,
    image: "images/necklace-1.jpg",
    badge: "New",
    description: "18k gold-plated pendant with a moon-inspired design. Adjustable chain.",
    featured: true,
  },
  {
    id: 3,
    name: "Soleil Hoops",
    category: "Earrings",
    price: 6200,
    oldPrice: null,
    image: "images/earrings-1.jpg",
    badge: null,
    description: "Lightweight gold hoops with a textured finish. Hypoallergenic.",
    featured: true,
  },
  {
    id: 4,
    name: "Étoile Bangles",
    category: "Bangles & Sets",
    price: 9800,
    oldPrice: 13500,
    image: "images/bangles-1.jpg",
    badge: "Sale",
    description: "Set of 4 stacking bangles with subtle star detailing.",
    featured: true,
  },
  {
    id: 5,
    name: "Vera Ring Set",
    category: "Rings",
    price: 11900,
    oldPrice: null,
    image: "images/ring-2.jpg",
    badge: "New",
    description: "Three-piece ring set — wear together or separately.",
    featured: false,
  },
  {
    id: 6,
    name: "Aria Chain",
    category: "Necklaces",
    price: 7800,
    oldPrice: null,
    image: "images/necklace-2.jpg",
    badge: null,
    description: "Minimalist chain necklace in gold-tone finish. 16–18 inch adjustable.",
    featured: false,
  },
  {
    id: 7,
    name: "Mira Studs",
    category: "Earrings",
    price: 4500,
    oldPrice: 6200,
    image: "images/earrings-2.jpg",
    badge: "Sale",
    description: "Classic crystal studs — the perfect subtle sparkle.",
    featured: false,
  },
  {
    id: 8,
    name: "Celine Set",
    category: "Bangles & Sets",
    price: 13200,
    oldPrice: null,
    image: "images/bangles-2.jpg",
    badge: null,
    description: "Complete matching set — necklace, earrings & bangle.",
    featured: false,
  },
];

// ============================================================
//  STORE INFO — Edit your brand details here
// ============================================================
const STORE = {
  name: "ASMAIN COLLECTION",
  tagline: "Elevate Your Style with Timeless Elegance",
  whatsapp: "https://wa.me/message/NU72YL2UN6HED1",
  email: "asmain040@gmail.com",
  instagram: "https://www.instagram.com/asmaincollection/",
  facebook: "https://www.facebook.com/profile.php?id=61582246145679",
  tiktok: "https://www.tiktok.com/@asmain.collection",
  currency: "PKR",
};